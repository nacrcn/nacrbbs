import { createClient } from 'redis';
import { readFileSync } from 'fs';
let redisConfig = readFileSync('./app/config/redis.json', 'utf-8');
redisConfig = JSON.parse(redisConfig);

class RedisConnection {
  static instance = null;

  static async getInstance() {
    if (!RedisConnection.instance) {
      // 优先使用环境变量，否则使用配置文件
      const redisUrl = process.env.REDIS_URL || `redis://:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}`;

      RedisConnection.instance = createClient({
        url: redisUrl,
        database: redisConfig.db,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > redisConfig.max_reconnect_attempts || 10) {
              console.error('Redis重连次数过多，放弃连接');
              return false; // 停止重连
            }
            console.warn(`Redis重连尝试: ${retries}`);
            return Math.min(retries * 100, 3000); // 指数退避
          },
          connectTimeout: redisConfig.connect_timeout || 10000,
          lazyConnect: true,
          keepAlive: true,
          family: 4
        },
        // 连接池配置
        maxRetriesPerRequest: 3,
        retryDelayOnFailover: 100,
        enableOfflineQueue: false
      });

      // 错误监听
      RedisConnection.instance.on('error', err => {
        console.error('Redis连接错误:', err.message);
      });

      // 连接监听
      RedisConnection.instance.on('connect', () => {
        console.log('Redis正在连接...');
      });

      // 成功监听
      RedisConnection.instance.on('ready', () => {
        console.log(`Redis连接成功！数据库: ${redisConfig.db}`);
      });

      // 断开连接监听
      RedisConnection.instance.on('end', () => {
        console.warn('Redis连接已断开');
      });

      // 重连监听
      RedisConnection.instance.on('reconnecting', () => {
        console.log('Redis正在重连...');
      });

      // 连接 Redis
      await RedisConnection.instance.connect();
    }
    return RedisConnection.instance;
  }

  // 关闭连接
  static async closeConnection() {
    if (RedisConnection.instance) {
      await RedisConnection.instance.quit();
      RedisConnection.instance = null;
    }
  }

  // 检查连接状态
  static isConnected() {
    return RedisConnection.instance && RedisConnection.instance.isOpen;
  }
}

// 创建全局Redis实例
let redisInstance = null;

// 初始化Redis连接
export async function initRedis() {
  try {
    redisInstance = await RedisConnection.getInstance();
    return redisInstance;
  } catch (error) {
    console.error('初始化Redis连接失败:', error);
    throw error;
  }
}

// 获取Redis实例
export function getRedis() {
  if (!redisInstance) {
    throw new Error('Redis尚未初始化，请先调用 initRedis()');
  }
  return redisInstance;
}


/**
 * 获取或设置缓存
 * @param {string} key - 缓存 key
 * @param {number} ttlSeconds - 缓存过期时间 单位：秒
 * @param {function} fetchFunction - 如果缓存不存在，执行该函数
 * @returns {any} fetchFunction 的返回值
 */
export async function getOrSetCache(key, ttlSeconds, fetchFunction) {
  const redis = getRedis();
  try {
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const freshData = await fetchFunction();
    await redis.setEx(key, ttlSeconds, JSON.stringify(freshData));
    return freshData;
  } catch (error) {
    console.error(`缓存操作失败 [key: ${key}]:`, error);
    // 缓存失败时直接执行函数
    return await fetchFunction();
  }
}

/**
 * 设置缓存
 * @param {string} key - 缓存键
 * @param {any} value - 缓存值
 * @param {number} ttlSeconds - 过期时间（秒）
 */
export async function setCache(key, value, ttlSeconds = 3600) {
  const redis = getRedis();
  try {
    await redis.setEx(key, ttlSeconds, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`设置缓存失败 [key: ${key}]:`, error);
    return false;
  }
}

/**
 * 获取缓存
 * @param {string} key - 缓存键
 * @returns {any|null} 缓存值或null
 */
export async function getCache(key) {
  const redis = getRedis();
  try {
    const cached = await redis.get(key);
    console.log(key);

    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error(`获取缓存失败 [key: ${key}]:`, error);
    return null;
  }
}

/**
 * 删除缓存
 * @param {string|Array} keys - 缓存键或键数组
 */
export async function deleteCache(keys) {
  const redis = getRedis();
  try {
    const result = await redis.del(keys);
    return result;
  } catch (error) {
    console.error(`删除缓存失败 [keys: ${keys}]:`, error);
    return 0;
  }
}

/**
 * 检查缓存是否存在
 * @param {string} key - 缓存键
 * @returns {boolean} 是否存在
 */
export async function existsCache(key) {
  const redis = getRedis();
  try {
    const result = await redis.exists(key);
    return result === 1;
  } catch (error) {
    console.error(`检查缓存存在性失败 [key: ${key}]:`, error);
    return false;
  }
}

/**
 * 设置缓存过期时间
 * @param {string} key - 缓存键
 * @param {number} ttlSeconds - 过期时间（秒）
 * @returns {boolean} 是否成功
 */
export async function expireCache(key, ttlSeconds) {
  const redis = getRedis();
  try {
    const result = await redis.expire(key, ttlSeconds);
    return result === 1;
  } catch (error) {
    console.error(`设置过期时间失败 [key: ${key}]:`, error);
    return false;
  }
}

/**
 * 获取缓存剩余过期时间
 * @param {string} key - 缓存键
 * @returns {number} 剩余时间（秒），-1表示永不过期，-2表示不存在
 */
export async function getCacheTTL(key) {
  const redis = getRedis();
  try {
    return await redis.ttl(key);
  } catch (error) {
    console.error(`获取缓存TTL失败 [key: ${key}]:`, error);
    return -2;
  }
}

/**
 * 清空当前数据库
 * @returns {boolean} 是否成功
 */
export async function flushDatabase() {
  const redis = getRedis();
  try {
    await redis.flushDb();
    return true;
  } catch (error) {
    console.error('清空数据库失败:', error);
    return false;
  }
}

/**
 * Redis哈希操作类
 */
export class RedisHash {
  /**
   * 设置哈希字段
   * @param {string} key - 哈希键
   * @param {string} field - 字段名
   * @param {any} value - 字段值
   */
  static async set(key, field, value) {
    const redis = getRedis();
    try {
      await redis.hSet(key, field, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`设置哈希字段失败 [key: ${key}, field: ${field}]:`, error);
      return false;
    }
  }

  /**
   * 获取哈希字段
   * @param {string} key - 哈希键
   * @param {string} field - 字段名
   * @returns {any|null} 字段值或null
   */
  static async get(key, field) {
    const redis = getRedis();
    try {
      const value = await redis.hGet(key, field);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`获取哈希字段失败 [key: ${key}, field: ${field}]:`, error);
      return null;
    }
  }

  /**
   * 获取整个哈希
   * @param {string} key - 哈希键
   * @returns {Object} 哈希对象
   */
  static async getAll(key) {
    const redis = getRedis();
    try {
      const hash = await redis.hGetAll(key);
      const result = {};
      for (const [field, value] of Object.entries(hash)) {
        try {
          result[field] = JSON.parse(value);
        } catch {
          result[field] = value;
        }
      }
      return result;
    } catch (error) {
      console.error(`获取哈希失败 [key: ${key}]:`, error);
      return {};
    }
  }

  /**
   * 删除哈希字段
   * @param {string} key - 哈希键
   * @param {string|Array} fields - 字段名或字段名数组
   * @returns {number} 删除的字段数量
   */
  static async delete(key, fields) {
    const redis = getRedis();
    try {
      return await redis.hDel(key, fields);
    } catch (error) {
      console.error(`删除哈希字段失败 [key: ${key}, fields: ${fields}]:`, error);
      return 0;
    }
  }

  /**
   * 检查哈希字段是否存在
   * @param {string} key - 哈希键
   * @param {string} field - 字段名
   * @returns {boolean} 是否存在
   */
  static async exists(key, field) {
    const redis = getRedis();
    try {
      const result = await redis.hExists(key, field);
      return result === 1;
    } catch (error) {
      console.error(`检查哈希字段存在性失败 [key: ${key}, field: ${field}]:`, error);
      return false;
    }
  }
}

/**
 * Redis列表操作类
 */
export class RedisList {
  /**
   * 从左侧推入元素
   * @param {string} key - 列表键
   * @param {any} values - 要推入的值
   * @returns {number} 列表长度
   */
  static async pushLeft(key, ...values) {
    const redis = getRedis();
    try {
      const serializedValues = values.map(v => JSON.stringify(v));
      return await redis.lPush(key, serializedValues);
    } catch (error) {
      console.error(`左推入列表失败 [key: ${key}]:`, error);
      return 0;
    }
  }

  /**
   * 从右侧推入元素
   * @param {string} key - 列表键
   * @param {any} values - 要推入的值
   * @returns {number} 列表长度
   */
  static async pushRight(key, ...values) {
    const redis = getRedis();
    try {
      const serializedValues = values.map(v => JSON.stringify(v));
      return await redis.rPush(key, serializedValues);
    } catch (error) {
      console.error(`右推入列表失败 [key: ${key}]:`, error);
      return 0;
    }
  }

  /**
   * 从左侧弹出元素
   * @param {string} key - 列表键
   * @returns {any|null} 弹出的元素
   */
  static async popLeft(key) {
    const redis = getRedis();
    try {
      const value = await redis.lPop(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`左弹出列表失败 [key: ${key}]:`, error);
      return null;
    }
  }

  /**
   * 从右侧弹出元素
   * @param {string} key - 列表键
   * @returns {any|null} 弹出的元素
   */
  static async popRight(key) {
    const redis = getRedis();
    try {
      const value = await redis.rPop(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`右弹出列表失败 [key: ${key}]:`, error);
      return null;
    }
  }

  /**
   * 获取列表长度
   * @param {string} key - 列表键
   * @returns {number} 列表长度
   */
  static async length(key) {
    const redis = getRedis();
    try {
      return await redis.lLen(key);
    } catch (error) {
      console.error(`获取列表长度失败 [key: ${key}]:`, error);
      return 0;
    }
  }

  /**
   * 获取列表范围内元素
   * @param {string} key - 列表键
   * @param {number} start - 开始索引
   * @param {number} end - 结束索引
   * @returns {Array} 元素数组
   */
  static async range(key, start = 0, end = -1) {
    const redis = getRedis();
    try {
      const values = await redis.lRange(key, start, end);
      return values.map(v => {
        try {
          return JSON.parse(v);
        } catch {
          return v;
        }
      });
    } catch (error) {
      console.error(`获取列表范围失败 [key: ${key}]:`, error);
      return [];
    }
  }
}

// 默认导出初始化函数
export default initRedis;
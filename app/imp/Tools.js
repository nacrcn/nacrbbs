import {
  promises as fs
} from 'fs';
import axios from 'axios';


// 错误码对应信息
const codemsg = {
  200: "成功",
  201: "失败",
  202: "参数错误",
  203: "权限不足",
  204: "操作失败",
  400: "访问路径错误",
  500: "服务器异常"
};

export function getCodeMsg(code) {
  return codemsg[code] || '未知错误';
}
/* 通用返回函数 */
export function sendMsg(reply, code = 200, msg = '', data = {}, total = 0) {
  msg = msg || getCodeMsg(code);
  reply.send({
    code,
    msg,
    data,
    total
  });
}

/* 验证规则执行器 */
class ValidationRule {
  static required(value, fieldName) {
    if (value === '' || value === null || value === undefined) {
      return `${fieldName}不能为空`;
    }
    return null;
  }

  static email(value, fieldName) {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return `${fieldName}格式不正确`;
    }
    return null;
  }

  static phone(value, fieldName) {
    if (value && !/^1[3-9]\d{9}$/.test(value)) {
      return `${fieldName}格式不正确`;
    }
    return null;
  }

  static minLength(value, minLength, fieldName) {
    if (value && value.length < minLength) {
      return `${fieldName}长度不能少于${minLength}位`;
    }
    return null;
  }

  static maxLength(value, maxLength, fieldName) {
    if (value && value.length > maxLength) {
      return `${fieldName}长度不能超过${maxLength}位`;
    }
    return null;
  }

  static length(value, length, fieldName) {
    if (value && value.length !== length) {
      return `${fieldName}长度必须为${length}位`;
    }
    return null;
  }

  static number(value, fieldName) {
    if (value && !/^\d+$/.test(value)) {
      return `${fieldName}必须为数字`;
    }
    return null;
  }

  static float(value, fieldName) {
    if (value && !/^\d*\.?\d+$/.test(value)) {
      return `${fieldName}必须为数字`;
    }
    return null;
  }

  static integer(value, fieldName) {
    if (value && (!/^-?\d+$/.test(value) || value.includes('.'))) {
      return `${fieldName}必须为整数`;
    }
    return null;
  }

  static positive(value, fieldName) {
    if (value && (parseFloat(value) <= 0 || isNaN(parseFloat(value)))) {
      return `${fieldName}必须为正数`;
    }
    return null;
  }

  static url(value, fieldName) {
    if (value && !/^https?:\/\/.+\..+/.test(value)) {
      return `${fieldName}格式不正确`;
    }
    return null;
  }

  static date(value, fieldName) {
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return `${fieldName}格式不正确，应为YYYY-MM-DD`;
    }
    return null;
  }

  static datetime(value, fieldName) {
    if (value && !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
      return `${fieldName}格式不正确，应为YYYY-MM-DD HH:mm:ss`;
    }
    return null;
  }

  static idCard(value, fieldName) {
    if (value && !/^\d{17}[\dXx]$/.test(value)) {
      return `${fieldName}格式不正确`;
    }
    return null;
  }

  static password(value, fieldName) {
    if (value && value.length < 6) {
      return `${fieldName}长度不能少于6位`;
    }
    if (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return `${fieldName}必须包含大小写字母和数字`;
    }
    return null;
  }

  static confirmPassword(value, compareValue, fieldName) {
    if (value !== compareValue) {
      return `${fieldName}不匹配`;
    }
    return null;
  }

  static range(value, min, max, fieldName) {
    if (value) {
      const num = parseFloat(value);
      if (isNaN(num) || num < min || num > max) {
        return `${fieldName}必须在${min}-${max}之间`;
      }
    }
    return null;
  }

  static array(value, fieldName) {
    if (value && !Array.isArray(value)) {
      return `${fieldName}必须为数组`;
    }
    return null;
  }

  static object(value, fieldName) {
    if (value && (typeof value !== 'object' || Array.isArray(value))) {
      return `${fieldName}必须为对象`;
    }
    return null;
  }

  static boolean(value, fieldName) {
    if (value && typeof value !== 'boolean') {
      return `${fieldName}必须为布尔值`;
    }
    return null;
  }

  static json(value, fieldName) {
    if (value) {
      try {
        JSON.parse(value);
      } catch {
        return `${fieldName}格式不正确`;
      }
    }
    return null;
  }
}

/* 增强的数据判断函数 */
export function VerifyField(reply, data, fields) {
  for (let fieldKey in fields) {
    const fieldConfig = fields[fieldKey];
    const fieldName = fieldConfig[0];
    const fieldLabel = fieldConfig[1];
    const rules = fieldConfig[2];
    
    // 兼容旧版本格式：['username', '用户名', 'required']
    if (typeof rules === 'string') {
      const ruleName = rules;
      const errorMessage = ValidationRule[ruleName](data[fieldName], fieldLabel);
      if (errorMessage) {
        global.sendMsg(reply, 201, errorMessage);
        return errorMessage;
      }
      continue;
    }
    
    // 新版本格式：['username', '用户名', 'required|email|minLength:6|maxLength:50']
    if (typeof rules === 'string') {
      const ruleList = rules.split('|');
      
      for (let rule of ruleList) {
        const [ruleName, ...params] = rule.split(':');
        const value = data[fieldName];
        
        let errorMessage = null;
        
        // 处理需要参数的规则
        switch (ruleName) {
          case 'minLength':
            errorMessage = ValidationRule.minLength(value, parseInt(params[0]), fieldLabel);
            break;
          case 'maxLength':
            errorMessage = ValidationRule.maxLength(value, parseInt(params[0]), fieldLabel);
            break;
          case 'length':
            errorMessage = ValidationRule.length(value, parseInt(params[0]), fieldLabel);
            break;
          case 'range':
            errorMessage = ValidationRule.range(value, parseFloat(params[0]), parseFloat(params[1]), fieldLabel);
            break;
          case 'confirmPassword':
            errorMessage = ValidationRule.confirmPassword(value, data[params[0]], fieldLabel);
            break;
          default:
            // 调用对应验证方法
            if (ValidationRule[ruleName]) {
              errorMessage = ValidationRule[ruleName](value, fieldLabel);
            }
        }
        
        if (errorMessage) {
          global.sendMsg(reply, 201, errorMessage);
          return errorMessage;
        }
      }
    }
    
    // 支持函数形式的规则：['username', '用户名', (value, label) => { return value ? null : '用户名不能为空'; }]
    else if (typeof rules === 'function') {
      const errorMessage = rules(data[fieldName], fieldLabel, data);
      if (errorMessage) {
        global.sendMsg(reply, 201, errorMessage);
        return errorMessage;
      }
    }
  }
  return false;
}

/* 快速验证函数 - 单字段验证 */
export function verifyField(value, rules, fieldName = '') {
  const result = VerifyField(null, { value: value }, { field: [fieldName || '字段', fieldName || '字段', rules] });
  return !result; // 返回是否验证通过
}

/* 验证中间件 - 在路由中使用 */
export function validate(fields) {
  return (req, reply, done) => {
    const result = VerifyField(reply, req.body || req.query || req.params, fields);
    if (result) {
      return; // 验证失败，已发送响应
    }
    done(); // 验证通过
  };
}



/* 验证码检验函数 */
export async function verifyCode(code, redisKey) {
  const config = await global.db.query('SELECT * FROM n_configuration');
  if (config[0].n_captcha_type === '1') {

    const storedCode = await global.RedisUtils.getCache('email:verify:' + redisKey);
    if (!storedCode) {
      return {
        status: false,
        msg: '验证码已过期'
      };
    }

    if (storedCode !== code) {
      return {
        status: false,
        msg: '验证码错误'
      };
    }
  }
  return {
    status: true,
    msg: '验证码验证成功'
  };
}





/* 不常用函数： */
export async function readFile(file) {
  try {
    const content = await fs.readFile(file, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function writeFile(file, data) {
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(file, json, 'utf8');
    return true;
  } catch {
    return false;
  }
}

export async function get(url, headers = {}) {
  const res = await axios.get(url, {
    headers
  });
  return res.data;
}

export async function post(url, data = {}, headers = {}) {
  const res = await axios.post(url, data, {
    headers
  });
  return res.data;
}

/* 生成不重复的编码 */
export function generateCode(length = 10) {
  // 字符集：包含大小写字母和数字
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // 获取当前时间戳（13位）
  const timestamp = Date.now().toString();

  // 生成随机数部分
  let randomPart = '';
  const randomLength = Math.max(length - timestamp.length, 4);

  for (let i = 0; i < randomLength; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // 组合时间戳和随机部分，确保唯一性
  let result = timestamp + randomPart;

  // 如果结果长度超过要求，进行截取
  if (result.length > length) {
    // 保留时间戳的完整性，从随机部分截取
    const keepTimestamp = result.substring(0, timestamp.length);
    const randomToKeep = result.substring(timestamp.length, length);
    result = keepTimestamp + randomToKeep;
  }

  return result;
}

/* 生成更复杂的编码（包含特殊字符） */
export function generateComplexCode(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const timestamp = Date.now().toString();

  let result = '';
  for (let i = 0; i < length; i++) {
    // 前几位使用时间戳，确保唯一性
    if (i < timestamp.length && i < length) {
      result += timestamp[i];
    } else {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return result;
}

/* 生成纯数字编码 */
export function generateNumericCode(length = 8) {
  const timestamp = Date.now().toString();
  let result = timestamp;

  // 如果时间戳长度不够，补充随机数字
  while (result.length < length) {
    result += Math.floor(Math.random() * 10).toString();
  }

  // 如果超过长度，截取
  if (result.length > length) {
    result = result.substring(0, length);
  }

  return result;
}

/* 生成带前缀的编码 */
export function generatePrefixedCode(prefix = '', length = 12) {
  const baseCode = generateCode(length - prefix.length);
  return prefix + baseCode;
}

/* 生成订单号等业务编码 */
export function generateOrderCode(prefix = 'ORD') {
  const date = new Date();
  const year = date.getFullYear().toString().substring(2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const timestamp = Date.now().toString().substring(8); // 取后几位
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  return `${prefix}${year}${month}${day}${timestamp}${random}`;
}



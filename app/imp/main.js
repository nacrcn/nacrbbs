// 挂载函数到全局
import {
    sendMsg,
    VerifyField,
    generateCode,
    generateComplexCode,
    generateNumericCode,
    generatePrefixedCode,
    generateOrderCode,
    verifyCode
} from './Tools.js';
import SqlFun from './SqlFun.js';
import Auth from './Auth.js';
import Hash from './Hash.js';
const {
    Mysql,
    SqlBuilder
} = SqlFun;

/* 挂载数据库 */
global.sendMsg = sendMsg
global.Mysql = Mysql;
global.SqlBuilder = SqlBuilder;
global.db = await Mysql.getInstance();

/* 挂载Token生成和验证 */
let AuthFun = new Auth();
global.AuthGenerateToken = AuthFun.GenerateToken;
global.AuthVerifyAuthCode = AuthFun.VerifyAuthCode;

/* 挂载Hash */
global.Hash = Hash;

/* 挂载全局工具 */
global.Tools = global.Tools || {};
global.Tools.VerifyField = VerifyField;
global.Tools.generateCode = generateCode;
global.Tools.generateComplexCode = generateComplexCode;
global.Tools.generateNumericCode = generateNumericCode;
global.Tools.generatePrefixedCode = generatePrefixedCode;
global.Tools.generateOrderCode = generateOrderCode;
/* 挂载验证码检验函数 */
global.Tools.verifyCode = verifyCode;

/* 挂载邮件服务 */
import EmailService from '../library/email/index.js';
global.EmailService = new EmailService();

/* 挂载第三方认证函数 */
import Tripartite from '../library/Tripartite/index.js';
global.ThirdParty = new Tripartite();

/* 挂载Redis */
import {
    initRedis,
    getRedis,
    getOrSetCache,
    setCache,
    getCache,
    deleteCache,
    existsCache,
    expireCache,
    getCacheTTL,
    flushDatabase,
    RedisHash,
    RedisList
} from './Redis.js';

// 初始化Redis并挂载全局对象
try {
    const redisClient = await initRedis();

    // 挂载Redis客户端实例
    global.redis = redisClient;

    // 挂载Redis工具函数
    global.RedisUtils = {
        initRedis,
        getRedis,
        getOrSetCache,
        setCache,
        getCache,
        deleteCache,
        existsCache,
        expireCache,
        getCacheTTL,
        flushDatabase,
        RedisHash,
        RedisList
    };

    // 为了向后兼容，也挂载常用的函数到全局
    global.getOrSetCache = getOrSetCache;
    global.setCache = setCache;
    global.getCache = getCache;
    global.deleteCache = deleteCache;
    global.existsCache = existsCache;
    global.RedisHash = RedisHash;
    global.RedisList = RedisList;

    console.log('✅ Redis全局挂载成功');
} catch (error) {
    console.error('❌ Redis初始化失败:', error);
    // 即使Redis失败也不阻止应用启动，后续调用会提示初始化
    global.redis = null;
    global.RedisUtils = null;
}


const Fun = async (reply, fun) => {
    try {
        // 传入的函数
        await fun();
    } catch (error) {
        console.error(error);
        sendMsg(reply, 500, error.message);

    }
}
global.Fun = Fun;
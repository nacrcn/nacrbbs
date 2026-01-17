/**
 * 验证函数使用示例
 * 增强的 VerifyField 函数支持多种验证条件
 */

import { VerifyField, verifyField, validate } from '../app/imp/Tools.js';

// 示例1: 基本验证（兼容旧版本）
export function basicValidationExample(reply, data) {
    console.log('=== 基本验证示例 ===');
    
    const fields = {
        username: ['username', '用户名', 'required'],
        password: ['password', '密码', 'required'],
        email: ['email', '邮箱', 'required']
    };
    
    const result = VerifyField(reply, data, fields);
    if (!result) {
        console.log('✅ 基本验证通过');
        return true;
    }
    
    console.log('❌ 验证失败:', result);
    return false;
}

// 示例2: 多条件验证（新版本）
export function multiConditionValidationExample(reply, data) {
    console.log('=== 多条件验证示例 ===');
    
    const fields = {
        username: ['username', '用户名', 'required|minLength:3|maxLength:20'],
        email: ['email', '邮箱', 'required|email'],
        phone: ['phone', '手机号', 'phone'],
        password: ['password', '密码', 'required|minLength:6|password'],
        confirmPassword: ['confirmPassword', '确认密码', 'required|confirmPassword:password'],
        age: ['age', '年龄', 'required|integer|range:18:100'],
        website: ['website', '个人网站', 'url'],
        birthday: ['birthday', '生日', 'date'],
        bio: ['bio', '个人简介', 'maxLength:500']
    };
    
    const result = VerifyField(reply, data, fields);
    if (!result) {
        console.log('✅ 多条件验证通过');
        return true;
    }
    
    console.log('❌ 验证失败:', result);
    return false;
}

// 示例3: 自定义函数验证
export function customFunctionValidationExample(reply, data) {
    console.log('=== 自定义函数验证示例 ===');
    
    const fields = {
        username: ['username', '用户名', (value, label, allData) => {
            if (!value) return '用户名不能为空';
            if (value.length < 3) return '用户名长度不能少于3位';
            if (!/^[a-zA-Z0-9_]+$/.test(value)) return '用户名只能包含字母、数字和下划线';
            if (['admin', 'root', 'system'].includes(value.toLowerCase())) return '用户名不能使用系统保留词';
            return null; // 验证通过
        }],
        customField: ['customField', '自定义字段', (value, label) => {
            // 复杂的自定义验证逻辑
            if (value && value.includes('forbidden')) {
                return '包含禁止内容';
            }
            return null;
        }]
    };
    
    const result = VerifyField(reply, data, fields);
    if (!result) {
        console.log('✅ 自定义验证通过');
        return true;
    }
    
    console.log('❌ 验证失败:', result);
    return false;
}

// 示例4: 快速单字段验证
export function quickFieldValidationExample() {
    console.log('=== 快速字段验证示例 ===');
    
    // 测试邮箱验证
    console.log('邮箱验证:', verifyField('test@example.com', 'email', '邮箱')); // true
    console.log('无效邮箱:', verifyField('invalid-email', 'email', '邮箱')); // false
    
    // 测试手机号验证
    console.log('手机号验证:', verifyField('13800138000', 'phone', '手机号')); // true
    console.log('无效手机号:', verifyField('123456', 'phone', '手机号')); // false
    
    // 测试密码强度验证
    console.log('密码验证:', verifyField('Abc123', 'password', '密码')); // true
    console.log('弱密码:', verifyField('123456', 'password', '密码')); // false
    
    // 测试范围验证
    console.log('年龄验证:', verifyField('25', 'integer|range:18:100', '年龄')); // true
    console.log('年龄超出范围:', verifyField('150', 'integer|range:18:100', '年龄')); // false
}

// 示例5: 在实际路由中使用
export class UserController {
    // 用户注册验证
    static async register(reply, body) {
        const fields = {
            username: ['username', '用户名', 'required|minLength:3|maxLength:20'],
            email: ['email', '邮箱', 'required|email'],
            password: ['password', '密码', 'required|minLength:6|password'],
            confirmPassword: ['confirmPassword', '确认密码', 'required|confirmPassword:password'],
            phone: ['phone', '手机号', 'phone'],
            agreement: ['agreement', '用户协议', 'required']
        };
        
        const validationError = VerifyField(reply, body, fields);
        if (validationError) {
            return; // 验证失败，响应已发送
        }
        
        // 验证通过，继续处理注册逻辑
        console.log('✅ 用户注册验证通过');
        // ... 业务逻辑
    }
    
    // 用户信息更新验证
    static async updateProfile(reply, body) {
        const fields = {
            nickname: ['nickname', '昵称', 'maxLength:30'],
            bio: ['bio', '个人简介', 'maxLength:200'],
            website: ['website', '个人网站', 'url'],
            birthday: ['birthday', '生日', 'date'],
            gender: ['gender', '性别', 'required|range:0:2']
        };
        
        const validationError = VerifyField(reply, body, fields);
        if (validationError) {
            return;
        }
        
        console.log('✅ 用户信息更新验证通过');
        // ... 业务逻辑
    }
}

// 示例6: 中间件使用方式（在路由框架中）
export const userRegistrationValidation = validate({
    username: ['username', '用户名', 'required|minLength:3|maxLength:20'],
    email: ['email', '邮箱', 'required|email'],
    password: ['password', '密码', 'required|minLength:6|password'],
    phone: ['phone', '手机号', 'phone']
});

// 示例7: 复杂业务场景验证
export function businessScenarioExample(reply, data) {
    console.log('=== 业务场景验证示例 ===');
    
    const fields = {
        // 订单相关验证
        orderId: ['orderId', '订单号', 'required|length:20'],
        amount: ['amount', '订单金额', 'required|positive|float'],
        productId: ['productId', '商品ID', 'required|integer|positive'],
        quantity: ['quantity', '商品数量', 'required|integer|positive|min:1|max:999'],
        
        // 地址验证
        province: ['province', '省份', 'required'],
        city: ['city', '城市', 'required'],
        address: ['address', '详细地址', 'required|minLength:10|maxLength:200'],
        zipCode: ['zipCode', '邮政编码', 'length:6'],
        
        // 支付信息
        paymentMethod: ['paymentMethod', '支付方式', 'required|range:1:5'],
        couponCode: ['couponCode', '优惠券码', 'maxLength:20'],
        
        // 备注信息
        remark: ['remark', '订单备注', 'maxLength:500']
    };
    
    const validationError = VerifyField(reply, data, fields);
    if (!validationError) {
        console.log('✅ 业务场景验证通过');
        
        // 特殊业务逻辑验证
        if (data.couponCode && data.amount < 100) {
            global.sendMsg(reply, 201, '订单金额需满100元才能使用优惠券');
            return '优惠券使用条件不满足';
        }
        
        return true;
    }
    
    console.log('❌ 业务场景验证失败:', validationError);
    return false;
}

// 示例8: 条件验证（根据条件动态验证）
export function conditionalValidationExample(reply, data) {
    console.log('=== 条件验证示例 ===');
    
    const fields = {
        userType: ['userType', '用户类型', 'required|range:1:3'],
        companyName: ['companyName', '公司名称', (value, label, allData) => {
            // 如果是企业用户，公司名称必填
            if (allData.userType === '2' && !value) {
                return '企业用户必须填写公司名称';
            }
            if (value && value.length < 2) return '公司名称长度不能少于2位';
            return null;
        }],
        taxNumber: ['taxNumber', '税号', (value, label, allData) => {
            // 如果是企业用户，税号必填
            if (allData.userType === '2' && !value) {
                return '企业用户必须填写税号';
            }
            if (value && !/^\d{15}$|^\d{18}$/.test(value)) {
                return '税号格式不正确';
            }
            return null;
        }],
        idCard: ['idCard', '身份证号', (value, label, allData) => {
            // 如果是个人用户，身份证号必填
            if (allData.userType === '1' && !value) {
                return '个人用户必须填写身份证号';
            }
            if (value) {
                // 简单的身份证号验证
                if (!/^\d{17}[\dXx]$/.test(value)) {
                    return '身份证号格式不正确';
                }
            }
            return null;
        }]
    };
    
    const validationError = VerifyField(reply, data, fields);
    if (!validationError) {
        console.log('✅ 条件验证通过');
        return true;
    }
    
    console.log('❌ 条件验证失败:', validationError);
    return false;
}

// 运行所有示例
export async function runValidationExamples() {
    console.log('🔍 开始运行验证函数示例...\n');
    
    // 模拟reply对象
    const mockReply = {
        send: (response) => {
            console.log('📤 模拟响应:', response);
        }
    };
    
    // 测试数据
    const testData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Abc123',
        confirmPassword: 'Abc123',
        phone: '13800138000',
        age: '25',
        website: 'https://example.com',
        birthday: '1990-01-01'
    };
    
    // 运行各种验证示例
    console.log('测试数据:', testData);
    
    basicValidationExample(mockReply, testData);
    console.log('');
    
    multiConditionValidationExample(mockReply, testData);
    console.log('');
    
    quickFieldValidationExample();
    console.log('');
    
    customFunctionValidationExample(mockReply, testData);
    console.log('');
    
    businessScenarioExample(mockReply, {
        orderId: '12345678901234567890',
        amount: '99.99',
        productId: '123',
        quantity: '2',
        province: '北京市',
        city: '北京市',
        address: '朝阳区某某街道123号',
        zipCode: '100000',
        paymentMethod: '1',
        remark: '请尽快发货'
    });
    console.log('');
    
    conditionalValidationExample(mockReply, {
        userType: '2',
        companyName: '测试公司',
        taxNumber: '123456789012345678'
    });
    
    console.log('\n🎉 所有验证示例运行完成!');
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
    runValidationExamples().catch(console.error);
}

export { 
    ValidationRule, 
    UserController, 
    userRegistrationValidation 
};
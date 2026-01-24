/*
 Navicat Premium Dump SQL

 Source Server         : 我的数据库
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30-cynos-3.1.16.003)
 Source Host           : nj-cynosdbmysql-grp-c7cie8tb.sql.tencentcdb.com:28903
 Source Schema         : n_chigua

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30-cynos-3.1.16.003)
 File Encoding         : 65001

 Date: 24/01/2026 10:41:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for n_activity
-- ----------------------------
DROP TABLE IF EXISTS `n_activity`;
CREATE TABLE `n_activity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动名称',
  `n_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动编码',
  `n_note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动简介',
  `n_reward_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动奖励：1：积分，2：余额',
  `n_reward_config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '活动奖励：数量',
  `n_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动页面',
  `n_buttext` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '按钮文字',
  `n_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动图标',
  `n_index` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '权重',
  `n_off` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否开关，1：开，2：管',
  `n_miniProgram_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '小程序路径',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_activity
-- ----------------------------
INSERT INTO `n_activity` VALUES (1, '每日签到', 'checkIn', '每日签到可获取海量积分', '1', '[{\"min\":\"1\",\"max\":\"5\",\"price\":\"5\",\"float\":\"0\"}]', '/user/activity/sign', '立即签到', 'https://imgsbad.semoun.com/uploads/2025/12/20/69463aea6472a.png', '0', '1', '/pages/checkin/checkin');

-- ----------------------------
-- Table structure for n_activity_checkin_log
-- ----------------------------
DROP TABLE IF EXISTS `n_activity_checkin_log`;
CREATE TABLE `n_activity_checkin_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_time` date NULL DEFAULT NULL COMMENT '时间',
  `n_uid` int NULL DEFAULT NULL COMMENT '用户ID',
  `n_reward_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '奖励状态：1：积分，2：余额',
  `n_reward_number` decimal(10, 2) NULL DEFAULT NULL COMMENT '奖励数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_activity_checkin_log
-- ----------------------------
INSERT INTO `n_activity_checkin_log` VALUES (1, '2025-11-14', 2, NULL, NULL);
INSERT INTO `n_activity_checkin_log` VALUES (5, '2025-12-10', 3, '1', 29.00);
INSERT INTO `n_activity_checkin_log` VALUES (9, '2025-12-13', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (10, '2025-12-17', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (11, '2025-12-18', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (13, '2025-12-19', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (14, '2025-12-16', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (15, '2025-12-20', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (16, '2025-12-22', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (17, '2025-12-27', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (18, '2025-12-28', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (19, '2025-12-30', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (20, '2026-01-08', 3, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (21, '2026-01-17', 9, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (22, '2026-01-17', 11, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (23, '2026-01-17', 12, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (24, '2026-01-17', 14, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (25, '2026-01-17', 15, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (26, '2026-01-17', 17, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (27, '2026-01-18', 18, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (28, '2026-01-19', 21, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (29, '2026-01-20', 22, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (30, '2026-01-20', 23, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (31, '2026-01-20', 24, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (32, '2026-01-20', 24, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (33, '2026-01-20', 24, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (34, '2026-01-20', 25, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (35, '2026-01-21', 27, '1', 5.00);
INSERT INTO `n_activity_checkin_log` VALUES (36, '2026-01-21', 28, '1', 5.00);

-- ----------------------------
-- Table structure for n_activity_useracquisition_log
-- ----------------------------
DROP TABLE IF EXISTS `n_activity_useracquisition_log`;
CREATE TABLE `n_activity_useracquisition_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_time` datetime NULL DEFAULT NULL COMMENT '时间',
  `n_uid` int NULL DEFAULT NULL COMMENT '用户ID',
  `n_superior` int NULL DEFAULT NULL COMMENT '上机用户',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_activity_useracquisition_log
-- ----------------------------
INSERT INTO `n_activity_useracquisition_log` VALUES (1, '2025-11-14 09:22:39', 1, 2);

-- ----------------------------
-- Table structure for n_admins
-- ----------------------------
DROP TABLE IF EXISTS `n_admins`;
CREATE TABLE `n_admins`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '登录账号',
  `n_password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '登录密码',
  `n_permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '权限管理',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_admins
-- ----------------------------
INSERT INTO `n_admins` VALUES (1, 'admin', 'pbkdf2$10$1c57b4b22437d8ed165c903667759a2c$71b86c3791dc05362c4458e4c337b56499f0165c22b5e5642bcbabdfb223f4d468d59e3f6eda11a836fc65b5eb01d9dd1d9319a193950ec5d9b48b057b46bc60', NULL);

-- ----------------------------
-- Table structure for n_apikeys
-- ----------------------------
DROP TABLE IF EXISTS `n_apikeys`;
CREATE TABLE `n_apikeys`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '秘钥',
  `n_uid` int NULL DEFAULT NULL COMMENT '所属用户',
  `n_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:正常，2：关闭',
  `n_white` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'ip白名单',
  `n_black` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'ip黑名单',
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '秘钥名称',
  `n_ipstatus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否仅白名单可请求，1：是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_apikeys
-- ----------------------------
INSERT INTO `n_apikeys` VALUES (1, 'IS203JSBW21', 3, '2025-12-29 14:13:06', '1', 'null', 'null', '注册自动创建', '0');
INSERT INTO `n_apikeys` VALUES (2, '1767056834115QF', 3, '2025-12-30 09:07:14', '1', '123', '123', '123', '0');

-- ----------------------------
-- Table structure for n_apilog
-- ----------------------------
DROP TABLE IF EXISTS `n_apilog`;
CREATE TABLE `n_apilog`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_uid` int NULL DEFAULT NULL COMMENT '所属用户',
  `n_time` datetime NULL DEFAULT NULL COMMENT '请求时间',
  `n_aid` int NULL DEFAULT NULL COMMENT 'APIID',
  `n_kid` int NULL DEFAULT NULL COMMENT '秘钥ID',
  `n_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '消费单价',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1：积分，2：余额',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_apilog
-- ----------------------------


-- ----------------------------
-- Table structure for n_class
-- ----------------------------
DROP TABLE IF EXISTS `n_class`;
CREATE TABLE `n_class`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `n_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标',
  `n_threads` double NULL DEFAULT NULL COMMENT '帖子数量',
  `n_hotnum` double NULL DEFAULT NULL COMMENT '热度',
  `n_back` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '背景图片',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '1:分类，2：话题',
  `n_sort` double NULL DEFAULT NULL COMMENT '权重',
  `n_note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '简介',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_class
-- ----------------------------
INSERT INTO `n_class` VALUES (1, '官方通告', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_1e8ef739752a26_1_circle.png', 12, 2860, NULL, '1', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (2, '站长交流', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_178273f3cf6f57_1_circle.jpg', 243, 48988, NULL, '1', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (3, '无脑灌水', 'https://www.qkua.com/wp-content/uploads/thumb/2023/12/fill_w180_h180_g0_mark_d9f5ddab805ca3e48084b1435862b58e-scaled-1.jpg', 12, 160, 'null', '1', 2, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (4, '啥也不是', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_1a7d76203f85a2_1_circle.jpg', 324, 4352, NULL, '1', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (5, '或许如此', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_157803a5d647ef_1_circle.jpg', 235, 455232, NULL, '1', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (7, '站长交流', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_178273f3cf6f57_1_circle.jpg', 243, 48990, NULL, '2', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (8, '无脑灌水', 'https://www.qkua.com/wp-content/uploads/thumb/2023/12/fill_w180_h180_g0_mark_d9f5ddab805ca3e48084b1435862b58e-scaled-1.jpg', 12, 128, NULL, '2', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (9, '啥也不是', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_1a7d76203f85a2_1_circle.jpg', 324, 4354, NULL, '2', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (10, '或许如此', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_157803a5d647ef_1_circle.jpg', 235, 455232, NULL, '2', NULL, '不知道是干的的一个分类板块');

-- ----------------------------
-- Table structure for n_comment
-- ----------------------------
DROP TABLE IF EXISTS `n_comment`;
CREATE TABLE `n_comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '内容',
  `n_tid` int NULL DEFAULT NULL COMMENT '帖子id',
  `n_uid` int NULL DEFAULT NULL COMMENT '用户id',
  `n_cid` int NULL DEFAULT NULL COMMENT '上机id',
  `n_time` datetime NULL DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_comment
-- ----------------------------
INSERT INTO `n_comment` VALUES (21, '是不是忘了放链接了', 41, 3, 0, '2026-01-18 19:26:56');
INSERT INTO `n_comment` VALUES (22, '发帖的简介有点多余。去掉，保留正文即可。', 42, 18, 0, '2026-01-18 20:22:38');
INSERT INTO `n_comment` VALUES (23, '应该加个楼层数', 42, 18, 0, '2026-01-18 20:23:26');
INSERT INTO `n_comment` VALUES (24, '好的 我记住了', 42, 3, 0, '2026-01-18 20:25:04');
INSERT INTO `n_comment` VALUES (25, '多多', 37, 3, 0, '2026-01-19 00:07:16');
INSERT INTO `n_comment` VALUES (26, '如有其他问题，可以这里反馈，我会进行解答', 49, 3, 0, '2026-01-23 17:12:06');

-- ----------------------------
-- Table structure for n_configuration
-- ----------------------------
DROP TABLE IF EXISTS `n_configuration`;
CREATE TABLE `n_configuration`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_web_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '站点名称',
  `n_web_keys` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '站点关键词',
  `n_web_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '站点介绍',
  `n_web_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '站点ICON',
  `n_web_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '站点LOGO',
  `n_upload_image_size` double NULL DEFAULT NULL COMMENT '图片最大大小（MB）',
  `n_upload_file_size` double NULL DEFAULT NULL COMMENT '附件最大大小（MB）',
  `n_upload_image_suffix` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '图片允许后缀',
  `n_upload_file_suffix` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文件允许后缀',
  `n_web_copyright` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '版权',
  `n_email_host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮件HOST',
  `n_email_port` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮件端口',
  `n_email_secure` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否加密模式：true,false',
  `n_email_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮件地址',
  `n_email_pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮件密码',
  `n_email_from` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '发件人信息',
  `n_contact_qqnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '官方联系QQ',
  `n_contact_wxnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '官方联系微信',
  `n_contact_iponenumebr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '官方联系电话',
  `n_contact_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '官方联系邮件',
  `n_captcha_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否开启验证码，0：关闭，1：邮箱',
  `n_wechat_miniProgram_appid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信小程序APPID',
  `n_wechat_miniProgram_secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信小程序SECRET',
  `n_wallet_withdraw_off` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否开启提现。1：开启',
  `n_wallet_topup_off` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否开启充值。1：开启',
  `n_allow_register` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否允许注册：1：开启',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_configuration
-- ----------------------------
INSERT INTO `n_configuration` VALUES (1, 'NacrBBS开源论坛', 'NacrBBS开源论坛', 'NacrBBS开源论坛', 'https://imgsbad.semoun.com/uploads/2026/01/17/696af1be0ec28.png', 'https://imgsbad.semoun.com/uploads/2026/01/17/696af1be0ec28.png', 5, 2, 'png,jpg,jepg,webp', 'zip,mp4,.php,.html', 'NacrBBS开源论坛ⓒ NacrBBS开源论坛 Copyright 2023-2029', 'smtp.qiye.aliyun.com', '465', 'true', 'code@snpan.com', 'snpan520++', '小豆子', 'null', 'null', 'null', 'c_contact_email', '0', 'wx3fd61e35e854b50c', '1e5ec4abfb33193b1a6b4ac10479f55c', '1', '1', '1');

-- ----------------------------
-- Table structure for n_email_template
-- ----------------------------
DROP TABLE IF EXISTS `n_email_template`;
CREATE TABLE `n_email_template`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '模板',
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `n_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `n_remarks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '模板备注',
  `n_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '模板编码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_email_template
-- ----------------------------
INSERT INTO `n_email_template` VALUES (1, '<!DOCTYPE html>\r\n<html lang=\"zh-CN\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <title>{{title}}</title>\r\n    <style type=\"text/css\">\r\n        /* 重置样式 */\r\n        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\r\n        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\r\n        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }\r\n        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }\r\n    </style>\r\n</head>\r\n<body style=\"margin: 0 !important; padding: 0 !important; background-color: #f4f7fa; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;\">\r\n    <!-- 主容器 -->\r\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"background-color: #f4f7fa; padding: 20px 0;\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 20px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" style=\"max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;\">\r\n                    \r\n                    <!-- 头部区域 -->\r\n                    <tr>\r\n                        <td style=\"background: linear-gradient(135deg, #96a9ff 0%, #41cbf5 100%); padding: 40px 30px; text-align: center;\">\r\n                            <!-- 标题 -->\r\n                            <h1 style=\"color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);\">\r\n                                {{main_title}}\r\n                            </h1>\r\n                        </td>\r\n                    </tr>\r\n\r\n                    <!-- 内容区域 -->\r\n                    <tr>\r\n                        <td style=\"padding: 40px 30px; background-color: #ffffff;\">\r\n                            \r\n                            <!-- 欢迎信息 -->\r\n                            <div style=\"margin-bottom: 30px;\">\r\n                                <p style=\"color: #2c3e50; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;\">\r\n                                    尊敬的 <span style=\"color: #667eea; font-weight: 600;\">{{user_name}}</span>，\r\n                                </p>\r\n                                <p style=\"color: #5a6c7d; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;\">\r\n                                    您的验证码为：<span style=\"color: #667eea; font-weight: 600;\">{{code}}</span>，请在5分钟内使用！\r\n                                </p>\r\n                            </div>\r\n\r\n                            <!-- 安全提醒 -->\r\n                            <div style=\"background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;\">\r\n                                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                    <tr>\r\n                                        <td width=\"30\" valign=\"top\">\r\n                                            <span style=\"font-size: 20px;\">🔒</span>\r\n                                        </td>\r\n                                        <td>\r\n                                            <h4 style=\"color: #495057; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;\">\r\n                                                安全提醒\r\n                                            </h4>\r\n                                            <ul style=\"color: #6c757d; font-size: 13px; line-height: 1.5; margin: 0; padding-left: 20px;\">\r\n                                                <li style=\"margin-bottom: 5px;\">请勿将此邮件或相关链接分享给他人</li>\r\n                                                <li style=\"margin-bottom: 5px;\">我们绝不会通过邮件要求您提供密码或敏感信息</li>\r\n                                                <li>如有疑问，请及时联系我们的客服团队</li>\r\n                                            </ul>\r\n                                        </td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n\r\n                        </td>\r\n                    </tr>\r\n\r\n\r\n                    <!-- 底部区域 -->\r\n                    <tr>\r\n                        <td style=\"background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;border: none;\">\r\n                            <!-- 版权信息 -->\r\n                            <div style=\"border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px;\">\r\n                                <p style=\"color: rgba(255,255,255,0.7); font-size: 11px; margin: 0 0 10px 0;\">\r\n                                   {{current_year}}\r\n                                </p>\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n    <!-- 底部提示 -->\r\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 20px;\">\r\n                <p style=\"color: #8898aa; font-size: 12px; margin: 0; text-align: center;\">\r\n                    此邮件由系统自动发送，请勿回复。如有疑问，请联系 <a href=\"mailto:{{support_email}}\" style=\"color: #667eea; text-decoration: underline;\">{{support_email}}</a>\r\n                </p>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n</body>\r\n</html>', '邮件验证码', '2025-12-08 16:26:18', NULL, 'verifyCode');
INSERT INTO `n_email_template` VALUES (2, '<!DOCTYPE html>\r\n<html lang=\"zh-CN\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <title>{{title}}</title>\r\n    <style type=\"text/css\">\r\n        /* 重置样式 */\r\n        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\r\n        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\r\n        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }\r\n        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }\r\n    </style>\r\n</head>\r\n<body style=\"margin: 0 !important; padding: 0 !important; background-color: #f4f7fa; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;\">\r\n    <!-- 主容器 -->\r\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"background-color: #f4f7fa; padding: 20px 0;\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 20px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" style=\"max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;\">\r\n                    \r\n                    <!-- 头部区域 -->\r\n                    <tr>\r\n                        <td style=\"background: linear-gradient(135deg, #96a9ff 0%, #41cbf5 100%); padding: 40px 30px; text-align: center;\">\r\n                            <!-- 标题 -->\r\n                            <h1 style=\"color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);\">\r\n                                {{main_title}}\r\n                            </h1>\r\n                        </td>\r\n                    </tr>\r\n\r\n                    <!-- 内容区域 -->\r\n                    <tr>\r\n                        <td style=\"padding: 40px 30px; background-color: #ffffff;\">\r\n                            \r\n                            <!-- 欢迎信息 -->\r\n                            <div style=\"margin-bottom: 30px;\">\r\n                                <p style=\"color: #2c3e50; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;\">\r\n                                    尊敬的 <span style=\"color: #667eea; font-weight: 600;\">{{user_name}}</span>，\r\n                                </p>\r\n                                <p style=\"color: #5a6c7d; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;\">\r\n                                    当前邮件发信测试正常！\r\n                                </p>\r\n                            </div>\r\n\r\n                            <!-- 安全提醒 -->\r\n                            <div style=\"background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;\">\r\n                                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                    <tr>\r\n                                        <td width=\"30\" valign=\"top\">\r\n                                            <span style=\"font-size: 20px;\">🔒</span>\r\n                                        </td>\r\n                                        <td>\r\n                                            <h4 style=\"color: #495057; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;\">\r\n                                                安全提醒\r\n                                            </h4>\r\n                                            <ul style=\"color: #6c757d; font-size: 13px; line-height: 1.5; margin: 0; padding-left: 20px;\">\r\n                                                <li style=\"margin-bottom: 5px;\">请勿将此邮件或相关链接分享给他人</li>\r\n                                                <li style=\"margin-bottom: 5px;\">我们绝不会通过邮件要求您提供密码或敏感信息</li>\r\n                                                <li>如有疑问，请及时联系我们的客服团队</li>\r\n                                            </ul>\r\n                                        </td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n\r\n                        </td>\r\n                    </tr>\r\n\r\n\r\n                    <!-- 底部区域 -->\r\n                    <tr>\r\n                        <td style=\"background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;border: none;\">\r\n                            <!-- 版权信息 -->\r\n                            <div style=\"border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px;\">\r\n                                <p style=\"color: rgba(255,255,255,0.7); font-size: 11px; margin: 0 0 10px 0;\">\r\n                                   {{current_year}}\r\n                                </p>\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n    <!-- 底部提示 -->\r\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 20px;\">\r\n                <p style=\"color: #8898aa; font-size: 12px; margin: 0; text-align: center;\">\r\n                    此邮件由系统自动发送，请勿回复。如有疑问，请联系 <a href=\"mailto:{{support_email}}\" style=\"color: #667eea; text-decoration: underline;\">{{support_email}}</a>\r\n                </p>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n</body>\r\n</html>', '测试发信模板', '2025-12-09 11:31:42', 'null', 'TestEmail');

-- ----------------------------
-- Table structure for n_medal
-- ----------------------------
DROP TABLE IF EXISTS `n_medal`;
CREATE TABLE `n_medal`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_src` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图标',
  `n_threshold` double NULL DEFAULT NULL COMMENT '阈值',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1. 发帖数，2：获赞数，3：评论数，4：粉丝数',
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '勋章名称',
  `n_sort` double NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_medal
-- ----------------------------
INSERT INTO `n_medal` VALUES (1, 'https://imgsbad.semoun.com/uploads/2026/01/24/69742ca8c3f21.png', 1, '1', '新人上路', 1);
INSERT INTO `n_medal` VALUES (2, 'https://imgsbad.semoun.com/uploads/2026/01/24/69742c51685d0.png', 10, '4', '新秀之星', 1);

-- ----------------------------
-- Table structure for n_medal_log
-- ----------------------------
DROP TABLE IF EXISTS `n_medal_log`;
CREATE TABLE `n_medal_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_uid` int NULL DEFAULT NULL COMMENT '用户ID',
  `n_mid` int NULL DEFAULT NULL COMMENT '所属勋章',
  `n_time` datetime NULL DEFAULT NULL COMMENT '获得时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_medal_log
-- ----------------------------
INSERT INTO `n_medal_log` VALUES (1, 3, 1, '2026-01-24 09:52:17');
INSERT INTO `n_medal_log` VALUES (2, 27, 1, '2026-01-24 10:01:21');
INSERT INTO `n_medal_log` VALUES (3, 3, 2, '2026-01-24 10:20:50');

-- ----------------------------
-- Table structure for n_msg
-- ----------------------------
DROP TABLE IF EXISTS `n_msg`;
CREATE TABLE `n_msg`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_time` datetime NULL DEFAULT NULL COMMENT '时间',
  `n_html` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '内容',
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `n_uid` int NULL DEFAULT NULL COMMENT '用户ID',
  `n_tid` int NULL DEFAULT NULL COMMENT '发送用户ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_msg
-- ----------------------------
INSERT INTO `n_msg` VALUES (1, '2026-01-24 09:52:17', '恭喜您获得勋章「新人上路」', '恭喜您获得勋章', 3, 0);
INSERT INTO `n_msg` VALUES (2, '2026-01-24 10:01:21', '恭喜您获得勋章「新人上路」', '恭喜您获得勋章', 27, 0);
INSERT INTO `n_msg` VALUES (3, '2026-01-24 10:20:50', '恭喜您获得勋章「新秀之星」', '恭喜您获得勋章', 3, 0);

-- ----------------------------
-- Table structure for n_navigation
-- ----------------------------
DROP TABLE IF EXISTS `n_navigation`;
CREATE TABLE `n_navigation`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '导航名称',
  `n_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '导航图标',
  `n_fid` int NULL DEFAULT NULL COMMENT '上级id ,0为顶级',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1：内部页面。2：外部页面',
  `n_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '路径地址',
  `n_index` decimal(10, 0) NULL DEFAULT NULL COMMENT '权重，越小越前',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_navigation
-- ----------------------------
INSERT INTO `n_navigation` VALUES (1, '仪表', 'null', 0, '1', '/', 0);
INSERT INTO `n_navigation` VALUES (2, '用户', 'null', 0, '1', '/user', 1);
INSERT INTO `n_navigation` VALUES (3, '用户列表', 'null', 2, '1', '/user', 0);
INSERT INTO `n_navigation` VALUES (4, '用户组管理', 'null', 2, '1', '/user/group', 1);
INSERT INTO `n_navigation` VALUES (5, '维护', 'null', 0, '1', '/maintenance', 5);
INSERT INTO `n_navigation` VALUES (6, '导航类目', 'null', 5, '1', '/maintenance', 0);
INSERT INTO `n_navigation` VALUES (7, '站点', 'null', 0, '1', '/webs', 4);
INSERT INTO `n_navigation` VALUES (8, '基础配置', 'null', 7, '1', '/webs', 0);
INSERT INTO `n_navigation` VALUES (10, '邮件配置', 'null', 7, '1', '/webs/email/config', 1);
INSERT INTO `n_navigation` VALUES (11, '文章管理', 'null', 7, '1', '/webs/notices', 3);
INSERT INTO `n_navigation` VALUES (12, '轮播图管理', 'null', 7, '1', '/webs/swipers', 2);
INSERT INTO `n_navigation` VALUES (13, '支付', 'null', 0, '1', '/pay', 3);
INSERT INTO `n_navigation` VALUES (14, '支付订单', NULL, 13, '1', '/pay', NULL);
INSERT INTO `n_navigation` VALUES (15, '支付方式', NULL, 13, '1', '/pay/paymethod', NULL);
INSERT INTO `n_navigation` VALUES (16, '支付配置', 'null', 13, '1', '/pay/config', 0);
INSERT INTO `n_navigation` VALUES (17, '活动管理', 'null', 2, '1', '/user/activity', 2);
INSERT INTO `n_navigation` VALUES (18, '微信小程序配置', 'null', 5, '1', '/maintenance/wechatMiniProgram', 1);
INSERT INTO `n_navigation` VALUES (19, '用户配置', 'null', 2, '1', '/user/config', 4);
INSERT INTO `n_navigation` VALUES (20, '帖子', 'null', 0, '1', '/threads', 2);
INSERT INTO `n_navigation` VALUES (21, '帖子列表', 'null', 20, '1', '/threads', 0);
INSERT INTO `n_navigation` VALUES (22, '帖子分类', 'null', 20, '1', '/threads/CategoryList', 1);
INSERT INTO `n_navigation` VALUES (24, '帖子回复', 'null', 20, '1', '/threads/Comments', 2);
INSERT INTO `n_navigation` VALUES (25, '举报记录', 'null', 20, '1', '/threads/Report', 3);
INSERT INTO `n_navigation` VALUES (26, '勋章配置', 'null', 2, '1', '/user/Medal', 3);

-- ----------------------------
-- Table structure for n_notices
-- ----------------------------
DROP TABLE IF EXISTS `n_notices`;
CREATE TABLE `n_notices`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `n_keys` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '关键词',
  `n_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '简介',
  `n_html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '内容',
  `n_time` datetime NULL DEFAULT NULL COMMENT '发布时间',
  `n_read` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '阅读次数',
  `n_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图片资源',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_notices
-- ----------------------------
INSERT INTO `n_notices` VALUES (1, '如何设置黑白名单', '123', '创建秘钥，并独立设置黑白名单与安全设置', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Document</title>\r\n    <style>\r\n      \r\n    </style>\r\n</head>\r\n\r\n<body>\r\n    sad\r\n\r\n    <script>\r\n        let key = \'<KEY>\'\r\n    </script>\r\n\r\n    <style>\r\n\r\n\r\n    tr {\r\n        width: 60mm;\r\n        margin: 0 auto;\r\n    }\r\n\r\n    td {\r\n        border: 1px solid #000;\r\n        margin: 0;\r\n        padding: 2px 5px 2px 5px;\r\n        width: 25%;\r\n        font-size: 10px;\r\n    }\r\n\r\n    .qrCode_base {\r\n        width: 50px;\r\n        height: 50px;\r\n        display: block;\r\n        margin: 0 auto;\r\n    }\r\n\r\n    .barcode_base {\r\n        height: 30px;\r\n        display: block;\r\n        margin: 0 auto;\r\n    }\r\n</style>\r\n\r\n<body>\r\n    <table>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">卷号</td>\r\n            <td colspan=\"4\">tag_roll_uid</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">品名</td>\r\n            <td colspan=\"4\">tag_breed</td>\r\n        </tr>\r\n         <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">验布</td>\r\n            <td colspan=\"1\">tag_machine_uid</td>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">织机</td>\r\n            <td colspan=\"1\">tag_machine</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">时间</td>\r\n            <td colspan=\"4\">tag_time</td>\r\n        </tr>\r\n        <tr>\r\n            <td rowspan=\"3\">tag_barcode</td>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">长度</td>\r\n            <td colspan=\"2\">tag_meters_now</td>\r\n        </tr>\r\n       <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">等级</td>\r\n            <td colspan=\"2\">tag_grade</td>\r\n        </tr>\r\n       <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">条码</td>\r\n            <td colspan=\"2\">issd</td>\r\n        </tr>\r\n    </table>\r\n</body>\r\n\r\n</body>\r\n\r\n</html>', '2025-11-17 13:56:08', '1231', 'https://imgsbad.semoun.com/uploads/2024/11/27/674674b96168e.png');
INSERT INTO `n_notices` VALUES (2, '如何设置黑白名单', '123', '创建秘钥，并独立设置黑白名单与安全设置', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Document</title>\r\n    <style>\r\n      \r\n    </style>\r\n</head>\r\n\r\n<body>\r\n    sad\r\n\r\n    <script>\r\n        let key = \'<KEY>\'\r\n    </script>\r\n\r\n    <style>\r\n\r\n\r\n    tr {\r\n        width: 60mm;\r\n        margin: 0 auto;\r\n    }\r\n\r\n    td {\r\n        border: 1px solid #000;\r\n        margin: 0;\r\n        padding: 2px 5px 2px 5px;\r\n        width: 25%;\r\n        font-size: 10px;\r\n    }\r\n\r\n    .qrCode_base {\r\n        width: 50px;\r\n        height: 50px;\r\n        display: block;\r\n        margin: 0 auto;\r\n    }\r\n\r\n    .barcode_base {\r\n        height: 30px;\r\n        display: block;\r\n        margin: 0 auto;\r\n    }\r\n</style>\r\n\r\n<body>\r\n    <table>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">卷号</td>\r\n            <td colspan=\"4\">tag_roll_uid</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">品名</td>\r\n            <td colspan=\"4\">tag_breed</td>\r\n        </tr>\r\n         <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">验布</td>\r\n            <td colspan=\"1\">tag_machine_uid</td>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">织机</td>\r\n            <td colspan=\"1\">tag_machine</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">时间</td>\r\n            <td colspan=\"4\">tag_time</td>\r\n        </tr>\r\n        <tr>\r\n            <td rowspan=\"3\">tag_barcode</td>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">长度</td>\r\n            <td colspan=\"2\">tag_meters_now</td>\r\n        </tr>\r\n       <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">等级</td>\r\n            <td colspan=\"2\">tag_grade</td>\r\n        </tr>\r\n       <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">条码</td>\r\n            <td colspan=\"2\">issd</td>\r\n        </tr>\r\n    </table>\r\n</body>\r\n\r\n</body>\r\n\r\n</html>', '2025-11-17 13:56:08', '1231', 'https://imgsbad.semoun.com/uploads/2024/11/27/674674b96168e.png');
INSERT INTO `n_notices` VALUES (3, '如何设置黑白名单', '123', '创建秘钥，并独立设置黑白名单与安全设置', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Document</title>\r\n    <style>\r\n      \r\n    </style>\r\n</head>\r\n\r\n<body>\r\n    sad\r\n\r\n    <script>\r\n        let key = \'<KEY>\'\r\n    </script>\r\n\r\n    <style>\r\n\r\n\r\n    tr {\r\n        width: 60mm;\r\n        margin: 0 auto;\r\n    }\r\n\r\n    td {\r\n        border: 1px solid #000;\r\n        margin: 0;\r\n        padding: 2px 5px 2px 5px;\r\n        width: 25%;\r\n        font-size: 10px;\r\n    }\r\n\r\n    .qrCode_base {\r\n        width: 50px;\r\n        height: 50px;\r\n        display: block;\r\n        margin: 0 auto;\r\n    }\r\n\r\n    .barcode_base {\r\n        height: 30px;\r\n        display: block;\r\n        margin: 0 auto;\r\n    }\r\n</style>\r\n\r\n<body>\r\n    <table>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">卷号</td>\r\n            <td colspan=\"4\">tag_roll_uid</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">品名</td>\r\n            <td colspan=\"4\">tag_breed</td>\r\n        </tr>\r\n         <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">验布</td>\r\n            <td colspan=\"1\">tag_machine_uid</td>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">织机</td>\r\n            <td colspan=\"1\">tag_machine</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">时间</td>\r\n            <td colspan=\"4\">tag_time</td>\r\n        </tr>\r\n        <tr>\r\n            <td rowspan=\"3\">tag_barcode</td>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">长度</td>\r\n            <td colspan=\"2\">tag_meters_now</td>\r\n        </tr>\r\n       <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">等级</td>\r\n            <td colspan=\"2\">tag_grade</td>\r\n        </tr>\r\n       <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">条码</td>\r\n            <td colspan=\"2\">issd</td>\r\n        </tr>\r\n    </table>\r\n</body>\r\n\r\n</body>\r\n\r\n</html>', '2025-11-17 13:56:08', '1231', 'https://imgsbad.semoun.com/uploads/2024/11/27/674674b96168e.png');
INSERT INTO `n_notices` VALUES (4, '如何设置黑白名单', '123', '创建秘钥，并独立设置黑白名单与安全设置', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Document</title>\r\n    <style>\r\n      \r\n    </style>\r\n</head>\r\n\r\n<body>\r\n    sad\r\n\r\n    <script>\r\n        let key = \'<KEY>\'\r\n    </script>\r\n\r\n    <style>\r\n\r\n\r\n    tr {\r\n        width: 60mm;\r\n        margin: 0 auto;\r\n    }\r\n\r\n    td {\r\n        border: 1px solid #000;\r\n        margin: 0;\r\n        padding: 2px 5px 2px 5px;\r\n        width: 25%;\r\n        font-size: 10px;\r\n    }\r\n\r\n    .qrCode_base {\r\n        width: 50px;\r\n        height: 50px;\r\n        display: block;\r\n        margin: 0 auto;\r\n    }\r\n\r\n    .barcode_base {\r\n        height: 30px;\r\n        display: block;\r\n        margin: 0 auto;\r\n    }\r\n</style>\r\n\r\n<body>\r\n    <table>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">卷号</td>\r\n            <td colspan=\"4\">tag_roll_uid</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">品名</td>\r\n            <td colspan=\"4\">tag_breed</td>\r\n        </tr>\r\n         <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">验布</td>\r\n            <td colspan=\"1\">tag_machine_uid</td>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">织机</td>\r\n            <td colspan=\"1\">tag_machine</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10mm;\">时间</td>\r\n            <td colspan=\"4\">tag_time</td>\r\n        </tr>\r\n        <tr>\r\n            <td rowspan=\"3\">tag_barcode</td>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">长度</td>\r\n            <td colspan=\"2\">tag_meters_now</td>\r\n        </tr>\r\n       <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">等级</td>\r\n            <td colspan=\"2\">tag_grade</td>\r\n        </tr>\r\n       <tr>\r\n            <td style=\"width: 10mm;\" colspan=\"1\">条码</td>\r\n            <td colspan=\"2\">issd</td>\r\n        </tr>\r\n    </table>\r\n</body>\r\n\r\n</body>\r\n\r\n</html>', '2025-11-17 13:56:08', '1231', 'https://imgsbad.semoun.com/uploads/2024/11/27/674674b96168e.png');

-- ----------------------------
-- Table structure for n_payconfig
-- ----------------------------
DROP TABLE IF EXISTS `n_payconfig`;
CREATE TABLE `n_payconfig`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '编码（文件夹名称）',
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `n_config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '配置文件（json）',
  `n_time` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `n_off` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否启用，1：是，2：否',
  `n_qq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:启用qq',
  `n_wx` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:启动微信',
  `n_ali` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1：启用支付宝',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_payconfig
-- ----------------------------
INSERT INTO `n_payconfig` VALUES (1, 'Alipay', '支付宝官方支付', '[{\"name\":\"AppId\",\"value\":\"\",\"key\":\"appId\"},{\"name\":\"应用私钥\",\"value\":\"///+///s/OjAgMBAAECggEACj3im9CrFSN+XTp/czHF916s7Mi15xD+jL94tuGrqFmM/+JKIZiLN++/gl4GbjWCoHEkCDkRNjZ6/+DCfRLs+AJuyYpZOrkTJ/g0wpehimB2ZoClRyqZSQp0AQKBgQDQTffI6mNjxYV+itWvWRQqai2isTnvIsgMDsw3MPG2L0M1NWPbD4x8k+xro8OVHicVY1rhfBkjlKGxbfCsJLIoouPSIhnMxPGc/LUBP7Q7k2eott5eIt1MkIDQOW1Vm374uZyUlkADM1JW0YA0Pe1JjupD+yW4zI++5PIq8kTyn1g4I+QfKsE3ShLtAdLvARn0QKBgQCDLHYbKa7JB3uXQmpp75iJVS/+qzigF8ViZedNRlQfwOHHroCqjQKBgQCFdYBoUgxXwpG+ABURReIWytcZIdq6M62oPb+CFByaXczCuQqj+cggBbAip0UYivGau///czJhvtR//+xYlCNuVD0WDmknrSOkg/FjNruEhPlGBwzpRiKocFA5NNTT98CY3vntDseGxQT\",\"key\":\"privateKey\"},{\"name\":\"支付宝公钥\",\"value\":\"+VHACQ5FM7sMC7v3hb5+nXG3IstH4vAg3W3Ucvk5hG3iHsGowBAxhVYv01XycRTTpMl+XisE1OO7oMnPP1NpYv17Ymhop1HtQ2onIhVb5+tAg7SVzUDpS8JY5CQHUMNhNER/NihbkB9Q+mjtSru+3Y4rDpwtPA7McqcIbs/EW1kTrDS6MH1OVGSBI/7+rkARkUfFWuQ9K9Cyncjygf7t/CzHT/x+Uz71l73mBzCxeex3+xhPFkgf1tTwHSsk8dLwPVhK7qSK/5QwC+5XGLJ5UNp5XG9uhgFDE3EgTYPC9OmjfXQW2ESAjJQRN0OepuP9vD09hi/9fow+G0pG1FQIDAQAB\",\"key\":\"alipayPublicKey\"},{\"name\":\"回调地址\",\"key\":\"notify_url\",\"value\":\"https://api.bbs.nacr.cn/api/PayNotify\"},{\"key\":\"return_url\",\"name\":\"返回地址\",\"value\":\"http://192.168.10.157:3000/pay/config\"}]', '2025-12-09 15:17:42', '1', '0', '0', '1');
INSERT INTO `n_payconfig` VALUES (3, 'WeChatPay', '微信JSAPI支付', '[{\"name\":\"公众账号ID\",\"key\":\"appid\",\"value\":\"\"},{\"name\":\"商户ID\",\"key\":\"mchid\",\"value\":\"1670519997\"},{\"name\":\"证书序列号\",\"key\":\"serial_no\",\"value\":\"\"},{\"name\":\"证书私钥\",\"key\":\"privateKey\",\"value\":\"-----BEGIN PRIVATE KEY----- MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZrE+x8otLNHTl 6FkgHXqiUQ81vHc3984u48yd4xb/ j20Rcmyz62mYwg5h3363vQV63mAiCHFS2r+wsfzkLKvY25x7jx9Ho+  QmLuApkV4HENeDEWi14KuqjKV19ffh24+ p8aHb2wvU+e+DKCWnyJbDo7288XTpAF++CzH5bL/BYkbI +1qreYL27oSHOoX  JMk0DYNsD7yO2nRKhSXa6nt4a//U /nNpIzBU1P +gMby9/tpu2qkLJc/+BOV/ 6I3dqGECwVwC5emXDLs9sHTEAcCX5vcdYY5zaGYPsQKBgQDJjgvxSCSjNmFQRZJA oLVeMfoQ+aZFJZusuo/  e3ulUZFgFAdOKrlxYYzSoRlJxQKBgQDDLyLz/d17Wc/R+3Qto+ ++nhY60MbZ/diwgJ9DzKirb3mJrEvie4BE1WQPuqjqa8LjpAQLi jncRc+2PjwKg9kr1CdPmdjy6Hhmws+TzqZWt7w6H+X7V731E7WZCjFQPQlB7WB4e /Uvf7TkwPwKBgCEG8LgJ3U8NUybnL479hpq3z8VGU1OTVQ4ZyAsy1xYgWCYdJPKa jCRHrfl04jyGZRoJXP3gLdLyP4zoDbfyx/P3O3TixgIkgbNx32LimnIRBhjTfieB BYOLFOV7cdR36b5/mjUGR1TWbOKTNKtD8b/mPM8kmQnbAGYu2PeOxGkNAoGANGkt 25KprHu7YElDMxY2xK0tzL9g2IFXFla5Z2dC7njRXcmMjPFCFoTa2nMi+id25jTG eW/HwbTAafkE5exXL/kp730ASiDpY2iZ9GfKvKfMLuizzAStj87kE54Ni/NiYUOC W8g7gKuwMUYzvxR4RxpjYA2Qiu5oeC3P9/s9RgUCgYB59012SZ7+c/DC9oboKCYI uXzp/6MQHtM/e15IMtyCzO64rtsGhrkgaJMXqiaUCXqX2tr5SMRHPl4IAQYMd2tt c8DBFLncDz4g5vFpQmm0TxZ4V5skq5iVAExWtAFKo9zUDaeEqalwqqWL48ZL5E09 SuPtWvBRPR4nIawcVcUajg== -----END PRIVATE KEY-----\"},{\"key\":\"notify_url\",\"name\":\"回调地址\",\"value\":\"http://192.168.10.157:3000/api/PayNotify\"},{\"name\":\"回调秘钥\",\"value\":\"\",\"key\":\"callback_key\"}]', '2025-12-18 13:41:54', '1', '0', '0', '0');
INSERT INTO `n_payconfig` VALUES (4, 'Epay', '彩虹易支付', '[{\"name\":\"pid\",\"key\":\"pid\",\"value\":\"1000\"},{\"name\":\"key\",\"key\":\"key\",\"value\":\"\"},{\"name\":\"apiUrl\",\"key\":\"apiUrl\",\"value\":\"https://pay..pro/\"},{\"name\":\"notify_url\",\"key\":\"notify_url\",\"value\":\"http://192.168.10.157:9999/api/PayNotify\"}]', '2026-01-16 13:35:05', '0', 'null', '0', '0');

-- ----------------------------
-- Table structure for n_paymethod
-- ----------------------------
DROP TABLE IF EXISTS `n_paymethod`;
CREATE TABLE `n_paymethod`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'icon',
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `n_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '编码',
  `n_index` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权重',
  `n_off` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '1:开启，2：关闭',
  `n_payid` int NULL DEFAULT NULL COMMENT '支付ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_paymethod
-- ----------------------------
INSERT INTO `n_paymethod` VALUES (2, 'https://imgsbad.semoun.com/uploads/2025/10/11/68e9c65b96253.png', '微信支付', '2', '2', '0', 1);
INSERT INTO `n_paymethod` VALUES (3, 'https://imgsbad.semoun.com/uploads/2025/10/11/68e9c65b9ae44.png', '支付宝支付', '3', '3', '1', 1);
INSERT INTO `n_paymethod` VALUES (4, 'https://imgsbad.semoun.com/uploads/2025/10/11/68e9ccb154f0f.png', '余额支付', '4', '4', '1', 1);
INSERT INTO `n_paymethod` VALUES (5, 'https://imgsbad.semoun.com/uploads/2025/10/11/68e9ccb154f0f.png', '积分支付', '5', '5', '1', 1);

-- ----------------------------
-- Table structure for n_payorder
-- ----------------------------
DROP TABLE IF EXISTS `n_payorder`;
CREATE TABLE `n_payorder`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_no` varchar(244) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '订单号',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '支付状态，1：待支付，2：已支付，3：已过期',
  `n_amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '订单金额',
  `n_creatertime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '创建时间',
  `n_paytime` datetime NULL DEFAULT NULL COMMENT '支付时间',
  `n_paymethod` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '支付方式',
  `n_paydevice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '支付设备,1:pc.2:手机',
  `n_uid` int NULL DEFAULT NULL COMMENT '所属用户',
  `n_from` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '支付详情（json）',
  `n_paycode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '支付编码（文件夹名称）',
  `n_balance` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '2：不允许余额支付，3：积分支付',
  `n_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '回调地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 123 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_payorder
-- ----------------------------

-- ----------------------------
-- Table structure for n_payorder_item
-- ----------------------------
DROP TABLE IF EXISTS `n_payorder_item`;
CREATE TABLE `n_payorder_item`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_oid` int NULL DEFAULT NULL COMMENT '所属订单',
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '货物名称',
  `n_number` int NULL DEFAULT NULL COMMENT '货物数量',
  `n_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '货物单价',
  `n_sid` int NULL DEFAULT NULL COMMENT '获取ID',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1：余额充值。2：会员充值，3：商品购买',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 112 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_payorder_item
-- ----------------------------

-- ----------------------------
-- Table structure for n_report
-- ----------------------------
DROP TABLE IF EXISTS `n_report`;
CREATE TABLE `n_report`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_tid` int NULL DEFAULT NULL COMMENT '所属帖子',
  `n_uid` int NULL DEFAULT NULL COMMENT '所属用户',
  `n_html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '反馈内容',
  `n_time` datetime NULL DEFAULT NULL COMMENT '反馈时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_report
-- ----------------------------
INSERT INTO `n_report` VALUES (1, 10, 3, '我轻轻', '2026-01-17 09:28:29');

-- ----------------------------
-- Table structure for n_swipers
-- ----------------------------
DROP TABLE IF EXISTS `n_swipers`;
CREATE TABLE `n_swipers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `n_dosc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '介绍',
  `n_src` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '静态资源',
  `n_pos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '位置，1：首页',
  `n_sort` double NULL DEFAULT NULL COMMENT '排序权重',
  `n_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '跳转链接',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_swipers
-- ----------------------------
INSERT INTO `n_swipers` VALUES (1, '123', '123', 'http://127.0.0.1:8855/public/upload/img_1763445809789_ptcsxz.png', '123', 123, '123');

-- ----------------------------
-- Table structure for n_tclist
-- ----------------------------
DROP TABLE IF EXISTS `n_tclist`;
CREATE TABLE `n_tclist`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_cid` int NULL DEFAULT NULL COMMENT '分类id',
  `n_tid` int NULL DEFAULT NULL COMMENT '文章ID',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1：分类，2：话题',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 140 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_tclist
-- ----------------------------


-- ----------------------------
-- Table structure for n_threads
-- ----------------------------
DROP TABLE IF EXISTS `n_threads`;
CREATE TABLE `n_threads`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `n_uid` int NULL DEFAULT NULL COMMENT '所属用户',
  `n_time` datetime NULL DEFAULT NULL COMMENT '发布时间',
  `n_html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '帖子内容',
  `n_read` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '阅读次数',
  `n_starts` double NULL DEFAULT NULL COMMENT '点赞次数',
  `n_msgs` double NULL DEFAULT NULL COMMENT '回复次数',
  `n_profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '简介',
  `n_permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1：免费。2：积分。3：付费',
  `n_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `n_resources` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '图片列表',
  `n_haveimage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:有图，2：无图',
  `n_havevideo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:有视频，2：无视频',
  `n_msglastTime` datetime NULL DEFAULT NULL COMMENT '最后评论的时间',
  `n_top` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '置顶',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_threads
-- ----------------------------
INSERT INTO `n_threads` VALUES (18, '各位大佬 多多指教', 3, '2026-01-17 19:24:23', '<p>你自己就是大家</p>', '12', 0, 0, '记得第一次写第一行代码的惆怅到…', '1', 0.00, '[]', '2', '2', NULL, NULL);

-- ----------------------------
-- Table structure for n_threads_buy
-- ----------------------------
DROP TABLE IF EXISTS `n_threads_buy`;
CREATE TABLE `n_threads_buy`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_tid` int NULL DEFAULT NULL COMMENT '帖子ID',
  `n_uid` int NULL DEFAULT NULL COMMENT '用户ID',
  `n_time` datetime NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_threads_buy
-- ----------------------------
INSERT INTO `n_threads_buy` VALUES (28, 10, 3, '2026-01-17 16:25:26');

-- ----------------------------
-- Table structure for n_threads_like
-- ----------------------------
DROP TABLE IF EXISTS `n_threads_like`;
CREATE TABLE `n_threads_like`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_tid` int NULL DEFAULT NULL COMMENT '帖子ID',
  `n_uid` int NULL DEFAULT NULL COMMENT '用户ID',
  `n_time` datetime NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_threads_like
-- ----------------------------

-- ----------------------------
-- Table structure for n_user_bill
-- ----------------------------
DROP TABLE IF EXISTS `n_user_bill`;
CREATE TABLE `n_user_bill`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '去向',
  `n_amount` decimal(10, 2) NULL DEFAULT NULL COMMENT '金额',
  `n_uid` int NULL DEFAULT NULL COMMENT '所属用户',
  `n_time` datetime NULL DEFAULT NULL COMMENT '时间',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:收入，2：支出',
  `n_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:积分，2：余额',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 150 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_user_bill
-- ----------------------------

-- ----------------------------
-- Table structure for n_user_like
-- ----------------------------
DROP TABLE IF EXISTS `n_user_like`;
CREATE TABLE `n_user_like`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_tid` int NULL DEFAULT NULL COMMENT '帖子ID',
  `n_uid` int NULL DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_user_like
-- ----------------------------


-- ----------------------------
-- Table structure for n_usergroup
-- ----------------------------
DROP TABLE IF EXISTS `n_usergroup`;
CREATE TABLE `n_usergroup`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户组名称',
  `n_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户组图标',
  `n_back` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户组背景',
  `n_note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户组备注',
  `n_sort` double NULL DEFAULT NULL COMMENT '排序',
  `n_deft` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:默认会员组',
  `n_text_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字体颜色',
  `n_mini_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称侧边小图标',
  `n_info_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '信息侧边大图标',
  `n_back_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '背景图片',
  `n_withdrawal_fee` decimal(10, 2) NULL DEFAULT NULL COMMENT '提现手续费，（百分比）',
  `n_withdrawal_min` decimal(10, 2) NULL DEFAULT NULL COMMENT '最低提现金额',
  `n_withdrawal_max` decimal(10, 2) NULL DEFAULT NULL COMMENT '最高提现金额',
  `n_qps` decimal(10, 0) NULL DEFAULT NULL COMMENT '原基础上增加qps数量',
  `n_discount` decimal(10, 0) NULL DEFAULT NULL COMMENT '原价格基础上的折扣优惠',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_usergroup
-- ----------------------------
INSERT INTO `n_usergroup` VALUES (1, '普通会员V1', 'http://127.0.0.1:8855/public/upload/img_1763432643095_q9foiw.jpg', '用户组背景链接', '通用用户组，感谢您的选择', 1, '1', NULL, NULL, NULL, NULL, 3.00, 5.00, 50.00, 0, 0);
INSERT INTO `n_usergroup` VALUES (2, 'VIP', NULL, '#ff450c', 'VIP会员', NULL, NULL, '#fff', NULL, NULL, NULL, 2.00, 1.00, 50.00, 10, 20);
INSERT INTO `n_usergroup` VALUES (3, 'SVIP', 'http://127.0.0.1:8855/public/upload/img_1763432643095_q9foiw.jpg', '#2b1a0b', '超级SVIP会员', NULL, NULL, '#fff', NULL, 'https://imgsbad.semoun.com/uploads/2025/12/17/694212ae40e73.png', 'https://imgsbad.semoun.com/uploads/2025/12/18/694368e17d114.jpg', 1.00, 0.01, 50.00, 30, 40);

-- ----------------------------
-- Table structure for n_usergroup_price
-- ----------------------------
DROP TABLE IF EXISTS `n_usergroup_price`;
CREATE TABLE `n_usergroup_price`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_gid` int NULL DEFAULT NULL COMMENT '所属用户组',
  `n_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `n_strikethroughprice` decimal(10, 2) NULL DEFAULT NULL COMMENT '划线价',
  `n_give` double NULL DEFAULT NULL COMMENT '赠送积分',
  `n_day` double NULL DEFAULT NULL COMMENT '天数',
  `n_sort` decimal(10, 2) NULL DEFAULT NULL COMMENT '权重',
  `n_points` double NULL DEFAULT NULL COMMENT '积分费用（0为不支持积分购买）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_usergroup_price
-- ----------------------------
INSERT INTO `n_usergroup_price` VALUES (1, 1, 5.00, 10.00, 10, 30, 20.00, 0);
INSERT INTO `n_usergroup_price` VALUES (3, 2, 5.00, 44.00, 12, 12, 12.00, 213);
INSERT INTO `n_usergroup_price` VALUES (4, 2, 10.00, 44.00, 23, 24, 23.00, 554);
INSERT INTO `n_usergroup_price` VALUES (5, 2, 43.00, 324.00, 234, 234, 234.00, 234);
INSERT INTO `n_usergroup_price` VALUES (6, 3, 234.00, 234.00, 234, 234, 234.00, 234);
INSERT INTO `n_usergroup_price` VALUES (7, 3, 12.00, 12.00, 56, 78, 323.00, 34);
INSERT INTO `n_usergroup_price` VALUES (8, 3, 0.01, 12.00, 3, 33, 333.00, 23);

-- ----------------------------
-- Table structure for n_users
-- ----------------------------
DROP TABLE IF EXISTS `n_users`;
CREATE TABLE `n_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '昵称',
  `n_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像',
  `n_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户名',
  `n_password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '密码',
  `n_userback` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '背景',
  `n_registertime` datetime NULL DEFAULT NULL COMMENT '注册时间',
  `n_points` decimal(10, 2) NULL DEFAULT NULL COMMENT '积分',
  `n_signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '签名',
  `n_encoding` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户编码',
  `n_group_id` int NULL DEFAULT NULL COMMENT '会员组ID',
  `n_group_time` datetime NULL DEFAULT NULL COMMENT '会员组到期时间',
  `n_growth_value` decimal(10, 0) NULL DEFAULT NULL COMMENT '成长值',
  `n_gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '性别。，1：男，2：女',
  `n_ipone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '手机号',
  `n_qqnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'qq号码',
  `n_wxnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信号码',
  `n_balance` decimal(10, 2) NULL DEFAULT NULL COMMENT '余额',
  `n_MiniProgramOpenid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信小程序登录',
  `n_black` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:账户已被封禁',
  `n_administrator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1：管理员账户',
  PRIMARY KEY (`id`, `n_encoding`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_users
-- ----------------------------
INSERT INTO `n_users` VALUES (3, '小豆子', 'https://api.bbs.nacr.cn/public/upload/img_1768640751076_qeutzb.jpg', '21089086@qq.com', 'pbkdf2$10$1c57b4b22437d8ed165c903667759a2c$71b86c3791dc05362c4458e4c337b56499f0165c22b5e5642bcbabdfb223f4d468d59e3f6eda11a836fc65b5eb01d9dd1d9319a193950ec5d9b48b057b46bc60', 'https://imgsbad.semoun.com/uploads/2024/12/23/6768fc9e4e262.png', '2025-12-11 14:12:54', 255.00, '这家伙很懒，什么都没留下', 'JSH02N3', 3, '2026-02-07 16:30:41', 0, '1', 'null', '21089086', 'rsrx9595', 59.00, 'oGNPJ65cSGc_SBpZY2S1XFs_rHHU', 'null', '1');

-- ----------------------------
-- Table structure for n_withdraw_method
-- ----------------------------
DROP TABLE IF EXISTS `n_withdraw_method`;
CREATE TABLE `n_withdraw_method`  (
  `id` int NOT NULL,
  `n_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '方式编码',
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '方式名称',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '方式类型，1：账号，2：二维码，3：直达',
  `n_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '方式编码',
  `n_off` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '开启：1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_withdraw_method
-- ----------------------------
INSERT INTO `n_withdraw_method` VALUES (1, '1', '微信', '1', 'https://imgsbad.semoun.com/uploads/2025/10/11/68e9c65b96253.png', '1');
INSERT INTO `n_withdraw_method` VALUES (2, '2', '支付宝', '1', 'https://imgsbad.semoun.com/uploads/2025/10/11/68e9c65b9ae44.png', '1');

-- ----------------------------
-- Table structure for n_withdrawlog
-- ----------------------------
DROP TABLE IF EXISTS `n_withdrawlog`;
CREATE TABLE `n_withdrawlog`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '订单号',
  `n_time` datetime NULL DEFAULT NULL COMMENT '申请时间',
  `n_amount` decimal(10, 2) NULL DEFAULT NULL COMMENT '金额',
  `n_handling_fee` decimal(10, 2) NULL DEFAULT NULL COMMENT '手续费',
  `n_received` decimal(10, 2) NULL DEFAULT NULL COMMENT '实际到账',
  `n_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '提现方式',
  `n_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '1:待审核，2：已打款，3：已驳回',
  `n_nots` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '其他备注/回复',
  `n_uid` int NULL DEFAULT NULL COMMENT '所属用户',
  `n_oktime` datetime NULL DEFAULT NULL COMMENT '到账时间',
  `n_acc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '收款账号/二维码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_withdrawlog
-- ----------------------------
INSERT INTO `n_withdrawlog` VALUES (20, 'WIT25122030569578', '2025-12-20 13:20:31', 1.00, 0.01, 0.99, '1', '1', NULL, 3, NULL, '抬头');
INSERT INTO `n_withdrawlog` VALUES (21, 'WIT25122030597704', '2025-12-20 13:20:31', 1.00, 0.01, 0.99, '1', '1', NULL, 3, NULL, '抬头');
INSERT INTO `n_withdrawlog` VALUES (22, 'WIT25122060856722', '2025-12-20 13:22:41', 1.00, 0.01, 0.99, '1', '1', NULL, 3, NULL, '123');
INSERT INTO `n_withdrawlog` VALUES (23, 'WIT25122060860871', '2025-12-20 13:22:41', 1.00, 0.01, 0.99, '1', '1', NULL, 3, NULL, '123');
INSERT INTO `n_withdrawlog` VALUES (24, 'WIT25122062025119', '2025-12-20 13:24:22', 1.00, 0.01, 0.99, '1', '1', NULL, 3, NULL, '123');
INSERT INTO `n_withdrawlog` VALUES (25, 'WIT25122067734042', '2025-12-20 13:24:28', 1.00, 0.01, 0.99, '1', '1', NULL, 3, NULL, '123');
INSERT INTO `n_withdrawlog` VALUES (26, 'WIT25122019798796', '2025-12-20 14:03:40', 1.00, 0.01, 0.99, '1', '1', NULL, 3, NULL, 'ttt');
INSERT INTO `n_withdrawlog` VALUES (27, 'WIT26011927481466', '2026-01-19 09:47:07', 12.00, 0.12, 11.88, '1', '1', NULL, 3, NULL, '1');
INSERT INTO `n_withdrawlog` VALUES (28, 'WIT26011994220730', '2026-01-19 10:41:34', 1.00, 0.01, 0.99, '1', '1', NULL, 3, NULL, '123');

-- ----------------------------
-- Table structure for n_wrooms
-- ----------------------------
DROP TABLE IF EXISTS `n_wrooms`;
CREATE TABLE `n_wrooms`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '房间名称',
  `n_uid` int NULL DEFAULT NULL COMMENT '创建用户',
  `n_pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '加入密码',
  `n_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '房间代码',
  `n_time` varchar(222) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '创建时间',
  `n_max` double NULL DEFAULT NULL COMMENT '最大加入人数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_wrooms
-- ----------------------------
INSERT INTO `n_wrooms` VALUES (6, '123', NULL, NULL, '17663817092191709219', '123', NULL);
INSERT INTO `n_wrooms` VALUES (7, '234', NULL, '', '176638', '0', NULL);
INSERT INTO `n_wrooms` VALUES (8, '123123', NULL, '', '1766381915419fLM', '168', NULL);
INSERT INTO `n_wrooms` VALUES (9, '324', NULL, '', '1766382148089VCP', '0', NULL);
INSERT INTO `n_wrooms` VALUES (10, '212', NULL, '', '1766451711028Owx', '72', NULL);

SET FOREIGN_KEY_CHECKS = 1;

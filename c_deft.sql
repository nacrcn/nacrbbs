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

 Date: 17/01/2026 10:42:18
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
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `n_admins` VALUES (1, 'admin', 'pbkdf2$10$6b8fb22c675715cd5ef4b773ce67b358$6e50a1cb08956e5c409b2e0e11c0deed00cd868a2aa37c7ecb5fe39d079d0fe6379d8b7e6fc4b07259fc3080a0995d0fb0e286fded571399432bb42f240794ca', NULL);

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
INSERT INTO `n_apilog` VALUES (1, 3, '2025-12-29 16:55:54', 1, 1, 1.00, '1');
INSERT INTO `n_apilog` VALUES (2, 3, '2025-12-30 09:37:50', 1, 1, 1.00, '1');
INSERT INTO `n_apilog` VALUES (3, 3, '2026-01-08 16:15:46', 2, 1, 1.00, '1');
INSERT INTO `n_apilog` VALUES (4, 3, '2026-01-08 16:17:53', 2, 1, 1.00, '1');
INSERT INTO `n_apilog` VALUES (5, 3, '2026-01-08 16:48:12', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (6, 3, '2026-01-08 16:49:34', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (7, 3, '2026-01-08 16:50:04', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (8, 3, '2026-01-08 16:50:10', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (9, 3, '2026-01-08 16:50:14', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (10, 3, '2026-01-08 16:51:19', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (11, 3, '2026-01-08 16:51:21', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (12, 3, '2026-01-08 16:51:23', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (13, 3, '2026-01-08 16:51:24', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (14, 3, '2026-01-08 16:51:26', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (15, 3, '2026-01-08 16:51:27', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (16, 3, '2026-01-08 16:51:34', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (17, 3, '2026-01-08 16:51:35', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (18, 3, '2026-01-08 16:51:36', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (19, 3, '2026-01-08 16:51:47', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (20, 3, '2026-01-08 16:51:49', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (21, 3, '2026-01-08 16:51:50', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (22, 3, '2026-01-08 16:51:52', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (23, 3, '2026-01-08 16:52:03', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (24, 3, '2026-01-08 16:52:07', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (25, 3, '2026-01-08 16:52:17', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (26, 3, '2026-01-08 16:54:57', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (27, 3, '2026-01-08 16:54:59', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (28, 3, '2026-01-08 16:57:43', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (29, 3, '2026-01-08 16:57:45', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (30, 3, '2026-01-08 16:57:47', 1, 1, 6.00, '1');
INSERT INTO `n_apilog` VALUES (31, 3, '2026-01-08 17:03:21', 2, 1, 1.00, '1');
INSERT INTO `n_apilog` VALUES (32, 3, '2026-01-08 17:03:35', 2, 1, 1.00, '1');
INSERT INTO `n_apilog` VALUES (33, 3, '2026-01-08 17:04:07', 2, 1, 1.00, '1');
INSERT INTO `n_apilog` VALUES (34, 3, '2026-01-08 18:16:26', 2, 1, 1.00, '1');
INSERT INTO `n_apilog` VALUES (35, 3, '2026-01-08 20:58:05', 2, 1, 1.00, '1');

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
INSERT INTO `n_class` VALUES (1, '官方通告', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_1e8ef739752a26_1_circle.png', 12, 2843, NULL, '1', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (2, '站长交流', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_178273f3cf6f57_1_circle.jpg', 243, 48985, NULL, '1', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (3, '无脑灌水', 'https://www.qkua.com/wp-content/uploads/thumb/2023/12/fill_w180_h180_g0_mark_d9f5ddab805ca3e48084b1435862b58e-scaled-1.jpg', 12, 127, 'null', '1', 2, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (4, '啥也不是', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_1a7d76203f85a2_1_circle.jpg', 324, 4352, NULL, '1', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (5, '或许如此', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_157803a5d647ef_1_circle.jpg', 235, 455232, NULL, '1', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (7, '站长交流', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_178273f3cf6f57_1_circle.jpg', 243, 48984, NULL, '2', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (8, '无脑灌水', 'https://www.qkua.com/wp-content/uploads/thumb/2023/12/fill_w180_h180_g0_mark_d9f5ddab805ca3e48084b1435862b58e-scaled-1.jpg', 12, 123, NULL, '2', NULL, '不知道是干的的一个分类板块');
INSERT INTO `n_class` VALUES (9, '啥也不是', 'https://www.qkua.com/wp-content/uploads/thumb/2022/07/fill_w180_h180_g0_mark_1a7d76203f85a2_1_circle.jpg', 324, 4353, NULL, '2', NULL, '不知道是干的的一个分类板块');
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
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_comment
-- ----------------------------
INSERT INTO `n_comment` VALUES (9, '这个我要说一说', 10, 3, 0, '2026-01-14 16:36:42');

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
INSERT INTO `n_configuration` VALUES (1, 'Nacr', 'Nacr', 'Nacr', 'https://imgsbad.semoun.com/uploads/2026/01/17/696af1be0ec28.png', 'https://imgsbad.semoun.com/uploads/2026/01/17/696af1be0ec28.png', 2, 2, 'png,jpg,jepg,webp', 'zip,mp4', 'CansCode ⓒ Cpen X Copyright 2023-2029', 'smtp.qiye.aliyun.com', '465', 'true', 'code@snpan.com', 'snpan520++', '小豆子', 'null', 'null', 'null', 'c_contact_email', '1', 'wx3fd61e35e854b50c', '1e5ec4abfb33193b1a6b4ac10479f55c', '1', '1', '1');

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
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `n_navigation` VALUES (19, '用户配置', 'null', 2, '1', '/user/config', 3);
INSERT INTO `n_navigation` VALUES (20, '帖子', 'null', 0, '1', '/threads', 2);
INSERT INTO `n_navigation` VALUES (21, '帖子列表', 'null', 20, '1', '/threads', 0);
INSERT INTO `n_navigation` VALUES (22, '帖子分类', 'null', 20, '1', '/threads/CategoryList', 1);
INSERT INTO `n_navigation` VALUES (24, '帖子回复', 'null', 20, '1', '/threads/Comments', 2);
INSERT INTO `n_navigation` VALUES (25, '举报记录', 'null', 20, '1', '/threads/Report', 3);

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
INSERT INTO `n_payconfig` VALUES (1, 'Alipay', '支付宝官方支付', '[{\"name\":\"AppId\",\"value\":\"202\",\"key\":\"appId\"},{\"name\":\"应用私钥\",\"value\":\"MII\",\"key\":\"privateKey\"},{\"name\":\"支付宝公钥\",\"value\":\"MII\",\"key\":\"alipayPublicKey\"},{\"name\":\"回调地址\",\"key\":\"notify_url\",\"value\":\"http://192.168.10.157:3000/api/PayNotify\"}]', '2025-12-09 15:17:42', '1', '0', '0', '0');
INSERT INTO `n_payconfig` VALUES (3, 'WeChatPay', '微信JSAPI支付', '[{\"name\":\"公众账号ID\",\"key\":\"appid\",\"value\":\"wx\"},{\"name\":\"商户ID\",\"key\":\"mchid\",\"value\":\"1670\"},{\"name\":\"证书序列号\",\"key\":\"serial_no\",\"value\":\"53C\"},{\"name\":\"证书私钥\",\"key\":\"privateKey\",\"value\":\"-----BEGIN\"},{\"key\":\"notify_url\",\"name\":\"回调地址\",\"value\":\"http://192.168.10.157:3000/api/PayNotify\"},{\"name\":\"回调秘钥\",\"value\":\"JSPQO981JHSEE\",\"key\":\"callback_key\"}]', '2025-12-18 13:41:54', '1', '0', '0', '0');
INSERT INTO `n_payconfig` VALUES (4, 'Epay', '彩虹易支付', '[{\"name\":\"pid\",\"key\":\"pid\",\"value\":\"1000\"},{\"name\":\"key\",\"key\":\"key\",\"value\":\"25A4tti\"},{\"name\":\"apiUrl\",\"key\":\"apiUrl\",\"value\":\"https://\"},{\"name\":\"notify_url\",\"key\":\"notify_url\",\"value\":\"http://192.168.10.157:9999/api/PayNotify\"}]', '2026-01-16 13:35:05', '1', 'null', '1', '1');

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
INSERT INTO `n_paymethod` VALUES (2, 'https://imgsbad.semoun.com/uploads/2025/10/11/68e9c65b96253.png', '微信支付', '2', '2', '1', 1);
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
) ENGINE = InnoDB AUTO_INCREMENT = 107 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_payorder
-- ----------------------------
INSERT INTO `n_payorder` VALUES (9, 'ORD25120958488825', '2', '0.01', '2025-12-09 16:24:18', '2025-12-11 11:37:26', '1', '1', 2, '[\r\n    {\r\n        \"id\": \"123\",\r\n        \"price\": 0.01,\r\n        \"type\": 1\r\n    }\r\n]', 'Alipay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (12, 'ORD25121274713324', '2', '0.01', '2025-12-12 14:39:34', '2025-12-12 15:02:43', NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (15, 'ORD25121246798114', '2', '12', '2025-12-12 15:05:46', '2025-12-12 15:05:51', NULL, NULL, 3, '[{\"id\":7,\"type\":2}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (16, 'ORD25121215424520', '2', '12', '2025-12-12 15:06:55', '2025-12-12 15:09:20', NULL, NULL, 3, '[{\"id\":7,\"type\":2}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (17, 'ORD25121266158831', '2', '43', '2025-12-12 15:09:26', '2025-12-12 15:10:24', NULL, NULL, 3, '[{\"id\":5,\"type\":2}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (18, 'ORD25121271901808', '2', '12', '2025-12-12 15:11:11', '2025-12-12 15:12:12', NULL, NULL, 3, '[{\"id\":7,\"type\":2}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (22, 'ORD25121229427261', '2', '12', '2025-12-12 15:18:49', '2025-12-12 15:18:53', NULL, NULL, 3, '[{\"id\":7,\"type\":2}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (23, 'ORD25121218142907', '1', '0.01', '2025-12-12 15:35:18', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'Alipay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (27, 'ORD25121224862291', '1', '50', '2025-12-12 16:47:04', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":50}]', 'Alipay', '2', NULL);
INSERT INTO `n_payorder` VALUES (28, 'ORD25121245050782', '1', '43', '2025-12-12 17:05:45', NULL, NULL, NULL, 3, '[{\"id\":5,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (29, 'ORD25121254078151', '2', '0.01', '2025-12-12 17:05:54', '2025-12-12 17:07:16', NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'Alipay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (30, 'ORD25121818841451', '1', '10', '2025-12-18 09:01:58', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":10}]', 'Alipay', '2', NULL);
INSERT INTO `n_payorder` VALUES (31, 'ORD25121898290378', '1', '0.01', '2025-12-18 12:43:18', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (32, 'ORD25121884922593', '1', '43', '2025-12-18 12:49:44', NULL, NULL, NULL, 3, '[{\"id\":5,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (33, 'ORD25121848994576', '1', '43', '2025-12-18 13:02:28', NULL, NULL, NULL, 3, '[{\"id\":5,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (34, 'ORD25121869255162', '1', '43', '2025-12-18 13:02:49', NULL, NULL, NULL, 3, '[{\"id\":5,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (35, 'ORD25121872222481', '1', '43', '2025-12-18 13:02:52', NULL, NULL, NULL, 3, '[{\"id\":5,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (36, 'ORD25121832228242', '1', '0.01', '2025-12-18 14:15:32', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (37, 'ORD25121866364583', '1', '0.01', '2025-12-18 15:52:46', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (38, 'ORD25121855952742', '1', '0.01', '2025-12-18 16:22:35', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (39, 'ORD25121848322252', '1', '0.01', '2025-12-18 16:27:28', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (40, 'ORD25121854050890', '1', '0.01', '2025-12-18 16:29:14', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (41, 'ORD25121849978371', '1', '0.01', '2025-12-18 16:30:49', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (42, 'ORD25121887638188', '1', '0.01', '2025-12-18 16:31:27', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (43, 'ORD25121807519629', '1', '0.01', '2025-12-18 16:31:47', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (44, 'ORD25121889437553', '1', '0.01', '2025-12-18 16:33:09', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (45, 'ORD25121847374996', '1', '0.01', '2025-12-18 16:39:07', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (46, 'ORD25121839929335', '1', '0.01', '2025-12-18 16:45:39', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (47, 'ORD25121816674273', '1', '0.01', '2025-12-18 17:13:36', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (48, 'ORD25122072346568', '1', '5', '2025-12-20 10:41:12', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (49, 'ORD25122072349960', '1', '5', '2025-12-20 10:41:12', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (50, 'ORD25122086786497', '1', '5', '2025-12-20 10:41:26', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (51, 'ORD25122086787743', '1', '5', '2025-12-20 10:41:26', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (52, 'ORD25122017668957', '1', '5', '2025-12-20 10:41:57', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (53, 'ORD25122017669436', '1', '5', '2025-12-20 10:41:57', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', 'WeChatPay', '2', NULL);
INSERT INTO `n_payorder` VALUES (54, 'ORD25122027060790', '1', '5', '2025-12-20 10:42:07', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (55, 'ORD25122027060121', '1', '5', '2025-12-20 10:42:07', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (56, 'ORD25122027863903', '1', '5', '2025-12-20 11:03:47', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (57, 'ORD25122052996658', '1', '10', '2025-12-20 11:04:12', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":10}]', 'WeChatPay', '2', NULL);
INSERT INTO `n_payorder` VALUES (58, 'ORD25122070492069', '1', '5', '2025-12-20 11:04:30', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (59, 'ORD25122070599852', '1', '5', '2025-12-20 11:04:30', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (60, 'ORD25122077134515', '1', '43', '2025-12-20 11:04:37', NULL, NULL, NULL, 3, '[{\"id\":5,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (61, 'ORD25122094171932', '1', '43', '2025-12-20 11:04:54', NULL, NULL, NULL, 3, '[{\"id\":5,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (62, 'ORD25122091652232', '1', '5', '2025-12-20 11:06:31', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (63, 'ORD25122093055404', '1', '5', '2025-12-20 14:03:13', NULL, NULL, NULL, 3, '[{\"id\":\"\",\"type\":1,\"price\":5}]', 'WeChatPay', '2', NULL);
INSERT INTO `n_payorder` VALUES (64, 'ORD25122035490054', '1', '0.01', '2025-12-20 14:03:55', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (65, 'ORD25122777478834', '1', '10', '2025-12-27 15:12:57', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":10}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (66, 'ORD25122783131183', '1', '10', '2025-12-27 15:13:03', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":10}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (67, 'ORD25122747526211', '1', '10', '2025-12-27 15:14:07', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":10}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (68, 'ORD25122794590392', '1', '10', '2025-12-27 15:14:54', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":10}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (69, 'ORD25122817206990', '1', '200', '2025-12-28 19:38:37', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":200}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (70, 'ORD25122820268237', '1', '10', '2025-12-28 19:38:40', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":10}]', 'Alipay', '2', NULL);
INSERT INTO `n_payorder` VALUES (71, 'ORD25123086987942', '1', '10', '2025-12-30 11:58:06', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":10}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (72, 'ORD26010529905197', '1', '0.01', '2026-01-05 16:30:29', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (73, 'ORD26010538130283', '2', '0.01', '2026-01-05 16:30:38', '2026-01-05 16:30:41', NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (74, 'ORD26010662038186', '1', '0.01', '2026-01-06 17:07:42', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (75, 'ORD26010792375132', '1', '0.01', '2026-01-07 20:11:32', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (76, 'ORD26010795891509', '1', '0.01', '2026-01-07 20:11:35', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (77, 'ORD26010796414238', '1', '0.01', '2026-01-07 20:11:36', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (78, 'ORD26010704253132', '1', '0.01', '2026-01-07 20:11:44', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'WeChatPay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (79, 'ORD26011473518129', '1', '1', '2026-01-14 14:36:13', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":\"1.00\",\"from\":{\"id\":10}}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (80, 'ORD26011484722964', '1', '1', '2026-01-14 14:36:24', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":\"1.00\",\"from\":{\"id\":10}}]', NULL, '2', NULL);
INSERT INTO `n_payorder` VALUES (81, 'ORD26011487035939', '1', '0', '2026-01-14 14:38:07', NULL, NULL, NULL, 3, '[{\"type\":3,\"price\":\"1.00\",\"from\":{\"id\":10}}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (82, 'ORD26011475947052', '1', '0', '2026-01-14 14:44:35', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"from\":{\"id\":10,\"type\":3}}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (83, 'ORD26011487343779', '1', '0', '2026-01-14 14:46:27', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"from\":{\"id\":10,\"type\":3}}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (84, 'ORD26011456029950', '1', '1', '2026-01-14 14:49:16', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (85, 'ORD26011452521578', '1', '1', '2026-01-14 14:55:52', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (86, 'ORD26011498579809', '2', '1', '2026-01-14 15:29:58', '2026-01-14 15:30:01', NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (87, 'ORD26011414843068', '2', '1', '2026-01-14 15:31:54', '2026-01-14 15:31:58', NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (88, 'ORD26011445047303', '2', '21', '2026-01-14 15:37:25', '2026-01-14 15:37:31', NULL, NULL, 3, '[{\"price\":\"21.00\",\"type\":3,\"id\":3}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (89, 'ORD26011431998395', '2', '1', '2026-01-14 15:38:51', '2026-01-14 15:38:55', NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (90, 'ORD26011430501262', '2', '1', '2026-01-14 15:40:30', '2026-01-14 15:40:33', NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', 'BalancePay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (91, 'ORD26011454745774', '2', '21', '2026-01-14 15:54:14', '2026-01-14 15:54:50', NULL, NULL, 3, '[{\"price\":\"21.00\",\"type\":3,\"id\":3}]', 'PointsPay', '3', 'http://192.168.10.157:3000/threads/3');
INSERT INTO `n_payorder` VALUES (92, 'ORD26011466870161', '2', '21', '2026-01-14 15:56:06', '2026-01-14 15:56:10', NULL, NULL, 3, '[{\"price\":\"21.00\",\"type\":3,\"id\":3}]', 'PointsPay', '3', 'http://192.168.10.157:3000/threads/3');
INSERT INTO `n_payorder` VALUES (93, 'ORD26011457898328', '2', '1', '2026-01-14 16:02:37', '2026-01-14 16:02:43', NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', 'BalancePay', NULL, 'http://192.168.10.157:3000/threads/10');
INSERT INTO `n_payorder` VALUES (94, 'ORD26011467409582', '2', '21', '2026-01-14 16:02:47', '2026-01-14 16:02:50', NULL, NULL, 3, '[{\"price\":\"21.00\",\"type\":3,\"id\":3}]', 'PointsPay', '3', 'http://192.168.10.157:3000/threads/3');
INSERT INTO `n_payorder` VALUES (95, 'ORD26011494144031', '1', '21', '2026-01-14 16:04:54', NULL, NULL, NULL, 3, '[{\"price\":\"21.00\",\"type\":3,\"id\":3}]', NULL, '3', 'http://192.168.10.157:3000/threads/3');
INSERT INTO `n_payorder` VALUES (96, 'ORD26011498458247', '1', '1', '2026-01-14 16:04:58', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', NULL, NULL, 'http://192.168.10.157:3000/threads/10');
INSERT INTO `n_payorder` VALUES (97, 'ORD26011469435002', '1', '1', '2026-01-14 16:06:09', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', NULL, NULL, 'http://192.168.10.157:3000/threads/10');
INSERT INTO `n_payorder` VALUES (98, 'ORD26011481404060', '1', '21', '2026-01-14 16:06:21', NULL, NULL, NULL, 3, '[{\"price\":\"21.00\",\"type\":3,\"id\":3}]', NULL, '3', 'http://192.168.10.157:3000/threads/3');
INSERT INTO `n_payorder` VALUES (99, 'ORD26011460816922', '2', '1', '2026-01-14 16:36:00', '2026-01-14 16:36:13', NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', 'BalancePay', NULL, 'http://192.168.10.157:3000/threads/10');
INSERT INTO `n_payorder` VALUES (100, 'ORD26011437868324', '2', '21', '2026-01-14 16:37:17', '2026-01-14 16:37:25', NULL, NULL, 3, '[{\"price\":\"21.00\",\"type\":3,\"id\":3}]', 'PointsPay', '3', 'http://192.168.10.157:3000/threads/3');
INSERT INTO `n_payorder` VALUES (101, 'ORD26011685872829', '1', '1', '2026-01-16 13:48:05', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":1}]', 'Epay', '2', NULL);
INSERT INTO `n_payorder` VALUES (102, 'ORD26011624317858', '2', '1', '2026-01-16 14:43:44', '2026-01-16 14:52:33', NULL, NULL, 3, '[{\"type\":1,\"price\":1}]', 'Epay', '2', NULL);
INSERT INTO `n_payorder` VALUES (103, 'ORD26011651867348', '1', '1', '2026-01-16 14:55:51', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":1}]', 'Epay', '2', NULL);
INSERT INTO `n_payorder` VALUES (104, 'ORD26011630224024', '1', '1', '2026-01-16 14:58:50', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":1}]', 'Epay', '2', 'http://192.168.10.157:3000/user/topup');
INSERT INTO `n_payorder` VALUES (105, 'ORD26011666691805', '1', '1', '2026-01-16 15:09:26', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":1}]', 'Epay', '2', 'http://192.168.10.157:3000/user/topup');
INSERT INTO `n_payorder` VALUES (106, 'ORD26011672725955', '1', '0.01', '2026-01-16 15:11:12', NULL, NULL, NULL, 3, '[{\"type\":1,\"price\":\"0.01\"}]', 'Epay', '2', 'http://192.168.10.157:3000/user/topup');

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
) ENGINE = InnoDB AUTO_INCREMENT = 96 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_payorder_item
-- ----------------------------
INSERT INTO `n_payorder_item` VALUES (1, 9, '积分余额充值', 1, 0.01, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (2, 10, '购买undefined', 1, 0.01, NULL, '2');
INSERT INTO `n_payorder_item` VALUES (3, 11, '购买undefined', 1, 0.01, NULL, '2');
INSERT INTO `n_payorder_item` VALUES (4, 12, '购买SVIP', 1, 0.01, NULL, '2');
INSERT INTO `n_payorder_item` VALUES (5, 13, '购买SVIP', 1, 12.00, NULL, '2');
INSERT INTO `n_payorder_item` VALUES (6, 14, '购买SVIP', 1, 12.00, NULL, '2');
INSERT INTO `n_payorder_item` VALUES (7, 15, '购买SVIP', 1, 12.00, NULL, '2');
INSERT INTO `n_payorder_item` VALUES (8, 16, '购买SVIP', 1, 12.00, NULL, '2');
INSERT INTO `n_payorder_item` VALUES (9, 17, '购买VIP', 1, 43.00, NULL, '2');
INSERT INTO `n_payorder_item` VALUES (10, 18, '购买SVIP', 1, 12.00, 7, '2');
INSERT INTO `n_payorder_item` VALUES (11, 19, '购买SVIP', 1, 12.00, 7, '2');
INSERT INTO `n_payorder_item` VALUES (12, 20, '购买VIP', 1, 10.00, 4, '2');
INSERT INTO `n_payorder_item` VALUES (13, 21, '购买VIP', 1, 10.00, 4, '2');
INSERT INTO `n_payorder_item` VALUES (14, 22, '购买SVIP', 1, 12.00, 7, '2');
INSERT INTO `n_payorder_item` VALUES (15, 23, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (16, 24, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (17, 25, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (18, 26, '购买VIP', 1, 43.00, 5, '2');
INSERT INTO `n_payorder_item` VALUES (19, 27, '积分余额充值', 1, 50.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (20, 28, '购买VIP', 1, 43.00, 5, '2');
INSERT INTO `n_payorder_item` VALUES (21, 29, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (22, 30, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (23, 31, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (24, 32, '购买VIP', 1, 43.00, 5, '2');
INSERT INTO `n_payorder_item` VALUES (25, 33, '购买VIP', 1, 43.00, 5, '2');
INSERT INTO `n_payorder_item` VALUES (26, 34, '购买VIP', 1, 43.00, 5, '2');
INSERT INTO `n_payorder_item` VALUES (27, 35, '购买VIP', 1, 43.00, 5, '2');
INSERT INTO `n_payorder_item` VALUES (28, 36, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (29, 37, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (30, 38, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (31, 39, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (32, 40, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (33, 41, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (34, 42, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (35, 43, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (36, 44, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (37, 45, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (38, 46, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (39, 47, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (40, 48, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (41, 49, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (42, 50, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (43, 51, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (44, 52, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (45, 53, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (46, 54, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (47, 55, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (48, 56, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (49, 57, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (50, 58, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (51, 59, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (52, 60, '购买VIP', 1, 43.00, 5, '2');
INSERT INTO `n_payorder_item` VALUES (53, 61, '购买VIP', 1, 43.00, 5, '2');
INSERT INTO `n_payorder_item` VALUES (54, 62, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (55, 63, '积分余额充值', 1, 5.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (56, 64, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (57, 65, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (58, 66, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (59, 67, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (60, 68, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (61, 69, '积分余额充值', 1, 200.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (62, 70, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (63, 71, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (64, 72, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (65, 73, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (66, 74, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (67, 75, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (68, 76, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (69, 77, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (70, 78, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (71, 79, '积分余额充值', 1, 1.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (72, 80, '积分余额充值', 1, 1.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (73, 84, '购买帖贴子 - 10', 1, 1.00, 10, '2');
INSERT INTO `n_payorder_item` VALUES (74, 85, '购买帖贴子 - 10', 1, 1.00, 10, '2');
INSERT INTO `n_payorder_item` VALUES (75, 86, '购买帖贴子 - 10', 1, 1.00, 10, '2');
INSERT INTO `n_payorder_item` VALUES (76, 87, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (77, 88, '购买帖贴子 - 3', 1, 21.00, 3, '3');
INSERT INTO `n_payorder_item` VALUES (78, 89, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (79, 90, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (80, 91, '购买帖贴子 - 3', 1, 21.00, 3, '3');
INSERT INTO `n_payorder_item` VALUES (81, 92, '购买帖贴子 - 3', 1, 21.00, 3, '3');
INSERT INTO `n_payorder_item` VALUES (82, 93, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (83, 94, '购买帖贴子 - 3', 1, 21.00, 3, '3');
INSERT INTO `n_payorder_item` VALUES (84, 95, '购买帖贴子 - 3', 1, 21.00, 3, '3');
INSERT INTO `n_payorder_item` VALUES (85, 96, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (86, 97, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (87, 98, '购买帖贴子 - 3', 1, 21.00, 3, '3');
INSERT INTO `n_payorder_item` VALUES (88, 99, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (89, 100, '购买帖贴子 - 3', 1, 21.00, 3, '3');
INSERT INTO `n_payorder_item` VALUES (90, 101, '积分余额充值', 1, 1.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (91, 102, '积分余额充值', 1, 1.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (92, 103, '积分余额充值', 1, 1.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (93, 104, '积分余额充值', 1, 1.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (94, 105, '积分余额充值', 1, 1.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (95, 106, '积分余额充值', 1, 0.01, NULL, '1');

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
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_tclist
-- ----------------------------
INSERT INTO `n_tclist` VALUES (9, 1, 4, '1');
INSERT INTO `n_tclist` VALUES (10, 6, 4, '2');
INSERT INTO `n_tclist` VALUES (11, 1, 5, '1');
INSERT INTO `n_tclist` VALUES (12, 6, 5, '2');
INSERT INTO `n_tclist` VALUES (13, 1, 6, '1');
INSERT INTO `n_tclist` VALUES (14, 7, 6, '2');
INSERT INTO `n_tclist` VALUES (15, 1, 7, '1');
INSERT INTO `n_tclist` VALUES (16, 6, 7, '2');
INSERT INTO `n_tclist` VALUES (17, 1, 8, '1');
INSERT INTO `n_tclist` VALUES (18, 6, 8, '2');
INSERT INTO `n_tclist` VALUES (37, 1, 9, '1');
INSERT INTO `n_tclist` VALUES (38, 2, 9, '1');
INSERT INTO `n_tclist` VALUES (39, 9, 9, '2');
INSERT INTO `n_tclist` VALUES (49, 3, 10, '1');
INSERT INTO `n_tclist` VALUES (50, 9, 10, '2');
INSERT INTO `n_tclist` VALUES (51, 3, 11, '1');
INSERT INTO `n_tclist` VALUES (52, 1, 11, '1');
INSERT INTO `n_tclist` VALUES (53, 7, 11, '2');
INSERT INTO `n_tclist` VALUES (54, 3, 12, '1');
INSERT INTO `n_tclist` VALUES (55, 1, 12, '1');
INSERT INTO `n_tclist` VALUES (56, 7, 12, '2');

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_threads
-- ----------------------------
INSERT INTO `n_threads` VALUES (10, '付费帖子', 3, '2026-01-14 11:03:03', '<p>needBuy</p>', '106', 12, 1, '付费帖子付费帖子付费帖子付费帖子付费', '3', 1.00, '[]', '2', '2', '2026-01-14 16:36:42');
INSERT INTO `n_threads` VALUES (11, '这个很可以啊', 3, '2026-01-17 09:39:51', '<p>确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写确实可以，轻量化论坛，采用nuxt3架构编写</p>', '9', 0, 0, '确实可以，轻量化论坛，采用nuxt3架构编写', '1', 0.00, '[]', '2', '2', NULL);
INSERT INTO `n_threads` VALUES (12, 'Nacr 写一个开源的论坛系统，啊哈哈', 3, '2026-01-17 10:30:01', '<p><img src=\"http://127.0.0.1:9999/public/upload/img_1768616996880_388aox.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p>', '0', 0, 0, 'Nacr 写一个开源的论坛系统，啊哈哈Nacr 写一个开源的论坛系统，啊哈哈Nacr 写一个开源的论坛系统，啊哈哈Nacr 写一个开源的论坛系统，啊哈哈Nacr 写一个开源的论坛系统，啊哈哈Nacr ', '1', 0.00, '[{\"type\":1,\"url\":\"http://127.0.0.1:9999/public/upload/img_1768616996880_388aox.jpg\"}]', '1', '2', NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_threads_buy
-- ----------------------------
INSERT INTO `n_threads_buy` VALUES (26, 10, 3, '2026-01-14 16:36:13');
INSERT INTO `n_threads_buy` VALUES (27, 3, 3, '2026-01-14 16:37:25');

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_threads_like
-- ----------------------------
INSERT INTO `n_threads_like` VALUES (14, 1, 3, '2026-01-13 14:54:21');
INSERT INTO `n_threads_like` VALUES (15, 2, 3, '2026-01-13 15:22:21');
INSERT INTO `n_threads_like` VALUES (16, 3, 3, '2026-01-14 11:53:01');
INSERT INTO `n_threads_like` VALUES (17, 10, 3, '2026-01-14 12:17:15');

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
) ENGINE = InnoDB AUTO_INCREMENT = 131 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_user_bill
-- ----------------------------
INSERT INTO `n_user_bill` VALUES (1, '购买会员', 1.00, 3, '2025-12-10 11:05:37', '2', NULL);
INSERT INTO `n_user_bill` VALUES (2, '在线充值', 0.01, 3, '2025-12-11 11:37:26', '1', NULL);
INSERT INTO `n_user_bill` VALUES (3, '在线支付', 0.01, 3, '2025-12-12 15:02:43', '2', '1');
INSERT INTO `n_user_bill` VALUES (4, '在线支付', 12.00, 3, '2025-12-12 15:05:51', '2', '1');
INSERT INTO `n_user_bill` VALUES (5, '在线支付', 12.00, 3, '2025-12-12 15:09:01', '2', '1');
INSERT INTO `n_user_bill` VALUES (6, '在线支付', 12.00, 3, '2025-12-12 15:09:19', '2', '1');
INSERT INTO `n_user_bill` VALUES (7, '在线支付', 43.00, 3, '2025-12-12 15:09:32', '2', '1');
INSERT INTO `n_user_bill` VALUES (8, '在线支付', 43.00, 3, '2025-12-12 15:10:24', '2', '1');
INSERT INTO `n_user_bill` VALUES (9, '在线支付', 12.00, 3, '2025-12-12 15:11:41', '2', '1');
INSERT INTO `n_user_bill` VALUES (10, '在线支付', 12.00, 3, '2025-12-12 15:12:12', '2', '1');
INSERT INTO `n_user_bill` VALUES (11, '在线支付', 12.00, 3, '2025-12-12 15:18:53', '2', '1');
INSERT INTO `n_user_bill` VALUES (12, '签到奖励', 5.00, 3, '2025-12-13 13:52:04', '1', '1');
INSERT INTO `n_user_bill` VALUES (13, '签到奖励', 5.00, 3, '2025-12-13 13:53:03', '1', '1');
INSERT INTO `n_user_bill` VALUES (14, '签到奖励', 5.00, 3, '2025-12-17 16:02:48', '1', '1');
INSERT INTO `n_user_bill` VALUES (15, '签到奖励', 5.00, 3, '2025-12-18 08:37:56', '1', '1');
INSERT INTO `n_user_bill` VALUES (16, '在线提现', 2.00, 3, '2025-12-20 11:55:35', '2', '2');
INSERT INTO `n_user_bill` VALUES (17, '在线提现', 0.10, 3, '2025-12-20 13:09:08', '2', '2');
INSERT INTO `n_user_bill` VALUES (18, '在线提现', 0.10, 3, '2025-12-20 13:09:08', '2', '2');
INSERT INTO `n_user_bill` VALUES (19, '在线提现', 0.10, 3, '2025-12-20 13:09:11', '2', '2');
INSERT INTO `n_user_bill` VALUES (20, '在线提现', 0.10, 3, '2025-12-20 13:09:11', '2', '2');
INSERT INTO `n_user_bill` VALUES (21, '在线提现', 0.10, 3, '2025-12-20 13:09:24', '2', '2');
INSERT INTO `n_user_bill` VALUES (22, '在线提现', 0.10, 3, '2025-12-20 13:09:27', '2', '2');
INSERT INTO `n_user_bill` VALUES (23, '在线提现', 4.00, 3, '2025-12-20 13:09:52', '2', '2');
INSERT INTO `n_user_bill` VALUES (24, '在线提现', 4.00, 3, '2025-12-20 13:09:52', '2', '2');
INSERT INTO `n_user_bill` VALUES (25, '在线提现', 5.00, 3, '2025-12-20 13:09:59', '2', '2');
INSERT INTO `n_user_bill` VALUES (26, '在线提现', 5.00, 3, '2025-12-20 13:09:59', '2', '2');
INSERT INTO `n_user_bill` VALUES (27, '在线提现', 1.00, 3, '2025-12-20 13:10:04', '2', '2');
INSERT INTO `n_user_bill` VALUES (28, '在线提现', 1.00, 3, '2025-12-20 13:10:04', '2', '2');
INSERT INTO `n_user_bill` VALUES (29, '在线提现', 1.00, 3, '2025-12-20 13:10:05', '2', '2');
INSERT INTO `n_user_bill` VALUES (30, '在线提现', 1.00, 3, '2025-12-20 13:10:06', '2', '2');
INSERT INTO `n_user_bill` VALUES (31, '在线提现', 5.00, 3, '2025-12-20 13:10:11', '2', '2');
INSERT INTO `n_user_bill` VALUES (32, '在线提现', 5.00, 3, '2025-12-20 13:10:11', '2', '2');
INSERT INTO `n_user_bill` VALUES (33, '在线提现', 1.00, 3, '2025-12-20 13:13:16', '2', '2');
INSERT INTO `n_user_bill` VALUES (34, '在线提现', 1.00, 3, '2025-12-20 13:13:16', '2', '2');
INSERT INTO `n_user_bill` VALUES (35, '在线提现', 1.00, 3, '2025-12-20 13:20:31', '2', '2');
INSERT INTO `n_user_bill` VALUES (36, '在线提现', 1.00, 3, '2025-12-20 13:20:31', '2', '2');
INSERT INTO `n_user_bill` VALUES (37, '在线提现', 1.00, 3, '2025-12-20 13:22:41', '2', '2');
INSERT INTO `n_user_bill` VALUES (38, '在线提现', 1.00, 3, '2025-12-20 13:22:41', '2', '2');
INSERT INTO `n_user_bill` VALUES (39, '在线提现', 1.00, 3, '2025-12-20 13:24:22', '2', '2');
INSERT INTO `n_user_bill` VALUES (40, '在线提现', 1.00, 3, '2025-12-20 13:24:28', '2', '2');
INSERT INTO `n_user_bill` VALUES (41, '在线提现', 1.00, 3, '2025-12-20 14:03:40', '2', '2');
INSERT INTO `n_user_bill` VALUES (42, '签到奖励', 5.00, 3, '2025-12-20 14:14:08', '1', '1');
INSERT INTO `n_user_bill` VALUES (43, '签到奖励', 5.00, 3, '2025-12-20 14:16:50', '1', '1');
INSERT INTO `n_user_bill` VALUES (44, '签到奖励', 5.00, 3, '2025-12-20 14:20:50', '1', '1');
INSERT INTO `n_user_bill` VALUES (45, '签到奖励', 5.00, 3, '2025-12-20 14:23:21', '1', '1');
INSERT INTO `n_user_bill` VALUES (46, '签到奖励', 5.00, 3, '2025-12-22 10:31:51', '1', '1');
INSERT INTO `n_user_bill` VALUES (47, '签到奖励', 5.00, 3, '2025-12-27 15:09:13', '1', '1');
INSERT INTO `n_user_bill` VALUES (48, '签到奖励', 5.00, 3, '2025-12-28 13:09:33', '1', '1');
INSERT INTO `n_user_bill` VALUES (49, '调用API接口 - M3U8转MP4', -78.00, 3, '2025-12-29 16:38:16', '2', '1');
INSERT INTO `n_user_bill` VALUES (50, '调用API接口 - M3U8转MP4', -78.00, 3, '2025-12-29 16:38:45', '2', '1');
INSERT INTO `n_user_bill` VALUES (51, '调用API接口 - M3U8转MP4', 1.20, 3, '2025-12-29 16:39:48', '2', '1');
INSERT INTO `n_user_bill` VALUES (52, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:40:41', '2', '1');
INSERT INTO `n_user_bill` VALUES (53, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:40:54', '2', '1');
INSERT INTO `n_user_bill` VALUES (54, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:28', '2', '1');
INSERT INTO `n_user_bill` VALUES (55, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:29', '2', '1');
INSERT INTO `n_user_bill` VALUES (56, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:30', '2', '1');
INSERT INTO `n_user_bill` VALUES (57, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:31', '2', '1');
INSERT INTO `n_user_bill` VALUES (58, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:32', '2', '1');
INSERT INTO `n_user_bill` VALUES (59, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:38', '2', '1');
INSERT INTO `n_user_bill` VALUES (60, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:40', '2', '1');
INSERT INTO `n_user_bill` VALUES (61, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:41', '2', '1');
INSERT INTO `n_user_bill` VALUES (62, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:41', '2', '1');
INSERT INTO `n_user_bill` VALUES (63, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:44', '2', '1');
INSERT INTO `n_user_bill` VALUES (64, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:49', '2', '1');
INSERT INTO `n_user_bill` VALUES (65, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:51', '2', '1');
INSERT INTO `n_user_bill` VALUES (66, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:52', '2', '1');
INSERT INTO `n_user_bill` VALUES (67, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:53', '2', '1');
INSERT INTO `n_user_bill` VALUES (68, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:50:55', '2', '1');
INSERT INTO `n_user_bill` VALUES (69, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:00', '2', '1');
INSERT INTO `n_user_bill` VALUES (70, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:32', '2', '1');
INSERT INTO `n_user_bill` VALUES (71, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:33', '2', '1');
INSERT INTO `n_user_bill` VALUES (72, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:34', '2', '1');
INSERT INTO `n_user_bill` VALUES (73, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:35', '2', '1');
INSERT INTO `n_user_bill` VALUES (74, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:36', '2', '1');
INSERT INTO `n_user_bill` VALUES (75, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:42', '2', '1');
INSERT INTO `n_user_bill` VALUES (76, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:43', '2', '1');
INSERT INTO `n_user_bill` VALUES (77, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:44', '2', '1');
INSERT INTO `n_user_bill` VALUES (78, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:45', '2', '1');
INSERT INTO `n_user_bill` VALUES (79, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:51:46', '2', '1');
INSERT INTO `n_user_bill` VALUES (80, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-29 16:55:54', '2', '1');
INSERT INTO `n_user_bill` VALUES (81, '调用API接口 - M3U8转MP4', 1.00, 3, '2025-12-30 09:37:50', '2', '1');
INSERT INTO `n_user_bill` VALUES (82, '签到奖励', 5.00, 3, '2025-12-30 11:53:16', '1', '1');
INSERT INTO `n_user_bill` VALUES (83, '在线支付', 0.01, 3, '2026-01-05 16:30:41', '2', '1');
INSERT INTO `n_user_bill` VALUES (84, '签到奖励', 5.00, 3, '2026-01-08 09:27:45', '1', '1');
INSERT INTO `n_user_bill` VALUES (85, '调用API接口 - 图片转直链', 1.00, 3, '2026-01-08 16:15:46', '2', '1');
INSERT INTO `n_user_bill` VALUES (86, '调用API接口 - 图片转直链', 1.00, 3, '2026-01-08 16:17:53', '2', '1');
INSERT INTO `n_user_bill` VALUES (87, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:48:12', '2', '1');
INSERT INTO `n_user_bill` VALUES (88, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:49:34', '2', '1');
INSERT INTO `n_user_bill` VALUES (89, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:50:04', '2', '1');
INSERT INTO `n_user_bill` VALUES (90, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:50:10', '2', '1');
INSERT INTO `n_user_bill` VALUES (91, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:50:14', '2', '1');
INSERT INTO `n_user_bill` VALUES (92, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:19', '2', '1');
INSERT INTO `n_user_bill` VALUES (93, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:21', '2', '1');
INSERT INTO `n_user_bill` VALUES (94, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:23', '2', '1');
INSERT INTO `n_user_bill` VALUES (95, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:24', '2', '1');
INSERT INTO `n_user_bill` VALUES (96, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:26', '2', '1');
INSERT INTO `n_user_bill` VALUES (97, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:27', '2', '1');
INSERT INTO `n_user_bill` VALUES (98, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:34', '2', '1');
INSERT INTO `n_user_bill` VALUES (99, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:35', '2', '1');
INSERT INTO `n_user_bill` VALUES (100, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:36', '2', '1');
INSERT INTO `n_user_bill` VALUES (101, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:47', '2', '1');
INSERT INTO `n_user_bill` VALUES (102, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:49', '2', '1');
INSERT INTO `n_user_bill` VALUES (103, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:50', '2', '1');
INSERT INTO `n_user_bill` VALUES (104, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:51:51', '2', '1');
INSERT INTO `n_user_bill` VALUES (105, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:52:03', '2', '1');
INSERT INTO `n_user_bill` VALUES (106, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:52:07', '2', '1');
INSERT INTO `n_user_bill` VALUES (107, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:52:17', '2', '1');
INSERT INTO `n_user_bill` VALUES (108, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:54:57', '2', '1');
INSERT INTO `n_user_bill` VALUES (109, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:54:59', '2', '1');
INSERT INTO `n_user_bill` VALUES (110, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:57:15', '2', '1');
INSERT INTO `n_user_bill` VALUES (111, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:57:43', '2', '1');
INSERT INTO `n_user_bill` VALUES (112, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:57:45', '2', '1');
INSERT INTO `n_user_bill` VALUES (113, '调用API接口 - M3U8转MP4', 6.00, 3, '2026-01-08 16:57:47', '2', '1');
INSERT INTO `n_user_bill` VALUES (114, '调用API接口 - 图片转直链', 1.00, 3, '2026-01-08 17:03:21', '2', '1');
INSERT INTO `n_user_bill` VALUES (115, '调用API接口 - 图片转直链', 1.00, 3, '2026-01-08 17:03:35', '2', '1');
INSERT INTO `n_user_bill` VALUES (116, '调用API接口 - 图片转直链', 1.00, 3, '2026-01-08 17:04:07', '2', '1');
INSERT INTO `n_user_bill` VALUES (117, '调用API接口 - 图片转直链', 1.00, 3, '2026-01-08 18:16:26', '2', '1');
INSERT INTO `n_user_bill` VALUES (118, '调用API接口 - 图片转直链', 1.00, 3, '2026-01-08 20:58:05', '2', '1');
INSERT INTO `n_user_bill` VALUES (119, '在线支付', 1.00, 3, '2026-01-14 15:30:01', '2', '1');
INSERT INTO `n_user_bill` VALUES (120, '在线支付', 1.00, 3, '2026-01-14 15:31:58', '2', '1');
INSERT INTO `n_user_bill` VALUES (121, '在线支付', 21.00, 3, '2026-01-14 15:37:31', '2', '1');
INSERT INTO `n_user_bill` VALUES (122, '在线支付', 1.00, 3, '2026-01-14 15:38:55', '2', '1');
INSERT INTO `n_user_bill` VALUES (123, '在线支付', 1.00, 3, '2026-01-14 15:40:33', '2', '1');
INSERT INTO `n_user_bill` VALUES (124, '在线支付', 21.00, 3, '2026-01-14 15:54:50', '2', '2');
INSERT INTO `n_user_bill` VALUES (125, '在线支付', 21.00, 3, '2026-01-14 15:56:10', '2', '2');
INSERT INTO `n_user_bill` VALUES (126, '在线支付', 1.00, 3, '2026-01-14 16:02:43', '2', '1');
INSERT INTO `n_user_bill` VALUES (127, '在线支付', 21.00, 3, '2026-01-14 16:02:50', '2', '2');
INSERT INTO `n_user_bill` VALUES (128, '在线支付', 1.00, 3, '2026-01-14 16:36:13', '2', '1');
INSERT INTO `n_user_bill` VALUES (129, '在线支付', 21.00, 3, '2026-01-14 16:37:25', '2', '2');
INSERT INTO `n_user_bill` VALUES (130, '在线充值', 1.00, 3, '2026-01-16 14:52:33', '1', '2');

-- ----------------------------
-- Table structure for n_user_like
-- ----------------------------
DROP TABLE IF EXISTS `n_user_like`;
CREATE TABLE `n_user_like`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_tid` int NULL DEFAULT NULL COMMENT '帖子ID',
  `n_uid` int NULL DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of n_user_like
-- ----------------------------
INSERT INTO `n_user_like` VALUES (40, 3, 7);
INSERT INTO `n_user_like` VALUES (42, 7, 3);

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of n_users
-- ----------------------------
INSERT INTO `n_users` VALUES (3, '小豆子', 'https://imgsbad.semoun.com/uploads/2025/09/30/68db2fc8a3547.jpg', '21089086@qq.com', 'pbkdf2$10$1c57b4b22437d8ed165c903667759a2c$71b86c3791dc05362c4458e4c337b56499f0165c22b5e5642bcbabdfb223f4d468d59e3f6eda11a836fc65b5eb01d9dd1d9319a193950ec5d9b48b057b46bc60', 'https://imgsbad.semoun.com/uploads/2024/12/23/6768fc9e4e262.png', '2025-12-11 14:12:54', 255.00, '这家伙很懒，什么都没留下', 'JSH02N3', 3, '2026-02-07 16:30:41', 0, '1', 'null', '21089086', 'rsrx9595', 73.00, 'oGNPJ65cSGc_SBpZY2S1XFs_rHHU', NULL, '1');
INSERT INTO `n_users` VALUES (7, '算个球', 'https://imgsbad.semoun.com/uploads/2025/06/24/685a6611c6b65.png', '12345623@qq.com', 'pbkdf2$10$68fa0880f9f832c13db9990238a334b4$1ee6fbd82291be431fbf6b9638ff3e4c05ebcfa99ddfb51655d9a28f0a54245271064983f879a43646bb48c2f6153869905da3bb98351138f529e5f86b387715', 'https://imgsbad.semoun.com/uploads/2024/12/23/6768fc9e4e262.png', '2026-01-13 13:04:55', 0.00, '这家伙很懒，什么都没留下', '17682', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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

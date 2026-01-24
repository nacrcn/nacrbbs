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
INSERT INTO `n_admins` VALUES (1, 'admin', 'pbkdf2$10$81a27e336f55368871c8047aa7b2f07f$bdb7b846b1ada6b4697b655c0c93256f42783d29a91dc68fa5a8de8746173ecf2b2a6160542e991777a161932e306c433e412d7add17333cabf220e7fb397dad', NULL);

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
INSERT INTO `n_payconfig` VALUES (1, 'Alipay', '支付宝官方支付', '[{\"name\":\"AppId\",\"value\":\"2021004162628615\",\"key\":\"appId\"},{\"name\":\"应用私钥\",\"value\":\"MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZGuk1cmNgJoLYV6GAEklo6dPSjE2Iz753ecdg1wntnjW39GCx6ubwOLsO9H/k3hzOIbc5p10ZD1SBNLL7Vjv/0LqXPtYZb6zRKoJDh8LuWjZ1c1r2U78YrxOzjHfb/locCxrKkim7FMtiQzIk4AcJCJTKDDP1ATNpf1gFdv20czihyefHm9XUU5J6XnkRhXiNChdyM+CeOVBAmABh713BNGoKihJyz/tB0JQ0BSyfawWPGMm6eUpdCrv/hke7h2Nwp4tCmVm4ofBYDbwA0CDAmepKGIni70emRcCoyHinTotAqwYvajB5PhwMXqWGRvidC9K3dxfDWw4OoaJ/s/OjAgMBAAECggEACj3im9CrFSN+XTp/czHF916s7Mi15xD+jL94tuGrqFmM/mE6lqxABpHE8ZspcwXop2FaAGFRuPtti7cawfVizhoIYVWyvMDbrqJJVHsgbxFZ00GENDYl8mDD0J705aJ+JKIZiLN+VyVs9YXJNO5HijMowNtQHnOWHNiH6tWq4wc3nR+L5SItlnXtahZ6vTSzJ9d3dzJ7WJTR1grIE6AHdM8qJYgaaNVzB8j8PGzXQuMBDg/gl4GbjWCoHEkCDkRNjZ6/aW6CfVTyWjYomFZ7z0wXWn2y159dZnWOBl6P1+DCfRLs+AJuyYpZOrkTJ/g0wpehimB2ZoClRyqZSQp0AQKBgQDQTffI6mNjxYV+itWvWRQqai2isTnvIsgMDsw3MPG2L0M1NWPbD4x8k+xro8OVHicVY1rhfBkjlKGxbfCsJLIoouPSIhnMxPGc/LUBP7Q7k2eott5eIt1MkIDQOW1Vm374uZyUlkADM1JW0YA0Pe1JjupD+yW4zI+AfwxMRkU1MwKBgQC8KVvfDtnr8pIOVDZJgVntK5V9PZexTabZDJ8MjfK66HIzn8Mu7J1uBfLfXyRpvWVX0Q9FPj9FrJo9Myd025mtnHZZWZzAlOO7HS90xOZlxfYSebS4hRR9jEDwrEkFtOKWZCvBT2O0+5PIq8kTyn1g4I+QfKsE3ShLtAdLvARn0QKBgQCDLHYbKa7JB3uXQmpp75iJVS/DwgMPmkGLhk4He2TbK0wRV7u4GUSItsYsyoXBg6ltCJIUaIeUJmbkSq1CWiFvAZShoSPKFUNpbqG1VZ5z3dFrJy1E7oOZUW4ssd0uCaudiZUW5L8OxOTXEzq+qzigF8ViZedNRlQfwOHHroCqjQKBgQCFdYBoUgxXwpG+ABURReIWytcZIdq6M62oPb+CFByaXczCuQqj+cggBbAip0UYivGau/nszx3puWcdCW9u/2OdNGDtNxZrsi9kxGqolBAnF6ZVrGV2i03hTt2w10Jj/czJhvtR/ZFnCRnlN5NDqlgLoruxa/uRU5wFNggGu7EUQQKBgGhmMsJr3djkOu0g9UaJXqNuTHOesSFY2IXsQTr0n7Uo1mKUnsTXjFc6TP0BYLgzYdn81UkZrH4Ur4uJGuD0peoAAnpo7qDB3vQXvknjhKLfzZ+xYlCNuVD0WDmknrSOkg/FjNruEhPlGBwzpRiKocFA5NNTT98CY3vntDseGxQT\",\"key\":\"privateKey\"},{\"name\":\"支付宝公钥\",\"value\":\"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi3V+VHACQ5FM7sMC7v3hb5+nXG3IstH4vAg3W3Ucvk5hG3iHsGowBAxhVYv01XycRTTpMl+XisE1OO7oMnPP1NpYv17Ymhop1HtQ2onIhVb5+tAg7SVzUDpS8JY5CQHUMNhNER/NihbkB9Q+mjtSru+3Y4rDpwtPA7McqcIbs/EW1kTrDS6MH1OVGSBI/7+rkARkUfFWuQ9K9Cyncjygf7t/CzHT/x+Uz71l73mBzCxeex3+xhPFkgf1tTwHSsk8dLwPVhK7qSK/5QwC+5XGLJ5UNp5XG9uhgFDE3EgTYPC9OmjfXQW2ESAjJQRN0OepuP9vD09hi/9fow+G0pG1FQIDAQAB\",\"key\":\"alipayPublicKey\"},{\"name\":\"回调地址\",\"key\":\"notify_url\",\"value\":\"https://api.bbs.nacr.cn/api/PayNotify\"},{\"key\":\"return_url\",\"name\":\"返回地址\",\"value\":\"http://192.168.10.157:3000/pay/config\"}]', '2025-12-09 15:17:42', '1', '0', '0', '1');
INSERT INTO `n_payconfig` VALUES (3, 'WeChatPay', '微信JSAPI支付', '[{\"name\":\"公众账号ID\",\"key\":\"appid\",\"value\":\"wx3fd61e35e854b50c\"},{\"name\":\"商户ID\",\"key\":\"mchid\",\"value\":\"1670519997\"},{\"name\":\"证书序列号\",\"key\":\"serial_no\",\"value\":\"53CF475B32A51EA6C013C310F340B864295049B0\"},{\"name\":\"证书私钥\",\"key\":\"privateKey\",\"value\":\"-----BEGIN PRIVATE KEY----- MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZrE+x8otLNHTl 6FkgHXqiUQ81vHc3984u48yd4xb/5QKvL4ZYFlnOzhdGLgQe6dBto7oMnUy0u5PS j20Rcmyz62mYwg5h3363vQV63mAiCHFS2r+wsfzkLKvY25x7jx9Ho+cybXESk9u3 mbKFec001CnrlEU9FZX3rXXckA5XQHMpb5Wd03WJTIDUqfeQVNGYZ99W7T2THJpm QmLuApkV4HENeDEWi14KuqjKV19ffh24+Ov7De1dXTuZFo7hUExAEz4qwjQ7sagb p8aHb2wvU+e+DKCWnyJbDo7288XTpAF+xcNOCpa4Azfc3vecrOS+CzH5bL/BYkbI Z5Iw6xd7AgMBAAECggEAN8YsXp9zIuZ1DwSXZGqOmd7lsFEoy+1qreYL27oSHOoX YVHUZqAmFEMEe3o0EKw387Ma0X0929LAwglAQrbO8TYd601zPt6I9VLrbD7NkUyT JMk0DYNsD7yO2nRKhSXa6nt4a/sAsQdtFWP5QSyF6Aig9lmoD5WICo6wWk8GhW/U 3bFUz2qxMFRYrSkLqaiwgcqYKeMAS4y1o80PJXr4UPnxO0HwDxWG1C/nNpIzBU1P +gMby9/tpu2qkLJc/Wa3Xxir68F8MkRD5Cq2uUyR9aD1KjXyM3AsDMv94sZ+BOV/ 6I3dqGECwVwC5emXDLs9sHTEAcCX5vcdYY5zaGYPsQKBgQDJjgvxSCSjNmFQRZJA oLVeMfoQ+aZFJZusuo/1lHK7sIeORjSU1agzAoJT1gmFcDK9AGHQfobbRE8HHkQI 4TjrgOFSpy0BOmBaeu4pw7iAPNbgEhfESgS7w9et0EJdJ3UgqrMKegNdLaTRfllb e3ulUZFgFAdOKrlxYYzSoRlJxQKBgQDDLyLz/d17Wc/R+3Qto+opx01juRdrTVsH +BUnQf2U0DIjXN+nhY60MbZ/diwgJ9DzKirb3mJrEvie4BE1WQPuqjqa8LjpAQLi jncRc+2PjwKg9kr1CdPmdjy6Hhmws+TzqZWt7w6H+X7V731E7WZCjFQPQlB7WB4e /Uvf7TkwPwKBgCEG8LgJ3U8NUybnL479hpq3z8VGU1OTVQ4ZyAsy1xYgWCYdJPKa jCRHrfl04jyGZRoJXP3gLdLyP4zoDbfyx/P3O3TixgIkgbNx32LimnIRBhjTfieB BYOLFOV7cdR36b5/mjUGR1TWbOKTNKtD8b/mPM8kmQnbAGYu2PeOxGkNAoGANGkt 25KprHu7YElDMxY2xK0tzL9g2IFXFla5Z2dC7njRXcmMjPFCFoTa2nMi+id25jTG eW/HwbTAafkE5exXL/kp730ASiDpY2iZ9GfKvKfMLuizzAStj87kE54Ni/NiYUOC W8g7gKuwMUYzvxR4RxpjYA2Qiu5oeC3P9/s9RgUCgYB59012SZ7+c/DC9oboKCYI uXzp/6MQHtM/e15IMtyCzO64rtsGhrkgaJMXqiaUCXqX2tr5SMRHPl4IAQYMd2tt c8DBFLncDz4g5vFpQmm0TxZ4V5skq5iVAExWtAFKo9zUDaeEqalwqqWL48ZL5E09 SuPtWvBRPR4nIawcVcUajg== -----END PRIVATE KEY-----\"},{\"key\":\"notify_url\",\"name\":\"回调地址\",\"value\":\"http://192.168.10.157:3000/api/PayNotify\"},{\"name\":\"回调秘钥\",\"value\":\"JSPQO98SHN732YTDMZKSE998281JHSEE\",\"key\":\"callback_key\"}]', '2025-12-18 13:41:54', '1', '0', '0', '0');
INSERT INTO `n_payconfig` VALUES (4, 'Epay', '彩虹易支付', '[{\"name\":\"pid\",\"key\":\"pid\",\"value\":\"1000\"},{\"name\":\"key\",\"key\":\"key\",\"value\":\"25A4tZi3I36I5B2A4H3k9w943Tov3tti\"},{\"name\":\"apiUrl\",\"key\":\"apiUrl\",\"value\":\"https://pay.ccnre.pro/\"},{\"name\":\"notify_url\",\"key\":\"notify_url\",\"value\":\"http://192.168.10.157:9999/api/PayNotify\"}]', '2026-01-16 13:35:05', '0', 'null', '0', '0');

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
INSERT INTO `n_payorder` VALUES (107, 'ORD26011758732664', '1', '1000', '2026-01-17 10:55:58', NULL, NULL, NULL, 8, '[{\"type\":1,\"price\":1000}]', 'Epay', '2', 'https://bbs.nacr.cn/user/topup');
INSERT INTO `n_payorder` VALUES (108, 'ORD26011756227179', '1', '0.01', '2026-01-17 12:20:56', NULL, NULL, NULL, 3, '[{\"id\":8,\"type\":2}]', 'Alipay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (109, 'ORD26011712986395', '1', '1', '2026-01-17 12:26:52', NULL, NULL, NULL, 11, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', NULL, NULL, 'https://bbs.nacr.cn/threads/10');
INSERT INTO `n_payorder` VALUES (110, 'ORD26011725109546', '1', '1', '2026-01-17 12:30:25', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', NULL, NULL, 'http://192.168.10.157:3000/threads/10');
INSERT INTO `n_payorder` VALUES (111, 'ORD26011731884918', '1', '1', '2026-01-17 12:30:31', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', NULL, NULL, 'http://192.168.10.157:3000/threads/10');
INSERT INTO `n_payorder` VALUES (112, 'ORD26011763581965', '1', '10', '2026-01-17 12:31:03', NULL, NULL, NULL, 11, '[{\"type\":1,\"price\":10}]', 'Alipay', '2', 'https://bbs.nacr.cn/user/topup');
INSERT INTO `n_payorder` VALUES (113, 'ORD26011736128918', '1', '10', '2026-01-17 12:32:16', NULL, NULL, NULL, 3, '[{\"id\":4,\"type\":2}]', NULL, NULL, NULL);
INSERT INTO `n_payorder` VALUES (114, 'ORD26011708070553', '1', '10', '2026-01-17 14:13:28', NULL, NULL, NULL, 14, '[{\"type\":1,\"price\":10}]', NULL, '2', 'https://bbs.nacr.cn/user/topup');
INSERT INTO `n_payorder` VALUES (115, 'ORD26011720159579', '2', '1', '2026-01-17 16:25:20', '2026-01-17 16:25:26', NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":10}]', 'BalancePay', NULL, 'https://bbs.nacr.cn/threads/10');
INSERT INTO `n_payorder` VALUES (116, 'ORD26011772644576', '1', '10', '2026-01-17 19:32:52', NULL, NULL, NULL, 17, '[{\"type\":1,\"price\":10}]', NULL, '2', 'http://bbs.nacr.cn/user/topup');
INSERT INTO `n_payorder` VALUES (117, 'ORD26011758836277', '1', '10', '2026-01-17 20:00:58', NULL, NULL, NULL, 9, '[{\"type\":1,\"price\":10}]', NULL, '2', 'https://bbs.nacr.cn/user/topup');
INSERT INTO `n_payorder` VALUES (118, 'ORD26011952053076', '1', '5', '2026-01-19 19:29:12', NULL, NULL, NULL, 21, '[{\"id\":3,\"type\":2}]', 'Alipay', NULL, NULL);
INSERT INTO `n_payorder` VALUES (119, 'ORD26012196913261', '1', '50', '2026-01-21 14:34:56', NULL, NULL, NULL, 26, '[{\"type\":1,\"price\":50}]', NULL, '2', 'https://bbs.nacr.cn/user/topup');
INSERT INTO `n_payorder` VALUES (120, 'ORD26012130688010', '1', '1', '2026-01-21 15:15:30', NULL, NULL, NULL, 3, '[{\"price\":\"1.00\",\"type\":3,\"id\":47}]', NULL, '3', 'https://bbs.nacr.cn/threads/47');
INSERT INTO `n_payorder` VALUES (121, 'ORD26012145139496', '1', '10', '2026-01-21 17:17:25', NULL, NULL, NULL, 28, '[{\"type\":1,\"price\":10}]', 'Alipay', '2', 'https://bbs.nacr.cn/user/topup');
INSERT INTO `n_payorder` VALUES (122, 'ORD26012144614103', '1', '0.01', '2026-01-21 17:29:04', NULL, NULL, NULL, 28, '[{\"price\":\"0.01\",\"type\":3,\"id\":36}]', NULL, NULL, 'https://bbs.nacr.cn/threads/36');

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
INSERT INTO `n_payorder_item` VALUES (96, 107, '积分余额充值', 1, 1000.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (97, 108, '购买SVIP', 1, 0.01, 8, '2');
INSERT INTO `n_payorder_item` VALUES (98, 109, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (99, 110, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (100, 111, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (101, 112, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (102, 113, '购买VIP', 1, 10.00, 4, '2');
INSERT INTO `n_payorder_item` VALUES (103, 114, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (104, 115, '购买帖贴子 - 10', 1, 1.00, 10, '3');
INSERT INTO `n_payorder_item` VALUES (105, 116, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (106, 117, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (107, 118, '购买VIP', 1, 5.00, 3, '2');
INSERT INTO `n_payorder_item` VALUES (108, 119, '积分余额充值', 1, 50.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (109, 120, '购买帖贴子 - 47', 1, 1.00, 47, '3');
INSERT INTO `n_payorder_item` VALUES (110, 121, '积分余额充值', 1, 10.00, NULL, '1');
INSERT INTO `n_payorder_item` VALUES (111, 122, '购买帖贴子 - 36', 1, 0.01, 36, '3');

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
INSERT INTO `n_tclist` VALUES (70, 3, 18, '1');
INSERT INTO `n_tclist` VALUES (71, 7, 18, '2');
INSERT INTO `n_tclist` VALUES (97, 3, 32, '1');
INSERT INTO `n_tclist` VALUES (98, 7, 32, '2');
INSERT INTO `n_tclist` VALUES (101, 3, 34, '1');
INSERT INTO `n_tclist` VALUES (102, 9, 34, '2');
INSERT INTO `n_tclist` VALUES (103, 3, 35, '1');
INSERT INTO `n_tclist` VALUES (104, 8, 35, '2');
INSERT INTO `n_tclist` VALUES (105, 3, 36, '1');
INSERT INTO `n_tclist` VALUES (106, 1, 36, '1');
INSERT INTO `n_tclist` VALUES (107, 7, 36, '2');
INSERT INTO `n_tclist` VALUES (108, 3, 37, '1');
INSERT INTO `n_tclist` VALUES (109, 7, 37, '2');
INSERT INTO `n_tclist` VALUES (110, 3, 38, '1');
INSERT INTO `n_tclist` VALUES (111, 7, 38, '2');
INSERT INTO `n_tclist` VALUES (116, 1, 40, '1');
INSERT INTO `n_tclist` VALUES (117, 8, 40, '2');
INSERT INTO `n_tclist` VALUES (118, 1, 41, '1');
INSERT INTO `n_tclist` VALUES (119, 7, 41, '2');
INSERT INTO `n_tclist` VALUES (123, 2, 44, '1');
INSERT INTO `n_tclist` VALUES (124, 7, 44, '2');
INSERT INTO `n_tclist` VALUES (125, 2, 45, '1');
INSERT INTO `n_tclist` VALUES (126, 9, 45, '2');
INSERT INTO `n_tclist` VALUES (129, 1, 46, '1');
INSERT INTO `n_tclist` VALUES (130, 7, 46, '2');
INSERT INTO `n_tclist` VALUES (132, 3, 47, '1');
INSERT INTO `n_tclist` VALUES (133, 8, 47, '2');
INSERT INTO `n_tclist` VALUES (134, 3, 48, '1');
INSERT INTO `n_tclist` VALUES (135, 8, 48, '2');
INSERT INTO `n_tclist` VALUES (136, 1, 49, '1');
INSERT INTO `n_tclist` VALUES (137, 8, 49, '2');
INSERT INTO `n_tclist` VALUES (138, 1, 51, '1');
INSERT INTO `n_tclist` VALUES (139, 7, 51, '2');

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
INSERT INTO `n_threads` VALUES (32, '大家好我是新人', 13, '2026-01-17 19:35:48', '<p>大家好我是新人</p>', '7', 1, 0, '大家好我是新人', '1', 0.00, '[]', '2', '2', '2026-01-17 19:36:32', NULL);
INSERT INTO `n_threads` VALUES (34, '部署Nacl系统的方法？', 9, '2026-01-17 19:43:46', '<p>一、准备宝塔环境</p><p>通过主机商，获取ssl信息，使用ssl软件进行登录</p><p>登录后使用root权限执行</p><p><code>if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ssl251104</code></p><p>输入y，等待2~10mins</p><p>二、克隆仓库、安装依赖</p><p>---后端安装</p><p>a.任意目录下执行</p><p><code>git clone https://gitee.com/wuaxcn/nacrbbs.git</code></p><p><code>cd /nacrbbs</code></p><p>进入之后，执行<code>npm i </code>安装所需依赖（服务端的）</p><p>b.修改/app/config里面的resdi和mysql信息为自己的</p><p>（nysql默认端口3306，reisd默认端口6379</p><p>---前端安装依赖（前台</p><p>a.进入/web/client目录</p><p>b.执行<code>npm i</code> 安装依赖</p><p>---前端安装依赖）后台</p><p>a.进入/web/admin目录</p><p>b.执行<code>npm i</code> 安装依赖</p><p>三、添加宝塔项目（同一管理</p><p>a.进入宝塔面板 - 网站 - node项目</p><p>b.安装nodejs版本，设置命令行版本为18+</p><p>---添加项目</p><p>（服务端：</p><p>点击添加项目-导向nact根目录-启动命令写<code>/sd2/nacrbbs/index.js</code> 保存项目</p><p>（前面安装完了依赖，那无需勾选安装依赖，启动命令选npm而非pnpm</p><p>启动后端口为9999，无需通外网）</p><p>---</p><p>（前端：用户端</p><p>点击添加项目-导向/web/client-启动命令选第二个</p><p>（前面安装完了依赖，那无需勾选安装依赖，启动命令选npm而非pnpm</p><p>启动后端口为3001，需通外网，可绑域名）</p><p>---</p><p>（前端：管理端</p><p>点击添加项目-导向/web/client-启动命令选第二个</p><p>（前面安装完了依赖，那无需勾选安装依赖，启动命令选npm而非pnpm</p><p>启动后端口为3000，需通外网，可绑域名）</p><p><span style=\"background-color: rgb(245, 219, 77);\">账号为admin，密码为123456（及时修改以防止泄露</span></p><p>---</p><p>Tips：修改数据库后必须重启一下三个端</p><p><br></p>', '27', 1, 0, '在宝塔环境下安装', '1', 0.00, '[]', '2', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (35, '测试视频播放', 13, '2026-01-17 19:51:02', '<p><br></p><p><br></p><div data-w-e-type=\"video\" data-w-e-is-void>\n<video poster=\"\" controls=\"true\" width=\"720\" height=\"720\"><source src=\"https://files.codelife.cc/itab/defaultWallpaper/videos/87.mp4\" type=\"video/mp4\"/></video>\n</div><p><br></p>', '59', 0, 0, '测试视频播放', '1', 0.00, '[{\"type\":2,\"url\":\"https://files.codelife.cc/itab/defaultWallpaper/videos/87.mp4\"}]', '2', '1', NULL, NULL);
INSERT INTO `n_threads` VALUES (36, '付费查看惊喜', 3, '2026-01-17 22:19:58', '<p>骗你的 啥都没有，感谢您的捐款</p>', '31', 0, 0, '付费即可查看超级惊喜哦', '3', 0.01, '[]', '2', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (37, '哎呀 万一我只有一个图咋办', 3, '2026-01-17 22:22:26', '<p>哎呀 万一我只有一个图咋办哎呀 万一我只有一个图咋办哎呀 万一我只有一个图咋办</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768659737454_ghd5kf.png\" alt=\"\" data-href=\"\" style=\"\"/></p>', '15', 1, 1, '哎呀 万一我只有一个图咋办哎呀 万一我只有一个图咋办哎呀 万一我只有一个图咋办', '1', 0.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768659737454_ghd5kf.png\"}]', '1', '2', '2026-01-19 00:07:16', NULL);
INSERT INTO `n_threads` VALUES (38, '哎呀 万一我只有2个图咋办', 3, '2026-01-17 22:22:52', '<p><br></p><p>哎呀 万一我只有2个图咋办哎呀 万一我只有2个图咋办哎呀 万一我只有2个图咋办哎呀 万一我只有2个图咋办<img src=\"https://api.bbs.nacr.cn/public/upload/img_1768659737454_ghd5kf.png\" alt=\"\" data-href=\"\" style=\"\"/><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768659769839_r2wcts.png\" alt=\"\" data-href=\"\" style=\"\"/></p>', '32', 1, 0, '哎呀 万一我只有2个图咋办哎呀 万一我只有2个图咋办哎呀 万一我只有2个图咋办哎呀 万一我只有2个图咋办', '1', 0.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768659737454_ghd5kf.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768659769839_r2wcts.png\"}]', '1', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (39, '哎呀 万一我只有3个图咋办', 3, '2026-01-17 22:24:04', '<p>哎呀 万一我只有3个图咋办哎呀 万一我只有3个图咋办哎呀 万一我只有3个图咋办哎呀 万一我只有3个图咋办<img src=\"https://api.bbs.nacr.cn/public/upload/img_1768659842734_6lh9zm.png\" alt=\"\" data-href=\"\" style=\"\"/><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768659794656_8cgwil.jpg\" alt=\"\" data-href=\"\" style=\"\"/><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768659794775_de2tso.png\" alt=\"\" data-href=\"\" style=\"\"/></p>', '49', 0, 0, '哎呀 万一我只有3个图咋办哎呀 万一我只有3个图咋办哎呀 万一我只有3个图咋办', '1', 0.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768659842734_6lh9zm.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768659794656_8cgwil.jpg\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768659794775_de2tso.png\"}]', '1', '2', '2026-01-18 16:14:11', NULL);
INSERT INTO `n_threads` VALUES (40, '各位好人，大佬，带走记得留个star', 3, '2026-01-18 17:29:16', '<p><span style=\"color: rgba(0, 0, 0, 0.85); background-color: rgba(0, 0, 0, 0.04); font-size: 16px;\">各位好人，大佬，带走记得留个star,制作不易，您的star就是对我最大的支持</span></p><p><br></p><ul><li style=\"text-align: start;\">gitee项目地址：<a href=\"https://gitee.com/wuaxcn/nacrbbs\" target=\"_blank\">https://gitee.com/wuaxcn/nacrbbs</a></li><li style=\"text-align: start;\">github项目地址：<a href=\"https://github.com/nacrcn/nacrbbs\" target=\"_blank\">https://github.com/nacrcn/nacrbbs</a></li><li style=\"text-align: start;\"></li></ul><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768728497367_ilqrkp.png\" alt=\"\" data-href=\"\" style=\"\"/><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768728497509_8hkmdr.png\" alt=\"\" data-href=\"\" style=\"\"/><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768728498051_pf63je.png\" alt=\"\" data-href=\"\" style=\"\"/></p>', '88247', 2837, 0, '各位好人，大佬，带走记得留个star,制作不易，您的star就是对我最大的支持', '1', 0.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768728497367_ilqrkp.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768728497509_8hkmdr.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768728498051_pf63je.png\"}]', '1', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (41, '小渡API：免费赋能开发者，让数据流动更自由', 14, '2026-01-18 19:21:07', '<h3 style=\"text-align: left;\">核心定位：免费开放，坚守初心</h3><p>这款实用的接口服务平台，由顾渊渡团队独立开发并悉心维护，核心使命便是“让数据传输更加快捷、高效，助力开发者轻松实现信息互通”。与市面上多数API服务不同，小渡API坚持完全免费的定位，摒弃了传统服务的订阅费用与调用额度限制——在合理使用范围内，开发者无需承担任何成本，便能拥有一片无负担的技术试验田，自由探索数据应用的多元可能，尽情释放创作灵感。</p><h3 style=\"text-align: left;\">性能优势：高效稳定，筑牢后盾</h3><p>高效稳定，是小渡API脱颖而出的核心竞争力。团队对平台架构进行了精心打磨，从底层技术层面保障接口的快速响应与高可用性，即便面临多并发请求的场景，也能稳定传输数据、不卡顿、不中断。无论是个人博客的小功能迭代、校园项目的开发实践，还是初创产品的原型验证，小渡API都能凭借扎实的性能表现，成为可靠的后端支撑，避免因接口问题拖慢开发进度、影响用户体验。</p><h3 style=\"text-align: left;\">易用特性：低门槛上手，适配全层级开发者</h3><p>而易用性设计，则让小渡API成为不同层级开发者的“心头好”。平台接口严格遵循RESTful等通用设计原则，配套文档清晰详尽，每一个参数的说明、每一次调用的示例都一目了然，没有晦涩的技术术语堆砌。即便是刚入门的新手开发者，也能快速理清接口逻辑，通过简单的HTTP请求（GET/POST等）完成接入，无需花费大量时间攻克复杂技术壁垒，真正实现“上手即开发”，专注于核心功能的打磨。</p><h3 style=\"text-align: left;\">接口生态：丰富多元，覆盖多场景需求</h3><p>丰富且持续更新的接口库，更是让小渡API能够适配多场景开发需求，覆盖开发者的各类实用诉求。目前平台提供的接口，已涵盖数据查询、实用工具、娱乐拓展等多个维度，兼顾功能性与趣味性：想为产品添点文艺感，有“一言”接口随机返回治愈文案；需要解析地理或身份信息，省份解析接口可快速提取身份证编码、出生日期、经纬度等数据；关注网站安全与性能，SSL证书查询、网站测速工具能精准赋能；追求个性化体验，王者随机音效、网易云用户信息解析等接口，能贴合兴趣场景打造特色功能。每一项接口都精准对接实际开发需求，同时团队持续倾听开发者声音，不断扩充接口品类、优化功能体验，让平台始终紧跟行业潮流。</p><h3 style=\"text-align: left;\">核心价值：打破数据孤岛，简化开发流程</h3><p>小渡API的核心价值，更在于打破多平台间的“数据孤岛”，让跨场景信息互通变得高效又简单。在实际开发场景中，它就像开发者的“减负神器”，能省去大量重复搭建后端、调试数据接口的繁琐工作：为个人博客添加实时天气部件，无需从零对接气象数据源、搭建专属后端；为工具类应用增加信息验证功能，不用耗时开发解析模块，直接调用接口即可实现；快速搭建产品原型验证想法时，也无需为接口资源耗费成本，极大缩短开发周期。而它的接入流程同样简洁高效，门槛极低：开发者只需访问官方域名api.dwo.cc，查阅最新官方文档，按照指引通过HTTP请求（GET/POST等）调用对应接口、传递参数，便能快速获取标准化响应数据，只要遵循平台合理使用规范，就能长期享受稳定、无负担的服务支持。</p><h3 style=\"text-align: left;\">持续迭代：以需求为导向，永葆活力</h3><p>顾渊渡团队始终以开发者需求为导向，对小渡API（api.dwo.cc）进行持续迭代优化。在坚守免费、稳定、易用三大核心优势的基础上，团队不断打磨服务架构、扩充接口品类、提升响应性能，拒绝“一成不变”。这种主动迭代的态度，让小渡API始终保持鲜活的生命力，为开发者提供更优质、更全面的接口支撑，成为陪伴大家从入门到进阶的得力技术伙伴。</p><h3 style=\"text-align: left;\">总结：赋能创作者，共赴数据新未来</h3><p>对于每一位怀揣创意的开发者来说，小渡API（api.dwo.cc）早已不只是一款免费接口工具，更像是一份开放、互助的技术馈赠。它用稳定的性能筑牢基础，用易用的设计降低门槛，用丰富的功能拓宽边界，为每一个创意落地铺路搭桥，让每一个开发想法都能在数据的助力下快速生长。未来，随着小渡API的持续迭代与优化，这款源于开发者需求、服务于开发者的平台，必将赋能更多创作者，在数据互通的赛道上书写更多精彩可能。</p><p><br></p>', '54', 2, 1, '在数字化开发的浪潮中，高效、顺畅的数据互通是每一个项目落地的核心前提。对于个人开发者、初创团队乃至学生群体而言，优质的接口服务往往被付费门槛、复杂的接入流程所束缚，让不少创意卡在了起步阶段。而小渡API（api.dwo.cc）的出现，正以“Free API for Everyone”的开放理念打破这一壁垒，为每一位创作者搭建起一座免费、稳定、易用的数据桥梁，让创意落地不再受限于接口资源。', '1', 0.00, '[]', '2', '2', '2026-01-18 19:26:56', NULL);
INSERT INTO `n_threads` VALUES (42, '不错', 18, '2026-01-18 20:21:48', '<p><br></p>', '75', 0, 3, '保持更新.........希望论坛能多活几年。', '1', 0.00, '[]', '2', '2', '2026-01-18 20:25:05', NULL);
INSERT INTO `n_threads` VALUES (44, '宝塔面板Mysql 本地NavCat连接不上解决方法', 3, '2026-01-20 10:48:07', '<p>宝塔面板Mysql 本地NavCat连接不上解决方法，开放权限，开放端口访问即可，详细教程如下</p><h2>1、 创建一个“干净的” root@%</h2><h4>MySQL 5.7 / 8.0 通用写法：</h4><pre><code >CREATE USER \'root\'@\'%\' IDENTIFIED BY \'你的root密码\';</code></pre><p>如果提示用户已存在，用：</p><pre><code >ALTER USER \'root\'@\'%\' IDENTIFIED BY \'你的root密码\';</code></pre><h2>2、赋予最高权限（全局）</h2><pre><code >GRANT ALL PRIVILEGES ON *.* TO \'root\'@\'%\' WITH GRANT OPTION;\r\nFLUSH PRIVILEGES;</code></pre><h2>3、开放3306端口即可</h2><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768877268435_q06fjg.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768877278977_lbbn2d.png\" alt=\"\" data-href=\"\" style=\"\"/></p>', '26', 0, 0, '宝塔面板Mysql 本地NavCat连接不上解决方法，开放权限，开放端口访问即可，详细教程如下', '1', 0.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768877268435_q06fjg.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768877278977_lbbn2d.png\"}]', '1', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (45, '提交记录显示的名字 ≠ GitHub 账号名', 3, '2026-01-20 10:50:13', '<h2>一、为什么会不一致？</h2><p>每一次 <code>git commit</code>，Git 只记录两样东西：</p><pre><code >user.name\nuser.email</code></pre><p>而 <strong>GitHub 是通过 email 来关联账号的</strong>：</p><ul><li>email ✅ 绑定在你 GitHub 账号里 → 显示为你的账号</li><li>name ❌ 只是展示用，不会自动变成 GitHub 昵称</li></ul><p>所以就会出现：</p><p><br></p><table style=\"width: auto;\"><tbody><tr><th colSpan=\"1\" rowSpan=\"1\" width=\"auto\">项目</th><th colSpan=\"1\" rowSpan=\"1\" width=\"auto\">来源</th></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">提交记录里的名字</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">本地 git config</td></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">GitHub 显示的头像/账号</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">email 是否匹配 GitHub</td></tr></tbody></table><p><br></p><h2>二、快速检查你现在的配置</h2><p>在项目目录或任意地方执行：</p><pre><code >git config user.name\ngit config user.email\n</code></pre><p>如果是全局配置：</p><pre><code >git config --global user.name\ngit config --global user.email\n</code></pre><p><br></p><h2>三、正确设置（推荐）</h2><h3>1️⃣ 设置为和 GitHub 一致的名字</h3><pre><code >git config --global user.name \"你的GitHub用户名\"\ngit config --global user.email \"你GitHub绑定的邮箱\"\n</code></pre><p>💡 <strong>邮箱一定要是 GitHub → Settings → Emails 里存在的邮箱</strong></p><p><br></p>', '40', 0, 0, '这是 Git 很常见的问题，放心，不是 GitHub 出 bug 👍\n提交记录显示的名字 ≠ GitHub 账号名，原因在于：\nGit 提交用的是你本地 Git 的 user.name / user.email，而不是 GitHub 昵称', '1', 0.00, '[]', '2', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (46, 'NacrBBS全开源系统 - 宝塔面板搭建教程', 3, '2026-01-21 10:22:00', '<h3>注意：当前教程是您将源码编译完成后，进行的操作</h3><p style=\"text-align: left;\">github项目地址：<a href=\"https://github.com/nacrcn/nacrbbs\" target=\"_blank\">https://github.com/nacrcn/nacrbbs</a></p><p style=\"text-align: left;\">QQ：21089086</p><p style=\"text-align: left;\">微信：rsrx9595</p><p style=\"text-align: left;\">QQ群：893570125</p><hr/><h3>1. 前往宝塔的应用中心，安装nodejs项目管理器</h3><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768961613340_l2y94h.png\" alt=\"\" data-href=\"\" style=\"\"/></p><h3>2. 安装完成后，安装nodejs版本，最好选择22或者24</h3><p> &nbsp; &nbsp;安装完成后，命令行版本选择你安装的版本即可</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768961652795_5itb7d.png\" alt=\"\" data-href=\"\" style=\"\"/></p><h3>3. 创建文件夹，上传源码，分别为：后端nodejs,前端nodejs,后台nodejs</h3><p> &nbsp; &nbsp;这里我将前后台的前端放在了web中，您可以自由放置</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768961874093_i6uyzy.png\" alt=\"\" data-href=\"\" style=\"\"/></p><h3>4. 创建nodejs项目，先建立后端</h3><p> &nbsp; &nbsp;a. 部署后端，如图所示进行配置，注意：如果启动失败，可以将www改为root</p><p> &nbsp; &nbsp; &nbsp; &nbsp;数据库以及redis配置请前往/app/config进行修改</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768961933662_w9i5tn.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p> &nbsp; &nbsp;b. 部署前端（前台）</p><p> &nbsp; &nbsp; &nbsp; &nbsp;如果端口冲突，请前往server/index.mjs修改port值</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768962088178_mwague.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p> &nbsp; &nbsp;搭建配置如图所示</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768962113018_4umaiw.png\" alt=\"\" data-href=\"\" style=\"\"/></p>', '85', 2, 0, 'NacrBBS全开源系统在宝塔面板进行项目搭建的教程，很多不会，我这里发一下教程', '1', 0.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768961613340_l2y94h.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768961652795_5itb7d.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768961874093_i6uyzy.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768961933662_w9i5tn.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768962088178_mwague.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768962113018_4umaiw.png\"}]', '1', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (47, '测试发帖积分购买', 27, '2026-01-21 15:04:15', '<p><br></p>', '25', 1, 0, '', '2', 1.00, '[]', '2', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (48, '测试积分购买可查看，是否可直接外部查看图片', 27, '2026-01-21 15:07:08', '<p><br></p><p><br></p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1768979201086_8qf9h5.jpg\" alt=\"\" data-href=\"\" style=\"width: 50%;\"/></p>', '29', 0, 0, '', '2', 1.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1768979201086_8qf9h5.jpg\"}]', '1', '2', NULL, NULL);
INSERT INTO `n_threads` VALUES (49, 'NacrBBS编译教程', 3, '2026-01-23 17:10:47', '<h2>前言：</h2><p>在正式开始之前，请确认您的电脑有nodejs环境，没有的话，需要下载nodejs进行安装，这个就不写了，直接百度nodejs环境就可以</p><h2>正文：</h2><p>1.先下载我们的源码包，git就可以，在目录就是这个样子</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1769158928643_3clz3m.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p>2.我们用我们的任意代码编辑器，都可以，这里我用vscode,分别打开web里的两个文件夹，一个是前台，一个后台，前往文件app-config.js，将链接地址，改为您的后端网址，骤前后端都是一致的，</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1769159144589_35ilqo.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p>3. 打开我们的终端，输入 npm run build进行编译，注意：第一次安装nodejs环境，可能会出现npm不存在报错，可以选择重启电脑，或直接用电脑自带的cmd进行操作</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1769159233067_r3gcll.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p>4. 回车后进行编译，编译速度可能会有慢 可以耐心等待一下，直到出现以下提示，即代表编译完成</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1769159380866_8xvjoe.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p>5. 编译完成后，编译后的代码在.output文件夹，将里面的文件，压缩，然后接着看宝塔搭建教程即可，前后端操作都是一致的哈</p><p><br></p><p>宝塔搭建教程： <a href=\"https://bbs.nacr.cn/threads/46\" target=\"_blank\">https://bbs.nacr.cn/threads/46</a> </p><p><br></p>', '35', 1, 1, '很多人不知道怎么编译，这里给一个详细的教程，搭配宝塔搭建教程进行食用', '1', 0.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1769158928643_3clz3m.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1769159144589_35ilqo.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1769159233067_r3gcll.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1769159380866_8xvjoe.png\"}]', '1', '2', '2026-01-23 17:12:06', NULL);
INSERT INTO `n_threads` VALUES (51, '更新说明 - 2026-01-24', 3, '2026-01-24 10:35:02', '<p>前台增加勋章信息，以及提示，勋章颁发逻辑等信息</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1769221920658_7b8i8j.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p>后台增加勋章信息配置 支持粉丝数 发帖数 评论数 获赞数等</p><p><img src=\"https://api.bbs.nacr.cn/public/upload/img_1769222074991_jk8197.png\" alt=\"\" data-href=\"\" style=\"\"/></p>', '8', 1, 0, '更新了一个勋章部分模块，后台新增勋章编辑啥的，列表做了一定的优化', '1', 0.00, '[{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1769221920658_7b8i8j.png\"},{\"type\":1,\"url\":\"https://api.bbs.nacr.cn/public/upload/img_1769222074991_jk8197.png\"}]', '1', '2', NULL, NULL);

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
INSERT INTO `n_threads_like` VALUES (14, 1, 3, '2026-01-13 14:54:21');
INSERT INTO `n_threads_like` VALUES (15, 2, 3, '2026-01-13 15:22:21');
INSERT INTO `n_threads_like` VALUES (16, 3, 3, '2026-01-14 11:53:01');
INSERT INTO `n_threads_like` VALUES (17, 10, 3, '2026-01-14 12:17:15');
INSERT INTO `n_threads_like` VALUES (18, 11, 9, '2026-01-17 11:45:52');
INSERT INTO `n_threads_like` VALUES (19, 15, 3, '2026-01-17 16:50:48');
INSERT INTO `n_threads_like` VALUES (20, 16, 3, '2026-01-17 17:00:35');
INSERT INTO `n_threads_like` VALUES (22, 16, 13, '2026-01-17 18:26:21');
INSERT INTO `n_threads_like` VALUES (23, 32, 3, '2026-01-17 19:36:24');
INSERT INTO `n_threads_like` VALUES (24, 34, 9, '2026-01-17 19:44:04');
INSERT INTO `n_threads_like` VALUES (25, 41, 14, '2026-01-18 19:21:24');
INSERT INTO `n_threads_like` VALUES (26, 41, 3, '2026-01-18 19:26:44');
INSERT INTO `n_threads_like` VALUES (27, 40, 3, '2026-01-18 19:28:32');
INSERT INTO `n_threads_like` VALUES (28, 38, 3, '2026-01-19 00:06:54');
INSERT INTO `n_threads_like` VALUES (29, 37, 3, '2026-01-19 00:07:05');
INSERT INTO `n_threads_like` VALUES (30, 46, 3, '2026-01-21 10:22:58');
INSERT INTO `n_threads_like` VALUES (31, 46, 27, '2026-01-21 15:01:57');
INSERT INTO `n_threads_like` VALUES (40, 47, 3, '2026-01-24 10:01:21');
INSERT INTO `n_threads_like` VALUES (41, 49, 3, '2026-01-24 10:20:49');
INSERT INTO `n_threads_like` VALUES (42, 51, 3, '2026-01-24 10:35:12');

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
INSERT INTO `n_user_bill` VALUES (131, '签到奖励', 5.00, 9, '2026-01-17 11:45:22', '1', '1');
INSERT INTO `n_user_bill` VALUES (132, '签到奖励', 5.00, 11, '2026-01-17 12:27:49', '1', '1');
INSERT INTO `n_user_bill` VALUES (133, '签到奖励', 5.00, 12, '2026-01-17 12:37:34', '1', '1');
INSERT INTO `n_user_bill` VALUES (134, '签到奖励', 5.00, 14, '2026-01-17 14:14:14', '1', '1');
INSERT INTO `n_user_bill` VALUES (135, '在线支付', 1.00, 3, '2026-01-17 16:25:26', '2', '1');
INSERT INTO `n_user_bill` VALUES (136, '签到奖励', 5.00, 15, '2026-01-17 16:43:53', '1', '1');
INSERT INTO `n_user_bill` VALUES (137, '签到奖励', 5.00, 17, '2026-01-17 19:32:46', '1', '1');
INSERT INTO `n_user_bill` VALUES (138, '签到奖励', 5.00, 18, '2026-01-18 20:21:08', '1', '1');
INSERT INTO `n_user_bill` VALUES (139, '在线提现', 12.00, 3, '2026-01-19 09:47:08', '2', '2');
INSERT INTO `n_user_bill` VALUES (140, '在线提现', 1.00, 3, '2026-01-19 10:41:34', '2', '2');
INSERT INTO `n_user_bill` VALUES (141, '签到奖励', 5.00, 21, '2026-01-19 19:28:43', '1', '1');
INSERT INTO `n_user_bill` VALUES (142, '签到奖励', 5.00, 22, '2026-01-20 09:52:43', '1', '1');
INSERT INTO `n_user_bill` VALUES (143, '签到奖励', 5.00, 23, '2026-01-20 12:41:05', '1', '1');
INSERT INTO `n_user_bill` VALUES (144, '签到奖励', 5.00, 24, '2026-01-20 23:08:24', '1', '1');
INSERT INTO `n_user_bill` VALUES (145, '签到奖励', 5.00, 24, '2026-01-21 07:25:55', '1', '1');
INSERT INTO `n_user_bill` VALUES (146, '签到奖励', 5.00, 24, '2026-01-21 07:25:59', '1', '1');
INSERT INTO `n_user_bill` VALUES (147, '签到奖励', 5.00, 25, '2026-01-21 07:30:43', '1', '1');
INSERT INTO `n_user_bill` VALUES (148, '签到奖励', 5.00, 27, '2026-01-21 14:52:29', '1', '1');
INSERT INTO `n_user_bill` VALUES (149, '签到奖励', 5.00, 28, '2026-01-21 17:17:10', '1', '1');

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
INSERT INTO `n_user_like` VALUES (40, 3, 7);
INSERT INTO `n_user_like` VALUES (43, 3, 9);
INSERT INTO `n_user_like` VALUES (44, 7, 9);
INSERT INTO `n_user_like` VALUES (45, 9, 3);
INSERT INTO `n_user_like` VALUES (46, 3, 23);
INSERT INTO `n_user_like` VALUES (47, 3, 10);
INSERT INTO `n_user_like` VALUES (48, 3, 11);
INSERT INTO `n_user_like` VALUES (49, 3, 12);
INSERT INTO `n_user_like` VALUES (50, 3, 13);
INSERT INTO `n_user_like` VALUES (51, 3, 14);
INSERT INTO `n_user_like` VALUES (52, 3, 15);
INSERT INTO `n_user_like` VALUES (53, 3, 16);
INSERT INTO `n_user_like` VALUES (54, 3, 17);
INSERT INTO `n_user_like` VALUES (55, 3, 18);
INSERT INTO `n_user_like` VALUES (56, 3, 19);
INSERT INTO `n_user_like` VALUES (57, 3, 20);
INSERT INTO `n_user_like` VALUES (58, 3, 21);
INSERT INTO `n_user_like` VALUES (59, 3, 22);
INSERT INTO `n_user_like` VALUES (61, 3, 28);

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
INSERT INTO `n_users` VALUES (7, '算个球', 'https://imgsbad.semoun.com/uploads/2025/06/24/685a6611c6b65.png', '12345623@qq.com', 'pbkdf2$10$68fa0880f9f832c13db9990238a334b4$1ee6fbd82291be431fbf6b9638ff3e4c05ebcfa99ddfb51655d9a28f0a54245271064983f879a43646bb48c2f6153869905da3bb98351138f529e5f86b387715', 'https://imgsbad.semoun.com/uploads/2024/12/23/6768fc9e4e262.png', '2026-01-13 13:04:55', 0.00, '这家伙很懒，什么都没留下', '17682', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (8, '香蕉', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '171716816@qq.com', 'pbkdf2$10$b418d084e287c600a34f1b7217e62412$b298b68b7f6c2601e773f42181368a48910cd0fab4f5dae83d7f32b1e98110affaf0902f68291077b73b8a83d0fcf317c3ae09785990b03ca73fc7fb2f4ed7e4', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 10:55:11', 0.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (9, '无名', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'printgod@foxmail.com', 'pbkdf2$10$06615b8106c795492d4c7caeae597da5$d2b92a77cb612a75bafa6475d25845f34cc104305f8140bb8596cf2d63cd413d861a2a6b725be4a4cecd23ce651293a9e0c8e255086de15fd509afcb4a585c0d', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 11:45:15', 5.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (10, '爱在西元前', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '3121800562@qq.com', 'pbkdf2$10$2a02cd8b4e6227cd4ed1fe197ad2b478$bdcdf5ff9f3ad3d19e744b5d71a2a6fa0285a14355c9cf3a076a09ad6272d42ac64c4560a49be70a8eedb3a1a5d752bdc9fede48d9852bcb2f8dd091888b77fb', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 11:55:57', 0.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (11, 'QWQ', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'admin@ymhut.cn', 'pbkdf2$10$8a2f05087d65673f835b7bbf427d7da0$0d872f19f0570155dde28ff3f2750e7d05e1491fee1b7c496e2166c44bb8cdaf617712972a536597d9d459292c3f34e87fa17c257d4bd20115f0c855d1990271', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 12:26:44', 5.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (12, 'Hair', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '76365404@qq.com', 'pbkdf2$10$6f11b9807a4f8b86314203be01dff207$a2a1dc7529aec68d10cebd90fd219a36f84dbcc18cd1f30a8135ae4e6ce8abda99e1b5ae0262c218efe4c86f64fa29ab08c798f94e8f42a287f07fb6a6d0f474', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 12:37:16', 5.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (13, '192586992', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '192586992@qq.com', 'pbkdf2$10$d3d229e97a24be9413914a6b58f5838e$a0704bd29ab8cde60c0e676072a6544670f1c83c186e02aea70b77c66a757ee29eb378178f37ea176cf6fe0b789070b1e266f080d16ce8450504077b4c55d222', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 13:03:41', 0.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (14, 'heylie', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'admin@dwo.cc', 'pbkdf2$10$6d3b30d1324fa24483a03f1ef435a39a$7a09d6114d6af689d9d1b8de026cee3d2878f5ed36c32cfd2f2c2d42e852826e25a1494ccef2385821047f7de5737be07c46b98506b46bc46f79151de6b26194', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 14:13:04', 5.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (15, '一只冷漠的狐狸', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'aimoran520@163.com', 'pbkdf2$10$709644f58ab6ea6e8334b6d7fcead52e$b262045b58bef3d0651e6d7d4fa4e21addd9fb21d4fc1c12395c007e2a4e92643370d076b1e4851896b209a83330665f622036e61ba3c74cdea5f3b40100cb29', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 16:43:38', 5.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (16, 'yishu', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'yishuoe@gmail.com', 'pbkdf2$10$91c851f950e856d413604538b27993c0$f1d60b82734879463eea1fbb24565b1aee76037c8ee1a0bbb7185e9abd454e8fc7b8d82eab535c04bb3213b0f678244ed9bd66943493b10d1e3234e1dff26f53', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 18:46:45', 0.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (17, 'dadadada', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'dadadada@qq.com', 'pbkdf2$10$75b0ad53690833d6ab931103903c4ede$f551951e5f7fb807528502bdcf861c27938c1bd8c3b0790ac830b12dfd42dc9406ec01f6f216b532f467e03e8529f1248c0144feae16107583d466467820ffae', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-17 19:32:23', 5.00, '这家伙很懒，什么都没留下', '17686', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (18, 'kk', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'kk@kk.com', 'pbkdf2$10$ff3310a183c2339275dda38ecf600cc1$f150fd8e6719559fb1a2fda82fc1f68a66ae375769860e4ec6ee6376e139786e82bb093859ebdaa08243466b1612f8138a8c57b2928c0c91277d118592bad7f4', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-18 20:20:38', 5.00, '这家伙很懒，什么都没留下', '17687', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (19, '云梦', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '1614362884@qq.com', 'pbkdf2$10$51386cce070029ea3a51a807e51da85e$ca1d6488533f8298584f75515cbc542687e170a7162be27dcb9fb9770c51de010b9e0f65f946fa0738dcb62026e3b21c223db4e7db1246a6638c340000e3d9bb', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-18 21:42:21', 0.00, '这家伙很懒，什么都没留下', '17687', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (20, '11', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '11', 'pbkdf2$10$d9111ab07f701364515642caef2782b1$65fa9039e919c96d55432073454fb40e58c8b12e3a7671ef78c590a70a144cfed41154cead631eb27741ac228bdaf36747a2fb1448bdd72b070ecfa72bc53079', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-19 15:20:01', 0.00, '这家伙很懒，什么都没留下', '17688', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (21, 'qinweb', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'qin123456', 'pbkdf2$10$99b35971c82e5bfeaa1eb29bb2f6f171$44bc944fa2caf9dcd6b9fb410896c14c46db6b068ae7d688734cb15bec8d068f958d08fb5c789925c934250987765e8461a0b1f405b10981457ef60e218944ec', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-19 15:26:08', 5.00, '这家伙很懒，什么都没留下', '17688', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (22, 'h_11', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '2467013926@qq.com', 'pbkdf2$10$b8d748b6f75ddf435c231002518f0977$3d53aea0877c74bb881611a9dfa52116e4609825eb7cdbacb8c3826e38923c37898732e6cfc905c46bab4c57c4e0eb4fd1a651a9fa2971bb493d5c7c438f46b2', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-20 09:40:59', 5.00, '这家伙很懒，什么都没留下', '17688', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (23, '酷小呵', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '3111349763@qq.com', 'pbkdf2$10$4b267911bfda47fa097b44df49bbf474$f26800b243293e6ef619cf4287b5299009bca0369695d67ef7ef7e6d7b8bf5dad4ed6838058eaa94ae8840533dad0b518e87b20b180aa5bec43b4cd2759882d4', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-20 12:37:28', 5.00, '这家伙很懒，什么都没留下', '17688', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (24, 'weave', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '3498573556@qq.com', 'pbkdf2$10$5fef4b7043192a5a788b74ce29d6c69d$47f95ffb053e976a29a74ceb28f649bb0e8405cc56b6cdbad700afed66c1325e66b06a5e164de46d85e7a170ca2451cb06451141ec90e4d492fefdeb9613837f', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-20 23:08:02', 15.00, '这家伙很懒，什么都没留下', '17689', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (25, 'woshishui', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'Woshish@13.com', 'pbkdf2$10$b8ac206465ec99f79c5293f350f16674$39cff4e19f6942d160d1f5a179e4d61e04b2551b4e11cf2cbaeb8cc9f8b9b7a874e7b38e65315903667417d6c60b748c4cbbf470ae4b7873d51b6481e3ee22d3', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-21 07:30:28', 5.00, '这家伙很懒，什么都没留下', '17689', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (26, 'xing', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'xing@qq.com', 'pbkdf2$10$501dfd0904f4f3e2ca639869cce44e85$e183810e9cf19d23b7e3c63de02a41ac3e1c131dcd375f54fcd7e3d6eeccaa502e350df28073c9667467264a9a988140dfb4907c09ed20feddfa5c4ed79ed14b', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-21 14:34:18', 0.00, '这家伙很懒，什么都没留下', '17689', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (27, '哈基米', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '645013637@qq.com', 'pbkdf2$10$246be7d94a3b85afc0afb4d503c860c2$bc030816a2df9d0de677cafc855bef29676a6b597ac45bef3bbd78ce5de7fe24459eaae4e003c812e0a8e3719c167878664b838e14358eaf05d81eec50a47c36', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-21 14:51:51', 5.00, '这家伙很懒，什么都没留下', '17689', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (28, '鑫宇', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', '123@qq.com', 'pbkdf2$10$e28e155cc2cf6b54f6a2003c67c78141$7b80a2807436389a4108c7bc547cde256a13534d10b4738d45cd4829dae0e71246fd9aaba0ac0c63d4d57a3df30ff47d797802e068f95e6723a8fdc3d86ab792', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-21 17:16:22', 5.00, '这家伙很懒，什么都没留下', '17689', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);
INSERT INTO `n_users` VALUES (29, 'alice', 'https://imgsbad.semoun.com/uploads/2025/10/10/68e8a51c419bb.png', 'tmpalice@awsl.uk', 'pbkdf2$10$ab0b806c5bcd880b1ad9675eb7ff0896$0c0847d184b987ce163c9127fc0adae74ca30ed9f43065d5fb5d9df26e46964fcdf94aa6343369dbe1f9ca2a8f8aa7b3a9077c0b8d19dca81c47c1de83239416', 'https://imgsbad.semoun.com/uploads/2025/12/23/694a930b566df.png', '2026-01-23 17:37:27', 0.00, '这家伙很懒，什么都没留下', '17691', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL);

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

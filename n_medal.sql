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

 Date: 24/01/2026 10:42:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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

SET FOREIGN_KEY_CHECKS = 1;

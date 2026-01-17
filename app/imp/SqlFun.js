import { createPool } from 'mysql2/promise';
import { readFileSync } from 'fs';

class Mysql {
    static instance = null;
    static conditions = [];

    constructor() {
        this.init();
    }

    async init() {
        const rawConfig = readFileSync('./app/config/database.json', 'utf-8');
        const config = JSON.parse(rawConfig);
        this.pool = createPool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port,
            waitForConnections: true,
            connectionLimit: 10,
            multipleStatements: true,
            timezone: '+08:00',
            dateStrings: true

        });
    }

    static async getInstance() {
        if (!Mysql.instance) {
            Mysql.instance = new Mysql();
            await Mysql.instance.init();
        }
        return Mysql.instance;
    }

    async query(sql, params = []) {
        const [rows] = await this.pool.execute(sql, params);
        return rows;
    }

    async insert(table, data) {
        const keys = Object.keys(data);
        const placeholders = keys.map(() => '?').join(', ');
        const sql = `INSERT INTO \`${table}\` (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`;
        const values = Object.values(data);
        const [result] = await this.pool.execute(sql, values);
        return result.insertId;
    }

    async update(table, data, where = '1=1', whereParams = []) {
        const fields = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
        const sql = `UPDATE \`${table}\` SET ${fields} WHERE ${where}`;
        const values = [...Object.values(data), ...whereParams];
        const [result] = await this.pool.execute(sql, values);
        return result.affectedRows;
    }

    async delete(table, where = '', whereParams = []) {
        if (!where) throw new Error('必须指定 WHERE 条件');
        const sql = `DELETE FROM \`${table}\` WHERE ${where}`;
        const [result] = await this.pool.execute(sql, whereParams);
        return result.affectedRows;
    }


    // 异步获取分页数据
    async getPaginatedData(table, conditionSql = '', conditionParams = [], sort = ['id', 'DESC'], page = 1, size = 20, exclude = []) {
        // 计算偏移量
        const offset = (page - 1) * size;

        // 获取字段
        const fields = await this.selectFields(table, exclude);

        // 构建排序语句
        let orderClause = '';
        if (Array.isArray(sort[0])) {
            // 多字段排序 [['created_at', 'DESC'], ['id', 'ASC']]
            orderClause = sort.map(([field, direction]) => `\`${field}\` ${direction}`).join(', ');
        } else {
            // 兼容旧格式 ['id', 'DESC']
            orderClause = `\`${sort[0]}\` ${sort[1]}`;
        }

        // 拼接查询语句
        const dataSql = `SELECT ${fields} FROM \`${table}\` WHERE 1=1 ${conditionSql} ORDER BY ${orderClause} LIMIT ${offset}, ${size}`;
        const data = await this.query(dataSql, [...conditionParams]);

        // 查询总数
        const countSql = `SELECT COUNT(*) AS total FROM \`${table}\` WHERE 1=1 ${conditionSql}`;
        const total = await this.query(countSql, conditionParams);

        // 返回分页数据
        return {
            data,
            total: total[0].total || 0
        };
    }


    async selectFields(table, exclude = []) {
        const columns = await this.query(`SHOW COLUMNS FROM \`${table}\``);
        return columns
            .map(col => col.Field)
            .filter(f => !exclude.includes(f))
            .map(f => `\`${f}\``)
            .join(', ');
    }

    async transaction(actions = async (conn) => { }) {
        const conn = await this.pool.getConnection();
        try {
            await conn.beginTransaction();
            const result = await actions(conn);
            await conn.commit();
            return result;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }
}
class SqlBuilder {
    constructor() {
        this.conditions = [];
        this.params = [];
    }

    add(field, value, operator = '=') {
        if (value === '' || value === null || value === undefined) return this;

        switch (operator.toLowerCase()) {
            case 'like':
                this.conditions.push(`\`${field}\` LIKE ?`);
                this.params.push(`%${value}%`);
                break;
            case 'in':
                if (Array.isArray(value) && value.length) {
                    const placeholders = value.map(() => '?').join(', ');
                    this.conditions.push(`\`${field}\` IN (${placeholders})`);
                    this.params.push(...value);
                }
                break;
            case 'between':
                if (Array.isArray(value) && value.length === 2) {
                    if (value[0] == '' || value[1] == '' || value[0] == null || value[1] == null || value[0] == undefined || value[1] == undefined) {

                    } else {
                        this.conditions.push(`\`${field}\` BETWEEN ? AND ?`);
                        this.params.push(...value);
                    }

                }
                break;
            default:
                this.conditions.push(`\`${field}\` ${operator} ?`);
                this.params.push(value);
        }

        return this;
    }

    build() {
        const sql = this.conditions.length > 0 ? 'AND ' + this.conditions.join(' AND ') : '';
        return {
            sql,
            params: this.params
        };
    }
}

export default {
    Mysql,
    SqlBuilder
};


/* s使用方法 */
/* 

const Mysql = require('./Mysql');

(async () => {
    const db = await Mysql.getInstance();

    // 插入
    const id = await db.insert('user', { name: '张三', age: 20 });

    // 更新
    await db.update('user', { age: 22 }, 'id = ?', [id]);

    // 删除
    await db.delete('user', 'id = ?', [id]);

    // 分页查询
    const result = await db.getPaginatedData('user', 'AND age > ?', [18]);

    // 事务
    await db.transaction(async (conn) => {
        await conn.execute('INSERT INTO logs(content) VALUES(?)', ['操作1']);
        await conn.execute('UPDATE user SET balance = balance - 10 WHERE id = ?', [1]);
    });
})();

*/


/* 

const builder = new SqlBuilder();
const result = builder
    .add('name', '张三', 'like')
    .add('age', 20, '>=')
    .add('status', ['active', 'pending'], 'in')
    .add('created_at', ['2024-01-01', '2024-12-31'], 'between')
    .build();

console.log(result.sql);    
// WHERE `name` LIKE ? AND `age` >= ? AND `status` IN (?, ?) AND `created_at` BETWEEN ? AND ?

console.log(result.params); 
// ['%张三%', 20, 'active', 'pending', '2024-01-01', '2024-12-31']

*/
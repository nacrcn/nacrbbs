/* 获取导航上级目录 */
const getFid = async (fid) => {
    const list = [];
    let currentFid = fid;
    
    // 递归获取父级导航，避免重复查询
    while (currentFid > 0) {
        const res = await global.db.query('SELECT * FROM n_navigation where id = ?', [currentFid]);
        if (res.length === 0) break;
        
        list.unshift(res[0]); // 添加到数组开头，保持层级顺序
        currentFid = res[0].n_fid;
        
        // 防止无限循环
        if (list.length > 10) break;
    }
    
    return list;
}

/* 批量获取导航的上级目录 */
const getNavigationParents = async (navigationList) => {
    const parentMap = new Map();
    
    // 收集所有需要查询的父级ID
    const parentIds = new Set();
    navigationList.forEach(nav => {
        if (nav.n_fid > 0) {
            parentIds.add(nav.n_fid);
        }
    });
    
    // 一次性查询所有父级导航
    if (parentIds.size > 0) {
        const parentNavs = await global.db.query(
            `SELECT * FROM n_navigation WHERE id IN (${Array.from(parentIds).map(() => '?').join(',')})`,
            Array.from(parentIds)
        );
        
        // 建立父级导航映射
        parentNavs.forEach(parent => {
            parentMap.set(parent.id, parent);
        });
    }
    
    // 为每个导航构建上级目录列表
    const result = new Map();
    for (const nav of navigationList) {
        const parentList = [];
        let currentId = nav.n_fid;
        
        while (currentId > 0 && parentMap.has(currentId)) {
            const parent = parentMap.get(currentId);
            parentList.unshift(parent);
            currentId = parent.n_fid;
            
            if (parentList.length > 10) break; // 防止无限循环
        }
        
        result.set(nav.id, parentList);
    }
    
    return result;
}

/* n_navigation */
export default {
    /* 获取导航列表 */
    getNavigation: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        const SqlBuilder = new global.SqlBuilder();
        const sql = SqlBuilder.add('n_fid', pre.fid).build();
        
        // 获取分页数据
        const res = await global.db.getPaginatedData('n_navigation', sql.sql, sql.params, ['n_index', 'asc'], pre.page, pre.pagesize);
        
        if (res.data && res.data.length > 0) {
            // 批量获取父级导航，提高效率
            const parentMap = await getNavigationParents(res.data);
            
            // 为每个导航添加上级目录列表
            res.data.forEach(nav => {
                nav.n_fid_list = parentMap.get(nav.id) || [];
                nav.key = nav.n_index ?? 0
            });
        }
        
        global.sendMsg(reply, 200, '获取成功', res.data, res.total);
    }),
    
    /* 新增导航信息 */
    addNavigation: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        delete pre.n_index;
        await global.db.insert('n_navigation', pre);
        global.sendMsg(reply, 200, '操作成功');
    }),
    
    /* 编辑导航信息 */
    editNavigation: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;
        delete pre.key
        delete pre.n_fid_list

        if(pre.n_index == 'null' || pre.n_index == null || !pre.n_index){
            pre.n_index = 0
        }

        await global.db.update('n_navigation', pre, 'id = ?', [pre.id]);
        global.sendMsg(reply, 200, '操作成功');
    }),
    
    /* 删除导航信息 */
    delNavigation: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        await global.db.delete('n_navigation', 'id = ?', [pre.id]);
        global.sendMsg(reply, 200, '删除成功');
    }),
}
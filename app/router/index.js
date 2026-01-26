export default async function (router) {
    //  中间为权限，可定义
    //   await router.group('/api', ['UtokenNoMust'], async (open) => {
    //     await open.post('/getactivePack', 'Visitor/active/index@getactivePack');
    //   })


    await router.group('/api', ['NoMestUTokenVar'], async (open) => {
        /* 获取网站信息 */
        await open.post('/webinfo', 'api@webinfo');
        /* 用户登录 */
        await open.post('/login', 'user/Frame/login@login');
        /* 用户注册 */
        await open.post('/register', 'user/Frame/login@register');
        /* 用户找回密码 RetrievePassword */
        await open.post('/RetrievePassword', 'user/Frame/login@RetrievePassword');
        /* 微信小程序登录 WeChatMiniProgramLogin */
        await open.post('/WeChatMiniProgramLogin', 'user/Frame/login@WeChatMiniProgramLogin');

        /* 后台登录 login */
        await open.post('/adminlogin', 'Admin/Frame/login@login');

        /* 文件上传接口 */
        await open.post('/upload/image', 'upload@upImage');
        await open.post('/upload/file', 'upload@upFile');

        /* 支付回调接口 PayNotify */
        await open.post('/PayNotify', 'user/Frame/orderPay@PayNotify');
        await open.get('/PayNotify', 'user/Frame/orderPay@PayNotify');

        /* 发送验证码（邮箱） */
        await open.post('/sendVerificationCode', 'email@sendVerificationCode');
        /* 测试发信模式 sendTest */
        await open.post('/sendEmailTest', 'email@sendTest');

        /* 获取支付方式列表 GetPayMethod */
        await open.post('/GetPayMethod', 'user/Frame/orderPay@GetPayMethod');
        /* 支付订单 PayOrder */
        await open.post('/PayOrder', 'user/Frame/orderPay@PayOrder');

        /* 获取公告列表 */
        await open.post('/noticeList', 'tourist/notices@notices');
        /* 获取轮播图 */
        await open.post('/swipers', 'tourist/swipers@swipers');


        /* 获取会员列表 */
        await open.post('/getVipList', 'user/Frame/vip@usergroup');
        /* 获取会员价格 */
        await open.post('/getVipPrice', 'user/Frame/vip@usergroup_price');

        /* 获取活动列表 getActivity */
        await open.post('/getActivity', 'user/Frame/activity@getActivity');

        /* 获取分类列表 GetCategory*/
        await open.post('/GetCategory', 'tourist/class@class');
        /* 获取帖子列表 GetThreads */
        await open.post('/GetThreads', 'tourist/threads@GetThreads');

        /* 获取用户详情 GetUser */
        await open.post('/GetUser', 'tourist/user@GetUser');
        /* 获取评论列表 GetComments */
        await open.post('/GetComments', 'tourist/threads@GetComments');
    })

    await router.group('/api', ['UTokenVar'], async (open) => {
        /* 获取用户信息 */
        await open.post('/myinfo', 'user/Frame/info@info');
        /* 修改用户信息 editinfo */
        await open.post('/editinfo', 'user/Frame/info@editinfo');
        /* 签到 */
        await open.post('/checkIn', 'user/Frame/activity/checkIn@checkIn');
        /* 签到列表 */
        await open.post('/checkInList', 'user/Frame/activity/checkIn@checkInList');

        /* 获取邀请记录 */
        await open.post('/AcquisitionList', 'user/Frame/activity/userAcquisition@AcquisitionList');


        /* 创建订单信息 CreateOrder */
        await open.post('/CreateOrder', 'user/Frame/orderPay@CreateOrder');
        /* 获取订单信息 GetOrder */
        await open.post('/GetOrder', 'user/Frame/orderPay@GetOrder');
        /* 获取账单信息 getuserbill */
        await open.post('/getuserbill', 'user/Frame/bill@getuserbill');

        /* 获取签到奖励 getCheckInReward */
        await open.post('/getCheckInReward', 'user/Frame/activity/checkIn@getCheckInReward');


        /* 获取提现方式列表 GetWithdrawMethod */
        await open.post('/GetWithdrawMethod', 'user/Frame/withdraw@GetWithdrawMethod');
        /* 申请提现接口 UpWithdraw */
        await open.post('/UpWithdraw', 'user/Frame/withdraw@UpWithdraw');
        /* 获取提现记录 GetWithdrawList */
        await open.post('/GetWithdrawList', 'user/Frame/withdraw@GetWithdrawList');


        /* 创建房间 CreateRooms */
        await open.post('/CreateRooms', 'user/Frame/scoket/index@CreateRooms');
        /* 获取我的房间 GetMyRooms */
        await open.post('/GetMyRooms', 'user/Frame/scoket/index@GetMyRooms');
        /* 获取房间详情 GetRoomInfo */
        await open.post('/GetRoomInfo', 'user/Frame/scoket/index@GetRoomInfo');

        /* 积分转余额 pointsToBalance */
        await open.post('/pointsToBalance', 'user/Frame/info@pointsToBalance');


        /* 发布帖子接口 AddThreads */
        await open.post('/AddThreads', 'user/threads@AddThreads');
        /* 删除帖子 DelThreads */
        await open.post('/DelThreads', 'user/threads@DelThreads');
        /* 编辑帖子 EditThreads*/
        await open.post('/EditThreads', 'user/threads@EditThreads');
        /* 点赞帖子 LikeThreads */
        await open.post('/LikeThreads', 'user/threads@LikeThreads');

        /* 评论帖子 CommentThreads */
        await open.post('/CommentThreads', 'user/threads@CommentThreads');
        /* 删除评论 DelComments */
        await open.post('/DelComments', 'user/threads@DelComment');

        /* 关注用户 LikeUser */
        await open.post('/LikeUser', 'user/Frame/info@LikeUser');
        /* 举报帖子 ReportThreads */
        await open.post('/ReportThreads', 'user/threads@ReportThreads');

        /* 获取用户消息 GetMsgs */
        await open.post('/GetMsgs', 'user/Frame/msg@GetMsgs');


    })

    await router.group('/api', ['ATokenVar'], async (open) => {
        /* 获取用户信息 */
        await open.post('/userlist', 'Admin/Frame/users@userlist');
        /* 修改用户信息 */
        await open.post('/edituser', 'Admin/Frame/users@edituser');
        /* 删除用户 */
        await open.post('/deluser', 'Admin/Frame/users@deluser');



        /* 编辑站点信息 */
        await open.post('/editweb', 'Admin/Frame/web@editweb');
        /* 重置后台密码 changeadminpass */
        await open.post('/changeadminpass', 'Admin/Frame/web@changeadminpass');
        /* 获取站点信息 getweb */
        await open.post('/getweb', 'Admin/Frame/web@getweb');

        /* 获取用户组列表 */
        await open.post('/usergroup', 'Admin/Frame/users@usergroup');
        /* 新增用户组 */
        await open.post('/addusergroup', 'Admin/Frame/users@addusergroup');
        /* 编辑用户组 */
        await open.post('/editusergroup', 'Admin/Frame/users@editusergroup');
        /* 删除用户组 */
        await open.post('/delusergroup', 'Admin/Frame/users@delusergroup');
        /* 设置默认用户组 */
        await open.post('/deftusergroup', 'Admin/Frame/users@deftusergroup');

        /* 获取用户组价格列表 */
        await open.post('/usergroup_price', 'Admin/Frame/users@usergroup_price');
        /* 新增用户组价格 */
        await open.post('/addusergroup_price', 'Admin/Frame/users@addusergroup_price');
        /* 编辑用户组价格 */
        await open.post('/editusergroup_price', 'Admin/Frame/users@editusergroup_price');
        /* 删除用户组价格 */
        await open.post('/delusergroup_price', 'Admin/Frame/users@delusergroup_price');

        /* 新增公告信息 */
        await open.post('/addnotices', 'Admin/Frame/notices@addnotices');
        /* 编辑公告信息 */
        await open.post('/editnotices', 'Admin/Frame/notices@editnotices');
        /* 删除公告信息 */
        await open.post('/delnotices', 'Admin/Frame/notices@delnotices');

        /* 新增轮播图 */
        await open.post('/addswipers', 'Admin/Frame/swieprs@addswipers');
        /* 编辑轮播图 */
        await open.post('/editswipers', 'Admin/Frame/swieprs@editswipers');
        /* 删除轮播图 */
        await open.post('/delswipers', 'Admin/Frame/swieprs@delswipers');

        /* 获取邮件模板列表 */
        await open.post('/getEmailTemplate', 'Admin/Frame/emailTemplate@emailTemplate');
        /* 新增邮件模板 */
        await open.post('/addEmailTemplate', 'Admin/Frame/emailTemplate@addnemailTemplate');
        /* 编辑邮件模板 */
        await open.post('/editEmailTemplate', 'Admin/Frame/emailTemplate@editemailTemplate');
        /* 删除邮件模板 */
        await open.post('/delEmailTemplate', 'Admin/Frame/emailTemplate@delemailTemplate');

        /* 新增支付方式 */
        await open.post('/addPaymethod', 'Admin/Frame/Pay/payMethod@addPaymethod');
        /* 编辑支付方式 */
        await open.post('/editPayMethod', 'Admin/Frame/Pay/payMethod@editPaymethod');
        /* 删除支付方式 */
        await open.post('/delPayMethod', 'Admin/Frame/Pay/payMethod@delePaymethod');
        /* 获取支付方式列表 GetPayMethod */
        await open.post('/GetPayMethodAdmin', 'Admin/Frame/Pay/payMethod@GetPayMethod');

        /* 获取支付配置列表 */
        await open.post('/getPayConfig', 'Admin/Frame/Pay/payConfig@getPayconfig');
        /* 新增支付配置 */
        await open.post('/addPayConfig', 'Admin/Frame/Pay/payConfig@addPayconfig');
        /* 编辑支付配置 */
        await open.post('/editPayConfig', 'Admin/Frame/Pay/payConfig@editPayconfig');
        /* 删除支付配置 */
        await open.post('/delPayConfig', 'Admin/Frame/Pay/payConfig@delePayconfig');

        /* 获取支付订单列表 getPayOrder */
        await open.post('/getPayOrder', 'Admin/Frame/Pay/payOrder@getPayOrder');
        /* 删除订单 delePayOrder */
        await open.post('/delePayOrder', 'Admin/Frame/Pay/payOrder@delePayOrder');
        /* 手动回调 upPayNotify */
        await open.post('/upPayNotify', 'Admin/Frame/Pay/payOrder@upPayNotify');


        /* 获取导航列表 */
        await open.post('/getNavList', 'Admin/Frame/navigation@getNavigation');
        /* 新增导航 */
        await open.post('/addNavigation', 'Admin/Frame/navigation@addNavigation');
        /* 编辑导航 */
        await open.post('/editNavigation', 'Admin/Frame/navigation@editNavigation');
        /* 删除导航 */
        await open.post('/delNavigation', 'Admin/Frame/navigation@delNavigation');

        /* 获取活动列表 */
        await open.post('/getActivityList', 'Admin/Frame/activity@getActivity');
        /* 新增活动 */
        await open.post('/addActivity', 'Admin/Frame/activity@addActivity');
        /* 编辑活动 */
        await open.post('/editActivity', 'Admin/Frame/activity@editActivity');
        /* 删除活动 */
        await open.post('/delActivity', 'Admin/Frame/activity@deleActivity');

        /* 获取帖子列表 */
        await open.post('/GetThreadsAdmin', 'Admin/threads@GetThreads');
        /* 编辑忒子 EditThreads */
        await open.post('/EditThreadsAdmin', 'Admin/threads@EditThreads');
        /* 获取评论列表 */
        await open.post('/GetCommentsAdmin', 'Admin/threads@GetComments');
        /* 删除评论 DeleteComment */
        await open.post('/DelCommentsAdmin', 'Admin/threads@DeleteComment');
        /* 删除帖子 */
        await open.post('/DelThreadsAdmin', 'Admin/threads@DeleteThread');
        /* 获取举报记录 GetReport */
        await open.post('/GetReportAdmin', 'Admin/threads@GetReport');

        /* 获取分类列表 */
        await open.post('/getCategoryList', 'Admin/category@getCategory');
        /* 删除分类信息 delCategory */
        await open.post('/delCategoryAdmin', 'Admin/category@delCategory');
        /* 新增分类 */
        await open.post('/addCategoryAdmin', 'Admin/category@addCategory');
        /* 编辑分类 */
        await open.post('/editCategoryAdmin', 'Admin/category@editCategory');
        
        /* 数据统计 */
        await open.post('/GetIndexStatistics', 'Admin/Frame/Statistics/index@GetIndexStatistics');
        /* 获取综合趋势数据 */
        await open.post('/GetComprehensiveTrend', 'Admin/Frame/Statistics/index@GetComprehensiveTrend');

        /* 获取勋章 getMedal */
        await open.post('/getMedal', 'Admin/medal@getMedal');
        /* 新增勋章 addMedal */
        await open.post('/addMedal', 'Admin/medal@addMedal');
        /* 编辑勋章 editMedal */
        await open.post('/editMedal', 'Admin/medal@editMedal');
        /* 删除勋章 delMedal */
        await open.post('/delMedal', 'Admin/medal@delMedal');
      
    })
}
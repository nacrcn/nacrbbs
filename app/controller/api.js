export default {
    webinfo: (request, reply) => global.Fun(reply, async () => {
        const info = await global.db.query('SELECT * FROM n_configuration');

        delete info[0].n_email_host;
        delete info[0].n_email_port;
        delete info[0].n_email_secure;
        delete info[0].n_email_user;
        delete info[0].n_email_pass;
        delete info[0].n_email_from;
        global.sendMsg(reply, 200, '成功', info[0]);
    })
}
global.CONFIG = {
    port: 9999,
    wsPort:9888,
    userToken:{
        HeadersKey: 'usertoken',
        secretKey: 'Usertoken',
        expiresIn: 60 * 60 * 24 * 30
    },
    adminToken:{
        HeadersKey: 'admintoken',
        secretKey: 'admintoken',
        expiresIn: 60 * 60 * 24 * 30
    }
};

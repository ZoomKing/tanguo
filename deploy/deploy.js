const deploy = require('ali-oss-deploy')

deploy({
    path: '../build', // 改为自己的静态资源目录
    ossConfig: {
        // oss配置参数
        region: 'http://www.tanguo.site',
    },
    bucket: {
        pro: {
            name: 'tanguo-app',
            refreshPath: '', //可选，deploy后刷新缓存，必需保证url正确
        },
    },
})

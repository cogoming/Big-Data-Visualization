module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://183.239.241.108:50004', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '/api': '/api'
                }
            },
            '/api1': {
                target: 'http://183.239.241.108:50001', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '/api': '/api1'
                }
            }
        }
    }
}
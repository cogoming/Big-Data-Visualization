module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.59:3000', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '/api': '/api'
                }
            }
        }
    }
}
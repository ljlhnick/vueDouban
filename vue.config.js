module.exports={
    devServer:{
        port: 8083,
        https: false,
        open: true,
        proxy:{
            "/api":{
                target: "http://192.168.23.75:8083",
                ws:true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            },
            "/ban":{
                target: "https://api.douban.com",
                ws:true,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/ban':''
                }
            },
            // "/exp":{
            //     target:"http://192.168.23.75:3000",
            //     ws:true,
            //     changeOrigin:true,
            //     pathRewrite:{
            //         '^/exp':''
            //     }
            // }
        }
    }
};
const path  = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MinCssExtractProduction = require("mini-css-extract-plugin")
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports  = {
    mode: "development",
    entry:"./src/index.js",
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname, "bundle")
    },
    plugins:[
        new HtmlWebPackPlugin({
            filename: 'index.html', 
            template:"./src/index.html"
        }),
        new MinCssExtractProduction({filename:"[name].css"}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MinCssExtractProduction.loader,//3. Extrae Css into files 
                "css-loader",//2. Convierte css a common js
                "sass-loader"//1. Convierte sass a css
            ]
            },
            {
                test: /\.css$/,//3. Extrae Css into files
                use: [MinCssExtractProduction.loader,//2. Inyecta los estilos al DOM 
                "css-loader"//1. Convierte css a common js
            ]
            },
            {
                test: /\.(html)$/i,
                loader: "html-loader",
            },
            {
                type: "asset",
                test: /\.(png|svg|jpg|jpeg|gif|jfif)$/
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                  }
                }
              },
              {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]'
                }
              }
        ]
    }
}
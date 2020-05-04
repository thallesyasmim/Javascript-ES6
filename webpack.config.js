module.exports = {
    entry: ["@babel/polyfill", "./src/main.js"], // Vai dizer qual é o nosso arquivo principal, que no caso é main.js, aonde a gente escreve o nosso código em ES6, ES7, ES8, etc.
    output: { 
        path: __dirname + '/public', // Vai dizer qual é o diretório do nosso arquivo, esse dirname é uma variável global.
        filename: "./bundle.js"
    },
    devServer: {
        contentBase: __dirname + '/public' // Vai dizer qual é o caminho do nosso servidor
    },
    module: {
        rules: [ // Vai dizer como o arquivo vai se comportar quando o usuário querer importar novos arquivos JS.
            {
                test: /\.js$/, // expressão regular
                exclude: /node_modules/, // Para que o Babel rode somente nos nossos arquivos e em nenhum do node_modules.
                use: {
                    loader: "babel-loader",
                }
            }
        ],
    },
}
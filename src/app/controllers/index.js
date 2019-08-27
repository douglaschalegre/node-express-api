const fs = require('fs');
const path = require('path');

// utilizado para em cada arquivo da pasta controllers exceto com o de nome index.js seja importado
// no arquivo src/index utilizando apenas a chamada desse arquivo ../app/controllers/index
module.exports = app =>{
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
        .forEach(file => require(path.resolve(__dirname, file))(app));
}
const fs = require('fs')

const storage_path = base+'Storage/';

function putAs(path,fileName, fileBuffer){
    save(path+'/'+fileName, fileBuffer)
}

function put(path, fileBuffer) {
    save(realPath(path)+uniqueString(), fileBuffer)
}

function save(path,fileBuffer) {
    try {
        fs.writeFile(realPath(path), fileBuffer, () => {});
        return true
    }catch (e) {
        return e
    }
}

function uniqueString() {
    return '_' + Math.random().toString(36).substr(2, 9)+new Date().getTime();
}

function realPath(path){
    return storage_path+path
}

module.exports = {
     put, putAs
};
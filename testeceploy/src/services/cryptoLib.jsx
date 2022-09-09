export function loginCrypto(rawPassword) {
    var pad = require('pad-left');
    
    let result = "";
    rawPassword = rawPassword.toUpperCase();
    console.log(rawPassword);
    let n1_readData = rawPassword.length;

    if(n1_readData > 0){
        for (let index = 0; index < n1_readData; index++) {
        result += pad(256 - rawPassword.charCodeAt(index) - index - 1, 3, "0");
        }
    }
    else{
        result = rawPassword;
    }

    return result;
}
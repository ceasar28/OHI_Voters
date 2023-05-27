// function randomString(length, chars) {
//     var result = '';
//     for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//     return result;
// }
// let uuid = randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');



const uuid = (length, chars)=>{
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
module.exports = uuid;
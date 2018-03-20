const communication = require('./communication');
const {valToBase64, base64ToVal} = require('./base64convert');

const updateBase64 = communication.update;

const updateWithConversion = (key, value) =>
    updateBase64(key, valToBase64(value));


const readBase64 = communication.read;

const readWithConversion = key => new Promise(resolve =>
    readBase64(key).then(base64 =>
        resolve(base64ToVal(base64))));



module.exports = Object.assign(communication, {
    update: updateWithConversion,
    read: readWithConversion
});
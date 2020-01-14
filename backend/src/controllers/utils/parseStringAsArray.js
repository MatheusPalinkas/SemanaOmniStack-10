module.exports = (arrayAsString) => {
    return arrayAsString.split(',').map(itenString => itenString.trim());
}
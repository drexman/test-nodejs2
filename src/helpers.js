function camelize(text) {
    return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

function decamelize(str, separator) {
    separator = typeof separator === 'undefined' ? '_' : separator;

    return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}

function leftPad(value, totalWidth) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join('0') + value;
}

function titleize(str) {

    return str
        .replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2, offset) {
            if (p2) return p2.toUpperCase();
            return p1.toUpperCase()
        })
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .replace(/^\w/, function (chr) {
            return chr.toUpperCase();
        })
}

export default { camelize, decamelize, titleize, leftPad }
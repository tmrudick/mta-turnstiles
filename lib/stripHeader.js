module.exports = function(content) {
    content = content.split('\n');
    content.shift();
    return content.join('\n');
};

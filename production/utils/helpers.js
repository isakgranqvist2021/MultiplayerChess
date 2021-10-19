/** @format */
var randId = function (n) {
    if (n === void 0) { n = 10; }
    var runes = 'qwertyuiopasdfghjklzxcvbnm1234567890_'.split('');
    var id = '';
    for (var i = 0; i < n; i++)
        id += runes[Math.floor(Math.random() * runes.length)];
    return id;
};

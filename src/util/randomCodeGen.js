"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function genRandomDigit() {
    return Math.floor(Math.random() * 10);
}
var randomCodeGen = {
    generatePhotoString: function () {
        var digArr = [];
        for (var i = 0; i < 10; i++)
            digArr.push(genRandomDigit());
        return digArr.join('');
    },
    generateConfirmationCode: function () {
        throw new Error('Unimplemented');
    }
};
exports.default = randomCodeGen;

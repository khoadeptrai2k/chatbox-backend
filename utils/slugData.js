const SlugData = {
    removeUnicode(text, removeSpace) {
        /*
            string là chuỗi cần remove unicode
            trả về chuỗi ko dấu tiếng việt ko khoảng trắng
        */
        if (typeof text != 'string') {
            return '';
        }
        if (removeSpace && typeof removeSpace != 'boolean') {
            throw new Error('Type of removeSpace input must be boolean!');
        }
        text = text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
        if (removeSpace) {
            text = text.replace(/\s/g, '');
        }
        return text;
    }
};

module.exports = SlugData;
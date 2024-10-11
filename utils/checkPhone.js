const checkPhone = {
    isNumberPhone(phone) {
        const regex = new RegExp(/([+84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/);
        return regex.test(phone);
    },
}

module.exports = checkPhone

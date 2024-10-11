const CheckRegex = {
  async TestRegexData(req, res, next) {
    const format = /[!#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
    let error;
    Object.values(req.body).forEach((element) => {
      if (format.test(element)) {
        error = { msg: `Please remove special characters: ${element}!` };
        return;
      }
    });
    if (error) {
      return res.status(400).json(error);
    } else {
      next();
    }
  },
};

module.exports = CheckRegex;
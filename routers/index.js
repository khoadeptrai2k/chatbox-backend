const express = require(`express`);

const router = express.Router();

router.get("/check-working", (req, res, next) => {
  try {
    console.log("API is working");
    res.send({ success: true, message: "API is working!" });
  } catch (err) {
    next(err);
  }
});

router.use(`/chatbox`, require(`../api/chatbox/index`));

module.exports = router;

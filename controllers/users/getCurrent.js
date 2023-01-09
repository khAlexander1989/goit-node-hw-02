async function getCurrent(req, res) {
  const { email, subscription } = req.user;

  console.log("getCurrent controller was invoked");

  res.json({
    email,
    subscription,
  });
}

module.exports = {
  getCurrent,
};

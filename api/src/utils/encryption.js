const bcrypt = require('bcrypt');

exports.encrypt = async (text) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(text, salt);
};

exports.compare = async (inputPassword, originalPassword) =>
  await bcrypt.compare(inputPassword, originalPassword);

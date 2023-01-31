const crypto = require("crypto");

const algorithm = process.env.CRYPTO_ALGORITHM;

const secretKey = process.env.CRYPTO_SECRET_KEY;

const encrypt = (data) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedData: encryptedData.toString("hex"),
  };
};

const decrypt = (hashAndIv) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hashAndIv.iv, "hex")
  );
  const decryptrdData = Buffer.concat([
    decipher.update(Buffer.from(hashAndIv.encryptedData, "hex")),
    decipher.final(),
  ]);
  return decryptrdData.toString();
};

module.exports = {
  encrypt,
  decrypt,
};

import crypto from "crypto-js";

export const secretKey = "your_secret_key";

export function generateToken() {
  // Generate a random string
  const randomString = generateRandomString(50);

  // Secret key for encryption (this should be kept secret and not hard-coded)

  // Encrypt the randomString using AES with the secretKey
  const encryptedString = crypto.AES.encrypt(
    randomString,
    secretKey
  ).toString();

  return encryptedString;
}

// Helper function to generate a random string of a given length
function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function decryptToken(token, secretKey) {
  try {
    const bytes = crypto.AES.decrypt(token, secretKey);

    const originalText = bytes.toString(crypto.enc.Utf8);

    const isValid = /^[a-zA-Z0-9]{50}$/.test(originalText);

    return isValid;
  } catch (error) {
    return false;
  }
}

export function comparePassword(password, hashedPassword, userEmail) {
  const bytes = crypto.AES.decrypt(hashedPassword, userEmail);

  const bytesPassword = crypto.AES.decrypt(password, userEmail);

  const originalText = bytes.toString(crypto.enc.Utf8);

  const originalPassword = bytesPassword.toString(crypto.enc.Utf8);

  return originalPassword === originalText;
}

export function hashPassword(password, userEmail) {
  const bytes = crypto.AES.encrypt(password, userEmail).toString();

  return bytes;
}

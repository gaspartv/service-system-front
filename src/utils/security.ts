import * as crypto from "crypto";

const SECURITY_ALGORITHM="aes-256-cbc"
const SECURITY_SECRET="3d2e1f2a4c6d8a9b0c1d2e3f4a5b6c7d"
const SECURITY_SALT=6

export class Security {
  static encrypt(text: string): string {
    try {
      const algorithm = SECURITY_ALGORITHM!;

      const encryptionKey = crypto.pbkdf2Sync(
        SECURITY_SECRET!,
        SECURITY_SALT!.toString(),
        10000,
        32,
        "sha512",
      );

      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(encryptionKey),
        iv,
      );
      let encryptedMessage = cipher.update(text, "utf8", "hex");
      encryptedMessage += cipher.final("hex");
      return iv.toString("hex") + ":" + encryptedMessage;
    } catch (err) {
      console.error("encrypt: ", err);
      throw new Error('Invalid encryption');
    }
  }

  static decrypt(data: string): string {
    try {
      const algorithm = SECURITY_ALGORITHM!;

      const encryptionKey = crypto.pbkdf2Sync(
        SECURITY_SECRET!,
        SECURITY_SALT!.toString(),
        10000,
        32,
        "sha512",
      );

      const [ivHex, encryptedMessage] = data.split(":");
      const iv = Buffer.from(ivHex, "hex");
      const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(encryptionKey),
        iv,
      );
      let decryptedMessage = decipher.update(encryptedMessage, "hex", "utf8");
      decryptedMessage += decipher.final("utf8");
      return decryptedMessage;
    } catch (err) {
      console.error("decrypt: ", err);
      throw new Error('Invalid encryption');
    }
  }

  static hash(text: string): string {
    return crypto.createHash("sha256").update(text).digest("hex");
  }
}

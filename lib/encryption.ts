import crypto from "crypto";

// Clé AES-256 : 32 octets encodés en hexadécimal
// Variable d'environnement : ENCRYPTION_KEY
// Générer avec : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

const IV_LENGTH = 16; // AES-CBC IV = 16 octets

function getKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error("ENCRYPTION_KEY is not defined. Check your environment variables.");
  }
  const buf = Buffer.from(key, "hex");
  if (buf.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be a 32-byte hex string (64 hex characters).");
  }
  return buf;
}

/**
 * Chiffre une chaîne en AES-256-CBC.
 * Retourne une chaîne de la forme : "<iv_hex>:<ciphertext_hex>"
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

/**
 * Déchiffre une chaîne chiffrée par encrypt().
 * Lève une erreur si le format est invalide ou si la clé est incorrecte.
 */
export function decrypt(encryptedText: string): string {
  const parts = encryptedText.split(":");
  if (parts.length !== 2) {
    throw new Error("Format chiffré invalide.");
  }
  const [ivHex, ciphertextHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const ciphertext = Buffer.from(ciphertextHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", getKey(), iv);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString("utf8");
}

/**
 * Déchiffre de façon sécurisée : retourne null si le texte est absent ou si
 * le déchiffrement échoue (champ non encore migré ou clé incorrecte).
 */
export function safeDecrypt(encryptedText: string | null): string | null {
  if (!encryptedText) return null;
  try {
    return decrypt(encryptedText);
  } catch {
    return null;
  }
}

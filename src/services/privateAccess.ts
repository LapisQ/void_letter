const privatePasswordDigest = "b34f84394ee647b76eada68d05196bd4dd7b82e6399b819f10766e52c7acf2fa";

export async function verifyPrivatePassword(password: string) {
  const encodedPassword = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", encodedPassword);
  const digestHex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");

  return digestHex === privatePasswordDigest;
}

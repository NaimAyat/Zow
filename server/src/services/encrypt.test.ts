import getDefaultEncryptService from "./encrypt";

describe("Bcrypt Encrypt Service", () => {
  const encryptService = getDefaultEncryptService();

  test("same passwords", async () => {
    const password = "test 123";
    const hash = await encryptService.hashPassword(password);
    expect(hash).not.toBe(password);

    expect(await encryptService.testPassword(password, hash)).toBe(true);
  });

  describe("different passwords", async () => {
    const password1 = "test 123";
    const password2 = "test 456";

    const hash1A = await encryptService.hashPassword(password1);
    const hash1B = await encryptService.hashPassword(password1);
    const hash2 = await encryptService.hashPassword(password2);

    test("hashes for different passwords are different", () => {
      expect(hash1A).not.toBe(hash2);
      expect(hash1B).not.toBe(hash2);
    });

    test("hashes for same passwords are different", () => {
      expect(hash1A).not.toBe(hash1B);
    });

    test("wrong passwords do not pass", async () => {
      expect(await encryptService.testPassword(password1, hash2)).toBe(false);
      expect(await encryptService.testPassword(password2, hash1A)).toBe(false);
      expect(await encryptService.testPassword(password2, hash1B)).toBe(false);
    });

    test("correct passwords pass", async () => {
      expect(await encryptService.testPassword(password2, hash2)).toBe(true);
      expect(await encryptService.testPassword(password1, hash1A)).toBe(true);
      expect(await encryptService.testPassword(password1, hash1B)).toBe(true);
    });
  });
});

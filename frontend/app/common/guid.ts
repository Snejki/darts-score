export function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r =
        (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) |
        (c === "x" ? 0 : 0x8);
      return r.toString(16);
    });
  }
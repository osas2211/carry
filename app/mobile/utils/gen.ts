export function buildPayload(domain: string, statement: string, uri: string) {
  // Option A: JSON
  return JSON.stringify({ domain, statement, uri });
  // Option B: EIP-4361 “Sign-In with Ethereum” style string:
  // return `domain: ${domain}\nuri: ${uri}\n\n${statement}`;
}

export function encodePayload(payload: string): Uint8Array {
  return new TextEncoder().encode(payload);
}

console.log("[System] Initializing CyberX Quantum Core Systems...");
setTimeout(() => console.log("→ [security@kernel] Secure boot verified ✅"), 800);
setTimeout(() => console.log("→ [matrix@sync] Node synchronization: COMPLETE ✅"), 1200);
setTimeout(() => console.log("🔐 Core Locked: Encrypted Flag Transmission In Progress..."), 1500);
setTimeout(() => {
  console.log("🧬 Encrypted Flag:");
  console.log("   Ciphertext: VYolkWS/Xrz9PGmTzkd0LLZgw6Wv+kCDnRxujS/LcKg=");
  console.log("   IV        : EasnBmTEMTD7BZWfX3XXvA==");
  console.log("   AES Key   : VVUZjAlsbmGr/VJUBf0j9opj+LjQrPqDyM3evkQtrAw=");
  console.log("💡 Hint: Use AES-CBC with PKCS#7 padding (16-byte block).")
}, 1800);

// Fake distraction logs
const logs = [
  "[trace@log] Quantum Address Map not found...",
  "[warn@node] Entropy level low: reinitializing...",
  "[debug@core] 01100011 01111001 01100010 01100101 01110010",
  "[debug@sync] Reboot token: f82e91c01x28adfj921",
  "[info@system] Listening on port ∞"
];

let i = 0;
let junkInterval = setInterval(() => {
  if (i < logs.length) {
    console.log(logs[i]);
    i++;
  } else {
    clearInterval(junkInterval);
  }
}, 500);
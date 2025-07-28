console.log("[SYSTEM] Quantum Matrix Distorted...");
console.log("⚙️ Initiating deep trace diagnostics...");
console.log("ℹ️ TraceID: #CYX_04201923");

const scrambledLogs = [
  "↳ trace_0x: " + btoa("matrixBridgeError:unseen"),
  "↳ trace_0x: " + btoa("entropyOverflow@7z9"),
  "↳ trace_0x: " + btoa("plasmaNode33-hashFault"),
];

scrambledLogs.forEach((log, i) => console.log(log));

// XOR + Base64 encoded FLAG data
const cipheredFlag = "ICMUKB0WOHIJDlYSSxA0XSIX"; // Actual XOR+Base64-encoded flag
const key = "cyberx_4";

// Decode the flag (simulate reconstruction)
function decodeFlag(encoded, key) {
  const raw = atob(encoded);
  let result = "";
  for (let i = 0; i < raw.length; i++) {
    result += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

console.log("🔐 Core Fragment - Begin Reconstruction...");

const finalFlag = decodeFlag(cipheredFlag, key);
console.log("%c[REBUILT FLAG TRACE] =>", "color:lime; font-weight: bold;");
console.log("%c" + finalFlag, "color:cyan; font-style: italic; font-size: 14px;");

// The flag was composed of:
// Base64 fragments: ["Q1p2TW9u", "Z0ZqdzR3", "OWhraUFu"]
// Combined + decoded → XORed → Base64 → used as `cipheredFlag` above
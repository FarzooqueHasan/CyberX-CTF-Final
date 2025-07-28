// level2.js – For CyberX Level 2

// === DISTRACTION CONSOLE LOGS ===
console.log("[System] Initializing Quantum Core Matrix...");
console.warn("⚠️ Deprecated: useQuantumFlag() is not a function");
console.info("ℹ️  Booting Synapse Cluster v2.0.3...");
console.log("Trace ID: #" + Math.floor(Math.random() * 1000000000));

// === JUNK TRACE SIMULATION ===
for (let i = 0; i < 10; i++) {
  console.log("↳ [log@trace_" + i + "] : " + Math.random().toString(36).substring(2));
}

// === OBFUSCATED FLAG PARTS ===
// Step 1: Base64 encoded segments of ROT13 ciphered flag
const encodedParts = [
  btoa("flagn{"),            // original: synta{ → ROT13 → flagn{
  btoa("lareg_tha"),         // early_gun → ROT13 → lareg_tha
  btoa("a_ccrss_geraqrq")    // n_ppeff_tenagrq → ROT13 → a_ccrss_geraqrq
];

// Hidden in memory, not logged.
const finalFlagRot13 = encodedParts.map(part => atob(part)).join("");

// === SECRET DECODE FUNCTION ===
function decodeFlag() {
  const rot13 = str => str.replace(/[a-zA-Z]/g, c =>
    String.fromCharCode(
      c.charCodeAt(0) + (c.toLowerCase() <= 'm' ? 13 : -13)
    )
  );
  const decoded = rot13(finalFlagRot13);
  console.log(`🚩 FLAG: ${decoded}`);
  return decoded;
}

// === FAKE OLD FUNCTION ===
function useQuantumFlag(module, vector) {
  console.error("🚫 Cannot load module: 'flagSynth.v1'. Reason: Corrupted trace vector.");
  return null;
}

// === BAIT VARIABLE (Just to mislead) ===
const FLAG = "FLAG{this_is_a_decoy_flag_DO_NOT_SUBMIT}";

function rot13(str) {
  return str.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function decodeFlag() {
  const encoded = "syntn{lareg_tha_a_ccrss_geraqrq}"; // ROT13-ed "FLAG{syntac_early_generated}"
  const decoded = rot13(encoded);
  console.log("🚩 FLAG:", decoded);
  return decoded;
}
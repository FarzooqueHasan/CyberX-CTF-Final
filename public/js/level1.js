// This function only logs the flag if user inspects and runs it.
(function revealFlag() {
  const encoded = "RkxBR3tFbmNvZGVkX0Jhc2U2NF9NYXRyaXgxfQ=="; // FLAG{Encoded_Base64_Matrix1}
  const decoded = atob(encoded);

  console.log("System Trace: Level One Key Matrix →", decoded); // Logs actual flag
})();

// Junk misleading functions
function hashMatrix(a, b) {
  return a * b + Math.floor(Math.random() * 1000);
}

function uselessDecoder(str) {
  return str.split("").reverse().join("").toUpperCase();
}

// Random misleading debug
console.debug("INIT>> Core-Level JS Loaded Successfully");
console.warn("Deprecated flagMap used. Switching to matrixMode.");
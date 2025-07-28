document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".flag-form");
  const resultDiv = document.getElementById("result");
  const flagCounter = document.getElementById("flagCount");

  let startTime = Date.now();

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const flagInput = form.querySelector('input[name="flag"]');
      const flag = flagInput.value.trim();

      // Detect current level from URL
      const levelMatch = window.location.pathname.match(/level(\d+)/);
      const level = levelMatch ? levelMatch[1] : null;

      if (!flag || !level) {
        resultDiv.textContent = "Missing data. Make sure you're on a level page.";
        return;
      }

      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      try {
        const res = await fetch("/submitFlag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ flag, level, timeTaken })
        });

        const data = await res.json();

        resultDiv.textContent = data.message || "No response from server";

        // ✅ Update flag count properly using data from server
        if (data.correct && typeof data.flagsCollected !== "undefined" && flagCounter) {
          flagCounter.textContent = data.flagsCollected;
        }

        // ✅ Redirect logic
        if (data.correct) {
          const nextLevel = parseInt(level) + 1;
          setTimeout(() => {
            if (nextLevel <= 5) {
              window.location.href = `/level${nextLevel}`;
            } else {
              window.location.href = "/leaderboard";
            }
          }, 1500);
        }

      } catch (err) {
        resultDiv.textContent = "An error occurred. Please try again.";
        console.error(err);
      }
    });
  }
});
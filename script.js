      document.addEventListener("DOMContentLoaded", () => {
        // --- 1. Navbar Sticky & Mobile Toggle ---
        const navbar = document.getElementById("navbar");
        const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("navLinks");
        const navItems = document.querySelectorAll(".nav-links a");

        // Sticky Navbar
        window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
            navbar.classList.add("sticky");
          } else {
            navbar.classList.remove("sticky");
          }
        });

        // Mobile Menu
        hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });

        // Close mobile menu when a link is clicked
        navItems.forEach((item) => {
          item.addEventListener("click", () => {
            navLinks.classList.remove("active");
          });
        });

        // --- 2. Live Clock & Prayer Logic ---
        function updateClockAndPrayer() {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");
          const seconds = String(now.getSeconds()).padStart(2, "0");

          // Update Digital Clock
          document.getElementById("liveClock").textContent =
            `${hours}:${minutes}:${seconds}`;

          // Define Prayer Times (24h format string for comparison)
          // In a real app, these would come from an API based on location
          const prayers = [
            { id: "card-fajr", name: "Fajr", time: "05:15" },
            { id: "card-dhuhr", name: "Dhuhr", time: "12:30" },
            { id: "card-asr", name: "Asr", time: "16:15" },
            { id: "card-maghrib", name: "Maghrib", time: "18:45" },
            { id: "card-isha", name: "Isha", time: "20:00" },
          ];

          const currentTimeStr = `${hours}:${minutes}`;
          let nextPrayer = null;
          let minDiff = Infinity;

          // Reset active classes
          document
            .querySelectorAll(".prayer-card")
            .forEach((c) => c.classList.remove("active-prayer"));

          // Find next prayer
          prayers.forEach((prayer) => {
            // Compare times simply for this demo
            const pTime = prayer.time;

            // Highlight current/active prayer roughly
            if (currentTimeStr >= pTime) {
              // Logic to find the most recent passed prayer could go here
              // But we primarily care about NEXT
            }

            // Calculate difference
            const pHours = parseInt(pTime.split(":")[0]);
            const pMins = parseInt(pTime.split(":")[1]);
            const currentTotalMins = now.getHours() * 60 + now.getMinutes();
            const prayerTotalMins = pHours * 60 + pMins;

            let diff = prayerTotalMins - currentTotalMins;

            // Handle prayer tomorrow (e.g., if it's 22:00, next prayer is Fajr at 05:15)
            if (diff < 0) {
              diff += 24 * 60;
            }

            if (diff < minDiff) {
              minDiff = diff;
              nextPrayer = prayer;
            }
          });

          if (nextPrayer) {
            document.getElementById("nextPrayerName").textContent =
              nextPrayer.name;

            // Calculate Countdown H:M:S
            const rHours = Math.floor(minDiff / 60);
            const rMins = minDiff % 60;
            const rSecs = 59 - now.getSeconds(); // Simple visual countdown effect

            // Adjust if seconds roll over minutes
            let displayMins = rMins;
            if (rSecs === 59) displayMins -= 1;
            // (Note: This is a simplified visual countdown, precise logic needs Date diff)

            document.getElementById("countdownTimer").textContent =
              `${String(rHours).padStart(2, "0")}:${String(rMins).padStart(2, "0")}:${String(rSecs).padStart(2, "0")}`;

            // Highlight the card
            const activeCard = document.getElementById(nextPrayer.id);
            if (activeCard) activeCard.classList.add("active-prayer");
          }
        }

        setInterval(updateClockAndPrayer, 1000);
        updateClockAndPrayer(); // Initial call

        // --- 3. Scroll Reveal Animation ---
        const revealElements = document.querySelectorAll(".reveal");

        const revealOnScroll = () => {
          const windowHeight = window.innerHeight;
          const elementVisible = 150;

          revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
              reveal.classList.add("active");
            }
          });
        };

        window.addEventListener("scroll", revealOnScroll);
        // Trigger once on load
        revealOnScroll();

        // --- 4. Back to Top Button ---
        const backToTopBtn = document.getElementById("backToTop");

        window.addEventListener("scroll", () => {
          if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
          } else {
            backToTopBtn.style.display = "none";
          }
        });

        backToTopBtn.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });

        // --- 5. FAQ Accordion ---
        const accHeaders = document.querySelectorAll(".accordion-header");

        accHeaders.forEach((header) => {
          header.addEventListener("click", () => {
            const item = header.parentElement;
            const isActive = item.classList.contains("active");

            // Close all others
            document
              .querySelectorAll(".accordion-item")
              .forEach((i) => i.classList.remove("active"));

            // Toggle current
            if (!isActive) {
              item.classList.add("active");
            }
          });
        });

        // --- 6. Simple Form Feedback (Mockup) ---
        const form = document.querySelector("form");
        form.addEventListener("submit", function (e) {
          // Note: In a real scenario, Formspree handles the submission.
          // This is just a local UI feedback if submission is successful or prevented.
          const btn = form.querySelector("button");
          const originalText = btn.textContent;

          btn.textContent = "Sending...";
          btn.disabled = true;

          setTimeout(() => {
            // This mimics a successful interaction for the UI demo
            btn.textContent = "Message Sent!";
            btn.style.backgroundColor = "#25D366"; // Success green
            btn.style.color = "#fff";
            form.reset();

            setTimeout(() => {
              btn.textContent = originalText;
              btn.disabled = false;
              btn.style.backgroundColor = "";
              btn.style.color = "";
            }, 3000);
          }, 1500);
        });
      });
    

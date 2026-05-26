// --- DATA: Courses ---
const courses = [
  {
    id: 1,
    title: "HTML & CSS Mastery",
    level: "beginner",
    duration: "4 Weeks",
    fee: "5,000",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    level: "beginner",
    duration: "6 Weeks",
    fee: "8,000",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
  {
    id: 3,
    title: "React.js Development",
    level: "intermediate",
    duration: "8 Weeks",
    fee: "15,000",
    img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
  },
  {
    id: 4,
    title: "Python for Data Science",
    level: "intermediate",
    duration: "10 Weeks",
    fee: "18,000",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    id: 5,
    title: "Advanced Machine Learning",
    level: "advanced",
    duration: "12 Weeks",
    fee: "25,000",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
  {
    id: 6,
    title: "Cloud Architecture (AWS)",
    level: "advanced",
    duration: "10 Weeks",
    fee: "30,000",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
];

// --- DOM ELEMENTS ---
const courseGrid = document.getElementById("course-grid");
const filterBtns = document.querySelectorAll(".filter-btn");
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const accordionHeaders = document.querySelectorAll(".accordion-header");

// --- INITIALIZATION ---

// 1. Render Courses
function renderCourses(filter = "all") {
  courseGrid.innerHTML = "";

  courses.forEach((course) => {
    if (filter === "all" || course.level === filter) {
      const card = document.createElement("div");
      card.className = "course-card";

      card.innerHTML = `
                        <div class="card-thumb">
                            <img src="${course.img}" alt="${course.title}">
                            <div class="level-badge">${course.level}</div>
                        </div>
                        <div class="card-content">
                            <h3>${course.title}</h3>
                            <div class="course-meta">
                                <span>&#9201; ${course.duration}</span>
                                <span>&#128214; Online</span>
                            </div>
                            <span class="course-price">PKR ${course.fee}</span>
                            <button class="enroll-btn" onclick="alert('Enrollment feature clicked for: ${course.title}')">Enroll Now</button>
                        </div>
                    `;
      courseGrid.appendChild(card);

      // Small delay to allow display:block to apply before opacity transition
      setTimeout(() => {
        card.classList.add("visible");
      }, 50);
    }
  });
}

renderCourses();

// 2. Filter Logic
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCourses(btn.dataset.filter);
  });
});

// 3. Sticky Navbar & Mobile Menu
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// 4. Animated Counters (Intersection Observer)
const statsSection = document.getElementById("stats");
const counters = document.querySelectorAll(".stat-item h3");
let started = false;

const startCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);

    let current = 0;
    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toLocaleString() + "+";
      }
    };
    updateCount();
  });
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !started) {
      startCounters();
      started = true;
    }
  },
  { threshold: 0.5 },
);

statsObserver.observe(statsSection);

// 5. Testimonial Auto Slider
const slides = document.querySelectorAll(".testimonial-slide");
let currentSlide = 0;

const nextSlide = () => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
};

setInterval(nextSlide, 5000);

// 6. Accordion FAQ
accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    const isActive = header.classList.contains("active");

    // Close all others
    document.querySelectorAll(".accordion-header").forEach((h) => {
      h.classList.remove("active");
      h.nextElementSibling.style.maxHeight = null;
    });

    // Toggle clicked
    if (!isActive) {
      header.classList.add("active");
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });
});

// 7. Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => revealObserver.observe(el));

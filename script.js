document.addEventListener("DOMContentLoaded", () => {

    // ---------------- JOB DATA ----------------
    const jobs = [
        { title: "Frontend Developer", company: "Google", location: "Bangalore" },
        { title: "Backend Developer", company: "Amazon", location: "Hyderabad" },
        { title: "Full Stack Developer", company: "Infosys", location: "Pune" },
        { title: "UI/UX Designer", company: "TCS", location: "Mumbai" }
    ];

    const jobList = document.getElementById("job-list");
    const jobCount = document.getElementById("jobCount");
    const keyword = document.getElementById("keyword");
    const locationInput = document.getElementById("location");

    // ---------------- DISPLAY JOBS ----------------
    function displayJobs(list) {
        if (!jobList) return;
        jobList.innerHTML = "";

        list.forEach(job => {
            jobList.innerHTML += `
                <div class="job-card reveal">
                    <h3>${job.title}</h3>
                    <p>${job.company}</p>
                    <p>${job.location}</p>
                </div>
            `;
        });
    }

    displayJobs(jobs);

    // ---------------- COUNTER ANIMATION ----------------
    if (jobCount) {
        let count = 0;
        const target = jobs.length * 10;

        const interval = setInterval(() => {
            count++;
            jobCount.innerText = count;
            if (count === target) clearInterval(interval);
        }, 50);
    }

    // ---------------- LIVE SEARCH ----------------
    function filterJobs() {
        const key = keyword ? keyword.value.toLowerCase() : "";
        const loc = locationInput ? locationInput.value.toLowerCase() : "";

        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(key) &&
            job.location.toLowerCase().includes(loc)
        );

        displayJobs(filtered);
    }

    if (keyword) keyword.addEventListener("input", filterJobs);
    if (locationInput) locationInput.addEventListener("input", filterJobs);

    // ---------------- SCROLL REVEAL ----------------
    window.addEventListener("scroll", () => {
        document.querySelectorAll(".reveal").forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                section.classList.add("active");
            }
        });
    });

    // ---------------- NAV ACTIVE LINK ----------------
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
            link.classList.add("active");
        });
    });

    document.getElementById("applyForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const message = document.getElementById("formMessage");

    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const resume = form.resume.files[0];

    // Education checkbox validation
    const educationChecked = document.querySelectorAll(
        'input[name="education"]:checked'
    ).length;

    if (!educationChecked) {
        message.textContent = "Please select at least one education option.";
        message.className = "error";
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = "Invalid email format.";
        message.className = "error";
        return;
    }

    // Phone validation
    if (phone.length < 10) {
        message.textContent = "Phone number must be at least 10 digits.";
        message.className = "error";
        return;
    }

    // Resume validation
    if (resume) {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(resume.type)) {
            message.textContent = "Resume must be PDF or DOC/DOCX.";
            message.className = "error";
            return;
        }
    }

    message.textContent = "Application submitted successfully!";
    message.className = "success";
    form.reset();
    });
});
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");

if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle("show");
    });

    dropdownContent.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        dropdownContent.classList.remove("show");
    });
}


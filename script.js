document.addEventListener("DOMContentLoaded", () => {

    // ================= JOB DATA =================
    const jobs = [
        { title: "Frontend Developer", company: "Google", location: "Bangalore", trending: true },
        { title: "Backend Developer", company: "Amazon", location: "Hyderabad", trending: true },
        { title: "Full Stack Developer", company: "Infosys", location: "Pune", trending: false },
        { title: "UI/UX Designer", company: "TCS", location: "Mumbai", trending: false }
    ];

    // ================= ELEMENTS =================
    const jobList = document.getElementById("job-list");
    const trendingList = document.getElementById("trending-jobs");
    const jobCount = document.getElementById("jobCount");
    const keyword = document.getElementById("keyword");
    const locationInput = document.getElementById("location");
    const applyForm = document.getElementById("applyForm");

    // ================= JOB COUNT =================
    if (jobCount) {
        let count = 0;
        const target = 5000;
        const interval = setInterval(() => {
            count += Math.ceil(target / 100);
            if (count > target) count = target;
            jobCount.innerText = count.toLocaleString();
            if (count === target) clearInterval(interval);
        }, 20);
    }

    // ================= DISPLAY JOBS =================
    function displayJobs(list) {
        if (!jobList) return;

        jobList.innerHTML = "";

        if (list.length === 0) {
            jobList.innerHTML = "<p>No jobs found</p>";
            return;
        }

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

    // ================= TRENDING JOBS =================
    function displayTrendingJobs() {
        if (!trendingList) return;

        trendingList.innerHTML = "";

        const trendingJobs = jobs.filter(job => job.trending);

        trendingJobs.forEach(job => {
            trendingList.innerHTML += `
                <div class="job-card trending">
                    <h3>${job.title}</h3>
                    <p>${job.company}</p>
                    <p>${job.location}</p>
                </div>
            `;
        });
    }

    // ================= LIVE SEARCH =================
    function filterJobs() {
        const key = keyword ? keyword.value.toLowerCase() : "";
        const loc = locationInput ? locationInput.value.toLowerCase() : "";

        const filteredJobs = jobs.filter(job =>
            job.title.toLowerCase().includes(key) &&
            job.location.toLowerCase().includes(loc)
        );

        displayJobs(filteredJobs);
    }

    if (keyword) keyword.addEventListener("input", filterJobs);
    if (locationInput) locationInput.addEventListener("input", filterJobs);

    // ================= REVEAL ON SCROLL =================
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // ================= APPLY FORM =================
    if (applyForm) {
        applyForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const message = document.getElementById("formMessage");
            const email = applyForm.email.value.trim();
            const phone = applyForm.phone.value.trim();
            const resume = applyForm.resume.files[0];

            // Education validation
            if (!document.querySelector('input[name="education"]:checked')) {
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
            if (!/^\d{10,}$/.test(phone)) {
                message.textContent = "Phone number must contain at least 10 digits.";
                message.className = "error";
                return;
            }

            // Resume validation
            if (!resume) {
                message.textContent = "Please upload your resume.";
                message.className = "error";
                return;
            }

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

            message.textContent = "Application submitted successfully!";
            message.className = "success";

            applyForm.submit();
        });
    }

    // ================= INITIAL LOAD =================
    displayTrendingJobs();
    displayJobs(jobs);

});

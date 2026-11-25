
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-times", isOpen);
            }
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }


    // =====================================
    // 2. SMOOTH SCROLLING
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =====================================
    // 3. ACTIVE NAVIGATION ON SCROLL
    // =====================================

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    // =====================================
    // 4. HEADER SCROLL EFFECT
    // =====================================

    const header = document.querySelector(".header");

    function updateHeader() {

        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    // =====================================
    // 5. PROJECT IMAGE FALLBACK
    // =====================================

    document.querySelectorAll(".project-image img").forEach(function (image) {

        image.addEventListener("error", function () {

            this.style.display = "none";

            const imageContainer = this.closest(".project-image");

            if (imageContainer) {
                imageContainer.classList.add("image-error");
            }
        });
    });


    // =====================================
    // 6. SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements = document.querySelectorAll(
        ".project-card, .skill-card, .timeline-item, .about-content, .contact-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    // =====================================
    // 7. FOOTER YEAR
    // =====================================

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================
    // 8. BACK TO TOP BUTTON
    // =====================================

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            backToTop.classList.toggle("show", window.scrollY > 400);

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    // =====================================
    // 9. CONTACT FORM
    // =====================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        const formStatus = document.getElementById("formStatus");
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const emailService = window.emailjs;
        let emailServiceReady = Boolean(emailService);

        if (emailServiceReady) {
            try {
                emailService.init("QdlqQtJQWOfHJmWIq");
            } catch (error) {
                console.error("EmailJS initialization failed:", error);
                emailServiceReady = false;
            }
        }

        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!emailServiceReady) {
                formStatus.textContent = "Email service is unavailable. Please email bhasimasudeep@gmail.com directly.";
                return;
            }

            submitButton.disabled = true;
            formStatus.textContent = "Sending your message...";

            try {
                await emailService.sendForm(
                    "service_yvzbmub",
                    "template_048g9pv",
                    contactForm
                );
                formStatus.textContent = "Your message has been sent successfully.";
                contactForm.reset();
            } catch (error) {
                console.error("EmailJS contact form submission failed:", error);
                const errorStatus = error && error.status ? " (EmailJS " + error.status + ")" : "";
                const errorDetail = error && error.text
                    ? " " + error.text
                    : " Check the EmailJS service, template, and allowed domain settings.";
                formStatus.textContent = "Your message could not be sent" + errorStatus + "." + errorDetail + " Please email bhasimasudeep@gmail.com directly.";
            } finally {
                submitButton.disabled = false;
            }
        });
    }

});

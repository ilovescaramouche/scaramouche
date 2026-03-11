document.addEventListener("DOMContentLoaded", () => {
    // Always fade in the page once DOM is ready
    document.body.classList.add("fade-in");

    // Smooth scrolling for sidebar links (anchors only)
    const sidebarLinks = document.querySelectorAll(".floating-ict-sidebar a");
    sidebarLinks.forEach(anchor => {
        anchor.addEventListener("click", e => {
            const href = anchor.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1); // remove #
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // Handle lesson card clicks with grow animation
    const lessonCards = document.querySelectorAll(".lesson-card");
    lessonCards.forEach(card => {
        card.addEventListener("click", e => {
            const href = card.getAttribute("href");
            if (href) {
                e.preventDefault();

                // Add grow class
                card.classList.add("grow");

                // Wait for grow animation to finish
                setTimeout(() => {
                    // Start fade-out
                    document.body.classList.remove("fade-in");
                    document.body.classList.add("fade-out");

                    // Navigate AFTER fade-out completes
                    setTimeout(() => {
                        window.location.assign(href); // reliable navigation
                    }, 500); // match fade duration
                }, 400); // match grow duration
            }
        });
    });

    // Normal fade for other links (navbar etc.)
    document.querySelectorAll("a").forEach(link => {
        // Skip lesson cards and sidebar anchors
        if (!link.classList.contains("lesson-card") && !link.closest(".floating-ict-sidebar")) {
            link.addEventListener("click", e => {
                const href = link.getAttribute("href");
                if (href && !href.startsWith("#")) {
                    e.preventDefault();
                    document.body.classList.remove("fade-in");
                    document.body.classList.add("fade-out");
                    setTimeout(() => {
                        window.location.assign(href);
                    }, 500);
                }
            });
        }
    });
});


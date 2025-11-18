// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger after everything loads
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        ScrollTrigger.matchMedia({
            // Desktop animation
            "(min-width: 768px)": function() {
                gsap.fromTo(".faq-right-side", 
                    { x: '100%', opacity: 0 },
                    { 
                        x: '0%', 
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: faqContainer,
                            start: "top bottom",
                            end: "center bottom",
                            scrub: 1
                        }
                    }
                );
            },
            // Mobile animation
            "(max-width: 767px)": function() {
                gsap.fromTo(".faq-right-side", 
                    { x: '100%', opacity: 0 },
                    { 
                        x: '0%', 
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: faqContainer,
                            start: "top bottom",
                            end: "top 50%", // Finishes animation sooner on mobile
                            scrub: 1
                        }
                    }
                );
            }
        });
    }

    // Animate About Me section on scroll
    const aboutMeContainer = document.querySelector('.about-me-container');
    if (aboutMeContainer) {
        const aboutMeElements = aboutMeContainer.querySelectorAll(".about-me-left img, .about-me-left h4, .about-me-left p, .about-me-card");
        gsap.fromTo(aboutMeElements,
            { scale: 0.2, opacity: 0.2 },
            {
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: {
                    trigger: aboutMeContainer,
                    start: "top bottom",
                    end: "top center",
                    scrub: 1
                }
            }
        );
    }
});

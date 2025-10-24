document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop and up (lg ≥ 1024px): keep current behavior
    mm.add("(min-width: 1024px)", () => {
        gsap.from("#leaf-branch-top", {
            scrollTrigger: {
                trigger: ".approach-container",
                start: "top bottom",
                end: "center center",
                scrub: 1.5,
            },
            x: -200,
            y: -150,
            scale: 5,
            rotation: -90,
            opacity: 0.2,
            ease: "power2.out"
        });

        gsap.from("#leaf-branch-bottom", {
            scrollTrigger: {
                trigger: ".approach-container",
                start: "top bottom",
                end: "center center",
                scrub: 1.5,
            },
            x: 200,
            y: 150,
            scale: 5,
            rotation: 90,
            opacity: 0.2,
            ease: "power2.out"
        });
    });

    // Mobile & tablet (< 1024px): tie to the image wrapper so it finishes sooner
    mm.add("(max-width: 1023px)", () => {
        const triggerEl = document.querySelector("#approach-media") || document.querySelector(".approach-container");

        // Top leaf: start centered in the viewport, then fly to final spot
        gsap.from("#leaf-branch-top", {
            scrollTrigger: {
                trigger: triggerEl,
                start: "top 130%",
                end: "top 50%",
                scrub: 1,
            },
            left: "50%",
            top: "-30vh",
            xPercent: -50,
            yPercent: -200,
            scale: 2,
            rotation: -90,
            opacity: 0.15,
            ease: "power2.out"
        });

        gsap.from("#leaf-branch-bottom", {
            scrollTrigger: {
                trigger: triggerEl,
                start: "top 90%",
                end: "top 30%",
                scrub: 1,
            },
            x: 200,
            y: 150,
            scale: 4.5,
            rotation: 90,
            opacity: 0.25,
            ease: "power2.out"
        });
    });
});

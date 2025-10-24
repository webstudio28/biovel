document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // Animation for the top leaf branch
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

    // Animation for the bottom leaf branch
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

// Base 11ty Template Animations

// Wait for DOM to be ready and register ScrollTrigger
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section comprehensive load animations
    const heroTimeline = gsap.timeline();
    
    // Background decorative elements animation
    heroTimeline.from(".absolute.-top-10.-left-10", { 
        opacity: 0, 
        scale: 0.5, 
        duration: 1.5, 
        ease: "power2.out" 
    }, 0);
    
    heroTimeline.from(".absolute.top-24.-left-16", { 
        opacity: 0, 
        scale: 0.5, 
        duration: 1.5, 
        delay: 0.2, 
        ease: "power2.out" 
    }, 0);
    
    heroTimeline.from(".absolute.-bottom-8.-right-8", { 
        opacity: 0, 
        scale: 0.5, 
        duration: 1.5, 
        delay: 0.4, 
        ease: "power2.out" 
    }, 0);
    
    // Badge animation
    heroTimeline.from(".inline-flex.items-center.gap-2.px-4.py-2", { 
        opacity: 0, 
        y: -30, 
        scale: 0.8, 
        duration: 1, 
        ease: "back.out(1.7)" 
    }, 0.3);
    
    // Main heading animation
    heroTimeline.from("h1", { 
        opacity: 0, 
        y: 60, 
        duration: 1.2, 
        ease: "power3.out" 
    }, 0.5);
    
    // Description paragraph animation
    heroTimeline.from("p.text-lg.md\\:text-xl", { 
        opacity: 0, 
        y: 40, 
        duration: 1, 
        ease: "power3.out" 
    }, 0.7);
    
    // Lottie animation container
    heroTimeline.from(".relative.flex.items-center.justify-center", { 
        opacity: 0, 
        scale: 0.8, 
        duration: 1.2, 
        ease: "power3.out" 
    }, 0.4);
    
    // SVG blob animation
    heroTimeline.from("svg.absolute.w-full.h-full", { 
        opacity: 0, 
        scale: 0.7, 
        rotation: 10, 
        duration: 1.5, 
        ease: "power2.out" 
    }, 0.6);
    
    // Lottie player animation
    heroTimeline.from("lottie-player", { 
        opacity: 0, 
        scale: 0.6, 
        duration: 1.3, 
        ease: "power3.out" 
    }, 0.8);
    
    // Decorative line animation
    heroTimeline.from(".absolute.top-0.left-0.w-16.h-0\\.5", { 
        opacity: 0, 
        scaleX: 0, 
        duration: 1, 
        ease: "power2.out" 
    }, 0.2);
    
    // About section animations - target the flex container children
    gsap.from("section.py-20 .flex.flex-col.lg\\:flex-row > div", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: "section.py-20",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });
    
    // About section text animation (right column only)
    gsap.from(".about-section-anim", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about-section-anim",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });
    
    // Features section animations - target the grid children
    gsap.from("section.py-20 .grid.md\\:grid-cols-3 > div", {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: "section.py-20 .grid.md\\:grid-cols-3",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });
    
    // Testimonials section animations - target the grid children
    gsap.from("section.py-20 .grid.md\\:grid-cols-2.lg\\:grid-cols-3 > div", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: "section.py-20 .grid.md\\:grid-cols-2.lg\\:grid-cols-3",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });
    
    // CTA section animations - target the main container
    gsap.from("section.py-20 .relative.shadow-xl.overflow-hidden.rounded-3xl", {
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "section.py-20 .relative.shadow-xl.overflow-hidden.rounded-3xl",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });
    
    // Trust indicators animation - target the flex children
    gsap.from("section.py-20 .flex.flex-wrap.justify-center.items-center.gap-6 > div", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
            trigger: "section.py-20 .flex.flex-wrap.justify-center.items-center.gap-6",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });
    
    // Continuous floating animation for decorative elements
    gsap.to(".absolute.-top-10.-left-10", {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });
    
    gsap.to(".absolute.top-24.-left-16", {
        y: 8,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });
    
    gsap.to(".absolute.-bottom-8.-right-8", {
        y: -6,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });
    
    // Subtle pulse animation for the badge dot
    gsap.to(".w-2.h-2.bg-primary-accent.rounded-full.animate-pulse", {
        scale: 1.2,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });
    
    // Gentle rotation for the blob
    gsap.to("svg.absolute.w-full.h-full", {
        rotation: 2,
        duration: 8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });
});
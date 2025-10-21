// 3D Animation Utilities for Vega Test
class ThreeDUtils {
    constructor() {
        this.heroAnimation = null;
        this.currentSection = 'hero';
    }
    
    // Initialize the 3D animation
    init() {
        // Wait for the Hero3DAnimation to be available
        if (window.Hero3DAnimation) {
            this.heroAnimation = new window.Hero3DAnimation();
        } else {
            // Wait a bit and try again
            setTimeout(() => this.init(), 100);
        }
    }
    
    // Move 3D object behind a specific section
    moveBehindSection(sectionSelector, options = {}) {
        if (!this.heroAnimation) {
            console.warn('3D Animation not initialized');
            return;
        }
        
        const section = document.querySelector(sectionSelector);
        if (!section) {
            console.warn(`Section ${sectionSelector} not found`);
            return;
        }
        
        // Move the container
        this.heroAnimation.moveBehindSection(sectionSelector);
        
        // Update current section
        this.currentSection = sectionSelector;
        
        // Apply custom animations if provided
        if (options.animation) {
            this.applyCustomAnimation(options.animation);
        }
        
        console.log(`3D object moved behind ${sectionSelector}`);
    }
    
    // Apply custom animations
    applyCustomAnimation(animationType) {
        if (!this.heroAnimation || !this.heroAnimation.model) return;
        
        switch (animationType) {
            case 'parallax':
                this.setupParallaxAnimation();
                break;
            case 'scale':
                this.setupScaleAnimation();
                break;
            case 'rotate':
                this.setupRotateAnimation();
                break;
            case 'float':
                this.setupFloatAnimation();
                break;
            default:
                console.log('Unknown animation type:', animationType);
        }
    }
    
    // Setup parallax animation
    setupParallaxAnimation() {
        gsap.to(this.heroAnimation.camera.position, {
            y: -3,
            scrollTrigger: {
                trigger: this.heroAnimation.container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    // Setup scale animation
    setupScaleAnimation() {
        gsap.to(this.heroAnimation.model.scale, {
            x: 0.6, y: 0.6, z: 0.6,
            scrollTrigger: {
                trigger: this.heroAnimation.container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    // Setup rotate animation
    setupRotateAnimation() {
        gsap.to(this.heroAnimation.model.rotation, {
            y: Math.PI * 4,
            scrollTrigger: {
                trigger: this.heroAnimation.container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    // Setup float animation
    setupFloatAnimation() {
        gsap.to(this.heroAnimation.model.position, {
            y: this.heroAnimation.model.position.y + 0.5,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    }
    
    // Update animation based on scroll position
    updateOnScroll(scrollY) {
        if (!this.heroAnimation) return;
        
        this.heroAnimation.updateAnimationOnScroll(scrollY);
    }
    
    // Change 3D object color
    changeColor(color) {
        if (!this.heroAnimation || !this.heroAnimation.model) return;
        
        this.heroAnimation.model.traverse((child) => {
            if (child.isMesh && child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                        if (mat.color) mat.color.setHex(color);
                    });
                } else {
                    if (child.material.color) child.material.color.setHex(color);
                }
            }
        });
    }
    
    // Pause/Resume animations
    pauseAnimations() {
        if (this.heroAnimation && this.heroAnimation.animationMixer) {
            this.heroAnimation.animationMixer.stopAllAction();
        }
    }
    
    resumeAnimations() {
        if (this.heroAnimation && this.heroAnimation.animationMixer) {
            this.heroAnimation.animationMixer.timeScale = 1;
        }
    }
    
    // Get current 3D object position
    getPosition() {
        if (!this.heroAnimation || !this.heroAnimation.model) return null;
        
        return {
            x: this.heroAnimation.model.position.x,
            y: this.heroAnimation.model.position.y,
            z: this.heroAnimation.model.position.z
        };
    }
    
    // Set 3D object position
    setPosition(x, y, z) {
        if (!this.heroAnimation || !this.heroAnimation.model) return;
        
        this.heroAnimation.model.position.set(x, y, z);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ThreeDUtils = new ThreeDUtils();
    window.ThreeDUtils.init();
});

// Example usage functions
window.move3DBehindSection = (sectionSelector, animationType) => {
    if (window.ThreeDUtils) {
        window.ThreeDUtils.moveBehindSection(sectionSelector, { animation: animationType });
    }
};

window.change3DColor = (color) => {
    if (window.ThreeDUtils) {
        window.ThreeDUtils.changeColor(color);
    }
};

window.pause3DAnimations = () => {
    if (window.ThreeDUtils) {
        window.ThreeDUtils.pauseAnimations();
    }
};

window.resume3DAnimations = () => {
    if (window.ThreeDUtils) {
        window.ThreeDUtils.resumeAnimations();
    }
}; 
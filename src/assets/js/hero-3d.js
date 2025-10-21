// Hero 3D Animation with Three.js and GSAP
class Hero3DAnimation {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.animationMixer = null;
        this.clock = new THREE.Clock();
        this.container = document.getElementById('hero-3d-container');
        
        if (!this.container) {
            console.warn('Hero 3D container not found');
            return;
        }
        
        this.init();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = null; // Transparent background
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 15);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // Lighting
        this.setupLighting();
        
        // Load 3D model
        this.loadModel();
        
        // Start animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Setup GSAP animations
        this.setupGSAPAnimations();
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Point light for accent
        const pointLight = new THREE.PointLight(0x9CAF88, 1, 10);
        pointLight.position.set(-2, 2, 2);
        this.scene.add(pointLight);
    }
    
    loadModel() {
        const loader = new THREE.GLTFLoader();
        
        loader.load(
            'assets/3d/hero.glb',
            (gltf) => {
                this.model = gltf.scene;
                this.scene.add(this.model);
                
                // Center the model
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                this.model.position.sub(center);
                
                // Make the model much smaller and move it to the top center
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 0.02 / maxDim; // much, much smaller
                this.model.scale.setScalar(scale);
                this.model.position.set(0, 0.5, 0); // center in the right half
                
                // Setup animations if available
                if (gltf.animations && gltf.animations.length > 0) {
                    this.animationMixer = new THREE.AnimationMixer(this.model);
                    const action = this.animationMixer.clipAction(gltf.animations[0]);
                    action.play();
                }
                
                // Initial GSAP animation
                this.animateModelIn();
            },
            (progress) => {
                if (progress.total && progress.total > 0) {
                    console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
                }
            },
            (error) => {
                console.error('Error loading 3D model:', error);
                // Fallback: create a simple geometric shape
                this.createFallbackModel();
            }
        );
    }
    
    createFallbackModel() {
        // Create a simple animated geometric shape as fallback
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x9CAF88,
            transparent: true,
            opacity: 0.8
        });
        this.model = new THREE.Mesh(geometry, material);
        this.scene.add(this.model);
        
        // Animate the fallback model
        this.animateModelIn();
    }
    
    animateModelIn() {
        if (!this.model) return;
        
        // Initial state
        gsap.set(this.model.scale, { x: 0, y: 0, z: 0 });
        gsap.set(this.model.rotation, { x: 0, y: 0, z: 0 });
        
        // Animate in
        gsap.to(this.model.scale, {
            x: 1, y: 1, z: 1,
            duration: 1.5,
            ease: "back.out(1.7)"
        });
        
        gsap.to(this.model.rotation, {
            y: Math.PI * 2,
            duration: 2,
            ease: "power2.out"
        });
        
        // Continuous floating animation
        this.startFloatingAnimation();
    }
    
    startFloatingAnimation() {
        if (!this.model) return;
        
        // Floating up and down - much slower
        gsap.to(this.model.position, {
            y: this.model.position.y + 0.3,
            duration: 8, // much slower
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
        
        // Gentle rotation - much slower
        gsap.to(this.model.rotation, {
            y: this.model.rotation.y + 0.1,
            duration: 15, // much slower
            ease: "none",
            repeat: -1
        });
    }
    
    setupGSAPAnimations() {
        // Parallax effect on scroll
        gsap.to(this.camera.position, {
            y: -2,
            scrollTrigger: {
                trigger: this.container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Scale effect on scroll
        gsap.to(this.model?.scale, {
            x: 0.8, y: 0.8, z: 0.8,
            scrollTrigger: {
                trigger: this.container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    onWindowResize() {
        if (!this.camera || !this.renderer || !this.container) return;
        
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        
        // Update animation mixer
        if (this.animationMixer) {
            this.animationMixer.update(deltaTime);
        }
        
        // Render
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    // Method to move the 3D object behind other sections
    moveBehindSection(sectionSelector) {
        const section = document.querySelector(sectionSelector);
        if (section && this.container) {
            section.appendChild(this.container);
        }
    }
    
    // Method to change animation based on scroll position
    updateAnimationOnScroll(scrollY) {
        if (!this.model) return;
        
        // Rotate based on scroll
        this.model.rotation.y = scrollY * 0.001;
        
        // Scale based on scroll
        const scale = 1 - (scrollY * 0.0001);
        this.model.scale.setScalar(Math.max(0.5, scale));
    }
}

// Export for potential use in other scripts
window.Hero3DAnimation = Hero3DAnimation; 
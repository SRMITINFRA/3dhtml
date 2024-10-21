// script.js
let scene, camera, renderer, fabricMesh;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#webgl') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Light setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Geometry and material (using a texture similar to fabric)
    const geometry = new THREE.SphereGeometry(3, 32, 32);  // Change to your fabric model
    const texture = new THREE.TextureLoader().load('fabric-texture.jpg'); // Use your fabric texture image
    const material = new THREE.MeshStandardMaterial({ map: texture });

    fabricMesh = new THREE.Mesh(geometry, material);
    scene.add(fabricMesh);

    // Set camera position
    camera.position.z = 10;

    // GSAP animation for smooth rotation
    gsap.to(fabricMesh.rotation, {
        y: Math.PI * 2,
        repeat: -1,
        duration: 10,
        ease: 'none'
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();


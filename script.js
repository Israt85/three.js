const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.3, 20, 20);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Create the ring objects
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500, side: THREE.DoubleSide });
const rings = [];
for (let i = 4; i >= 0; i--) {
    const ringGeometry = new THREE.RingGeometry(0.2 + i * 0.1, 0.3 + i * 0.1, 32) 
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(0,1 - i * 0.2,  0);
    
    rings.push(ring);
    scene.add(ring);
}
for (let i = 0; i < 5; i++) {
    const ringGeometry = new THREE.RingGeometry(0.2 + i * 0.1, 0.3 + i * 0.1, 32); 
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(0, -0.9+ i * 0.2, 0);
    rings.push(ring);
    scene.add(ring);
}


// Create star particles
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Position the camera
camera.position.z = 5;




// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the rings
    rings.forEach((ring, index) => {
        ring.rotation.x += 0.01;
        
    });
    // Rotate the stars for a dynamic effect
    stars.rotation.x += 0.001;
    stars.rotation.y += 0.001;

    renderer.render(scene, camera);
}


animate();
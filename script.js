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
    ring.position.set(0,1.5 - i * 0.3,  0);
    
    rings.push(ring);
    scene.add(ring);
}
for (let i = 0; i < 5; i++) {
    const ringGeometry = new THREE.RingGeometry(0.2 + i * 0.1, 0.3 + i * 0.1, 32); 
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(0, -1.7+ i * 0.3, 0);
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

camera.position.z = 3; // Adjust the camera position to view all rings

// Animation state
let scaleFactor = 1;
let scaleDirection = 1;

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Pulsating effect
    scaleFactor += 0.01 * scaleDirection;
    if (scaleFactor > 1.2 || scaleFactor < 0.8) {
        scaleDirection *= -1; 
    }

    
    rings.forEach((ring, index) => {
        let factor = scaleFactor + index * 0.05;
        ring.scale.set(factor, factor, factor);
    });

    renderer.render(scene, camera);
}

animate();

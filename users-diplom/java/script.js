document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.gltf, .glb';

        input.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const data = event.target.result;
                    loadModel(data);
                };
                reader.readAsDataURL(file);
            }
        });

        input.click();
    });
});

const scene = new THREE.Scene();
const aspectRatio = 1;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
const size = Math.min(window.innerWidth, window.innerHeight);
renderer.setSize(size, size);
document.getElementById('container').appendChild(renderer.domElement);

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
floor.position.y = -2;
scene.add(floor);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

function loadModel(fileContent) {
    const loader = new THREE.GLTFLoader();
    loader.load(fileContent, function (gltf) {
        const model = gltf.scene;
        scene.add(model);
    });
}


function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

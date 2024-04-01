//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateModel);
});

function calculateModel() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const wallThickness = parseFloat(document.getElementById('wallThickness').value);

    const innerLength = length - 2 * wallThickness;
    const innerWidth = width - 2 * wallThickness;
    const innerHeight = height - 2 * wallThickness;

    const result = `Габариты модели: ${length} см x ${width} см x ${height} см<br>
                    Толщина стенок: ${wallThickness} см<br>
                    Размеры внутреннего пространства: ${innerLength} см x ${innerWidth} см x ${innerHeight} см`;

    document.getElementById('result').innerHTML = result;
}

function uploadModel() {
    const fileInput = document.getElementById('modelInput');
    const file = fileInput.files[0];
    const uploadStatus = document.getElementById('uploadStatus');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const dataURL = event.target.result;
            const loader = new THREE.FileLoader();
            loader.load(
                dataURL,
                function(text) {
                    const object = new THREE.OBJLoader().parse(text);
                    uploadStatus.innerText = 'Модель успешно загружена';
                    getModelDimensions(object);
                },
                undefined,
                function(error) {
                    console.error('Произошла ошибка загрузки модели:', error);
                    uploadStatus.innerText = 'Ошибка загрузки модели';
                }
            );
        };
        reader.readAsDataURL(file);
    } else {
        uploadStatus.innerText = 'Модель не выбрана';
    }
}

// Получение размеров загруженной модели
function getModelDimensions(object) {
    // Получаем ограничивающий параллелепипед (bounding box) загруженной модели
    const boundingBox = new THREE.Box3().setFromObject(object);

    // Получаем размеры модели из ограничивающего параллепипеда
    const dimensions = boundingBox.getSize(new THREE.Vector3());

    // Размеры доступны в переменной dimensions в виде объекта {x, y, z}
    console.log('Размеры модели (x, y, z):', dimensions.x, dimensions.y, dimensions.z);
}

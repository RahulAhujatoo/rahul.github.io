import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import { GridHelper, PointLightHelper, SphereGeometry } from 'three';

// const sizes = {
//   width: window.innerWidth/4,
//   height: window.innerHeight/4
// }
//scene cam setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const geometry2 = new THREE.TorusGeometry(15, 2.5, 4, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x0b3b45 });
const material2 = new THREE.MeshStandardMaterial({ color: 0x70ecff, wireframe:true });

const torus = new THREE.Mesh(geometry, material);
const torus2 = new THREE.Mesh(geometry2, material2);
material.opacity= 0.1;
scene.add( torus,torus2 );

// const cube = new THREE.Mesh(boxGeometry, material)
// cube.position.x = 5
// scene.add(cube)


// const pointlight = new THREE.PointLight( 0xffffff);
// pointlight.position.set(5,5,5);

// const amblight = new THREE.AmbientLight( 0xffffff );
// light.position.set( 5, 5, 5 );
// scene.add( amblight );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const size=500;
// const divisions=10;
// // const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper( size, divisions );
// scene.add(gridHelper);

// const controls = new OrbitControls( camera, renderer.domElement );
//t
function addStar(){
  const geometry1 = new THREE.OctahedronGeometry( 0.09,2 );
  const geometry2 = new THREE.SphereGeometry(0.25, 10, 10);
  const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const material2 = new THREE.MeshBasicMaterial({ color: 0xdcdcaa });
  const star1 = new THREE.Mesh(geometry1, material1);
  const star2 = new THREE.Mesh(geometry2, material2);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star1.position.set(z, y, x);
  star2.position.set(x, y, z);
  scene.add(star1);
  scene.add(star2);

}
Array(800).fill().forEach(addStar);

//space texture
//t
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar
//t
const jeffTexture = new THREE.TextureLoader().load('my.png');
const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
scene.add(jeff);


//planet texture
//t
const planetTexture = new THREE.TextureLoader().load('planet.jpg');
const normalTexture = new THREE.TextureLoader().load('wavey.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
    normalMap: normalTexture,
  })
);
scene.add(planet);

planet.position.z = 32;
// planet.position.x = 8;

planet.position.setX(-5);
// planet.position.setY(1);



jeff.position.z = -5;
jeff.position.x = 2;

//scroll animation

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  // planet.rotateX(0.1);
  // planet.rotateY(0.01);
  // planet.rotateZ(0.1);

  planet.rotation.x +=0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x +=0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x -=0.0005;
  torus2.rotation.y -= 0.0025;
  torus2.rotation.z -= 0.005;

  // torus.rotateX(0.01);
  // torus.rotateY(0.005);
  // torus.rotateZ(0.01);

  planet.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene,camera);


}

animate();


<template>
  <Header />

  <div class="container">
    <router-view/>
  </div>

  <Footer />
</template>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    position: relative;
    overflow-x: hidden;
    font-size: 0.9em;
    line-height: 1.1em;
    color: #333;
    font-family: Arial, sans-serif;
  }

  a {
    color: rgb(255, 191, 0);
    text-decoration: none;
  }
  
  .hidden {
    display: none;
  }

  .wrapper {
    margin: 0 30px;
    min-height: 100vh;
  }

  .stars-background {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }

</style>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'

  import * as THREE from '@/assets/three'
  const starSprite = require('@/assets/star.png')

  // star field
  // by https://redstapler.co/space-warp-background-effect-three-js/
  let scene, camera, renderer, stars, starGeo;
  function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    
    let canvasWrapper = document.createElement('div')
    canvasWrapper.classList.add('stars-background')
    document.body.appendChild(canvasWrapper)

    canvasWrapper.appendChild(renderer.domElement);

    starGeo = new THREE.Geometry();
    for(let i=0;i<6000;i++) {
      let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      star.velocity = 0;
      star.acceleration = 0.02;
      starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load(starSprite);
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite
    });

    stars = new THREE.Points(starGeo,starMaterial);
    scene.add(stars);

    window.addEventListener("resize", onWindowResize, false);

    animate(); 
  }
  function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  function animate() {
    starGeo.vertices.forEach(p => {
      p.velocity += p.acceleration
      p.y -= p.velocity;
      
      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y +=0.002;
  
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  init();

  export default {
    components: {
      Header,
      Footer,
    }
  }
</script>

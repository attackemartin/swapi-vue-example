<template>
  <main>
    <h1>Characters of Star Wars</h1>
    <h2>Episodes 1 - 6</h2>

    <section v-if="!loading">
      <FilmSelect @movie-filter="filterMovie" :films="films" />
      <PeopleList :people="people" :planets="planets" />
    </section>

    <section v-else>
      <div class="loading-overlay">
        Fetching Star Wars Data
        <img :src="loadingImage" class="loading-gif" />
      </div>
    </section>
    
  </main>
</template>

<script>
  import Services from "@/Services/PeopleService"
  import PeopleList from '@/components/PeopleList'
  import FilmSelect from '@/components/FilmSelect'
  import { thisExpression } from "@babel/types"
  import * as THREE from '@/assets/three'

  const starSprite = require('../assets/loading.gif')


  // star field
  let scene, camera, renderer, stars, starGeo;
  function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

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
    name: 'HomeView',
    components: {
      PeopleList,
      FilmSelect
    },
    data() {
      return {
        loading: true,
        loadingImage: require('../assets/loading.gif'),
        films: {},
        filmSelectID: 0,
        people: {},
        planets: {},
        charactersBuild: 0
      }
    },
    methods: {
      async fetchSWFilms() {
        const res = await fetch('https://swapi.dev/api/films')
        const swFilms = await res.json()
        return swFilms
      },
      filterMovie(filmClass) {
        const characterContainer = document.getElementsByClassName('character-container')
        const selectedCharacters = document.getElementsByClassName(filmClass)

        for (const character of characterContainer) {
          character.classList.add('hidden');
        }

        for (const selectedCharacter of selectedCharacters) {
          selectedCharacter.classList.remove('hidden');
        }
      }
    },
    async created() {
      const swFilms = await this.fetchSWFilms()
      this.films = swFilms.results

      const swPeople = await Services.getAllSwapiPeople()

      swPeople.forEach(character => {
        const charHomeWorldURL = character.homeworld

        const getHomeworldData = () => 
          fetch (charHomeWorldURL)
            .then (homePlanetData => homePlanetData.json ());

        getHomeworldData ()
          .then (homePlanetData => {

            const homePlanetName = homePlanetData.name
            const homePlanetID = homePlanetData.url[homePlanetData.url.length - 2];
            
            character.homeplanetName = homePlanetName
            character.homeplanetURLID = homePlanetID
            this.charactersBuild = this.charactersBuild + 1

            if (this.charactersBuild == swPeople.length) {
              this.people = swPeople
              this.loading = false
            } 
          })
      });
    }
  }
</script>

<style>
  body {
    
  }

  canvas {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }


</style>
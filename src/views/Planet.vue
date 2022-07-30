<template>
  <main class="wrapper">
    <section v-if="!loading">
      <div class="planet-container">
        <router-link :to="{ name: 'home' }" class="back-link">
          <span>Back to Character Overview</span>
        </router-link>
        <h1>
          {{planet.name}}
        </h1>
        <p>
          Population: 
          <br/>
          {{planet.population}}
        </p>
        <p>
          Terrain: 
          <br/>
          {{planet.terrain}}
        </p>
        <p>
          Climate: 
          <br/>
          {{planet.climate}}
        </p>
      </div>
    </section>

    <section v-else>
      <Loading :loadingImage="loadingImage" />
    </section>
  </main>
</template>

<script>

import Services from '@/Services/PlanetService'
import Loading from '@/components/Loading'


export default ({
  name: 'Planet',
  components: {
    Loading,
  },
  props: ['id'],

  data() {
    return {
      loading: true,
      loadingImage: require('../assets/loading-r2d2.gif'),
      planet: {},
    }
  },
  methods: {
    
  },
  async created() {
    const swPlanet = await Services.getSwapiPlanet(this.id)
    this.planet = swPlanet
    this.loading = false
    
  }
})
</script>

<style scoped>

  h1 {
    margin: 0;
  }

  .planet-container {
    display: grid;
    border-radius: 100%;
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1 / 1;
    margin: 100px auto 25px;
    position: relative;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
    text-align: center;
  }

  @media (max-width: 400px) {
    .planet-container {
      aspect-ratio: auto;
      border-radius: 5px;
      padding: 50px 0;
    }
  }

  .back-link {
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    display: block;
    padding: 10px 0;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.7em;
  }

  .back-link:after {
    content: "";
    display: block;
    height: 40px;
    width: 50px;
    background: url('../assets/falcon.svg') center no-repeat transparent;
    background-size: contain;
    transform: rotate(90deg);
    position: absolute;
    bottom: -100px;
    opacity: 0;
    left: 50%;
    transition: all 0.3s ease-out;
    pointer-events: none;
  }

  .back-link:hover:after {
    left: 25%;
    bottom: 25px;
    transform: rotate(45deg);
    opacity: 1;
  }

</style>
<template>
  <main v-if="!loading">
    <router-link :to="{ name: 'home' }" >
      Back to Character Overview
    </router-link>
  
    <h1>
      {{planet.name}}
    </h1>
    
    Population: {{planet.population}}
    <br/>
    Terrain: {{planet.terrain}}
    <br/>
    Climate: {{planet.climate}}
  </main>

  <main v-else>
    <Loading :loadingImage="loadingImage" />
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
      loadingImage: require('../assets/loading.gif'),
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

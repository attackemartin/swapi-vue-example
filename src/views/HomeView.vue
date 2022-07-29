<template>
  <main v-if="!loading">
    <People :people="people" :planets="planets" />
  </main>

  <main v-else>
    <div class="loading-overlay">
      Fetching Star Wars Data
      <img :src="loadingImage" class="loading-gif" />
    </div>
  </main>
</template>

<script>
import Services from "@/services"
import People from '@/components/People'


export default {
  name: 'HomeView',
  components: {
    People,
  },
  data() {
    return {
      loading: true,
      loadingImage: require('../assets/loading.gif'),
      films: {},
      people: {},
      planets: {},
    }
  },
  methods: {
    async fetchSWFilms() {
      const res = await fetch('https://swapi.dev/api/films')
      const swFilms = await res.json()
      return swFilms
    },
    
  },
  async created() {
    const swPeople = await Services.getAllSwapiPeople()
    console.log(swPeople)

    // const swPlanets = await Services.getSwapiPlanet()
    // console.log(swPlanets)

    const swFilms = await this.fetchSWFilms()
    console.log(swFilms)

    this.people = swPeople
    // this.planets = swPlanets
    this.films = swFilms.results
    this.loading = false

  }
}
</script>

<style scoped>

</style>
<template>
  <main v-if="!loading">
    <FilmSelect @get-film="getFilmID" :films="films" />
    <PeopleList :people="people" :planets="planets" />
  </main>

  <main v-else>
    <div class="loading-overlay">
      Fetching Star Wars Data
      <img :src="loadingImage" class="loading-gif" />
    </div>
  </main>
</template>

<script>
  import Services from "@/Services/PeopleService"
  import PeopleList from '@/components/PeopleList'
  import FilmSelect from '@/components/FilmSelect'
  import { thisExpression } from "@babel/types"


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
    }
  },
  methods: {
    async fetchSWFilms() {
      const res = await fetch('https://swapi.dev/api/films')
      const swFilms = await res.json()
      return swFilms
    },
    getFilmID(filmClass) {
      console.log(filmClass)
      const personContainer = document.getElementsByClassName('person-container')
      const selectedPersons = document.getElementsByClassName(filmClass)

      for (const person of personContainer) {
        person.classList.add('hidden');
      }

      for (const selectedPerson of selectedPersons) {
        selectedPerson.classList.remove('hidden');
      }

    }
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
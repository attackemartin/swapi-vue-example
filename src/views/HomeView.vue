<template>
  <main v-if="!loading">
    <FilmSelect @movie-filter="filterMovie" :films="films" />
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
    filterMovie(filmClass) {
      console.log(filmClass)
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
        })

    });

    const swFilms = await this.fetchSWFilms()

    this.people = swPeople
    this.films = swFilms.results
    this.loading = false

  }
}
</script>

<style scoped>

</style>
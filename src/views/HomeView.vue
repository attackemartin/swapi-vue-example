<template>
  <main class="wrapper">
    <section v-if="!loading">
      <div class="page-hero">
        <h1>Characters of Star Wars</h1>
        <small>*of Episodes 1 - 6</small>
      </div>
      
      <FilmSelect @movie-filter="filterMovie" :films="films" />
      <PeopleList :people="people" :planets="planets" />
    </section>

    <section v-else>
      <Loading :loadingImage="loadingImage" />
    </section>
    
  </main>
</template>

<script>
  import Services from "@/Services/PeopleService"
  import PeopleList from '@/components/PeopleList'
  import FilmSelect from '@/components/FilmSelect'
  import Loading from '@/components/Loading'
  

  export default {
    name: 'HomeView',
    components: {
      PeopleList,
      FilmSelect,
      Loading
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
            const weakRegExCopyPasteSkills = homePlanetData.url.replace( /^\D+/g, '');
            const homePlanetID = weakRegExCopyPasteSkills.slice(0, -1);
            
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


<style scoped>
  .page-hero {
    text-align: center;
    color: #fff;
    margin-bottom: 25px;
  }
</style>
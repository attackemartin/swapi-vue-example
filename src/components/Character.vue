<template>
  <div class="character-container" :class="filmClasses">
    <div>
      <h4>
        {{character.name}}
      </h4>
      <ul>
        <li>
          Hair Color: {{character.hair_color}}  
        </li>
        <li>
          Eye Color: {{character.eye_color}}
        </li>
        <li>
          Gender: {{character.gender}}
        </li>
      </ul>
      <p>
        
        <router-link
          :to="{ name: 'Planet', params: { id: character.homeplanetURLID} }"
        >

          Homeworld: {{character.homeplanetName}}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default ({
  name: 'Character',
  props: ['character','planets'],
  data() {
    return {
      filmClasses: '',
    }
  },
  methods: {
    async getMovieIDs() {
      this.character.films.forEach(movie => {
        const movieUrlID = movie[movie.length - 2];
        this.filmClasses = this.filmClasses + " movie-" + movieUrlID
        return movieUrlID
      });
    },
  },

  async created() {
    const movieIDs = await this.getMovieIDs()
    movieIDs
    
  }
})
</script>

<style scoped>
  .character-container {
    
  }
</style>
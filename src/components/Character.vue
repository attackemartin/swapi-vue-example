<template>
  <div class="character-container" :class="filmClasses">
    <div>
      <h4>
        {{character.name}}
      </h4>
      <ul>
        <li>
          <strong>
            Hair Color:
          </strong> 
          {{character.hair_color}}  
        </li>
        <li>
          <strong>
            Eye Color: 
          </strong>
          {{character.eye_color}}
        </li>
        <li>
          <strong>
            Gender:
          </strong>
          {{character.gender}}
        </li>
        <li>
          <strong>
            Homeworld:
          </strong>
          <router-link
            :to="{ name: 'Planet', params: { id: character.homeplanetURLID} }">

            {{character.homeplanetName}}
          </router-link>
        </li>
      </ul>
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
    background-color: #fff;
    padding: 20px;
    border-radius: 5px 20px 5px 5px;
  }

  .character-container h4 {
    margin: 0;
    font-size: 1.2em;
    text-transform: uppercase;
  }

  .character-container strong {
    display: block;
  }

  .character-container ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .character-container ul li {
    margin-top: 10px;
  }

  @media (max-width: 767px) {
    .character-container {  
      padding: 10px;
    }
  }  
</style>
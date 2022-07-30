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
    border-radius: 5px 5px 20px 5px;
    transition: border-radius 0.4s ease-out;
  }

  .character-container:hover {
    border-radius:  5px 20px 5px 5px;
  }

  .character-container h4 {
    margin: 0;
    font-size: 1.2em;
    text-transform: uppercase;
  }

  .character-container strong {
    display: block;
    font-size: 0.8em;
    color: rgba(0,0,0,0.4);
  }

  .character-container ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .character-container ul li {
    margin-top: 10px;
  }

  .character-container a {
    font-weight: bold;
    display: inline-block;
    padding: 4px 15px;
    margin-top: 5px;
    text-transform: uppercase;
    font-size: 0.75em;
    background-color: rgba(255,255,255,1);
    color: rgb(255, 191, 0);
    transition: all 0.2s ease-out;
    box-shadow: 1px 1px 0 0 rgba(0,0,0,0.5);
  }

  .character-container a:hover {
    box-shadow: 0 0 0 0 rgba(0,0,0,0.5); 
    background-color: rgb(255, 191, 0);
    color: #fff;
  }

  @media (max-width: 767px) {
    .character-container {  
      padding: 10px;
    }
  }  
</style>
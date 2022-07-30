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
          <StyledLink :linkURL="character.homeplanetURLID" :linkTitle="character.homeplanetName" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import StyledLink from '@/components/StyledLink'

export default ({
  name: 'Character',
  props: ['character','planets'],
  components: {
    StyledLink
  },
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
    background-color: rgba(255,255,255,0.15);
    padding: 20px;
    border-radius: 5px 5px 20px 5px;
    color: rgb(208, 208, 208);
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
    font-size: 0.7em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4)
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
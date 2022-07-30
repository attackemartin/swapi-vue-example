<template>
  <div class="person-container" :class="filmClasses">
    <div>
      <h4>
        {{person.name}}
      </h4>
      <ul>
        <li>
          Hair Color: {{person.hair_color}}  
        </li>
        <li>
          Eye Color: {{person.eye_color}}
        </li>
        <li>
          Gender: {{person.gender}}
        </li>
      </ul>
      <p>
        
        <router-link
          :to="{ name: 'Planet', params: { id: homeplanetID} }"
        >

          Homeworld: {{homeplanet.name}}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default ({
  name: 'Person',
  props: ['person','planets'],
  data() {
    return {
      homeplanet: {},
      homeplanetID: 0,
      filmClasses: '',
    }
  },
  methods: {
    async getHomeworld() {
      const res = await fetch(this.person.homeworld)
      const swFilms = await res.json()
      return swFilms
    },

    async getMovieIDs() {
      this.person.films.forEach(movie => {
        const movieUrlID = movie[movie.length - 2];
        this.filmClasses = this.filmClasses + " movie-" + movieUrlID
        return movieUrlID
      });
    },
  },

  async created() {
    const homeworld = await this.getHomeworld()
    const homePlanetID = homeworld.url[homeworld.url.length - 2];
    this.homeplanet = homeworld
    this.homeplanetID = homePlanetID

    const movieIDs = await this.getMovieIDs()
    movieIDs
    
  }
})
</script>

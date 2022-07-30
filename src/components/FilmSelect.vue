<template>
  <div class="movie-select">
    <span>Filter characters by movies:</span>

    <select @change="onChange()" v-model="selected">
      <option value="0">
        All Movies
      </option>
      <option v-for="film in films" :value="film.episode_id">
        {{film.title}}
      </option>
    </select>
  </div>
</template>

<script>
  export default ({
    name: 'FilmSelect',
    props: ['films'],
    data() {
      return {
        selected: 0
      }
    },
    methods: {
      onChange() {
        if (this.selected != 0) {
          const selectedFilm = this.films.find((item) => item.episode_id === this.selected)
          const selectedFilmURL = selectedFilm.url
          const filmID = selectedFilmURL[selectedFilmURL.length - 2];

          this.$emit('movie-filter', 'movie-' + filmID)
        } else {
          this.$emit('movie-filter', 'character-container')
        }
      }
    },
  })
</script>

<style scoped>
  .movie-select {
    color: rgba(255,255,255,0.7);
  }

  .movie-select span {
    font-size: 0.8em;
    display: block;
    margin-bottom: 5px;
  }

  .movie-select select {
    cursor: pointer;
  }
</style>
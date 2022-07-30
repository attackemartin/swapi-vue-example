<template>
  <select @change="onChange()" v-model="selected">
    <option value="0">
      All Movies
    </option>
    <option v-for="film in films" :value="film.episode_id">
      {{film.title}}
    </option>
  </select>
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

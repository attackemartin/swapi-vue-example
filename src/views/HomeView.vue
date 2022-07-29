<template>
  <div class="home">
    
    Hello World

  </div>
</template>

<script>


export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      loading: true,
      
    }
  },
  methods: {
    async fetchSwapiData() {
      const res = await fetch('https://swapi.dev/api/')
      const starwarsData = await res.json()
      return starwarsData
    }
  },
  async created() {
    const starwarsData = await this.fetchSwapiData()
    console.log(starwarsData);
  }
}
</script>

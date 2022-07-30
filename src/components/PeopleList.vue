<template>
  <div class="people-list-container">
    <Character v-for="character in people" :character="character" :planets="planets" />
  </div>
</template>

<script>
import Character from '@/components/Character'

export default ({
  name: 'PeopleList',
  components: {
    Character
  },
  props: ['people','planets'],
  methods: {
    
  },
})
</script>

<style scoped>
  .people-list-container {
    margin: 30px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }

  @media (max-width: 992px) {
    .people-list-container {  
      grid-template-columns: 1fr 1fr;
    }
  }  

  @media (max-width: 767px) {
    .people-list-container {  
      grid-template-columns: auto;
    }
  }  
</style>
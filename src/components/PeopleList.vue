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

  async created() {


  }
})
</script>

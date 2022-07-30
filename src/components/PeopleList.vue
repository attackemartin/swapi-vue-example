<template>
  <div class="people-list-container">
    <Person v-for="person in people" :person="person" :planets="planets" />
      
  </div>
</template>

<script>
import Services from "@/Services/PeopleService"
import Person from '@/components/Person'




export default ({
  name: 'PeopleList',
  components: {
    Person
  },
  props: ['people','planets'],
  methods: {
    
  },

  async created() {

    // const swPlanets = await Services.getSwapiPlanet()
    // console.log(swPlanets)

    // this.planets = swPlanets

  }
})
</script>

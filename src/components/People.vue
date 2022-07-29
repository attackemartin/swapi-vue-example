<template>
  <div class="people-container">
    <div v-for="person in people">
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
        Homeworld: {{person.homeworld}}
      </p>
    </div>
  </div>
</template>

<script>

export default ({
  name: 'People',
  props: ['people','planets'],


  async created() {
    // const swPlanets = await Services.getSwapiPlanet()
    // console.log(swPlanets)

    // this.planets = swPlanets

  }
})
</script>

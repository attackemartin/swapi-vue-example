<template>
  <router-link
    :to="{ name: 'Planet', params: { id: this.linkURL} }" class="styled-link">
    <span>
      Homeworld:
    </span>
    {{this.linkTitle}}
  </router-link>
</template>

<script>
  export default({
    name: 'StyledLink',
    props: ['linkURL','linkTitle'],
  })
</script>

<style scoped>
  .styled-link {
    display: inline-flex;
    padding: 8px 25px;
    flex-flow: column;
    margin: 5px 0;
    position: relative;
    text-transform: uppercase;
    border-radius: 5px 5px 0 0;
    font-size: 0.75em;
    background-color: rgba(255,255,255,0.1);
    color: rgb(255, 191, 0);
    transition: all 0.2s ease-out;
  }

  .styled-link:after,
  .styled-link:before {
    content: "";
    height: 5px;
    position: absolute;
    bottom: -5px;
    background-color: rgba(255,255,255,0.1);
    transition: width 0.2s ease-out;
  }

  .styled-link:before {
    left: 0;
    width: 55%;
    border-radius: 0 0 5px 5px;
  }

  .styled-link:after {
    right: 0;
    width: 15%;
    border-radius: 0 0 5px 5px;
  }

  .styled-link:hover {
    text-shadow: 0 0 5px #FFFFFF;
    color: #fff;
  }

  .styled-link:hover:before {
    width: 20%;
  }

  .styled-link:hover:after {
    width: 20%;
  }

  .styled-link span {
    font-size: 0.8em;
    color: rgba(255,255,255,0.5)
  }
</style>

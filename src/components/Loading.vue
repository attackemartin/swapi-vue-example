<template>
  <div class="loading-overlay">
    <div>
      <img :src="loadingImage" class="loading-gif" />
      <strong>
        Fetching Star Wars Data
      </strong>
    </div>
  </div>
</template>

<script>
  export default({
    name: 'Loading',
    props: ['loadingImage'],
  })
</script>

<style scoped>
  .loading-overlay {
    display: flex;
    align-content: center;
    text-align: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
  }

  .loading-overlay div {
    align-self: center;
  }

  .loading-overlay strong {
    display: block;
    margin-top: 20px;
  }

  .loading-gif {
    width: 100px;
    height: auto;
  }
</style>

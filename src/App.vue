<template>
  <div id="app">
    <PublicSpeakingDashboard/>
  </div>
</template>

<script>
import PublicSpeakingDashboard from './components/PublicSpeakingDashboard.vue'

export default {
  name: 'App',
  components: {
    PublicSpeakingDashboard
  }
}
</script>

<style>
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: hsla(202, 64%, 20%, 1);

background: linear-gradient(180deg, hsla(202, 64%, 20%, 1) 0%, hsla(235, 43%, 44%, 1) 100%);

background: -moz-linear-gradient(180deg, hsla(202, 64%, 20%, 1) 0%, hsla(235, 43%, 44%, 1) 100%);

background: -webkit-linear-gradient(180deg, hsla(202, 64%, 20%, 1) 0%, hsla(235, 43%, 44%, 1) 100%);

filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#123B52", endColorstr="#4048A1", GradientType=1 );
}
</style>

<template>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script>
  import { ThreeEngine } from './ts/TEngine.ts'
  import { allBaseObject } from './ts/TBaseObject.ts'
  import { allLights } from './ts/TLights.ts'  
  import { allHelper } from './ts/THelper.ts'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        ThreeEngine: null,
      };
    },
    mounted() {
      this.ThreeEngine = new ThreeEngine(this.$refs.threeTarget)
      this.ThreeEngine.addObject(...allBaseObject)  // add basic model
      this.ThreeEngine.addObject(...allLights)  // add light
      this.ThreeEngine.addObject(...allHelper)  // add support helper
    }
  }
</script>

<style scoped>
  .three-canvas {
    width: 100vh;
    height: 100vh;
    overflow: hidden;
    background-color: #d6eaff;
  }
</style>
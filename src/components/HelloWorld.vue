<template>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script>
import { ThreeEngine } from './ts/TEngine.ts'
import { allBaseObject } from './ts/TBaseObject.ts'
import { cylinder_base_model, BaseModel } from './ts/TBaseModel.ts'
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
    let test_base_model = new BaseModel(new cylinder_base_model([0.5, 5.49, 5.49, 14.48, 5.19, 5.19]))
    this.ThreeEngine.addObject(...test_base_model.allBaseObject)
    this.ThreeEngine.addObject(...allLights)  // add light
    this.ThreeEngine.addObject(...allHelper)  // add support helper
  }
};
</script>

<style scoped>
.three-canvas {
  width: 100vh;
  height: 100vh;
  overflow: hidden;
  background-color: #d6eaff;
}
</style>
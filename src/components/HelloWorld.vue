<template>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script>
import { ThreeEngine } from './ts/TEngine.ts'
import { cylinder_model, BaseModel } from './ts/TBaseModel.ts'
import { allLights } from './ts/TLights.ts'
import { allHelper } from './ts/THelper.ts'
import { LEEData, CHIMEI_data } from './ts/TData.ts'
import { TPoints } from './ts/TPoint.ts'
import { Vector3 } from "three"
export default {
  name: 'HelloWorld',
  data() {
    return {
      ThreeEngine: null,
    };
  },
  mounted() {
    // let leedata = new LEEData()
    // let test_base_model = new BaseModel(new cylinder_model(
    //   [leedata.BaseHeight,
    //   leedata.BaseTopRadius,
    //   leedata.BaseButtomRadius,
    //   leedata.Height,
    //   leedata.TopRadius,
    //   leedata.ButtomRadius]))
    // let tpoints = new TPoints(leedata.Points);

    let data = new CHIMEI_data()
    let test_base_model = new BaseModel(new cylinder_model(
      [data.ConeHeight,
      data.ConeTopRadius,
      data.ConeButtomRadius,
      data.Height,
      data.TopRadius,
      data.ButtomRadius]))
    let tpoints = new TPoints(data.Points);

    this.ThreeEngine = new ThreeEngine(this.$refs.threeTarget, test_base_model)

    this.ThreeEngine.addObject(...test_base_model.allBaseObject)
    this.ThreeEngine.addObject(...tpoints.allPointsObject)
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
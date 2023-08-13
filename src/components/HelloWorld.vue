<template>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script>
import { ThreeEngine } from './ts/TEngine.ts'
import { cylinder_model, BaseModel } from './ts/TBaseModel.ts'
import { allLights } from './ts/TLights.ts'
import { allHelper } from './ts/THelper.ts'
import { LEEData } from './ts/TData.ts'
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
    this.ThreeEngine = new ThreeEngine(this.$refs.threeTarget)
    let leedata = new LEEData()
    let test_base_model = new BaseModel(new cylinder_model(
      [leedata.BaseHeight,
      leedata.BaseTopRadius,
      leedata.BaseButtomRadius,
      leedata.Height,
      leedata.TopRadius,
      leedata.ButtomRadius]))
    let tpoints = new TPoints(leedata.Points);

    // for (let index = 0; index < leedata.Points.length;) {
    //   this.ThreeEngine.camera.position.set(test_base_model.search_points(leedata.Points[index], leedata.Points[index + 1], leedata.Points[index + 2], 1))
    //   index = index + 2
    // }
    let v = test_base_model.search_points(-3.203, 7.90868, 4.694, 5)
    this.ThreeEngine.camera.position.set(v.x, v.y, v.z)
    this.ThreeEngine.cameracontrol.target.set(-3.203, 7.90868, 4.694)

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
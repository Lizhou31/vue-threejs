import { Mesh, CylinderGeometry, MeshPhongMaterial, Cylindrical, Vector3 } from "three"

/* base interface */
interface model_base {
    construct_Mesh(): Array<Mesh>; // 建立 Mesh 結構體
    caculate_and_compare_point(PointX: number, PointY: number, PointZ: number): number; // 比較點在物件的哪個區域
    getCameraPosition(pointX: number, pointY: number, pointZ: number, distance: number): Vector3; // 給出相機需要移動到的點位
}

/* 用來實現圓柱類實體 */
export class cylinder_model implements model_base {

    CylinderArray: Array<CylinderGeometry> = [];
    params: Array<number> = [];

    /* 用來紀錄組成最後物件的模型各個層參數 */
    layer_Height: Array<number> = [];
    layer_TRadius: Array<number> = [];
    layer_BRadius: Array<number> = [];

    constructor(params: Array<number>) {
        this.params = params
        let index: number = 0;

        if (params.length > 0) {
            while (index < params.length) {

                let CylinderHeight = params[index++]
                let CylinderTopRadius = params[index++]
                let CylinderButtomRadius = params[index++]

                let y_offset = this.caculate_y_offset(CylinderHeight) // 求出每一層的起始高度

                /* 建立 各層 CylinderGeometry 實體 */

                this.CylinderArray.push(
                    new CylinderGeometry(CylinderTopRadius, CylinderButtomRadius, CylinderHeight, 32)
                        .translate(0, y_offset, 0))
                /* 每層高度計算方式 */
                /*
                * 若共 N 層，每層高度為 H_k，k = [1,N]
                * 則第 K 層的高度偏移為 SUM(H_k) 當 k=[1,K-1]，再加上 0.5 * H_K 
                */

                this.record_layer_info(CylinderHeight, CylinderTopRadius, CylinderButtomRadius) // 紀錄每一層的數據
            }
        }
    }

    /* 簡單計算每層起始高度 */
    caculate_y_offset(current_height: number): number {
        let height: number = 0;
        for (let i = 0; i < this.CylinderArray.length; i++) {
            // console.log(this.params[i*3])
            height += this.params[i * 3]
        }
        return height + 0.5 * current_height
    }

    /* 紀錄每層資料 */
    record_layer_info(height: number, tradius: number, bradius: number) {
        this.layer_Height.push(height)
        this.layer_TRadius.push(tradius)
        this.layer_BRadius.push(bradius)
    }

    /* 建立 Mesh 實體 */
    construct_Mesh() {
        let allBaseObject: Array<Mesh> = [];
        this.CylinderArray.forEach(cylindergeometry => {
            allBaseObject.push(new Mesh(
                cylindergeometry
                , new MeshPhongMaterial({
                    color: 'rgb(36,172,242)',
                    transparent: true,
                    opacity: 0.80
                })))
        })
        return allBaseObject;
    }

    /* 計算傳入的點在哪一層 */
    caculate_and_compare_point(pointX: number, PointY: number, PointZ: number) {
        let result: number = 0

        /* 線性比較高度 */
        // TODO: O(N), could be optimized?
        while (PointY > 0) {
            PointY = PointY - this.layer_Height[result]
            result++;
        }

        return result - 1
    }

    /* 計算出傳入的點會需要將照相機移動到何處 */
    getCameraPosition(pointX: number, pointY: number, pointZ: number, distance: number) {

        /* 先確定點在哪層 */
        let layer_index = this.caculate_and_compare_point(pointX, pointY, pointZ)

        /* 計算偏移角度 theta */
        let theta = Math.atan((this.layer_TRadius[layer_index] - this.layer_BRadius[layer_index])
            / this.layer_Height[layer_index])

        /* 計算照相機的 y 軸偏移(於圓柱座標系) */
        let camera_y_offset = distance * Math.sin(theta)

        /* 計算照相機的 r 軸偏移(於圓柱座標系) */
        let camera_r_offset = distance * Math.cos(theta)

        /* 將座標轉換回笛卡兒座標 */
        let c = new Cylindrical().setFromCartesianCoords(pointX, pointY, pointZ)
        let c_new = new Cylindrical(c.radius + camera_r_offset, c.theta, c.y - camera_y_offset)
        let v = new Vector3().setFromCylindrical(c_new)
        return v
    }
}

/* 球形物件實現 */
export class sphere_model implements model_base {
    // TODO : 球體

    construct_Mesh() {
        let allBaseObject: Array<Mesh> = [];

        return allBaseObject;
    }

    caculate_and_compare_point(pointX: number, PointY: number, PointZ: number) {
        let result: number = 0

        return result
    }

    getCameraPosition(pointX: number, pointY: number, pointZ: number, distance: number) {
        let v = new Vector3()

        return v
    }

}

/* 引入的模型物件實現 */
export class import_model implements model_base {
    // TODO : 用以引入的 Model

    construct_Mesh() {
        let allBaseObject: Array<Mesh> = [];

        return allBaseObject;
    }

    caculate_and_compare_point(pointX: number, PointY: number, PointZ: number) {
        let result: number = 0

        return result
    }

    getCameraPosition(pointX: number, pointY: number, pointZ: number, distance: number) {
        let v = new Vector3()

        return v
    }
}

export class BaseModel {

    model_type: model_base;
    allBaseObject: Array<Mesh>;

    constructor(model_type: model_base) {

        this.model_type = model_type
        this.allBaseObject = this.model_type.construct_Mesh()
    }

    /* Demo用方法，傳入需要聚焦的點位和希望相機離目標的距離，回傳相機該移動到的地方 */
    search_points(x: number, y: number, z: number, d: number): Vector3 {
        return this.model_type.getCameraPosition(x, y, z, d)
    }

}
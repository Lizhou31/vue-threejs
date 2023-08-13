import { Mesh, CylinderGeometry, MeshPhongMaterial, Cylindrical, Vector3 } from "three"

interface model_base {
    construct_Mesh(): Array<Mesh>;
    caculate_and_compare_point(point_height: number): number;
    getCameraPosition(pointX: number, pointY: number, pointZ: number, distance: number): Vector3;
}

export class cylinder_model implements model_base {

    CylinderArray: Array<CylinderGeometry> = [];
    params: Array<number> = [];

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
                let y_offset = this.caculate_y_offset()
                this.CylinderArray.push(
                    new CylinderGeometry(CylinderTopRadius, CylinderButtomRadius, CylinderHeight, 32)
                        .translate(0, y_offset + 0.5 * (CylinderHeight), 0))

                this.record_layer_info(CylinderHeight, CylinderTopRadius, CylinderButtomRadius)
            }
        }
        this.getCameraPosition(4.875, 5.31663, 2.922, 1)
    }

    caculate_y_offset(): number {
        let height: number = 0;
        for (let i = 0; i < this.CylinderArray.length; i++) {
            // console.log(this.params[i*3])
            height += this.params[i * 3]
        }
        return height
    }

    record_layer_info(height: number, tradius: number, bradius: number) {
        this.layer_Height.push(height)
        this.layer_TRadius.push(tradius)
        this.layer_BRadius.push(bradius)
    }

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

    caculate_and_compare_point(point_height: number) {
        let result: number = 0

        // TODO: O(N), can be optimized
        while (point_height > 0) {
            point_height = point_height - this.layer_Height[result]
            result++;
        }

        return result - 1
    }

    getCameraPosition(pointX: number, pointY: number, pointZ: number, distance: number) {
        let layer_index = this.caculate_and_compare_point(pointY)
        let camera_y_offset = distance * Math.sin(
            Math.atan(
                (this.layer_TRadius[layer_index] - this.layer_BRadius[layer_index])
                / this.layer_Height[layer_index]))

        let c = new Cylindrical().setFromCartesianCoords(pointX, pointY, pointZ)
        let c_new = new Cylindrical(c.radius + distance, c.theta, c.y - camera_y_offset)
        let v = new Vector3().setFromCylindrical(c_new)
        // console.log(v.x, v.y, v.z)
        return v
    }
}

export class sphere_model implements model_base {
    // TODO : 球體

    construct_Mesh() {
        let allBaseObject: Array<Mesh> = [];

        return allBaseObject;
    }

    caculate_and_compare_point(point: number) {
        let result: number = 0

        return result
    }
}

export class import_model implements model_base {
    // TODO : 用以引入的 Model

    construct_Mesh() {
        let allBaseObject: Array<Mesh> = [];

        return allBaseObject;
    }

    caculate_and_compare_point(point: number) {
        let result: number = 0

        return result
    }
}

export class BaseModel {

    model_type: model_base;
    allBaseObject: Array<Mesh>;

    constructor(model_type: model_base) {

        this.model_type = model_type
        this.allBaseObject = this.model_type.construct_Mesh()
    }

    search_points(x: number, y: number, z: number, d: number): Vector3 {
        return this.model_type.getCameraPosition(x, y, z, d)
    }

}
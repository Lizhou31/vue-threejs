import { Mesh, CylinderGeometry, MeshPhongMaterial } from "three"

interface model_base {
    construct_Mesh(): Array<Mesh>;
}

export class cylinder_base_model implements model_base {

    CylinderArray: Array<CylinderGeometry> = [];
    params: Array<number> = [];
    constructor(params: Array<number>) {
        this.params = params
        let index: number = 0;
        if (params.length > 0) {
            while (index < params.length) {
                let CylinderHeight = params[index++]
                let CylinderTopRadius = params[index++]
                let CylinderButtomRadius = params[index++]
                this.CylinderArray.push(
                    new CylinderGeometry(CylinderTopRadius, CylinderButtomRadius, CylinderHeight, 32)
                        .translate(0, this.caculate_height(CylinderHeight), 0))

            }
        }
        else {
            // TODO : Sphere
        }
    }

    caculate_height(current_height: number): number {
        let height: number = 0;
        for (let i = 0; i < this.CylinderArray.length; i++) {
            // console.log(this.params[i*3])
            height += this.params[i * 3]
        }
        return height + 0.5 * (current_height)
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
}

export class import_model implements model_base {
    // TODO : 用以引入的 Model

    construct_Mesh() {

    }
}

export class BaseModel {

    model_type: model_base;
    allBaseObject: Array<Mesh>;

    constructor(model_type: model_base) {

        this.model_type = model_type
        this.allBaseObject = this.model_type.construct_Mesh()
    }

}
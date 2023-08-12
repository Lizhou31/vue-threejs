import { SphereGeometry, Mesh, MeshStandardMaterial } from "three"

export class TPoints {
    allPointsObject: Array<Mesh> = [];
    constructor(Points: Array<number>) {
        for (let i = 0; i < Points.length;) {
            this.allPointsObject.push(
                new Mesh(
                    new SphereGeometry(0.1, 32, 16).translate(Points[i], Points[i + 1], Points[i + 2]),
                    new MeshStandardMaterial({
                        color: 'rgb(240,207,23)'
                    })
                )
            )
            i=i+3
        }
    }
}
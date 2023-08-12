import { CylinderGeometry, Mesh, MeshPhongMaterial } from "three"

let CylinderRedius = 5.19;
let CylinderHeight = 14.48

export const allBaseObject = []

export const cylinder = new Mesh(
    new CylinderGeometry(CylinderRedius, CylinderRedius, CylinderHeight, 32).translate(0, (14.48 / 2) + 0.5, 0),
    new MeshPhongMaterial({
        color: 'rgb(36,172,242)',
        transparent: true,
        opacity: 0.80
    })
)

export const base_cylinder = new Mesh(
    new CylinderGeometry(CylinderRedius + 0.3, CylinderRedius + 0.3, 0.5, 32).translate(0, 0.5 / 2, 0),
    new MeshPhongMaterial({
        color: 'rgb(36,172,242)',
        transparent: true,
        opacity: 0.80
    })
)

// export const ch_cylinder = new Mesh(
//     new CylinderGeometry( 7.5, 7.5, 2.5, 32).translate(-20, 5.71428571428571 + 1.25, 0),
//     new MeshPhongMaterial({
//         color: 'rgb(36,172,242)',
//         transparent: true,
//         opacity: 0.80
//     })
// )

// export const ch_ness = new Mesh(
//     new CylinderGeometry( 7.5, (6.42857142857143)/2, 5.71428571428571, 32).translate(-20, 5.71428571428571/2, 0),
//     new MeshPhongMaterial({
//         color: 'rgb(36,172,242)',
//         transparent: true,
//         opacity: 0.80
//     })
// )

allBaseObject.push(cylinder, base_cylinder)
// allBaseObject.push(ch_cylinder, ch_ness)
import { AmbientLight, PointLight } from "three"

export const allLights = []

export const ambientLight = new AmbientLight('rgb(255,255,255)', 0.8)
export const pointLight = new PointLight(
    'rgb(255,255,255)', // color
    0.8, // intensity
    600, // distance
    0.2 //decay
)
pointLight.position.set(0,100,200)

allLights.push(ambientLight, pointLight)
import { WebGLRenderer, Scene, Vector3, MOUSE ,PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class ThreeEngine {
    dom = null; // mounted dom
    scene = null;
    camera = null;
    cameracontrol = null;
    constructor(dom){

        // create renderer
        let renderer = new WebGLRenderer({
            antialias:true, // 抗鋸齒
        })

        dom.appendChild(renderer.domElement) // 掛載抗鋸齒
        renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
        let scene = new Scene()
        let camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)
        camera.position.set(50,50,50)
        camera.lookAt(new Vector3(0,0,0))
        camera.up = new Vector3(0,1,0)
        renderer.render(scene,camera)
        renderer.setClearColor('rgb(195,234,245)')

        let cameracontrol = new OrbitControls(camera, renderer.domElement)

        let animate = () => {
            renderer.render(scene,camera)
            cameracontrol.update()
            requestAnimationFrame(animate)
        }
        animate()

        this.dom = dom
        this.scene = scene
        this.camera = camera
        this.cameracontrol = cameracontrol
    }

    addObject(...object){
        object.forEach(elem => {
            this.scene.add(elem)
        })
    }
}
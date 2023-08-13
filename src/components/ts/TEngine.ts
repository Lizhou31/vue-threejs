import { WebGLRenderer, Scene, Vector3, Raycaster, Vector2, PerspectiveCamera, MOUSE } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BaseModel } from './TBaseModel.ts'

export class ThreeEngine {
    dom = null; // mounted dom
    scene = null;
    camera = null;
    cameracontrol = null;
    constructor(dom: any, basemodel: BaseModel) {

        // create renderer
        let renderer = new WebGLRenderer({
            antialias: true, // 抗鋸齒
        })

        dom.appendChild(renderer.domElement) // 掛載抗鋸齒
        renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
        let scene = new Scene()
        let camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)
        camera.position.set(50, 50, 50)
        camera.lookAt(new Vector3(0, 0, 0))
        camera.up = new Vector3(0, 1, 0)
        renderer.render(scene, camera)
        renderer.setClearColor('rgb(195,234,245)')

        let cameracontrol = new OrbitControls(camera, renderer.domElement)
        cameracontrol.mouseButtons = {
            LEFT: null,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ROTATE
        }
        let raycaster = new Raycaster()

        let mouse = new Vector2()
        let mouseX = 0; let mouseY = 0; let mouseWidth = 0; let mouseHeight = 0;

        renderer.domElement.addEventListener("mousemove", event => {
            mouseX = event.offsetX
            mouseY = event.offsetY
            mouseWidth = renderer.domElement.offsetWidth
            mouseHeight = renderer.domElement.offsetHeight

            mouse.x = mouseX / mouseWidth * 2 - 1
            mouse.y = -mouseY * 2 / mouseHeight + 1
        })

        renderer.domElement.addEventListener("click", event => {
            raycaster.setFromCamera(mouse, camera)
            const intersection = raycaster.intersectObjects(scene.children)
            // console.log(intersection)
            try {
                if (intersection[0].object.geometry.type === "SphereGeometry") {
                    let point = intersection[0].object.geometry.boundingSphere.center;
                    let v = basemodel.search_points(point.x, point.y, point.z, 5)
                    camera.position.set(v.x, v.y, v.z)
                    cameracontrol.target.set(point.x, point.y, point.z,)
                }
            }
            catch (e) {

            }

        })

        let animate = () => {
            renderer.render(scene, camera)
            cameracontrol.update()
            requestAnimationFrame(animate)
        }
        animate()

        this.dom = dom
        this.scene = scene
        this.camera = camera
        this.cameracontrol = cameracontrol
    }

    addObject(...object) {
        object.forEach(elem => {
            this.scene.add(elem)
        })
    }
}
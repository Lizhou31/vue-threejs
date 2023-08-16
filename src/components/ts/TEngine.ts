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
        const renderer = new WebGLRenderer({
            antialias: true, // 抗鋸齒
        })

        let current_mouse = { x: Number, y: Number }

        let mousemove: boolean = false

        dom.appendChild(renderer.domElement) // 掛載抗鋸齒
        renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
        const scene = new Scene()
        const camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)
        camera.position.set(50, 50, 50)
        camera.lookAt(new Vector3(0, 0, 0))
        camera.up = new Vector3(0, 1, 0)
        renderer.render(scene, camera)
        renderer.setClearColor('rgb(195,234,245)')

        /* 軌道控制器 */
        const cameracontrol = new OrbitControls(camera, renderer.domElement)

        /* 射線，用於建立滑鼠點擊功能 */
        const raycaster = new Raycaster()

        const mouse = new Vector2()
        let mouseX = 0; let mouseY = 0; let mouseWidth = 0; let mouseHeight = 0;

        renderer.domElement.addEventListener("mousemove", event => {
            mouseX = event.offsetX
            mouseY = event.offsetY
            mouseWidth = renderer.domElement.offsetWidth
            mouseHeight = renderer.domElement.offsetHeight

            mouse.x = mouseX / mouseWidth * 2 - 1
            mouse.y = -mouseY * 2 / mouseHeight + 1
            mousemove = true;
        })

        function onMouseClick() {
            raycaster.setFromCamera(mouse, camera)
            const intersection = raycaster.intersectObjects(scene.children)
            // console.log(intersection)
            try {
                if (intersection[0].object.geometry.type === "SphereGeometry") {
                    const point = intersection[0].object.geometry.boundingSphere.center;
                    const v = basemodel.search_points(point.x, point.y, point.z, 10)
                    camera.position.set(v.x, v.y, v.z)
                    cameracontrol.target.set(point.x, point.y, point.z,)
                }
            }
            catch (e) {
                // TODO
            }
        }

        function onMouseUp(event) {
            if (mousemove) {
                // console.log("Mouse Dragged");
                if (current_mouse != null) {
                    const distance = Math.sqrt(Math.pow(event.clientX - current_mouse.x, 2) + Math.pow(event.clientY - current_mouse.y, 2));
                    if (distance < 10) {
                        // console.log("{INFO} Moving less than 10 px");
                        onMouseClick();
                    }
                }
            } else {
                onMouseClick();
            }
        }

        function onMouseDown(event) {
            current_mouse.x = event.clientX
            current_mouse.y = event.clientY
            mousemove = false
        }

        renderer.domElement.addEventListener('mouseup', onMouseUp);
        renderer.domElement.addEventListener('mousedown', onMouseDown);


        /* 渲染 */
        const animate = () => {
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
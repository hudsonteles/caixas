import { extend, useLoader, useThree, useFrame } from "@react-three/fiber";
import { TextureLoader, MeshBasicMaterial, Line, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { useRef} from "react";

extend({ OrbitControls, DragControls });

const Objetos3d = () => {

    const Linha = ({
        start,
        end
    }) => {

        const ref = useRef()

        useFrame(() => {
            if(ref.current){
                ref.current.geometry.setFromPoints([start, end].map((point) => new Vector3(...point)));
            }
        })

        return (
            <line ref={ref} >
                {/* <group position-z={-0.1} position-x={60}>
                    <Html>
                        <Typography>
                            {}
                        </Typography>
                    </Html> */}
                    <bufferGeometry />
                    <lineBasicMaterial color="hotpink"/>
                {/* </group> */}
            </line>
        )

    }

    const Palete3d = ({
        mesh,
        box
    }) => {

        const loader = new TextureLoader();

        const materials = [
            new MeshBasicMaterial({map: loader.load('images/textures/pallete/side.png')}),
            new MeshBasicMaterial({map: loader.load('images/textures/pallete/side.png')}),
            new MeshBasicMaterial({map: loader.load('images/textures/pallete/top.png')}),
            new MeshBasicMaterial({map: loader.load('images/textures/pallete/top.png')}),
            new MeshBasicMaterial({map: loader.load('images/textures/pallete/front.png')}),
            new MeshBasicMaterial({map: loader.load('images/textures/pallete/front.png')})
        ]

        return (
            <mesh
                {...mesh}
                recieveShadow={true}
                castShadow={true}
                material={materials}
            >
                <boxBufferGeometry args={box.dimensions}/>
                {/* <meshPhysicalMaterial
                    map={texture}
                    color={"white"}
                /> */}
            </mesh>
            // <mesh
            //     {...mesh}
            //     receiveShadow={true}
            // >
            //     <boxBufferGeometry args={box.dimensions} />
            //     <meshPhysicalMaterial color='white' />
            // </mesh>
        )
    }

    const Caixa = ({
        mesh,
        box
    }) => {
        // const loader = new TextureLoader();

        // const materials = [
        //     new MeshBasicMaterial({map: loader.load('images/textures/box/side-escura.png')}),
        //     new MeshBasicMaterial({map: loader.load('images/textures/box/side-escura.png')}),
        //     new MeshBasicMaterial({map: loader.load('images/textures/box/top-escura.png')}),
        //     new MeshBasicMaterial({map: loader.load('images/textures/box/top-escura.png')}),
        //     new MeshBasicMaterial({map: loader.load('images/textures/box/front-escura.png')}),
        //     new MeshBasicMaterial({map: loader.load('images/textures/box/front-escura.png')})
        // ]

        // const texture = new CubeTextureLoader()
        // .setPath('/images/textures/box/')
        // .load(["front.png", "front.png", "front.png", "front.png", "front.png", "front.png"]);

        // const texture = useLoader(
        //     CubeTextureLoader,
        //     [["front.png", "front.png", "front.png", "front.png", "front.png", "front.png"]],
        //     (loader) => {
        //         loader.setPath('/images/textures/box/')
        //     }
        // )
        const texture = useLoader(TextureLoader,
             "images/textures/box/papelao.png"
        )

        return (
            <mesh
                {...mesh}
                recieveShadow={true}
                castShadow={true}
                // material={materials}
            >
                <boxBufferGeometry args={box.dimensions}/>
                <meshPhysicalMaterial
                    map={texture}
                    color={"white"}
                />
            </mesh>
        );
    }

    function Controls(props){
        const { camera, gl } = useThree();
        return <orbitControls attach={"orbitControls"}  args={[camera, gl.domElement]} />;
    }

    function LightBulb(props){
        return (
            <mesh {...props} >
                <pointLight castShadow />
                <sphereBufferGeometry args={[0.2, 30, 10]} />
                <meshPhongMaterial emissive={"yellow"}  />
            </mesh>
        );
    }

    // function Draggable(props) {

    //     const groupRef = useRef<any>();
    //     const controlsRef = useRef<any>();
    //     const [objects, setObjects] = useState();
    //     const { camera, gl, scene } = useThree();

    //     useEffect(() => {
    //       setObjects(groupRef.current.children);
    //     }, [groupRef]);

    //     useEffect(() => {
    //       controlsRef.current.addEventListener("hoveron", () => {
    //         scene.orbitControls.enabled = false;
    //       });
    //       controlsRef.current.addEventListener("hoveroff", () => {
    //         scene.orbitControls.enabled = true;
    //       });
    //     }, [objects]);
    //     return (
    //       <group ref={groupRef}>
    //         <dragControls ref={controlsRef} args={[objects, camera, gl.domElement]} />
    //         {props.children}
    //       </group>
    //     );
    // }

    return {Palete3d, Caixa, Controls, LightBulb, Linha}

}

export default Objetos3d;

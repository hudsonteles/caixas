
import { Canvas } from 'react-three-fiber';
import css from '../styles/Home.module.css';
import { extend, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Fragment, useEffect, useRef, useState } from 'react';
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { TextureLoader, CubeTextureLoader, BoxGeometry, MeshBasicMaterial, Mesh } from "three";

extend({ OrbitControls, DragControls });

const Pallete = ({
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

const Box = ({
    mesh,
    box
}) => {
    const loader = new TextureLoader();

    const materials = [
        new MeshBasicMaterial({map: loader.load('images/textures/box/side-escura.png')}),
        new MeshBasicMaterial({map: loader.load('images/textures/box/side-escura.png')}),
        new MeshBasicMaterial({map: loader.load('images/textures/box/top-escura.png')}),
        new MeshBasicMaterial({map: loader.load('images/textures/box/top-escura.png')}),
        new MeshBasicMaterial({map: loader.load('images/textures/box/front-escura.png')}),
        new MeshBasicMaterial({map: loader.load('images/textures/box/front-escura.png')})
    ]

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

function LightBulb(props) {
    return (
        <mesh {...props} >
            <pointLight castShadow />
            <sphereBufferGeometry args={[0.2, 30, 10]} />
            <meshPhongMaterial emissive={"yellow"}  />
        </mesh>
    );
}

function Controls(props) {
    const { camera, gl } = useThree();
    return <orbitControls attach={"orbitControls"}  args={[camera, gl.domElement]} />;
}

function Draggable(props) {

  const groupRef = useRef<any>();
  const controlsRef = useRef<any>();
  const [objects, setObjects] = useState();
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    setObjects(groupRef.current.children);
  }, [groupRef]);

  useEffect(() => {
    controlsRef.current.addEventListener("hoveron", () => {
      scene.orbitControls.enabled = false;
    });
    controlsRef.current.addEventListener("hoveroff", () => {
      scene.orbitControls.enabled = true;
    });
  }, [objects]);
  return (
    <group ref={groupRef}>
      <dragControls ref={controlsRef} args={[objects, camera, gl.domElement]} />
      {props.children}
    </group>
  );
}

export default function Home() {

    const [ spaceXBox, setSpaceXBox ] = useState(0.00)
    const [ spaceYBox, setSpaceYBox ] = useState(0.00)
    const [ spaceZBox, setSpaceZBox ] = useState(0.00)
    const [ larguraBox, setLarguraBox ] = useState(30)
    const [ comprimentoBox, setComprimentoBox ] = useState(30)
    const [ alturaBox, setAlturaBox ] = useState(30)
    const [ larguraPallete, setLarguraPallete ] = useState(120)
    const [ comprimentoPallete, setComprimentoPallete ] = useState(100)
    const [ alturaPallete, setAlturaPallete ] = useState(110)

    const getCaixasLinha = () => {
        return Math.ceil(larguraPallete/(larguraBox+spaceXBox)) * (larguraBox+spaceXBox) > larguraPallete ?
            Math.ceil(larguraPallete/(larguraBox+spaceXBox)) - 1
        :
            Math.ceil(larguraPallete/(larguraBox+spaceXBox))
    }

    const getCaixasColuna = () => {
        return Math.ceil(comprimentoPallete/(comprimentoBox+spaceYBox)) * (comprimentoBox+spaceYBox) > comprimentoPallete ?
            Math.ceil(comprimentoPallete/(comprimentoBox+spaceYBox)) - 1
        :
            Math.ceil(comprimentoPallete/(comprimentoBox+spaceYBox))
    }

    const getCaixasAltura = () => {
        return Math.ceil(alturaPallete/(alturaBox+spaceZBox)) * (alturaBox+spaceZBox) > alturaPallete ?
            Math.ceil(alturaPallete/(alturaBox+spaceZBox)) - 1
        :
            Math.ceil(alturaPallete/(alturaBox+spaceZBox))
    }

    console.log('larguraPallete', larguraPallete)
    console.log('larguraBox', larguraBox)
    console.log('getCaixasColuna', getCaixasColuna())
    console.log('larguraBox * getCaixasColuna()', larguraBox * getCaixasColuna())
    console.log('larguraBox * getCaixasLinha()', larguraBox * getCaixasLinha())

    return (
        <div className={css.scene}>
            <Canvas
                shadows={true}
                className={css.canvas}
                camera={{
                    position: [-60, 70, 70]
                }}
            >
                {/* <Draggable>
                    <LightBulb position={[0, 3, 0]} />
                </Draggable> */}
                <ambientLight color={"white"} intensity={0.2} />
                <spotLight position={[100, 200, 400]} angle={0.3}/>
                    {
                        [...Array(getCaixasAltura()).keys()].map((itemAltura, indexAltura) => {
                            return(
                                [...Array(getCaixasColuna()).keys()].map((itemColuna, indexColuna) => {
                                    return (
                                        [...Array(getCaixasLinha()).keys()].map((itemLinha, indexLinha) => {
                                            return (
                                                // <Draggable>
                                                <Fragment
                                                    key={`${indexAltura}${indexColuna}${indexLinha}`}
                                                >
                                                    <Box
                                                        mesh={{
                                                            position: [
                                                                -((larguraBox * getCaixasLinha() / 2) - (larguraBox/2)) + (larguraBox * itemLinha) + (spaceXBox * (itemLinha + 1)),
                                                                (alturaBox * itemAltura) + (spaceZBox * (itemAltura + 1)),
                                                                -((comprimentoBox * getCaixasColuna() / 2) - (comprimentoBox/2)) + (comprimentoBox * itemColuna) + (spaceYBox * (itemColuna + 1)),
                                                            ]
                                                        }}
                                                        box={{
                                                            dimensions: [larguraBox, alturaBox, comprimentoBox]
                                                        }}
                                                    />
                                                </Fragment>
                                                // </Draggable>
                                            )
                                        })
                                    )
                                })
                            )
                        })
                    }

                <Controls />
                <Pallete
                    mesh={{
                        position: [
                            0,
                            -(alturaBox-((alturaBox/2) - 7)),
                            0
                        ]
                    }}
                    box={{
                        dimensions: [larguraPallete, 14, comprimentoPallete]
                    }}
                />
            </Canvas>
        </div>
    )

};

import React, { useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FirstPersonControls, OrbitControls, SpotLight, useHelper, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { SpotLightHelper } from 'three';
import { useControls } from 'leva'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';



function Box() {
    const boxRef = useRef();

    useFrame(() => {
        boxRef.current.rotation.y += 0.01;
        boxRef.current.rotation.z += 0.01;
        boxRef.current.rotation.x += 0.01;
    })

    return (
        <mesh ref={boxRef} position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    )
}


function Model() {
    const [error, setError] = useState(null);
    const { scene } = useGLTF('/models/test.glb');
    
    useEffect(() => {
        // Configure Draco decoder
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        console.log('Draco loader configured');

        return () => {
            dracoLoader.dispose();
        };
    }, []);

    useEffect(() => {
        if (scene) {
            console.log('Scene loaded:', scene);
        }
    }, [scene]);

    if (error) {
        console.error('Error in model:', error);
        return null;
    }

    return (
        <primitive 
            object={scene}
            scale={1}
            position={[0, 0, 0]}
            onError={(e) => {
                console.error('Primitive error:', e);
                setError(e);
            }}
        />
    );
}

function LightWithHelper() {
    const light = useRef();
    const { angle } = useControls({
        angle: Math.PI / 8
    });

    useHelper(light, SpotLightHelper, 1, 'hotpink');

    return <SpotLight ref={light}
        position={[3, 3, 0]}
        angle={angle}
        penumbra={1}
        intensity={80} />
}




function Second() {
    return (
        <div className='bg-gray-400' style={{ width: '100vw', height: '100vh' }}>

            <Canvas camera={{ position: [4, 5, 4], fov: 60 }}>
                <directionalLight position={[2, 5, 1]} intensity={0.5} />
                <ambientLight intensity={0.5} />
                <Suspense fallback={
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="hotpink" wireframe />
                    </mesh>
                }>
                    <Model />
                </Suspense>
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    )
}

export default Second;
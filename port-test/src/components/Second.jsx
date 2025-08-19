import React, { useState, Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { SpotLightHelper } from 'three';
import CameraController from './Camera/cameraController'; // 👈 import camera logic


// ---------------- Box for testing ----------------
function Box() {
    const boxRef = useRef();

    useFrame(() => {
        if (boxRef.current) {
            boxRef.current.rotation.y += 0.01;
            boxRef.current.rotation.z += 0.01;
            boxRef.current.rotation.x += 0.01;
        }
    });

    return (
        <mesh ref={boxRef} position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
}

// ---------------- Model ----------------
function Model() {
    const [error, setError] = useState(null);
    const { scene } = useGLTF('/models/finale.glb');

    useEffect(() => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        console.log('Draco loader configured');
        return () => dracoLoader.dispose();
    }, []);

    useEffect(() => {
        if (scene) console.log('Scene loaded:', scene);
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

// ---------------- Main Scene ----------------
function Second() {
    const [mode, setMode] = useState("idle"); // 👈 camera mode

    return (
        <div className='bg-gray-400' style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [4, 5, 4], fov: 60 }}>
                {/* Camera controller handles smooth transitions */}
                <CameraController mode={mode} />

                {/* Lights */}
                <directionalLight position={[2, 5, 1]} intensity={2} />
                <ambientLight intensity={1} />

                {/* Models */}
                <Suspense
                    fallback={
                        <mesh>
                            <boxGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial color="hotpink" wireframe />
                        </mesh>
                    }
                >
                    {/* <Lap /> */}
                    <Model />
                    {/* <Box /> Uncomment to test */}
                </Suspense>

                {/* Orbit controls only in desk mode */}
                {mode === "desk" && <OrbitControls enableZoom={true} />}
            </Canvas>

            {/* Debug UI */}
            <div className='bg-zinc-700 px-3 py-1 gap-1.5' style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: "10px" }}>
                <button className='bg-zinc-200/65 rounded-md p-1 hover:text-amber-200' onClick={() => setMode("idle")}>Idle</button>
                <button className='bg-zinc-200/65 rounded-md p-1 hover:text-amber-200' onClick={() => setMode("desk")}>Desk</button>
                <button className='bg-zinc-200/65 rounded-md p-1 hover:text-amber-200' onClick={() => setMode("laptop")}>Laptop</button>
            </div>
        </div>
    );
}

export default Second;

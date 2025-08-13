import React, { useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FirstPersonControls, OrbitControls, SpotLight, useHelper, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { SpotLightHelper } from 'three';
import * as THREE from 'three';
import { useControls } from 'leva'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';


// function Model() {
//     const [error, setError] = useState(null);
//     const { scene } = useGLTF('/models/laptop.glb');

//     useEffect(() => {
//         // Configure Draco decoder
//         const dracoLoader = new DRACOLoader();
//         dracoLoader.setDecoderPath('/draco/');
//         console.log('Draco loader configured');

//         return () => {
//             dracoLoader.dispose();
//         };
//     }, []);

//     useEffect(() => {
//         if (scene) {
//             console.log('Scene loaded:', scene);
//         }
//     }, [scene]);

//     if (error) {
//         console.error('Error in model:', error);
//         return null;
//     }

//     return (
//         <primitive
//             object={scene}
//             scale={2}
//             position={[0, 0, 0]}
//             onError={(e) => {
//                 console.error('Primitive error:', e);
//                 setError(e);
//             }}
//         />
//     );
// }
function Model() {
    const [error, setError] = useState(null);
    const { scene } = useGLTF('/models/laptop_2.glb');

    useEffect(() => {
        if (scene) {
            console.log('Scene loaded:', scene);

            // Find screen mesh
            const screenMesh = scene.getObjectByName('screen');

            if (screenMesh) {
                // Create video element
                const video = document.createElement('video');
                video.src = '/videos/demo.mp4'; // put your video in public/videos
                video.crossOrigin = 'anonymous';
                video.loop = true;
                video.muted = false; // needed to autoplay in browsers
                video.playsInline = true;
                video.autoplay = true;

                // Start video on load
                video.addEventListener('canplay', () => {
                    video.play();
                });

                // Create texture from video
                const videoTexture = new THREE.VideoTexture(video);
                videoTexture.encoding = THREE.sRGBEncoding;
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.flipY = false;

                // Apply texture to screen
                screenMesh.material = new THREE.MeshBasicMaterial({
                    map: videoTexture,
                    toneMapped: false // prevents Three.js tone mapping from dimming it
                });
            } else {
                console.warn('Laptop_Screen not found');
            }
        }
    }, [scene]);

    if (error) {
        console.error('Error in model:', error);
        return null;
    }

    return (
        <primitive
            object={scene}
            scale={2}
            position={[0, 0, 0]}
            onError={(e) => {
                console.error('Primitive error:', e);
                setError(e);
            }}
        />
    );
}


export default function Laptop() {
    return (
        <div className='bg-zinc-600' style={{ width: '100vw', height: '100vh' }}>
            <Canvas
                camera={{ position: [4, 5, 4], fov: 60 }}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    alpha: false,
                    stencil: false
                }}
                dpr={[1, 2]} // Optimize pixel ratio
            >
                <color attach="background" args={['#f0f0f0']} />
                <directionalLight 
                    position={[2, 5, 1]} 
                    intensity={1.5}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <ambientLight intensity={0.5} />
                <spotLight 
                    position={[-5, 5, 0]} 
                    intensity={0.5} 
                    angle={0.5}
                    penumbra={1}
                />
                <Suspense fallback={
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="hotpink" wireframe />
                    </mesh>
                }>
                    <Model />
                </Suspense>
                <OrbitControls 
                    makeDefault
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={2}
                    maxDistance={10}
                />
            </Canvas>
        </div>
    )
}

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import Desktop from '../temp/Desk';

function LaptopModel({ modelPath = '/models/final_lap.glb', onMeshesFound }) {
    const [loadingError, setLoadingError] = useState(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    const screenMeshRef = useRef();
    const modelRef = useRef();

    // Load the GLTF model
    const { scene, error } = useGLTF(modelPath);
    const screenMeshName = 'screen';
    const enableScreenMaterial = true
    

    // Handle model loading and mesh detection
    useEffect(() => {
        if (scene) {
            setModelLoaded(true);
            modelRef.current = scene;

            // Debug: List all available meshes
            const meshes = [];
            scene.traverse((child) => {
                if (child.isMesh) {
                    meshes.push({
                        name: child.name || 'Unnamed',
                        type: child.type,
                        hasGeometry: !!child.geometry,
                        hasMaterial: !!child.material,
                        vertexCount: child.geometry?.attributes?.position?.count || 0
                    });
                }
            });

        }

        if (error) {
            console.error('❌ Error loading model:', error);
            setLoadingError(error);
        }
    }, [scene, error, onMeshesFound]);

    // Update screen mesh material and reference
    useEffect(() => {
        if (scene && screenMeshName) {
            const screenMesh = scene.getObjectByName(screenMeshName);

            if (screenMesh && screenMesh.isMesh) {
                screenMeshRef.current = screenMesh;
                console.log(`✅ Screen mesh "${screenMeshName}" found and set`);

                if (enableScreenMaterial) {
                    // Make the screen mesh dark/black to create a bezel effect
                    screenMesh.material = new THREE.MeshBasicMaterial({
                        color: 0x000000,
                        transparent: true,
                        opacity: 0.9
                    });
                    console.log('🎨 Applied screen material');
                }
            } else {
                console.warn(`⚠️ Screen mesh "${screenMeshName}" not found`);
                screenMeshRef.current = null;
            }
        }
    }, [scene, screenMeshName, enableScreenMaterial]);

    if (loadingError) {
        return (
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
        );
    }

    if (!scene || !modelLoaded) {
        return (
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="blue" wireframe />
            </mesh>
        );
    }

    const screenPosition =[0.00, 0.49, -0.671] //[controls.positionX, controls.positionY, controls.positionZ];
    const screenRotation = [-0.51, 0, 0] //[controls.rotationX, controls.rotationY, controls.rotationZ];

    return (
        <group 
        position={[-0.26,1.43,0.2]}
        rotation={[0,-0.9,0]}
        scale={[0.5,0.5,0.5]}>
            {/* The laptop model */}
            <primitive
                object={scene}
                scale={1.3}
                position={[0, 0, 0]}
            />

            {/* HTML overlay for the desktop component */}
            {screenMeshRef.current && (
                <Html
                    position={screenPosition}
                    rotation={screenRotation}
                    transform
                    occlude = 'blending'
                    distanceFactor = {0.45}
                    style={{
                        pointerEvents: 'all',
                        userSelect: 'none',
                        width:'1120px',
                        height: '760px',
                        // width: `${controls.width}px`,
                        // height: `${controls.height}px`,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    <div style={{
                        width: '1120px',
                        height: '760px',
                        borderRadius: `${0}px`,
                        overflow: 'hidden',
                        boxShadow: 'none',
                        transform: 'scale(1)',
                        border: '1px solid #333',
                        opacity: 1,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}>
                        <Desktop width={1200} height={760} />
                    </div>
                </Html>
            )}

            {/* Debug information overlay */}
            
        </group>
    );
}
export default LaptopModel;
// const [controls, setControls] = useState({
//         positionX: 0,
//         positionY: 0.00,
//         positionZ: 0.000,
//         rotationX: 0.0,
//         rotationY: 0,
//         rotationZ: 0,
//         scaleValue: 0.45,
//         width: 1200,
//         height: 790,
//         opacity: 1,
//         showDebugInfo: false,
//         enableScreenMaterial: true,
//         // screenMeshName: 'Screen_ComputerScreen_0'
//         screenMeshName: 'screen'
//     });
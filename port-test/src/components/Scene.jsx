import React from 'react';
import { Canvas , useFrame} from '@react-three/fiber';
import { FirstPersonControls, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';


function AnimatedBox() {
    const boxRef = useRef();

    useFrame(()=> {
        boxRef.current.rotation.y += 0.01;
        boxRef.current.rotation.z += 0.01;
        boxRef.current.rotation.x += 0.01;
    })
    
    return(
    <mesh ref={boxRef} position={[1,1,1]} >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="blue" />
    </mesh>
    )
}
function AnimatedBoxRed() {
    const boxRefRed = useRef();

    useFrame(()=> {
        boxRefRed.current.rotation.y += 0.005;
        boxRefRed.current.rotation.z += 0.005;
    })
    
    return(
    <mesh ref={boxRefRed} position={[4,1,-3]} >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="red" />
    </mesh>
    )
}

const Scene = () => (
	<div className='bg-zinc-800' style={{ width: '100vw', height: '100vh' }}>
		<Canvas camera={{ position: [4, 4, 4], fov: 60 }}>
                        <ambientLight intensity={0.5} />
                        <spotLight
                            position={[5, 5, 5]}
                            intensity={1}
                            angle={0.3}
                            penumbra={0.1}
                            color={'#ffffff'}
                            castShadow
                        />
                        <Leva collapsed={false} />
                        {/* <AnimatedBox /> */}
                        <AnimatedBoxRed />
                        <OrbitControls />
		</Canvas>
	</div>
);

export default Scene;

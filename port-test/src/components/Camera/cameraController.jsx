// components/CameraController.jsx
import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";

export default function CameraController({ mode }) {
    const { camera } = useThree();
    const idleAngle = useRef(0);

    const configs = {
        idle: { position: [0, 3, 8], lookAt: [0, 1, 0], fov: 50 },
        desk: { position: [-1.9, 6, 1], lookAt: [2, 1, 1], fov: 30 },
        laptop: { position: [-0.36, 2.08, 0.58], lookAt: [4.4, -1, -4], fov: 45 },
    };

    useEffect(() => {
        const { position, lookAt, fov } = configs[mode];

        // Animate camera position
        gsap.to(camera.position, {
            x: position[0],
            y: position[1],
            z: position[2],
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => camera.lookAt(...lookAt),
        });

        // Animate FOV
        gsap.to(camera, {
            fov: fov,
            duration: 1.2,
            ease: "power2.inOut",
            onUpdate: () => camera.updateProjectionMatrix(),
        });
    }, [mode, camera]);

    // Idle orbit rotation
    useFrame(() => {
        if (mode === "idle") {
            idleAngle.current += 0.002; // speed of rotation
            const radius = 8;
            const height = 3;

            camera.position.x = Math.cos(idleAngle.current) * radius;
            camera.position.z = Math.sin(idleAngle.current) * radius;
            camera.position.y = height;

            camera.lookAt(0, 1, 0);
        }
    });

    return null;
}

import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls, Html } from '@react-three/drei'

export function Stars() {
    const group = useRef()
    const direction = Math.random()
    const coords = new Array(500).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])

    useFrame(() => {
        // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
        //const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)))
        //const s = Math.cos(THREE.Math.degToRad(theta * 2))
        group.current.rotation.x -= 0.0003
        group.current.rotation.y -= 0.0005
    })

    return (
        <group
        ref={group}>
            {coords.map(x => {
                return <mesh position={x}>
                    <sphereBufferGeometry args={[1, 10, 10]} />
                    <meshStandardMaterial attach='material' color="#e0fbfc" emissive="#e0fbfc" emissiveIntensity={0.3} />
                </mesh>
            })}
        </group>
    )
}
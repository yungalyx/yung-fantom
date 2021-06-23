import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls, Html } from '@react-three/drei'


export function MyLine({points, data}) {

    const ref = useRef()
    useFrame(() => (ref.current.material.uniforms.dashOffset.value -= 0.2))

    const [active, setActive] = useState(false)

    useEffect(() => {
        console.log(data)
    }, [])


    return <mesh>
        <Line
            ref={ref}
            points={points}
            color={"red"}
            lineWidth={4}
            dashed={true}
        />
    </mesh>

}
import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls, Html } from '@react-three/drei'


export function MyLine({points, data}) {

    const ref = useRef()
    useFrame(() => (ref.current.material.uniforms.dashOffset.value -= (data.out - data.in) / 5000))

    useEffect(() => {
        // console.log(data)
    }, [])

    return <mesh>
        <Line
            ref={ref}
            points={points}
            color={(data.in > data.out ? "green" : (data.in == data.out ? "#293241" : "red"))}
            lineWidth={2}
            dashed={true}
        />
    </mesh>

}
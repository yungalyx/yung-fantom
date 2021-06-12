import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls, Html } from '@react-three/drei'

export function Sphere({position, data, address}) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  
    return (
      <mesh
        position={position}
        ref={mesh}
        scale={hovered ? 1.2 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereGeometry  attach='geometry' args={[10, 32, 32]} />
        <meshStandardMaterial attach='material' color={active ? 'hotpink' : '#1969ff'} />
        <Html distanceFactor={170}>
            {active ? 
            <div className="content">
                <h3> {address} </h3>
                <table>
                    <tr>
                        <th> Token </th>
                        <th> Symbol </th>
                        <th> Balance </th>
                        <th> Value </th>
                    </tr>
                    {(data || []).map(d=>{
                        return <tr>
                            <td> {d.contract_name} </td>
                            <td> {d.contract_ticker_symbol} </td>
                            <td> {(d.balance / Math.pow(10, d.contract_decimals)).toFixed(3)} </td>
                            <td> ${d.quote.toFixed(2)}</td>
                        </tr>
                        
                    })}
                </table>
            </div>
            :
            null
            }
        </Html>
      </mesh>
    )
}

//   <sphereBufferGeometry attach='geometry' args={[5, 32, 32]} />
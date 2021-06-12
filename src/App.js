import './App.scss';
import { Canvas, useFrame } from '@react-three/fiber'
import React, {useState, useRef, useEffect} from 'react'
import Header from "./components/header"
import { Line, OrbitControls, Html } from '@react-three/drei'
import { Sphere } from "../src/components/Sphere"
import axios from "axios"
import img from "./assets/space.gif"

function App() {
  // given a wallet address
  // balance determines size

  const [mainAddress, setMainAddress] = useState("0x917Fb82d1f1011B4461F406897F1832072232FA6")
  const [mainBalance, setMainBalance] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.covalenthq.com/v1/250/address/${mainAddress}/balances_v2/?key=ckey_e1c94fe3c10248478f939aeb7b2`)
      .then(response => response.json())
      .then(data => {
        setMainBalance(data.data.items)
        setMainAddress(data.data.address)
        setLoading(false)
        // console.log(data.data)
        fetch(`https://api.covalenthq.com/v1/250/address/${mainAddress}/transactions_v2/?key=ckey_e1c94fe3c10248478f939aeb7b2`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
    })
  }, [])

  const [otherAddresses, setoOtherAddresses] = useState([
    {
      address: "0xwhatever",
      balance: 10000,
      in: 5,
      out: 6000
    },
    {
      address: "0xwhatever",
      balance: 10000,
      in: 300,
      out: 421
    },
    {
      address: "0xwhatever",
      balance: 10000,
      in: 3000,
      out: 20
    }, 
    {
      address: "0xwhatever",
      balance: 10000,
      in: 3000,
      out: 20
    }
  ])


  /*
  <line>
            <geometry name="geometry" vertices />
            <lineBasicMaterial color={'hotpink'} linewidth={20}/>
          </line>
  */

  const renderNeighbours = () => {
    return <group>
      {otherAddresses.map(i => {
        const [x, y, z] = [Math.floor(Math.random() * 160)-80, Math.floor(Math.random()*120)-60, Math.floor(Math.random()*80)-40]
        return <group>
          <Sphere position={[x, y, z]} />
          <Line
            points={[[0, 0, 0], [x, y, z]]}
            color={'red'}
            lineWidth={3}
            dashed={true}
          />
        </group>
      })}
    </group>
  }
 
  return (
    <div className="html">
       <Header />
      {loading ? <img src={img}/>
      :
      <Canvas colorManagement camera={{position:[0,0, 150]}}>
        <ambientLight intensity={0} />
        <directionalLight />
        <pointLight color="indianred" />
        <pointLight position={[50, 50, -50]} color="orange" />
        <pointLight position={[-50, -50, 50]} color="lightblue" />
        <Sphere position={[0, 0, 0]} data={mainBalance} address={mainAddress}/>
        {renderNeighbours()}
        <OrbitControls autoRotate={true} minDistance={100} maxDistance={400}/>
      </Canvas>
      }
    </div>
  );
}

export default App;

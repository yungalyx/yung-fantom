import './App.scss';
import { Canvas, useFrame } from '@react-three/fiber'
import React, {useState, useRef, useEffect, Suspense} from 'react'
import Header from "./components/header"
import { Line, OrbitControls, Html } from '@react-three/drei'
import { Sphere } from "../src/components/Sphere"
import axios from "axios"
import img from "./assets/space.gif"
import { MyLine } from "../src/components/line"



function App() {
  // given a wallet address
  // balance determines size

  const [mainAddress, setMainAddress] = useState("0x4D25eF2DcBD733A2868f8c3cfb409b2A4099a977".toLowerCase())
  const [mainBalance, setMainBalance] = useState([])
  const [loading, setLoading] = useState(true)
  const [transactionMap, setTransactionMap] = useState({})
  
  const [otherAddresses, setOtherAddresses] = useState([])

  async function manageTransactions(data) {
    var dict = new Map();
    let ftm_rate = 0; // loops to collect average price from value_quote, used when value_quote is null but balance isn't.
    data.forEach(x => {
      if (x.value_quote != null && x.value != "0") {
        ftm_rate = x.value_quote * Math.pow(10, 18) / x.value
      } 
      let myquote = (x.value_quote === null ? (x.value * ftm_rate / Math.pow(10, 18)) : x.value_quote)
      // console.log(myquote, x.value_quote, x.value)
      if (x.from_address === mainAddress) {
        if (!(dict.has(x.to_address))) {
          var other = {
            in: 0,
            out: myquote,
          };
          dict.set(x.to_address, other);
        } else {
          let curr = dict.get(x.to_address)
          curr.out += myquote
          dict.set(x.to_address, curr)
        }
      } else {
        if (!(dict.has(x.from_address))) {
          var other = {
            in: myquote,
            out: 0
          };
          dict.set(x.from_address, other);
        } else {
          let curr = dict.get(x.from_address)
          curr.in += myquote
          dict.set(x.from_address, curr)
        }
      }
    })
    dict.forEach((k, v) => {
      fetch(`https://api.covalenthq.com/v1/250/address/${v}/balances_v2/?key=ckey_e1c94fe3c10248478f939aeb7b2`).then(res => res.json())
      .then(data => {
        setOtherAddresses(oldAddresses => [...oldAddresses, {
          address: v,
          balance: data?.data?.items,
          in: k.in,
          out: k.out
        }])
      
      })
    })
    setLoading(false)
  }
   

  useEffect(() => {
    const getBalance = axios.get(`https://api.covalenthq.com/v1/250/address/${mainAddress}/balances_v2/?key=ckey_e1c94fe3c10248478f939aeb7b2`)
    const getTransactions = axios.get(`https://api.covalenthq.com/v1/250/address/${mainAddress}/transactions_v2/?key=ckey_e1c94fe3c10248478f939aeb7b2`)
    axios.all([getBalance, getTransactions]).then(data => {
      setMainBalance(data[0].data.data.items)
      //console.log(data[1].data.data.items)
      // console.log(data[1].data.data.items)
      manageTransactions(data[1].data.data.items)
    })
    console.log(otherAddresses)

    /*
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
            // console.log(data)
          })
    })
    */
  }, [])



  const renderNeighbours = () => {
    return <group>
      {otherAddresses.map(i => {
        const [x, y, z] = [Math.floor(Math.random() * 120)-60, Math.floor(Math.random()*120)-60, Math.floor(Math.random()*120)-60]
        return <mesh>
          <Sphere position={[x, y, z]} address={i.address} balance={i.balance} debit={i.in} credit={i.out} />
          <MyLine points={[[0, 0, 0], [x, y, z]]} data={i} />
        </mesh>
      })}
    </group>
  }
 
  return (
    <div className="html">
      <Header />
      {loading ? <img src={img} />
      : 
      <Canvas colorManagement camera={{position:[0,0, 150]}}>
        <ambientLight intensity={0} />
        <directionalLight />
        <pointLight color="indianred" />
        <pointLight position={[50, 50, -50]} color="orange" />
        <pointLight position={[-50, -50, 50]} color="lightblue" />
        <Sphere position={[0, 0, 0]} balance={mainBalance} address={mainAddress} main/>
        {renderNeighbours()}
        <OrbitControls autoRotate={true} minDistance={100} maxDistance={400}/>
      </Canvas>
      }
    </div>
  );
}

export default App;

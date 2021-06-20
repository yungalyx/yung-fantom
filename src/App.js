import './App.scss';
import { Canvas, useFrame } from '@react-three/fiber'
import React, {useState, useRef, useEffect, Suspense} from 'react'
import Header from "./components/header"
import { Line, OrbitControls, Html } from '@react-three/drei'
import { Sphere } from "../src/components/Sphere"
import axios from "axios"
import img from "./assets/space.gif"



function App() {
  // given a wallet address
  // balance determines size

  const [mainAddress, setMainAddress] = useState("0x4D25eF2DcBD733A2868f8c3cfb409b2A4099a977".toLowerCase())
  const [mainBalance, setMainBalance] = useState([])
  const [loading, setLoading] = useState(true)
  const [transactionMap, setTransactionMap] = useState({})

  function manageTransactions(data) {
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
    let otherAddress = []
    dict.forEach((k, v) => {
      otherAddress.push({
        address: v,
        in: k.in,
        out: k.out
      })
    })
    setoOtherAddresses(otherAddress)
   
  }
   

  useEffect(() => {
    const getBalance = axios.get(`https://api.covalenthq.com/v1/250/address/${mainAddress}/balances_v2/?key=ckey_e1c94fe3c10248478f939aeb7b2`)
    const getTransactions = axios.get(`https://api.covalenthq.com/v1/250/address/${mainAddress}/transactions_v2/?key=ckey_e1c94fe3c10248478f939aeb7b2`)
    axios.all([getBalance, getTransactions]).then(data => {
      setMainBalance(data[0].data.data.items)
      //console.log(data[1].data.data.items)
      // console.log(data[1].data.data.items)
      manageTransactions(data[1].data.data.items)
      setLoading(false)
    })

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


  const renderNeighbours = () => {
    return <group>
      {otherAddresses.map(i => {
        const [x, y, z] = [Math.floor(Math.random() * 160)-80, Math.floor(Math.random()*120)-60, Math.floor(Math.random()*80)-40]
        return <group>
          <Sphere position={[x, y, z]} address={i.address}/>
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
      {loading ? <img src={img} />
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

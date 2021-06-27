import React, {useState, useRef, useEffect, Suspense} from 'react'
import { Link } from "react-router-dom";
import '../App.scss';

export function Modal({handleClose, show, address, handleSubmit}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [input, setinput] = useState(address)

    const Confirm = () => {
        console.log(input)
        if (input.length !== "0x4D25eF2DcBD733A2868f8c3cfb409b2A4099a977".length) {
            handleClose()
            alert(`${input} is invalid.`)
        } else {
            handleSubmit(input.toLowerCase())
            handleClose()
        }
    }

    return <div className={showHideClassName} onClick={handleClose}>
        <section className="modal-main" onClick={e => e.stopPropagation()}>
            <label>
                Contract address:
                <input type="text" value={input} onChange={e => setinput(e.target.value)} />
                <button type="button" onClick={Confirm} > Confirm </button>
            </label>
                <hr />
                <table>
                    <tr onClick={() => setinput("0x4D25eF2DcBD733A2868f8c3cfb409b2A4099a977")}>
                        0x4D25eF2DcBD733A2868f8c3cfb409b2A4099a977
                    </tr>
                 
                    <tr onClick={() => setinput("0x423a067e7d95dd4becf057bb4f4dace27d062ad0")}>
                        0x423a067e7d95dd4becf057bb4f4dace27d062ad0
                    </tr>
                    <tr onClick={() => setinput("0x8800528f6b9480dbbffd65fe6d8cc075bac7c1a8")}>
                        0x8800528f6b9480dbbffd65fe6d8cc075bac7c1a8
                    </tr>
                </table>
           
        </section>
      
    </div>

}
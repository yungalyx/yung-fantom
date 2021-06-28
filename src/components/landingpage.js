import React from 'react'
import '../App.scss';

export function LandingPage({enter}) {
    const titles = ["Yung Fantom", "小鬼", "7vn9 }hant0m", "маленький призрак", "ਛੋਟਾ ਭੂਤ", "Ψvηξ PhαητΘm", "小 Phantom", "Young 鬼hantΘM"]
    const [title, setTitle] = React.useState("Yung Fantom")

    const change = () => {
        let random = Math.floor(Math.random()*8);
        setTitle(titles[random]);
    }

    React.useEffect(() => {
        setInterval(()=> {
           change();
        }, Math.random() * 1400)
    }, [])
    

    return <div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <button onClick={enter("other")}> ENTER </button>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
        <div className="glitch" data-text={title}> {title}</div>
    </div>
}
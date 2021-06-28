import {useState,useEffect,useRef,forwardRef} from 'react';
import './index.css';
import NavBar from '../NavBar';

const NavBarCom = forwardRef(NavBar)
const WrapCom = ({title,children,className,...rest}) =>{
    const ref = useRef(null)
    useEffect(()=>{
        console.log('/index.js [6]--1',ref);
    },[ref])
    return (
        <div className="wrap" >
            <NavBarCom title={title} ref={ref}/>
            <div className={`content ${className}`}>
                {
                    children
                }
            </div>
        </div>
    )
}

export default WrapCom;
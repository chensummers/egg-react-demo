import {useEffect,useImperativeHandle,useRef} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './index.css';
const NavBarCom = ({title,...rest},ref) => {
    const navRef = useRef(null)

    // useEffect(()=>{
    //     useImperativeHandle(ref,()=>({navRef}))
    // },[])
    const goBack = () => {
       window.history.back()
    }
    return (
        <div className="navbar" ref={navRef}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={goBack}
                {...rest}
            >
                {title}
            </NavBar>
        </div>
    )
}

export default NavBarCom;
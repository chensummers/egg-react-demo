import React,{useState,useCallback,useEffect} from 'react';
import {List,WhiteSpace,Toast} from 'antd-mobile';
import WrapCom from '@/pages/components/WrapCom';
import { getUserInfo } from '@/api/path.js';

import './index.scss';

const Item = List.Item;

const avatarImg = 'https://fosun-health-web.oss-cn-hangzhou.aliyuncs.com/imgs/user-init-avatar.png';
const rightIcon = 'https://fosun-health-web.oss-cn-hangzhou.aliyuncs.com/imgs/CKD/caseBook/right.png';
const Index = (props) => {
    const [userInfo,setUserInfo] = useState({})
    console.log('/index.js [4]--1',props,'my');

    useEffect(()=>{
        getUserInfoDetail()
    },[])
    const getUserInfoDetail = useCallback(()=>{
        getUserInfo().then(res=>{
            console.log('/index.js [20]--1',res);
            if(res.status ===200&&res.data) {
                setUserInfo(res.data)
                sessionStorage.setItem('userid',res.data.id)
            }else if(res.status===50002) {
                props.history.push('/login')
            }else{
                Toast.info(res.msg,1)
            }
            console.log('/index.js [16]--1',res);
        })
    },[])
    const handleToPage = path => {
        path && props.history.push(path)
    }
    return (
        <WrapCom
            className="my"
            title="我的"
            isHiddenNavHead={true}
            isShowNavBar={true}
        >
            <div className="head">
                <div className="avator"><img src={avatarImg}/></div>
                <div className="user">
                    {
                        userInfo.id?
                        <>
                            <div className="left">
                                <span className="name">{userInfo.username}</span>
                                {
                                    userInfo.privilege ===0 && 
                                    <span className="standard">管理员</span>
                                }
                            </div>
                            <img className="r-icon" src={rightIcon} onClick={()=>handleToPage('/')}/>
                        </>:
                        <>
                            <div className="no-login" onClick={()=>handleToPage('/login')}>Login/Rigester</div>
                        </>
                    }
                </div>
            </div>
            <WhiteSpace size="xl"/>
            <List className="content">
                <Item arrow="horizontal" multipleLine onClick={()=>handleToPage('/diary')}>
                    我的日记
                </Item> 
            </List>
        </WrapCom>
    )
}

export default Index;
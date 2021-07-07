import React, { useReducer, useEffect, useCallback, useState, useRef } from 'react';
import { List, InputItem, Toast, Button, WhiteSpace } from 'antd-mobile';
import WrapCom from '@/pages/components/WrapCom';
import { createForm } from 'rc-form';
import { getUserById,updateUser } from '@/api/path.js';

import './index.scss';

const Index = (props) => {
    const { form,history,match } = props;
    const { getFieldProps, getFieldError, resetFields, validateFields } = form;
    const [state, setState] = useReducer((o, n) => ({ ...o, ...n }), {
        status: 1
    })
    let nameRef = useRef(null)
    const [user,setUser] = useState({})
    useEffect(() => {
        getUserInfoDetail(match.params.id)
    }, [match.params])

    useEffect(()=>{
        state.status ===2&&nameRef.focus()
    },[state.status])

    const getUserInfoDetail = useCallback((id) => {
        getUserById(id).then(res => {
            if (res.status === 200 && res.data) {
                setUser(res.data)
            } else if (res.status === 50002) {
                history.push('/login')
            } else {
                Toast.info(res.msg, 1)
            }
        })
    }, [match.params])
    const validateUsername = (rule, value, callback) => {
        console.log('/index.js [13]--1', value);
        if (!value) {
            callback(new Error('请输入用户名'));
        }

        setUser({ username: value });
        if (value && value.length >= 5) {
            callback();
        } else {
            callback(new Error('请输入至少5位字符'));
        }
    }
    
    const handleEdit = () =>{
        
        if(state.status===2) {
            validateFields((err,vals)=>{
                if(!err) {
                    updateUser({...user,...vals}).then(res=>{
                        console.log('/userInfo.js [58]--1',res);
                        if(res.status===200){
                            Toast.info(res.msg, 1)
                            setUser(res.data)
                            setState({status:1})
                        }else {
                            Toast.fail(res.msg, 1)
                        }
                    })
                }
            })
        }else{
            setState({status:2})
        }
    }
    const handleLoginOut = () => { 
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userid');
        history.push('/login');
    }
    return (
        <WrapCom
            className="user"
            title="我的"
            // rightContent={[<img src={addIcon}/>]}
            rightContent={<span onClick={handleEdit}>{state.status===1?'edit':'save'}</span>}
        >
            <WhiteSpace />
            <div className="content">
                <List>
                    <InputItem
                        {...getFieldProps('username', {
                            initialValue:user.username||'暂无',
                            rules: [
                                { validator: validateUsername },
                            ],
                        })}
                        error={!!getFieldError('username')}
                        onErrorClick={() => {
                            Toast.info(getFieldError('username'), 1);
                        }}
                        clear
                        editable={state.status===2}
                        // defaultValue={user.username}
                        placeholder="请输入用户名"
                        ref={r=>nameRef= r}
                    >
                        <span>用户名</span>
                    </InputItem>
                    <InputItem
                        {...getFieldProps('phone', {
                            initialValue:user.phone||'暂无'
                        })}
                        clear
                        type="phone"
                        editable={state.status===2}
                        placeholder="请输入手机号"
                    >
                        <span>手机号</span>
                    </InputItem>
                    {
                        state.status===1 &&
                        <Button className="loginout" type="primary" onClick={handleLoginOut}>退出</Button>
                    }
                </List>
            </div>
        </WrapCom>
    )
}


export default createForm()(Index);
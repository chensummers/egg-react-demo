import React, { useReducer, useEffect } from 'react';
import { List, InputItem, Toast, Button, Modal, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { login, register } from '@/api/path.js';
import './index.css';

const alert = Modal.alert;

const Index = (props) => {
    const { form } = props;
    const { getFieldProps, getFieldError, resetFields, validateFields } = form;
    const [state, setState] = useReducer((o, n) => ({ ...o, ...n }), {
        tab: 1
    })

    useEffect(() => {
        // sessionStorage.removeItem('token')
        console.log('/index.js [14]--1', form, props);
    }, [])
    const validateUsername = (rule, value, callback) => {
        console.log('/index.js [13]--1', rule);
        if (!value) {
            callback(new Error('请输入用户名'));
        }

        if (state.tab === 1) {
            callback();
        }

        if (value && value.length >= 5) {
            callback();
        } else {
            callback(new Error('请输入至少5位字符'));
        }
    }
    const validatePassword = (rule, value, callback) => {
        console.log('/index.js [13]--1', rule);
        if (!value) {
            callback(new Error('请输入密码'));
        }

        if (state.tab === 1) {
            // 当login的时候不需要校验，直接用后端返回toast msg
            callback();
        } else {
            if (value && value.length >= 3) {
                callback();
            } else {
                callback(new Error('请输入至少3位密码'));
            }
        }
    }
    const handleTab = () => {
        resetFields()
        setState({ tab: state.tab === 1 ? 0 : 1 })
    }
    const handleSubmit = () => {
        validateFields((err, vals) => {
            if (!err) {
                if (state.tab === 1) {
                    loginRequest(vals)
                } else {
                    registerRequest(vals)
                }
            }
        })
    }
    const loginRequest = (params) => {
        Toast.loading('login...')
        login(params).then(res => {
            Toast.hide()
            if (res.data&&res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                Toast.success('Login Success', 1, () => {
                    console.log('/index.js [74]--1', 'success');
                    props.history.push('/my');
                })
            } else {
                Toast.fail(res.msg, 1);
            }
        })
    }
    const registerRequest = (params) => {
        Toast.loading('login...')
        register(params).then(res => {
            Toast.hide()
            if (res.status !== 200) {
                Toast.fail(res.msg, 1);
            } else {
                showAlert()
            }
        })
    }
    const showAlert = () => {
        const alertInstance = alert('Rigester Success', 'Go to Login please!', [
            {
                text: 'OK',
                onPress: () => {
                    handleTab()
                }
            },
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            handleTab()
            alertInstance.close();
        }, 50000);
    };
    return (
        <div className="login">
            <div className="title">{state.tab === 1 ? 'Login' : 'Register'}</div>
            <WhiteSpace />
            <div className="content">
                <List>
                    <InputItem
                        {...getFieldProps('username', {
                            rules: [
                                { validator: validateUsername },
                            ],
                        })}
                        error={!!getFieldError('username')}
                        onErrorClick={() => {
                            Toast.info(getFieldError('username'), 1);
                        }}
                        clear
                        type="text"
                        placeholder="请输入用户名"
                    >
                        <span>用户名</span>
                    </InputItem>
                    <InputItem
                        {...getFieldProps('password', {
                            rules: [
                                { validator: validatePassword },
                            ],
                        })}
                        error={!!getFieldError('password')}
                        onErrorClick={() => {
                            Toast.info(getFieldError('password'), 1);
                        }}
                        clear
                        type="password"
                        placeholder="请输入密码"
                    >
                        <span>密码</span>
                    </InputItem>
                </List>
                <div className="tab" onClick={handleTab}>{state.tab === 0 ? 'Login' : 'Register'}</div>
                <Button className="submit" type="primary" onClick={handleSubmit}>{state.tab === 1 ? 'Login' : 'Register'}</Button>
            </div>
        </div>
    )
}


export default createForm()(Index);
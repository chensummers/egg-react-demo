import {useEffect,useState} from 'react';
import { List, InputItem, Toast, WhiteSpace } from 'antd-mobile';
const Index = ({
    form
}) => {
    const { getFieldProps, getFieldError, resetFields, setFieldsValue } = form;

    useEffect(()=>{
        console.log('/UserForm.js [8]--1','[[]]]]');
        // resetFields()
    },[])
    const validateUsername = (rule, value, callback) => {
        console.log('/UserForm.js [12]--1',rule,value);
        if (!value) {
            callback(new Error('请输入用户名'));
        }
        console.log('/UserForm.js [16]--1',value);
        if (value && value.length >= 5) {
            callback();
            // setFieldsValue({username:value})
        } else {
            callback(new Error('请输入至少5位字符'));
        }
    }
    const validatePassword = (rule, value, callback) => {
        console.log('/index.js [13]--1', rule);
        if (!value) {
            callback(new Error('请输入密码'));
        }
        
        if (value && value.length >= 3) {
            callback();
        } else {
            callback(new Error('请输入至少3位密码'));
        }
    }
    
    return (
        <div className="user">
            <WhiteSpace />
            <div className="content">
                <List>
                    <InputItem
                        {...getFieldProps('username', {
                            rules: [
                                { validator: validateUsername },
                            ],
                            // validateTrigger:false
                        })}
                        error={!!getFieldError('username')}
                        onErrorClick={() => {
                            Toast.info(getFieldError('username'), 1);
                        }}
                        clear
                        placeholder="请输入用户名"
                    >
                        <span>用户名</span>
                    </InputItem>
                    <InputItem
                        {...getFieldProps('password', {
                            rules: [
                                { validator: validatePassword },
                            ],
                            // validateTrigger:false
                        })}
                        error={!!getFieldError('password')}
                        onErrorClick={() => {
                            Toast.info(getFieldError('password'), 1);
                        }}
                        clear
                        placeholder="请输入密码"
                    >
                        <span>密码</span>
                    </InputItem>
                </List>
            </div>
        </div>
    )
}

export default Index;
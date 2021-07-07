import React, { useState, useCallback, useEffect } from 'react';
import { List, WhiteSpace, Toast, Modal } from 'antd-mobile';
import WrapCom from '@/pages/components/WrapCom';
import { createForm } from 'rc-form';
import AddUserComponent from './components/UserForm.js';
import { getUserList, deleteUser, addUser } from '@/api/path.js';

import './index.scss';

const alert = Modal.alert;
const Item = List.Item;
const addIcon = 'https://fosun-health-web.oss-cn-hangzhou.aliyuncs.com/imgs/CKDServiceInfo/add-btn-icon.png'
const editIcon = 'https://fosun-health-web.oss-cn-hangzhou.aliyuncs.com/imgs/CKD/caseBook/eidt_icon.png';
const delIcon = 'https://fosun-health-web.oss-cn-hangzhou.aliyuncs.com/imgs/CKD/caseBook/delete_icon.png'

const Index = (props) => {
    const { validateFields } = props.form;
    const [userList, setUserList] = useState([])
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        getUserListData()
    }, [])
    const getUserListData = useCallback(() => {
        getUserList().then(res => {
            console.log('/index.js [20]--1', res);
            if (res.status === 200 && res.data) {
                setUserList(res.data)
            } else {
                Toast.info(res.msg, 1)
            }
            console.log('/index.js [16]--1', res);
        })
    }, [])
    const handleToPage = path => {
        path && props.history.push(path)
    }
    const handleDel = (user) => {
        const alertInstance = alert(`Delete ${user.username}`, 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: 'OK', onPress: () => {
                    deleteUser(user.id).then(res => {
                        if (res.status === 200) {
                            getUserListData()
                            Toast.info(res.msg, 1)
                        } else {
                            Toast.fail(res.msg, 1)
                        }
                        console.log('/userList.js [37]--1', res);
                    })
                }
            },
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            console.log('auto close');
            alertInstance.close();
        }, 500000);
    }

    const handleAddUser = () => {
        setVisible(true)
    }

    const createUser = () => {
        validateFields((err, values) => {
            if (!err) {
                addUser(values).then(res => {
                    if (res.status === 200) {
                        setVisible(false)
                        getUserListData()
                        Toast.success('添加成功', 1);
                    } else {
                        Toast.fail(res.msg, 1);
                    }
                })
            }
        })
    }
    return (
        <WrapCom
            className="user-list"
            title="用户列表"
            rightContent={
                <img style={{ height: '20px', width: '20px' }} src={addIcon} onClick={handleAddUser} />
            }
        >
            <WhiteSpace size="xl" />
            {
                userList.length > 0 &&
                <List className="content">
                    {
                        userList.map(user => {
                            return (
                                <Item
                                    key={user.id}
                                    extra={<div className="action">
                                        <img src={editIcon} onClick={() => handleToPage(`/userInfo/${user.id}`)} />
                                        <img src={delIcon} onClick={() => handleDel(user)} />
                                    </div>}
                                >
                                    {user.username}
                                </Item>
                            )

                        })
                    }
                </List>
            }
            <Modal
                visible={visible}
                title="添加新用户"
                transparent
                footer={[
                    {
                        text: '取消',
                        onPress: () => {
                            setVisible(false)
                        }
                    },
                    {
                        text: '新增',
                        onPress: createUser
                    },
                ]}
            >
                <div style={{ height: 100 }}>
                    <AddUserComponent form={props.form} />
                </div>
            </Modal>
        </WrapCom>
    )
}

export default createForm()(Index);
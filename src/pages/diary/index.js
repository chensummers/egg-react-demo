// Home/index.jsx
import React, {useEffect,useState} from 'react'
import { Card, Button,Modal,Toast } from 'antd-mobile';
import {diaryList,diaryDel} from '@/api/path.js';
import WrapCom from '@/pages/components/WrapCom';
import {WEATHER_STATUS} from '@/utils/constant.js'
import './index.css'
import moment from 'moment';

const formatDate = date => moment(date).format('LLL');
const alert = Modal.alert;

const Home = ({history,...props}) => {
    const [list,setList] = useState([])
    useEffect(()=>{
        getList()
    },[])
    const getList = () =>{
        diaryList().then(res=>{
            if(res.status===200&&res.data) {
                setList(res.data)
            }
        })
    }
    const goToDetail = (id) =>{
        history.push(`/diary/detail?id=${id}`)
    }
    const edit = (e,id) =>{
        // e.prevent()
        e.stopPropagation();
        history.push(`/diary/edit?id=${id}`);
    }
    const del = (e,id) => {
        e.stopPropagation();
        const alertInstance = alert('Delete', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            { text: 'OK', onPress: () => {
                diaryDel(id).then(res=>{
                    if(res.status===200) {
                        Toast.success('删除成功',0.5,()=>{
                            getList()
                        })
                    }
                })
            } },
          ]);
          setTimeout(() => {
            // 可以调用close方法以在外部close
            alertInstance.close();
          }, 50000);
    }
    const addItem = (e) =>{
        e.stopPropagation();
        history.push('/diary/edit?status=1');
    }
    return (
        <WrapCom title="我的日记" className='diary-list'>

            {
                list.map(item => <Card className='diary-item' key={item.id} onClick={()=>goToDetail(item.id)}>
                <Card.Header
                    title={item.title}
                    thumb={item.url}
                    extra={
                        <span className="diary-item-txt">
                            {WEATHER_STATUS[item.weather_status]}
                            <Button className="diary-item-txt-span" type="primary" size="small" onClick={(e)=>edit(e,item.id)}>Edit</Button>
                            <Button className="diary-item-txt-span" type="warning" size="small" onClick={(e)=>del(e,item.id)}>Del</Button>
                        </span>
                    }
                />
                <Card.Body>
                    <div>{item.content}</div>
                </Card.Body>
                <Card.Footer content={formatDate(item.create_time)} />
                </Card>)
            }
            <div className="add" onClick={addItem}>+</div>
        </WrapCom>
    )
}

export default Home;
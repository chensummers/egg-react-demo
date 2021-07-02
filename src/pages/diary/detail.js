// Detail/index.jsx
import { useState, useEffect } from 'react';
import { List,Badge } from 'antd-mobile';
import WrapCom from '@/pages/components/WrapCom';
import {getQuery} from '@/utils/tools.js';
import {diaryDetail} from '@/api/path.js';
import {WEATHER_STATUS,WEATHER_COLORS} from '@/utils/constant.js';
import moment from 'moment';
import './index.scss';

moment.locale(); 
const formatDate = date => moment(date).format('LLL');
const Detail = ({ history, ...rest }) => {
    const [id, setQueryId] = useState(null);
    const [detail,setDetail] = useState({})
    useEffect(() => {
        setQueryId(getQuery('id'))
    }, [])
    useEffect(()=>{
        id&&diaryDetail(id).then(res=>{
            if(res.status==200) {
                setDetail(res.data)
            }
            console.log('/detail.js [16]--1',res);
        })
    },[id])
    console.log('/detail.js [20]--1', id);
    const goBack = () => {
        history.goBack()
    }
    return (
        <WrapCom 
            className='diary-detail'
            title={detail.title}
        >
            <List renderHeader={
                <span>
                    {formatDate(detail.update_time||detail.create_time)}
                    <Badge text={WEATHER_STATUS[detail.weather_status]} style={{ marginLeft: 12, backgroundColor: WEATHER_COLORS[detail.weather_status], }} />
                    </span>
                } className="my-list">
                <List.Item wrap>
                    <img className="detail-img" src={detail.url}/>
                    {detail.content}
                </List.Item>
            </List>
        </WrapCom>
    )
}

export default Detail
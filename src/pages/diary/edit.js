// Detail/index.jsx
import React, { useState, useEffect,useReducer } from 'react'
import { List, InputItem, TextareaItem, Toast, ImagePicker, Radio, Button,WhiteSpace,Picker} from 'antd-mobile'
import {getQuery} from '@/utils/tools.js';
import WrapCom from '@/pages/components/WrapCom';
import {diaryAdd,diaryUpdate,diaryDetail} from '@/api/path.js';
import {WEATHERS,} from '@/utils/constant.js'
import './index.scss'



const Edit = ({history,...props}) => {
    const [state,setState] = useReducer(
        (o,n)=>({...o,...n}),{
            status:null,
            detail:{}
        }
    )
    const [files, setFile] = useState([])

    useEffect(()=>{
        setState({status:getQuery('status')})
        setState({id:getQuery('id')})
    },[])

    useEffect(()=>{
        state.id&&diaryDetail(state.id).then(res=>{
            if(res.status==200) {
                setState({detail:{...res.data}})
                setFile([{url:res.data.url}])
            }
        })
    },[state.id])
    const handleChange = (e,key) =>{
        console.log('/edit.js [35]--1',e);
        let value = e;
        if(key==='url') {
            value = e[0]&&e[0].url
            setFile(e)
        }
        if(key ==='weather_status') {
            value = e[0]
        }
        
        const {detail} = state
        setState({
            detail:{
                ...detail,
                [key]:value
            }
        })
        
    }
    const handleSubmit = () => {
        const {title,content,url,weather_status} = state.detail;
        console.log('/edit.js [39]--1',state);
        if(!title) {
            Toast.fail('请添加标题')
            return;
        }
        if(!content) {
            Toast.fail('请添加日记内容')
            return;
        }
        if(!weather_status) {
            Toast.fail('请添加天气状况')
            return;
        }
        if(!url) {
            Toast.fail('请添加图片')
            return;
        }

        if(state.status ==1) {
            addDiary()
        }else{
            updateDiary()
        }
    }

    const addDiary = () => {
        diaryAdd(state.detail).then(res=>{
            if(res.status===200) {
                Toast.success('添加成功',0.4,()=>{
                    history.push('/diary')
                })
            }
            console.log('/edit.js [54]--1',res);
        })
    }
    const updateDiary = () => {
        diaryUpdate(state.detail).then(res=>{
            if(res.status===200) {
                Toast.success('编辑成功',0.4,()=>{
                    history.push('/diary')
                })
            }
            console.log('/edit.js [54]--1',res);
        })
    }
    return (
        <WrapCom 
            className='diary-edit'
            isShowNavBar={false}
            title={state.status==1?'添加日记':'编辑日记'}
        >
        {/* <NavBar /> */}
        <List>
            <InputItem
                clear
                placeholder="请输入标题"
                value={state.detail.title}
                onChange={ (e)=>handleChange(e,'title')}
            >标题</InputItem>
            <TextareaItem
                rows={6}
                placeholder="请输入日记内容"
                value={state.detail.content}
                onChange={ (e)=>handleChange(e,'content')}
            />
            <WhiteSpace size="lg" />
            <Picker 
                data={WEATHERS} 
                cols={1} 
                className="forss"
                disabled={state.status!=1}
                value={[state.detail.weather_status]}
                onChange={(e)=>handleChange(e,'weather_status')}
            >
                <List.Item arrow="horizontal">天气</List.Item>
            </Picker>
            <ImagePicker
                length={1}
                files={files}
                onChange={(e)=>handleChange(e,'url')}
                // onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 1}
                multiple={false}
            />
            <Button type="primary" className="sumit" onClick={handleSubmit}>{state.status==1?'添加':'编辑'}</Button>
        </List>
    </WrapCom>)
}

export default Edit;

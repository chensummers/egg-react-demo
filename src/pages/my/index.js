import React,{useState} from 'react';
import WrapCom from '@/pages/components/WrapCom';

const Index = (props) => {
    console.log('/index.js [4]--1',props,'my');
    return (
        <WrapCom
            title="我的"
            isHiddenNavHead={true}
            isShowNavBar={true}
        >
            my
        </WrapCom>
    )
}

export default Index;
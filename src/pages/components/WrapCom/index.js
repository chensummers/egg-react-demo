import { useState, useEffect, useRef, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import './index.scss';
import NavBar from '../NavBar';
const Icon = {
    diary: [
        <div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
        }}
        />,
        <div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
        }}
        />
    ],
    my: [
        <div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
        }}
        />,
        <div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
        }}
        />
    ]
}
const NavBarCom = forwardRef(NavBar)
/***
 * 
 * {className}
 * {isShowNavBar} 显示头部导航
 * {isHiddenNavHead} 是否隐藏底部navtab
 * 
 *  */
const WrapCom = ({ title, children, className,rightContent,...rest }) => {
    const {pathname} = rest.location||{};
    const [tab, setTab] = useState(null)
    useEffect(() => {
        if (pathname === '/' || pathname === '/my') {
            setTab('my')
        }
        if (pathname === '/diary') {
            setTab('diary')
        }
    }, [pathname])

    const handlePress = (e) => {
        rest.history.push(e)
    }
    
    return (
        <div className={`wrap ${rest.isHiddenNavHead&&'hidden-nav-head'}`}>
            {!rest.isHiddenNavHead && <NavBarCom title={title} rightContent={rightContent}/>}
            <div className={`content ${className}`}>
                {
                    children
                }
            </div>
            <div className="tab-bar">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={!rest.isShowNavBar}
                >
                    <TabBar.Item
                        title="diary"
                        key="diary"
                        icon={Icon.diary[0]}
                        selectedIcon={Icon.diary[1]}
                        selected={tab === 'diary'}
                        onPress={() => handlePress('/diary')}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="my"
                        key="my"
                        icon={Icon.my[0]}
                        selectedIcon={Icon.my[1]}
                        selected={tab === 'my'}
                        onPress={() => handlePress('/my')}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        </div>
    )
}

export default withRouter(WrapCom);
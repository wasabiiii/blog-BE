import React        from 'react';
import { Link }     from 'react-router-dom';
import storage      from 'util/storage.jsx'
import browserCookie from 'browser-cookies'

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: storage.get('userInfo').username || ''
        }
    }
    // 退出登录
    onLogout(){
        storage.remove('userInfo');
        browserCookie.erase('userid');
        window.location.href = '/login';
    }
    render(){
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <p className="navbar-brand">后台管理系统</p>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;
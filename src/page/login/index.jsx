import React from 'react';
import storage from 'util/storage.jsx';
import request from 'util/request.jsx';

import 'page/index.css';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: '/'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onInputKeyUp = this.onInputKeyUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    } 
    componentWillMount(){
        document.title = '登录';
    }
    // 当用户名发生改变
    handleInputChange(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    // 当用户提交表单
    onSubmit(){
        const {username,password} = this.state;
        const body = {
            username,
            password
        };
        request.post('/api/user/login',body,(resData)=>{
            if(resData.status == 1){
                storage.set('userInfo', {username:username});
                this.props.history.push(this.state.redirect);
            }
        })
            
    }
    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="请输入用户名" 
                                    onKeyUp={this.onInputKeyUp}
                                    onChange={this.handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    onKeyUp={this.onInputKeyUp}
                                    onChange={this.handleInputChange}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={this.onSubmit}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
                    
        );
    }
}

export default Login;
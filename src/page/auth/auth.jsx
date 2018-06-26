import React from 'react';
import { withRouter } from 'react-router-dom';
import request from 'util/request.jsx';

@withRouter
class Auth extends React.Component{
	componentDidMount() {
		//如果已经在登录注册页，则不跳转
		const publicList = ['/login','/register'];
		const pathname = this.props.location.pathname;
		if (publicList.indexOf(pathname)>-1) {
			return null;
		}

		//判断是否登录，若登录则无需跳转
        request.get('/api/user/info',resData => {
        	if(resData.status == 1){
        	    // console.log(resData.message);
        	}else{
        		this.props.history.push('/login');
        	}
        })
	}
	render(){
		return null;
	}

}

export default Auth;
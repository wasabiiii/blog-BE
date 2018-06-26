import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import {Provider} from 'mobx-react';
import Store from './stores/store.jsx';

import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';

import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import Auth from 'page/auth/auth.jsx';
import NewBlog from 'page/blog/newBlog.jsx';
import EditBlog from 'page/blog/editBlog.jsx';


const store = new Store();

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/writeblog" component={NewBlog}/>
                    <Route path="/editblog/:id" component={EditBlog}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <div>
                    <Auth></Auth>
                    {/*为login时匹配login，其余匹配LayoutRouter中的内容*/}
                    <Provider store={store}>
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route path="/" render={ props => LayoutRouter}/>
                        </Switch>
                    </Provider> 
                </div>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);
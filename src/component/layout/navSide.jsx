import React                from 'react';
import { Link, NavLink }    from 'react-router-dom';

class NavSide extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <Link to="/writeblog">
                                <i className="fa fa-list"></i>
                                <span>博客</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/writeblog" activeClassName="active-menu">发布博客</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </div>
        );
    }
}

export default NavSide;
import React from 'react';

import NavTop from './navTop.jsx';
import NavSide from './navSide.jsx';

import './theme.css';
import './index.css';

class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="wrapper">
                <NavTop />
                <NavSide />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;
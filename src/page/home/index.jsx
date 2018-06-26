import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import DevTools from 'mobx-react-devtools';
import Pagination from 'util/pagination/index.jsx';

import 'page/index.css';

@inject('store')
@observer
class Home extends React.Component{
    constructor(props){
        super(props);
        this.setPaginationIndex = this.setPaginationIndex.bind(this);
    }

    componentDidMount(){
        const { store } = this.props;
        store.fetchPageBlog();
    }

    setPaginationIndex(index){
        this.props.store.setPaginationIndex(index);
    }

    render(){
        const { store } = this.props;

        return(
            <div id="page-wrapper">

                {store.pageBlog.slice().map(function (item) {
                    const {_id,title,content,tag} = item;
                    const time = item.time.createAt;
                    return(
                    <div className="blog-panel" key={item._id}>
                        <div className="blog-item">
                            <div className="col-md-8 col-xs-4">
                                
                                <h1 className="title" onClick={()=>this.props.history.push('/editblog/' + _id)}>{title}</h1>
                                
                                <p className="abstract">
                                    {content.replace(/<[^>]+>/g,"")}
                                </p>
                            </div>
                            <div className="col-md-2 col-xs-4">
                                {moment(time).format('YYYY-MM-DD')}
                            </div>
                            <div className="col-md-2 col-xs-4">
                               
                                <button className="btn btn-primary" onClick={()=>this.props.history.push('/editblog/' + _id)}>编辑</button>
                                
                                <button className="btn btn-danger" onClick={() => store.fetchDelBlog(item._id)}>删除</button>
                            </div>
                        </div>
                    </div>
                    )

                },this)}

                <div className="div-center">
                    <Pagination 
                      allPageCount={store.allPageCount}
                      activeIndex={store.pageActiveIndex}
                      setIndex={this.setPaginationIndex}
                    />
                </div>

                <DevTools />
            </div>
        );
    }
}


export default Home;

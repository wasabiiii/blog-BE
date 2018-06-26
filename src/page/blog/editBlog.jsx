import React from 'react';
import request from 'util/request.jsx';

class EditBlog extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'',
            tag:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateSubmit = this.updateSubmit.bind(this);
    }

    handleInputChange(e){
        let inputValue = e.target.value;
        let inputName = e.target.name;
        this.setState({
            [inputName] : inputValue
        })
    }

    updateSubmit(){
        const {title, content,tag} = this.state;
        const body ={
            title,
            content,
            tag
        };

        request.post('/api/blog/edit/'+this.props.match.params.id,body,resData => {
            if(resData.status == 1){
                alert(resData.message);
            }
            
        })
    }

    componentDidMount(){
        request.get('/api/blog/markdown/'+this.props.match.params.id,resData => {
            if(resData.status == 1){
                this.setState({
                    title: resData.data.title,
                    content: resData.data.content,
                    tag: resData.data.tag.toString()//后台返回的tag是数组。修改后需要传递给后台的tag是string。这里把数组转成string，避免编辑博客不更改标签时报错
                });
            }
        })
    }

    render(){
        return(
            <div id="page-wrapper">
                <h1 className="page-title">编辑文章</h1>
                <div>
                    <div>
                        <p>标题</p>
                        <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <p>内容</p>
                        <textarea className="form-control" name="content" id="" cols="30" rows="20" value={this.state.content} onChange={this.handleInputChange}></textarea>
                    </div>
                    <div>
                        <p>标签</p>
                        <input className="form-control" type="text" name="tag" value={this.state.tag} onChange={this.handleInputChange}/>
                    </div>
                    <input className="btn btn-primary btn-submit" type="submit" value="提交" onClick={this.updateSubmit}/>
                </div>
            </div>
        )
    }

}

export default EditBlog;
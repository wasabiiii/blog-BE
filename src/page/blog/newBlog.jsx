import React from 'react';
import request from 'util/request.jsx';
class NewBlog extends React.Component{
     constructor(props){
        super();
        this.state={
            title:'',
            content:'',
            tag:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(e){
        let inputValue = e.target.value;
        let inputName = e.target.name;
        this.setState({
            [inputName] : inputValue
        })
    }

    handleSubmit(e){
        e.preventDefault();

        const {title, content,tag} = this.state;
        const body = {
            title,
            content,
            tag
        };

        if(title===""){
            alert("标题不能为空");
        } else if(content===""){
            alert("内容不能为空");
        }else if(content===""){
            alert("标签不能为空");
        }else{
            request.post('/api/blog/new',body,resData => {
                alert(resData.message);
            })
        }


    }

    render(){
        return(
            <div id="page-wrapper">
            
                <h1 className="page-title">创建文章</h1>
                <div>
                    <div>
                        <p>标题</p>
                        <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <p>内容</p>
                        <textarea className="form-control" name="content" cols="30" rows="20" value={this.state.content} onChange={this.handleInputChange}></textarea>
                    </div>
                    <div>
                        <p>标签</p>
                        <input className="form-control" type="text" name="tag" value={this.state.tag} onChange={this.handleInputChange}/>
                    </div>
                    <input className="btn btn-primary btn-submit" type="submit" value="提交" onClick={this.handleSubmit}/>
                </div>
                
            </div>
        );
    }
}

export default NewBlog;
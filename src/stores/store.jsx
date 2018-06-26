import { observable, computed, action } from 'mobx';
import request from 'util/request.jsx';


class Store{
	@observable allBlog = [];//所有blog
	@observable pageBlog = [];//当前页显示的blog

	@observable allBlogCount = 0;//所有blog

	@observable pageActiveIndex = 1;

	// 获取总共分页页数
	@computed get allPageCount() {
		return Math.ceil(this.allBlogCount / 10);
	}

	@action loadPageBlog(){
		this.pageBlog = this.allBlog.slice((this.pageActiveIndex-1)*10,(this.pageActiveIndex-1)*10+10);
	}


	@action fetchPageBlog(){
		request.get('/api/blog',resData => {
			if(resData.status == 1){
				this.allBlog = resData.data;
				this.allBlogCount = resData.count;
			}
		}).then(() => this.loadPageBlog())
	}

	@action fetchDelBlog(id){
		if(confirm("确认删除？")){
			request.get('/api/blog/del/'+id,resData => {
				if(resData.status == 1){
					this.allBlog = this.allBlog.filter(blog => blog._id != id);
					this.allBlogCount -= 1;
					this.loadPageBlog();
				}
			})
		}
	}


	//分页
	@action setPaginationIndex(index) {
	  this.pageActiveIndex = index;
	  this.loadPageBlog();
	}
    
}
export default Store;
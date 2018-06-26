import 'whatwg-fetch';

const handleErrors = err => {
	console.log(err);
}

const request = {
 	get: (url,callback) =>
	 	fetch(url,{credentials: 'include'})
	 		.then((response) => response.json())
	 		.then((resData) => {
	 				callback(resData);
	 			})
	 		.catch(handleErrors),
	post: (url, body, callback) =>
		fetch(url,{
			method:'POST',
			headers: {
				"Content-type":"application/json"
			},
			body: JSON.stringify(body),
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((resData) => {
					callback(resData);
				})
			.catch(handleErrors)
};



export default request;
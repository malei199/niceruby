const token = localStorage.getItem('dreamuser');
const islogin=() =>{
	if(!token){
	alert("请先登录");
	//this.$router.push({path:'/login'})
	location.pathname='/login'
	}
}


export default  islogin
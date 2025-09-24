import axios, { AxiosError } from "axios"

export default function(){
    //传输用户名和密码
    async function login(loginName:string,loginPassword:string) {
        try {
            const response = await axios.post('http://localhost:40000/login',{
              loginName,
              loginPassword
            })
            // if(response.data.success === true){
              console.log(response.data)
              fetchUserInfo()
            // }
        } catch (error) {
            console.error(`error from login():${error}`)
        }
    }
    async function fetchUserInfo() {
        try {
            // 无需手动添加 Token，Cookie 会自动发送
            const response = await axios.get('http://localhost:40000/api/user/info');
            console.log(response.data)
        } catch (error) {
            const axiosError = error as AxiosError
            // Token 无效/过期时，后端返回 401
            if (axiosError.response?.status === 409) {
            console.log('登录已过期，请重新登录');
            // 跳转登录页
            window.location.href = '/login';
            }
        }
    }
    return{
      login,
      fetchUserInfo
    }
}

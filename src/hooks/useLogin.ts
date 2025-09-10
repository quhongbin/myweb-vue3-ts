import axios, { AxiosError } from "axios"


export default function(){
    //传输用户名和密码
    async function login(loginName:string,loginPass:string) {
        try {
            const response = await axios.post("https://localhost:3000/login",
                {loginName,loginPass},
            );
            console.log(response.data)
            fetchUserInfo()
        } catch (error) {
            console.error(`error:${error}`)
        }
    }
    async function fetchUserInfo() {
        try {
            // 无需手动添加 Token，Cookie 会自动发送
            const response = await axios.get('/api/user/info');
            for (const [key,value] of response.data) {
                console.log(`key:${key},value${value}`) //
            }
            Object.keys(response.data).forEach(function (val:string,index:number,array:string[]) {
                console.log(`${val}:${response.data[val]}`)
            })
        } catch (error) {
            const axiosError = error as AxiosError
            // Token 无效/过期时，后端返回 401
            if (axiosError.response?.status === 401) {
            console.log('登录已过期，请重新登录');
            // 跳转登录页
            window.location.href = '/login';
            }
        }
    }
    return{login}
}

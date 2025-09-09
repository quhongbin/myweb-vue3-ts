import axios from "axios";
export default function(){
    async function getInfoForMe() {
        
        axios.get("http://localhost:3000/api/info",{
            headers:{
                Authorization:"quhongbin",
                Accept:"application/json"
            }
        })
        .then(Response =>{
            //功能预存
            console.log(Response)
        })
        .catch (error => {
            //功能预存
            console.error(`error from getInfoForMe:${error}`)
        })
    }

    async function postInfoForMe(id:number,name:string) {
        axios.post("http://localhost:3000/api/info",{
            userID:id,
            userName:name
        })
        .then(Response =>{
            //功能预存
            console.log(Response)
        })
        .catch(error => {
            //功能预存
            console.error(`error from postInfoForMe:${error}`);
        })
    }
    
    return{getInfoForMe,postInfoForMe}
}
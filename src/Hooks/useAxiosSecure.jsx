import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";



const axiosSecure= axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})


const useAxiosSecure = () => {
    const {logOut}=useAuth();
    const navigate =useNavigate()
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            console.log(res)
            return res;
        },
        err=>{
            console.log("error tracked at interceptor", err.response)
            console.log(typeof(err.response.status))
            if(err.response.status === 401 || err.response.status === 403){
                logOut()
                .then(()=>{
                    navigate('/login')
                })
                .catch(err=>console.log(err))


            }
        })
    },[navigate])
    return axiosSecure
};

export default useAxiosSecure;
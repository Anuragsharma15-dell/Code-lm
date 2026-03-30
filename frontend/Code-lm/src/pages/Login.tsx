import axios from "axios";
import { useState } from "react";


  
export default  function Login(){

    const[email, setemail] = useState("");
    const[password, setpassword] = useState("")

    const handlelogin = async(e:any)=>{
       try {
         e.preventDefault();
         const res  = await  axios.post('https://localhost:3000/api/auth/login',{
             email,
             password
         })
         alert("navigating to editor");
         window.location.href = "/editor";

         console.log(res.data);

       } catch (error) {
        console.log(error)
        
       }

    }


    
    return ( 
        <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
                <div className="text-center mb-6">
                    <div className="text-lg font-semibold text-white">Stitch Code</div>
                    <p className="text-sm text-neutral-400 mt-1">Welcome back</p>
                </div>
                <form className="space-y-4" onSubmit={handlelogin}>
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Email address</label>
                        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)}  className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500" placeholder="name@company.com"/>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm text-neutral-400">Password</label>
                            <a className="text-xs text-neutral-400 hover:text-white" href="#">Forgot Password?</a>
                        </div>
                        <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500" placeholder="••••••••"/>
                    </div>
                    <button type="button" className="w-full rounded-md bg-indigo-600 hover:bg-indigo-500 text-white py-2">Login</button>
                </form>

                <div className="text-center text-sm text-neutral-400 mt-6">
                    Don’t have an account? <a className="text-white hover:underline" href="/signup">Create Account</a>
                </div>
            </div>
        </div>
    )
}
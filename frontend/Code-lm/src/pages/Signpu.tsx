import axios from "axios";
import { useState } from "react";


export default function Signup() {
    const[name,setname] = useState("");
    const[email,setemail] = useState("");
    const [password, setpassword] = useState("");
    


     const handleSubmit = async (e:any)=>{
      try {
          e.preventDefault();

         const res = await  axios.post("http://localhost:3000/api/auth/register",{
          name,
            email,
            password

         });
         alert('user created successfully');
       window.location.href = "/login"
        
         console.log(res.data);
         console.log(res.data.email);
     console.log(res.data.password)
      } catch (error) {
        
        console.log(error)
       
      }
     }
    
     

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
             <div className="flex items-centre  mb-3 ">
             <img src="assets/hero.png" className="flex items-centre justify-centre mx-auto "></img>

             </div>
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-white">Build the future.</h1>
                    <p className="text-sm text-neutral-400 mt-1">
                        Join the ecosystem of kinetic developers.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Full name</label>
                        <input
                            name="name"
                            value={name}
                            onChange={(e)=>setname(e.target.value)}
                            type="text"
                            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
                            placeholder="Linus Torvalds"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Email address</label>
                        <input
                            name="email"
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                            type="email"
                            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
                            placeholder="dev@stitchcode.io"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Secure password</label>
                        <input
                            name="password"
                            value={password}
                            onChange={(e)=>setpassword(e.target.value)}
                            type="password"
                            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-indigo-600 hover:bg-indigo-500 text-white py-2"
                    >
                        Create Account
                    </button>

                </form>

                <div className="text-center text-sm text-neutral-400 mt-6">
                    Already have an account?{" "}
                    <a className="text-white hover:underline" href="/login">
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    );
}

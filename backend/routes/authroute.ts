
import { Register } from "../controller/auth.ts";
import {login} from "../controller/auth.ts"
import { getuser } from "../controller/auth.ts";
import { getalluser } from "../controller/auth.ts";
import { Router } from "express";



const Authrouter = Router()
Authrouter.post('/register', Register);
Authrouter.post('/login', login);
Authrouter.get('/get-user', getuser);
Authrouter.get('/get-all-user', getalluser);


export default Authrouter;
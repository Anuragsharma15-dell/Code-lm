
import { Register } from "../controller/auth.ts";
import {login} from "../controller/auth.ts"
import { Router } from "express";



const Authrouter = Router()
Authrouter.post('/register', Register);
Authrouter.post('/login', login)

export default Authrouter;
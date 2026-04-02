import { prisma } from '../db/db.ts'
import {  z } from "zod"
import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

const registerschema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const Register = async (req: Request, res: Response) => {
    const parsed = registerschema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: parsed.error.flatten()
        });
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return res.status(409).json({ message: "Email already registered" });
    }

    // ✅ FIXED bcrypt hash
    const hashpassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashpassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });

    // ✅ Generate JWT
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res.status(201).json({ user, token });
}

const loginschema = z.object({
    email: z.string().email("email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const login = async (req: Request, res: Response) => {
    const data = loginschema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: data.error.flatten()
        });
    }

    const { email, password } = data.data;

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, name: true, password: true }
    });

    if (!user) {
        return res.status(400).json({
            message: "email not found"
        });
    }

    // ✅ FIXED bcrypt compare
    const matchpassword = await bcrypt.compare(password, user.password);
    if (!matchpassword) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // ✅ Generate JWT instead of random token
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res.status(200).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    });
}

export const getuser = async (req:Request, res:Response)=>{
    const {email} = req.body;

    const user = prisma.user.findUnique({
        where:{
            email
            
        }
        
    });
    if(!user){
        res.status(400).json({
            message:"user not found"
        })
    }
return res.status(201).json({
    user,
    message:"user found successfully"
});



}


export const getalluser = async (req:Request, res:Response)=>{
    
    const user = prisma.user.findMany()
    if(!user){
        res.status(400).json({
            message:"user not found"
        })
    }
return res.status(201).json({
    user,
    message:"user found successfully"
});



}
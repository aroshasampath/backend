import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req , res){

    const hashPassword = bcrypt.hashSync(req.body.password , 10)

    const user = new User(
        {
            email:req.body.email,
            fristName:req.body.fristName,
            lastName:req.body.lastName,
            password:hashPassword
        }
    )

    user.save().then(
        ()=>{
            res.json({
                message :"user create successfully."
            })
        }
    ).catch(
    ()=>{
        res.json({
            message:"failed to create user."
        })
    }
    )
}

export function loginUser(req, res){
    User.findOne(
        {
           email:req.body.email
        }
    ).then(
        (user)=>{   // <-- FIXED (User -> user)
            if(user==null){
                res.json(
                    {
                        message:"user not found."
                    }
                )
            }else{
                const isPasswordMatching = bcrypt.compareSync(req.body.password , user.password)  
                // <-- FIXED (user.password instead of User.password)

                if(isPasswordMatching){
                    const token = jwt.sign(
                        {
                            email:user.email,
                            fristName:user.fristName,
                            lastName:user.lastName,
                            role:user.role,
                            isEmailVerified:user.isEmailVerified
                        },
                        "jwt secret"

                    )
                    res.json(
                        {
                            message :"login successfull.",
                            token:token
                        
                        }
                    )

                    

                }else{
                    res.json({
                        message : "invalid password."
                    })
                }
            }

            
        }
    )
}

export function isAdmin(req){
    if(req.user == null){
        return false
    }
    if(req.user.role!="admin"){
        return false
    }

    return true
}
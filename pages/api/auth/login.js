import jwt from 'jsonwebtoken'
import User from '../../models/User'
import dbConnect from '../../lib/db'
import bcrypt from 'bcryptjs'

export default async function handler(req,res){
  await dbConnect()
  if(req.method!=='POST') return res.status(405).end()
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(!user) return res.status(400).json({message:'Không tìm thấy người dùng'})
  const ok = await bcrypt.compare(password, user.passwordHash)
  if(!ok) return res.status(400).json({message:'Sai mật khẩu'})
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})
  res.json({token})
}

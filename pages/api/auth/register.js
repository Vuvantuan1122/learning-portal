import jwt from 'jsonwebtoken'
import User from '../../models/User'
import dbConnect from '../../lib/db'
import bcrypt from 'bcryptjs'

export default async function handler(req,res){
  await dbConnect()
  if(req.method!=='POST') return res.status(405).end()
  const {name,email,password} = req.body
  if(!email || !password) return res.status(400).json({message:'Email và mật khẩu required'})
  const exists = await User.findOne({email})
  if(exists) return res.status(400).json({message:'Email đã tồn tại'})
  const passwordHash = await bcrypt.hash(password,10)
  const user = await User.create({name,email,passwordHash, role: 'user', stats: { totalAttempts:0, correctCount:0, perTopic: {} }})
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})
  res.json({token})
}

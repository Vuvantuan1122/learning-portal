import jwt from 'jsonwebtoken'
import User from '../../models/User'
import dbConnect from '../../lib/db'

export default async function handler(req,res){
  await dbConnect()
  const token = req.headers.authorization
  if(!token) return res.status(401).json({message:'No token'})
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-passwordHash')
    if(!user) return res.status(404).json({message:'User not found'})
    res.json(user)
  }catch(err){
    res.status(401).json({message:'Invalid token'})
  }
}

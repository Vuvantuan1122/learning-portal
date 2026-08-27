import mongoose from 'mongoose'

if(!process.env.MONGODB_URI){
  console.warn('MONGODB_URI not set')
}

let cached = global.mongoose

if(!cached) cached = global.mongoose = { conn: null, promise: null }

async function dbConnect(){
  if(cached.conn) return cached.conn
  if(!cached.promise){
    const opts = { }
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then(m=>m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect

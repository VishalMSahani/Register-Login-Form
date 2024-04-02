import mongoose , {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema =  new Schema({

    email:{
        type:String, 
        required:[true,'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type:String, 
        required:[true,'Full Name is required'],
        trim: true,
        index:true,
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        
    },
})

userSchema.pre( 'save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password ,10) 
    next()
})

userSchema.methods.matchPasswords=async function(password){
   return await bcrypt.compare(password, this.password)
}


// token 
userSchema.methods.grantAccessToken = function(){
    return jwt.sign({
       _id: this._id,
       email : this.email,
       username: this.username,
       fullName:this.fullName
   },
   process.env.ACCESS_TOKEN_SECRET,
   {expiresIn:'1d'} 
   )
}
userSchema.methods.grantRefreshToken = function(){
   return jwt.sign({
       _id: this._id
   },
   process.env.REFRESH_TOKEN_SECRET,
   {expiresIn:'30d'} 
   )
}

export const User = mongoose.model('User',userSchema)
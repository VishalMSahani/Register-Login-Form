
import { User } from '../Models/usermodel.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const generateAccessAndRefreshToken =  async (userId) =>{ 

    try {
        const userToken = await User.findById(userId)
        const accessToken = userToken.grantAccessToken()
        const refreshToken = userToken.grantRefreshToken()

        userToken.refreshToken= refreshToken
        await userToken.save({validateBeforeSave:false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}


const registerUser = asyncHandler(async(req,res) =>{

    const {fullName,email, password} = req.body;

    console.log(email);

    if(!fullName || !email || !password){
        throw new ApiError(400, "All fields are required")
    }

    const existingUser  = await User.findOne({email})
    
    if(existingUser){
        throw new ApiError(409,"User already exist")
    }

    const user = await  User.create({
        fullName,
        email,
        password
    })

    console.log("user :" , user );

    const createdUser = await User.findById(user?._id);

    if(!createdUser){
        throw new ApiError(500,'Something went wrong while creating the account')
    }

    return res
    .status(200)
    .json(
        new ApiResponse (200, createdUser , "User created successfully")
    )

})

const userLogin  = asyncHandler(async(req,res) =>{

    const  {email, password} = req.body;

    if  (!email || !password) {
        throw new ApiError(400, 'Email and Password are required');
      }
    
    const user = await User.findOne({email});

    if(!user){
       throw new ApiError(401, 'Invalid Credentials! Please try again with correct Email or Password ') ;
    }

    const isPasswordCorrect = await user.matchPasswords(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, 'Incorrect Password');
    }

    console.log(isPasswordCorrect);

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    console.log("accessToken: ",accessToken, "refreshToken", refreshToken);

    const loggedinUser = await User.findById(user._id).
    select("-password -refreshToken")
    
    const option = {
        httpOnly : true,
        secure: true
    }

    return  res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(200, {
            login_user: loggedinUser, accessToken, refreshToken
        }, "User Logged in successfully!" )
    )   

})

export {registerUser, userLogin};
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {User} from '../Models/user.models.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
const registerUser = asyncHandler(async (req,res) =>{
    // return res.status(200).json({
    //     message:"OK"
    // })

    //get details from frontend
    const {fullName,email,username,password}= req.body;

    console.log("email: ",email);
    //validation - atleast not empty
    // if(fullName === ""){
    //     throw new ApiError(400,"fullname is required");
    // }
    if(
        [fullName,email,username,password].some((field) =>
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    //check duplicacy - username or email
    const existingUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existingUser){
        throw new ApiError(409,"User with email or username already exists");
    }
    //check for images, check for avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    console.log("Avatar path:", avatarLocalPath);
    console.log("Cover path:", coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    //if available, then upload it on cloudinary, check avatar (is required)
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar is not present");
    }
    //create user object, create entry in db
    
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    //remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshTokens"
    )

    //check for user creation
     if(!createdUser){
        throw new ApiError(500,"Something went wrong, while registring  the user");
    }
    //return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export {registerUser};
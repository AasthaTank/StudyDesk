const User =  require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken- send mail
exports.resetPasswordToken = async (req, res) => {
    try{
        //get email from req body
        const email = req.body.email;  
        //check user for this email, email validation
        const user = await User.findOne({email: email});
        if(!user) {
            return req.json({success:false,
            message:'Your Email is not registered with us'});
        }
        //generate token 
        const token = crypto.randomUUID();
        //update user by adding token and expiration time 
        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {new:true} 
            );
            console.log("DETAILS", updatedDetails);

        //create url
        const url = `http://localhost:3000/update-password/${token}`
        
        //send mail containing the url
        await mailSender(email,
                        "Passsword Reset Link",
                        `Password Reset Link: ${url}` );
        
                        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check your email and change password', 
            });
        }

    catch(error) {
        console.log(error);
        return res.status(500).json({
            message:'Something went wrong while sending reset password mail',
        });
    }

};

    //reset Password
    exports.resetPassword = async(req, res) => {
        try{
            //data fetch
            const {password, confirmPassword, token} = req.body;

            //validation
            if(password != confirmPassword) {
                return res.json({
                    success:false,
                    message:'Password not matching',
                });
            }
            //get user details from db using token
                const userDetailes = await User.findOne({token: token});
            
            //if not get entry - invalid token
            if(!userDetailes) {
                    return res.json({
                        success:false,
                        message:'Token is invalid',
                    });
                }

            //token time check
            if( userDetailes.resetPasswordExpires < Date.now() ) {
                    return res.json({
                        success:false,
                        message:'Token is expired, please regenerate your token',
                    });

            }

            //hash password
            const encryptedPassword = await bcrypt.hash(password, 10);
            //update password
            await User.findOneAndUpdate(
                {token:token},
                {password:encryptedPassword},
                {new:true},
            );

            //response return
            return res.status(200).json({
                succes:true,
                message:'Password reset successful',
            });

        }

        catch(error){
            console.log(error);
            return res.status(500).jso({
                success:false,
                message:'Something went wrog while sending reset password mail',
            });
        }
};



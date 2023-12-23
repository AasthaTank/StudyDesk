const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {default: mongoose } = require("mongoose");

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req,res) => {
    //get courseId and UserID
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
     //valid courseID
    if(!course_id) {
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })
    };
   
    //valid courseDetails
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course) {
            return res.json({
                success:false,
                message:'Could not find the course',
            });
        }

        //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success:false,
                message:'Student is already enrolled',
            });
        }    
    }
    catch(error){
        console.error(error);
        return res.status(500),json({
            success:false,
            message:error.message,
        });

    }

    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId,
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse)
        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:courseDescription,
            thumbnail:course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:'Could not initiate order',
        });

    }

};

//verify signature of razorpay and server

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature =  req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);  //Hmac= Hashed based Message Authentication Code
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.diges("hex");

    if(signature === digest) {
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
             //fulfill the action
             //find the course and enroll the student in it
             const enrolledCourse = await Course.findOneAndUpdate(
                                            {_id: courseId},
                                            {$push:{studentsEnrolled: userId}},
                                            {new:true},
             );

             if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:'Course not found',
                });
             }

             console.log(enrolledCourse);

             //find the student and add the course to their list enrolled in courses
             const enrolledStudent = await User.findOneAndUpdate(
                                            {_id: userId},
                                            {$push:{courseId}},
                                            {new:true},
             );
             console.log(enrolledStudent);

             //send Mail for confirmation
             const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations!",
                                        "Congratulations, you onboarded into new Course",

             );
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature verified and course Added",
            });
        }

        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });

        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }
};

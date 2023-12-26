import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import { BiLeftArrowAlt } from "react-icons/bi";
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const {signupData, loading} = useSelector((state) => state.auth) ;
    const navigate = useNavigate();
    
    useEffect ( () => {
        if(!signupData) {
            navigate("/signup");
        }
    }, [] )

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword, 
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

  return (
    <div className='text-white flex items-center justify-center'>
      {
        loading
        ? ( <div> Loading...</div> ) 
        : (
            <div>
                <h1>Verify Email</h1>
                <p>A verification code has been sent to you. Enter the code below</p>
                
                <form onSubmit={handleOnSubmit}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props}
                            className='bg-richblack-600'/>
                        }
                    />

                    <button type='submit'>
                        Verify Email
                    </button>
                </form>

                <div>

                    <div>
                        <Link to="/login">
                            <BiLeftArrowAlt />
                            <p>Back to login</p>
                        </Link>
                    </div>

                    <button 
                    onClick={ () => dispatch (sendOtp(signupData.email))}>
                        Resend it
                    </button>


                </div>


            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail

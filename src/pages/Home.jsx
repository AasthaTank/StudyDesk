import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HightlightText'

import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import HightlightText from '../components/core/HomePage/HightlightText'
import TimelineSection from "../components/core/HomePage/TimelineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import Footer from "../components/common/Footer"
import ExploreMore from '../components/core/HomePage/ExploreMore'
  

const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <div className='relative mx-auto flex flex-col max-w-maxContent w-11/12 items-center text-white justify-between'>
                <Link to={"/signup"}>

                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold
                     text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                        
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>

                    </div>

                </Link>

                <div className="text-center text-4xl font-semibold mt-7">
                    Empower Your Future With 
                    <HighlightText text={"Coding Skills"}/>
                </div>

                <div className="mt-4 text-center w-[90%] text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pase, from anywhere in the world of resources, including hands-on projects, quizzes, and personalized feedback from instructions. 
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className='mx-4 my-12 shadow-blue-200 '>
                    <video
                        muted
                        loop
                        autoPlay
                    >
                    <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* Code Sectione-1 */}
                <div>
                    <CodeBlocks 
                       position={"lg:flex-row"} 
                       heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HightlightText text={"coding potential "}/>
                            with our online courses
                        </div>
                       }
                       subheading={
                            "Our courses are designed ans taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                       }
                       ctabtn1={
                            {
                                btnText: "Try it Youself",
                                linkto: "/signup",
                                active: true,

                            }
                       }

                       ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false,

                            }
                       }

                       codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is my Page</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>\n</html>`}
                       codeColor={"text-yellow-25"}

                    />
                </div>

                {/* Code Section-2 */}
                <div>
                    <CodeBlocks 
                       position={"lg:flex-row-reverse"} 
                       heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HightlightText text={"coding in seconds "}/>
                            with our online courses
                        </div>
                       }
                       subheading={
                            "Go head, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                       }
                       ctabtn1={
                            {
                                btnText: "Continues Lesson",
                                linkto: "/signup",
                                active: true,

                            }
                       }

                       ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false,

                            }
                       }

                       codeblock={`import React from "react"; 
                       import CTAButton from "./Button";
                       import TypeAnimation from "react-type";
                       import { FaArrowRight } from "react-icons/fa";
                       \nconst Home = () => {
                       return (
                       <div>Home</div>
                       )
                       }
                       export default Home;`}
                       
                       codeColor={"text-pink-25"}

                    />
                </div>
                
                <ExploreMore/>
            </div>

            {/* section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[310px]'>
                    
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                       <div className='h-[150px] '></div>
                       <div className='flex flex-raw gap-7 text-white '>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    <FaArrowRight/>
                                    Explore Full Catalog
                                </div> 
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                       </div>
                   
                    </div> 
                
                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col 
                items-center justify-between gap-7'>
                    
                    <div className='flex flex-row gap-5 mb-10 mt-95px'>
                       <div className='text-4xl font-semibold w-[45%]'>
                            Get the skills you need for a
                            <HighlightText text={"Job that is in demand"} />
                       </div>

                       <div className='flex flex-col gap-10 w-[40%] items-start'>
                       <div className='text-[16px]'>
                       The modern StudDesk is the dictates its own terms. 
                       Today, to be a competitive specialist requires more than professional skills.
                       </div>
                       <CTAButton active={true} linkto={"/signup"}>
                            Learn More
                       </CTAButton>
                       </div>

                    </div>

                    <TimelineSection/>
                
                    <LearningLanguageSection/>

                </div>

            </div>

            {/* section 3 */}
            <div className='w-11/12 max-w-maxContent flex-col items-center justify-between 
                            gap-8 bg-richblack-900 text-white'>

                <InstructorSection/>

                <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>
                
                {/* {Review Slider here} */}

            </div>



            {/* Footer */}
            <Footer />

        </div>
    )
}

export default Home
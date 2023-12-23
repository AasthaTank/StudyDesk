import React, { useEffect } from 'react'
import logo from "../../assets/Logo/logoDark.png"
import { Link, matchPath } from 'react-router-dom'
import  NavBarLinks from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'

const Navbar = () => {

      const {token} = useSelector ( (state) => state.auth);
      const {user} = useSelector ( (state) => state.profile);
      const {totalItems} = useSelector ( (state) => state.cart);
      const location = useLocation();

      const [subLinks, setSubLinks] = useState([]);

      const fetchSublinks = async() => {
            try{
                const result = await apiConnector("Get", categories.CATEGORIES_API );
                console.log("Printing Sublinks Result:", result);
                setSubLinks(result.data.data);
            }
            catch(error) {
                console.log("Could not fetch the category list")
            }
        }
      
      useEffect( () => {
        fetchSublinks();
    }, [] )


  
    const matchRoutes = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        {/* Image */}
        <Link to="/">
        <img src={logo} width={135} height={34} heading='lazy' />
        </Link>

        {/* Nav links */}
        <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavBarLinks.map( (link, index) => (
                         <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                    <div>
                                        <p>{link.title}</p>
                                    </div>
                                ) : (
                                    
                                <Link to={link?.path}>  
                                    <p className={`${matchRoutes(link?.path) ? "text-yellow-25" : "text-richblack-25"}`} >
                                        {link.title}
                                    </p>
                                </Link>
                                )
                            }

                        </li>
                    ))
                }
            </ul>

        </nav>

        {/* login/signupdashboard */}
        <div className='flex gap-x-4 items-center'>
    
            
            {
                user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                    <AiOutlineShoppingCart />
                    {/* styling */}
                    {
                        totalItems > 0 && (
                            <span>
                                {totalItems}
                            </span>
                        )
                    }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log In
                        </button>
                    </Link>
                )    
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign  Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown/>
            }
        </div>

      </div>
    </div>
  )
}

export default Navbar

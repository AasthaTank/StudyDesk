import React from 'react'
import HighlightText from '../HomePage/HightlightText'

const Quote = () => {
  return (
    <div>
      We are passionate about revolutionizing the way we learn. Our innovative platform 
      <HighlightText text={'combines technology'}/>
      <span className='bg-gradient-to-t from-rose-400 to-orange-300 text-transparent bg-clip-text '>
        {" "} 
        experties
      </span>
      , and community to create an 
      <span className='bg-gradient-to-t from-rose-400 to-orange-300 text-transparent bg-clip-text '>
      {" "}
      unparalleled educational experience.
      </span>
    </div>
  )
}

export default Quote

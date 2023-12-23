import React from 'react'

const HightlightText = ({text}) => {
  return (
    <span className='bg-gradient-to-r from-pastle via-mint to-cool  inline-block text-transparent bg-clip-text mr-2 ml-2 '> 
    {" "} 
        {text} 
    </span>
  )
}

export default HightlightText



import React from 'react'
import ReactStars from 'react-rating-stars-component'
const Rating = ({product}) => {
    const options = {
        value:product.rating,
        readOnly: true,
        precision: 0.5,
      };
   
  return (
    <div>          
  <ReactStars {...options} />
    </div>
  )
}

export default Rating
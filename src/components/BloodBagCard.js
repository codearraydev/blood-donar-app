import React from 'react'
import { APositive,ANegative,BPositive,BNegative,OPositive,ONegative,ABPositive,ABNegative } from '../svgs'

function BloodBagCard(props) {
  return (
    <div className='bloodbag-card'>
         {
                    props.name === 'A+' ?   <img src={APositive} alt="" />:
                    props.name === 'A-' ?  <img src={ANegative} alt="" /> :
                    props.name === 'B+' ?  <img src={BPositive} alt="" /> :
                    props.name === 'B-' ?  <img src={BNegative} alt="" /> :
                    props.name === 'O+' ?  <img src={OPositive} alt="" /> :
                    props.name === 'O-' ?  <img src={ONegative} alt="" />:
                    props.name === 'AB+' ?  <img src={ABPositive} alt="" />:
                    props.name === 'AB-' ?  <img src={ABNegative} alt="" />: null
                    
         }
       
        <h4>{props.count}</h4>
    </div>
  )
}

export default BloodBagCard
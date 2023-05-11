import React from 'react'
import { APositive,ANegative,BPositive,BNegative,OPositive,ONegative,ABPositive,ABNegative } from '../svgs'

function BloodBagCard(props) {
  return (
    <div className='bloodbag-card'>
         {
                    props.name === 'A Positive' ?   <img src={APositive} alt="" />:
                    props.name === 'A Negative' ?  <img src={ANegative} alt="" /> :
                    props.name === 'B Positive' ?  <img src={BPositive} alt="" /> :
                    props.name === 'B Negative' ?  <img src={BNegative} alt="" /> :
                    props.name === 'O Positive' ?  <img src={OPositive} alt="" /> :
                    props.name === 'O Negative' ?  <img src={ONegative} alt="" />:
                    props.name === 'AB Positive' ?  <img src={ABPositive} alt="" />:
                    props.name === 'AB Negative' ?  <img src={ABNegative} alt="" />: null
                    
         }
       
        <h4>9</h4>
    </div>
  )
}

export default BloodBagCard
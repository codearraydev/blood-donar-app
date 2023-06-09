import React from 'react'
import { donor, volunters, ngo,casess } from '../svgs'

function MeasurementCard(props) {
    return (

        <div
            className={
                props.name == "Active Cases" ? 'measrement-card bg-pink' :
                    props.name == "Closed Cases" ? 'measrement-card bg-orng' :
                        props.name == "Donars" ? 'measrement-card bg-blue' :
                            props.name == "Available Bottles" ? 'measrement-card bg-pink-dark' : null

            }>
            <div className="measurement-icon">
                {
                    props.name == "Donars" ? <img src={donor} alt="" style={{width:"50px"}}/> :
                        props.name == "Closed Cases" ? <img src={volunters} alt="" style={{width:"50px"}} /> :
                            props.name == "Available Bottles" ? <img src={ngo} alt="" style={{width:"50px"}}/> :
                                props.name == "Active Cases" ? <img src={casess} alt="" style={{width:"50px"}} /> : null

                }

            </div>
            <h1 >{props.count}</h1>
            <h4>{props.name}</h4>
        </div>
    )
}

export default MeasurementCard
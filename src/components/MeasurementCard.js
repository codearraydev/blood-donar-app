import React from 'react'
import { donors, volunters, ngo } from '../svgs'

function MeasurementCard(props) {
    return (

        <div
            className={
                props.name == "Donors" ? 'measrement-card bg-pink' :
                    props.name == "Volunteers" ? 'measrement-card bg-orng' :
                        props.name == "NGOs" ? 'measrement-card bg-blue' :
                            props.name == "Cases" ? 'measrement-card bg-pink-dark' : null

            }>
            <div className="measurement-icon">
                {/* {
                    props.name == "Donors" ? <img src={donors} alt="" /> :
                        props.name == "Volunteers" ? <img src={volunters} alt="" /> :
                            props.name == "NGOs" ? <img src={ngo} alt="" /> :
                                props.name == "Cases" ? <img src={donors} alt="" /> : null

                } */}

            </div>
            <h1 >231</h1>
            <h4>{props.name}</h4>
        </div>
    )
}

export default MeasurementCard
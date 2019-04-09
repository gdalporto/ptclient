import React from 'react';
import './display-instructions.css';


export default function DisplayInstructions(props) {

    const instructionList=props.treatmentInstruction.steps.map((step,index)=>{
        let number = index +1;
        return <li key={index}>{number}. {step}</li>
    })

    return (
        <div className='treatment'>
            <p className='treatmentHeader'> Video Instructions for {props.treatment}:</p>
            <div className="videoWrapper">
                <iframe 
                    title={props.treatment}
                    src={`${props.treatmentInstruction.video}`}
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>
            <p className='stepsHeader'> Step-by-step Instructions for {props.treatment}: </p>

                <ul className='stepByStepList'>
                    {instructionList}
                </ul>
        </div>
    );
};

//https://www.youtube.com/embed/Xyd_fa5zoEU

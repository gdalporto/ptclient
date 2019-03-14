import React from 'react';


export default function DisplayInstructions(props) {

    const instructionList=props.treatmentInstruction.steps.map((step,index)=>{
        return <li key={index}>{step}</li>
    })

    return (
        <div className='treatment'>
            <p className='treatmentName'> {props.treatment}</p>
            <iframe 
                title={props.treatment}
                width="560" 
                height="315" 
                src={`${props.treatmentInstruction.video}`}
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
            <p className='stepsHeader'> Step-by-step Instructions </p>

                <ul>
                    {instructionList}
                </ul>
        </div>
    );
};

//https://www.youtube.com/embed/Xyd_fa5zoEU

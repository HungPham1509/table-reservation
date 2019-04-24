import React from 'react';
import classes from './Input.css';



const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let invalidMessage = null;
    if(props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
        invalidMessage = <p className={classes.InvalidMessage}><strong>Invalid Input</strong></p>
    }
    
    switch(props.inputtype) {
        case('input'): 
            inputElement = <input 
                            {...props.elementConfig}
                            className={inputClasses.join(' ')}
                            value={props.value}
                            onChange={props.changed}
                             />
            break;
        case('textarea'):
            inputElement = <textarea 
                            {...props.elementConfig}
                            className={inputClasses.join(' ')}
                            value={props.value}
                            onChange={props.changed} />
            break;
        default:
            inputElement = <input 
                           {...props.elementConfig}
                           className={inputClasses.join(' ')}
                           value={props.value}
                           onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
            {invalidMessage}
        </div>
    )
}

export default input;
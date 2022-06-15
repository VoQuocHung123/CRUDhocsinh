import React from 'react'

export default function FormGroup(props) {
  return (
    <>
        <label>{props.label}</label>
        <input value={props.value} type={props.type} name={props.name} style={props.style} className="form-input" onChange={props.onChange} />
        <div className='validation'>{props.validate}</div>
    </>
  )
}

import React from 'react'

export default function FormGroup(props) {
  return (
    <>
        <label>{props.label}</label>
        <input value={props.value} accept={props.accept} type={props.type} name={props.name} placeholder={props.validate} style={props.style} className="form-input" onChange={props.onChange} />
    </>
  )
}

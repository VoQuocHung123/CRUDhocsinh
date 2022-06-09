import React from 'react'
export default function FormFeature(props) {
  return (
    <>
    <div className={props.visible}>
        <div className='modal-container' >
          <form encType="multipart/form-data" >
          <span style={{float: 'right' ,color: 'white',fontWeight: 'bold' , padding: 20 , cursor :'pointer' }} className="btn-close" onClick={props.onCancel}>X</span>
          <header className="modal-header">{props.title}</header>
          <div className='form-body'>
            <label>FirstName:</label>
            <input value={props.firstname} type={'text'} name="firstname" className="form-input" onChange={props.onChangeInput} />
            <div className='validation'>{props.Errors.firstname}</div>
            <label>LastName:</label>
            <input value={props.lastname} type={'text'} name="lastname" className="form-input" onChange={props.onChangeInput}/>
            <div  className='validation'>{props.Errors.lastname}</div>
            <label>Age:</label>
            <input  value={props.age} type='text' name="age" className="form-input" onChange={event => {
              (/^-?[\d.]+(?:e-?\d+)?$/.test(event.target.value)) ? props.onChangeInput(event) : event.preventDefault()
              }} 
            />
            <div className='validation'>{props.Errors.age}</div>
            <label>Class:</label>
            <input value={props.class} type={'text'} name="class" className="form-input" onChange={props.onChangeInput} />
            <div className='validation'>{props.Errors.class}</div>
            <label>Avatar:</label>
            <input type={'file'} style={{height: 40,width: 84,display: 'block', padding: 5}} name="avatar"  onChange={props.onChangeAvt} className="form-input" />
            <div className='validation'>{props.Errors.avatar}</div>
            <img alt='' src={props.avatar} style={{width : 70,display: 'block'}} ></img>
            <button type='button' className="btn-add-form" onClick={e=>{ props.onOk()}}>Xác Nhận</button>      
          </div>
          </form>
        </div>
    </div>
    </>
  )
}

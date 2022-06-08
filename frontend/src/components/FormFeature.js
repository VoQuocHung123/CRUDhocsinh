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
            <input value={props.firstname} type={'text'} className="form-input" onChange={props.onChangeFirstName} />
            <label>LastName:</label>
            <input value={props.lastname} type={'text'} className="form-input" onChange={props.onChangeLastName}/>
            <label>Age:</label>
            <input value={props.age} type={'text'} className="form-input" onChange={props.onChangeAge} />
            <label>Class:</label>
            <input value={props.class} type={'text'} className="form-input" onChange={props.onChangeClass} />
            <label>Avatar:</label>
            <input type={'file'} style={{height: 40,width: 84,display: 'block', padding: 5}}  onChange={props.onChangeAvt} className="form-input" />
            <img src={props.avatar} style={{width : 70,display: 'block'}} ></img>
            <button type='button' className="btn-add-form" onClick={e=>{ e.preventDefault(); props.onOk()}}>Xác Nhận</button>
          </div>
          </form>
        </div>
    </div>
    
    </>
  )
}

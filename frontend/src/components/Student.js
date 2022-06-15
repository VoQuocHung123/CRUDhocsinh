import React from 'react'
import Button from './Button';
export default function Student(props) {
  const {firstname,lastname,age,classname,avatar} = props.dataSource 
  return (
    <>
        <tr className='table-item'>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{age}</td>
            <td>{classname}</td>
            <td><img alt='' src={process.env.REACT_APP_API_URL+"/avatar/"+avatar} width="50px"></img></td>
            <td><Button title="Update" className="btn-update" onClick={()=>props.onUpdate(props.dataSource)} ></Button></td>
            <td><Button title="Delete" className="btn-delete" onClick={()=>props.onDelete(props.dataSource)} ></Button></td>
        </tr>
    </>
  )
}

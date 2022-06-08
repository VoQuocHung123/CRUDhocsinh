import React from 'react'

export default function Student(props) {

  return (
    <>
     
        <tr className='table-item'>
            <td>{props.dataSource.firstname}</td>
            <td>{props.dataSource.lastname}</td>
            <td>{props.dataSource.age}</td>
            <td>{props.dataSource.class}</td>
            <td><img alt='' src={"http://localhost:3001/avatar/"+props.dataSource.avatar} width="50px"></img></td>
            <td><button className="btn-update" onClick={()=>props.onUpdate(props.dataSource)}>Update</button></td>
            <td><button className="btn-delete" onClick={()=>props.onDelete(props.dataSource)}>Delete</button></td>
        </tr>
      
    </>
  )
}

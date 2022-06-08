import React,{useState,useEffect} from 'react'
import {Modal} from 'antd'
import FormFeature from './FormFeature';
import Student from './Student';
import axios from 'axios';
export default function Content() {
  const [isEditingUpdate,setIsEditingUpdate] = useState('modal')
  const [isEditingAdd,setIsEditingAdd] = useState('modal')
  const [editingStudent,setEditingStudent] = useState({firstname:"",lastname:"",age:"",class:"",avatar:""})
  // const [validate,setValidate] = useState({firstname:false,lastname:false,age:false,class:false,img:false})
  const [dataStudent,setDataStudent] = useState([])
  useEffect(()=>{
    callStudent()
  },[])

  const updateStudent = (record)=>{
    setIsEditingUpdate('modal active')
    setEditingStudent({...record})
  }
  const addStudent = ()=>{
    setIsEditingAdd('modal active')
  }
  const deleteStudent = (record)=>{
    Modal.confirm({
      title:`Bạn có chắc muốn xoá học sinh có id ${record._id}`,
      okText:`Yes`,
      okType:`danger`,
      onOk: () =>{ 
        const callDeleteStudent = async (id)=>{
          const API = `http://localhost:3001/student/${id}`
          axios.delete(API)
          setDataStudent(prev=>{
            return prev.filter((student)=> student._id !== id)
          })
        }
        callDeleteStudent(record._id)
      }
    })
  }

  async function callStudent(){
    const API ="http://localhost:3001/students"
    axios.get(API)
    .then(response=>response.data)
    .then(data=>setDataStudent(data))
    .catch(err=>console.log(err))
  }

  return (
    <div className='content'>
      <button className="btn-add" onClick={addStudent}>Thêm Học Sinh</button>
      <table>
        <thead >
            <tr className='table-header'>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Age</th>
                <th>Class</th>
                <th>Avatar</th>
                <th colSpan={2}>Action</th>
            </tr>
        </thead>
        <tbody>
        {dataStudent.map((student,index)=>{
        return <Student key={index} dataSource={student} onUpdate={updateStudent} onDelete={deleteStudent} ></Student>
      })}
        </tbody>
      </table>
      {/* Update Student*/}
      <FormFeature
      title="Update Sinh Viên"
      visible={isEditingUpdate}
      onCancel={()=>{
        setEditingStudent({firstname:"",lastname:"",age:"",class:"",avatar:""})
        setIsEditingUpdate('modal')
      }}
      onOk={()=>{
        const API = `http://localhost:3001/update-student/${editingStudent._id}`
        const formData= new FormData()
        for(let name in editingStudent){
          formData.append(name,editingStudent[name])
        }
        axios
          .put(API,formData)
          .then(response=>response.data)
          .then(data=> dataStudent.map(student=>{
            if(student._id === data._id){
              return data
            }else{
              return student
            }
          })
          )
          .then((data)=>setDataStudent(data))
          setIsEditingUpdate('modal')
        }
      }
      firstname={editingStudent?.firstname}
      onChangeFirstName={(e)=>{
        setEditingStudent(prev =>{
          return {...prev,firstname:e.target.value}
        })
      }}
      lastname={editingStudent?.lastname}
      onChangeLastName={(e)=>{
        setEditingStudent(prev =>{
          return {...prev,lastname:e.target.value}
        })
      }}
      age={editingStudent?.age}
      onChangeAge={(e)=>{
        setEditingStudent(prev =>{
          return {...prev,age:e.target.value}
        })
      }}
      class={editingStudent?.class}
      onChangeClass={(e)=>{
        setEditingStudent(prev =>{
          return {...prev,class:e.target.value}
        })
      }}
      avatar={editingStudent?.avatar}
      onChangeAvt={(e)=>{
        setEditingStudent(prev=>{
          const file = e.target.files[0]
          return {...prev,avatar:file}
        })
      }}
      >
      </FormFeature>
      {/* Add Student */}
      <FormFeature
      title="Add Sinh Viên"
      visible={isEditingAdd}
      onCancel={()=>{
        setEditingStudent({firstname:"",lastname:"",age:"",class:"",avatar:""})
        setIsEditingAdd('modal')
      }}
      onOk={()=>{
          const API = "http://localhost:3001/add-student"
          const formData= new FormData()
          for(let name in editingStudent){
            formData.append(name,editingStudent[name])
          }
        axios.post(API,formData)
        .then(response=> response.data)
        .then((data)=>setDataStudent([...dataStudent,data]))
        .catch(console.error)          
        setEditingStudent({firstname:"",lastname:"",age:"",class:"",avatar:""})
        setIsEditingAdd('modal')
      }
      }
      firstname={editingStudent?.firstname}
      onChangeFirstName={(e)=>{
        setEditingStudent(prev =>{
          return {...prev,firstname:e.target.value}
        })
      }}
      lastname={editingStudent?.lastname}
      onChangeLastName={(e)=>{
        setEditingStudent(prev =>{
          return {...prev,lastname:e.target.value}
        })
      }}
      age={editingStudent?.age}
      onChangeAge={(e)=>{
        setEditingStudent(prev =>{
          return {...prev,age:e.target.value}
        })
      }}
      class={editingStudent?.class}
      onChangeClass={(e)=>{
        setEditingStudent(prev =>{
          return {...prev,class:e.target.value}
        })
      }}
      avatar={editingStudent?.avatar}
      onChangeAvt={(e)=>{
        setEditingStudent(prev=>{
          const file = e.target.files[0]
          return {...prev,avatar:file}
        })
      }}
      ></FormFeature>
    </div>
  )
}

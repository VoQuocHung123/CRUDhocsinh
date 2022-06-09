import React,{useState,useEffect} from 'react'
import {Modal} from 'antd'
import FormFeature from './FormFeature';
import Student from './Student';
import axios from 'axios';
export default function Content() {
  const [isEditingUpdate,setIsEditingUpdate] = useState('modal')
  const [isEditingAdd,setIsEditingAdd] = useState('modal')
  const [editingStudent,setEditingStudent] = useState({firstname:"",lastname:"",age:"",class:"",avatar:""})
  const [dataStudent,setDataStudent] = useState([])
  const [previewImage,setPreviewImage] = useState()
  const [errors,setErrors] = useState({})
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
  const callStudent=()=>{
    const API ="http://localhost:3001/students"
    axios.get(API)
    .then(response=>response.data)
    .then(data=>setDataStudent(data))
    .catch(err=>console.log(err))
  }
  const handleChange = (e)=>{
    setErrors({})
    const {name,value} = e.target
    setEditingStudent({...editingStudent,[name]:value})
  }
  const handleAddSubmit= ()=>{
    setErrors(validate(editingStudent))
    if(Object.keys(validate(editingStudent)).length === 0){
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
      setPreviewImage()
      setIsEditingAdd('modal')
    }
    else{ console.log("có lỗi")}     
  } 
  const handleUpdateSubmit=()=>{
    setErrors(validate(editingStudent))
    if(Object.keys(validate(editingStudent)).length === 0){
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
      setPreviewImage()
      setIsEditingUpdate('modal')
    }else{console.log("Có Lỗi")}
  }
  const handleAvatar = (e)=>{
    setErrors({})
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setEditingStudent(prev=>{
      const file = e.target.files[0]
      return {...prev,avatar:file}
    })
  }
  const validate = (values)=>{
    const err = {};
    if(!values.firstname){
      err.firstname = "Vui lòng nhập vào firstname"
    }
    if(!values.lastname){
      err.lastname = "Vui lòng nhập vào lastname"
    }
    if(!values.age){
      err.age = "Vui lòng nhập vào số tuổi "
    }
    if(!values.class){
      err.class = "Vui lòng nhập vào tên lớp"
    }
    if(!values.avatar){
      err.avatar = "vui lòng thêm ảnh"
    }
    return err
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
        {dataStudent.length === 0? <tr><td style={{padding: 10 ,fontWeight:"bold",color: "red"}}>Không có dữ liệu</td></tr> : dataStudent.map((student,index)=>{
        return <Student key={index} dataSource={student} onUpdate={updateStudent} onDelete={deleteStudent} ></Student>
      })}
        </tbody>
      </table>
      {/* Update Student*/}
      <FormFeature
      title="Update Học Sinh"
      visible={isEditingUpdate}
      onCancel={()=>{
        setEditingStudent({firstname:"",lastname:"",age:"",class:"",avatar:""})
        setIsEditingUpdate('modal')
        setErrors({})
        setPreviewImage()
      }}
      onOk={()=>{
        handleUpdateSubmit()
        }
      }
      Errors ={errors}
      onChangeInput={handleChange}
      firstname={editingStudent?.firstname}
      lastname={editingStudent?.lastname}  
      age={editingStudent?.age}   
      class={editingStudent?.class}  
      avatar={previewImage?previewImage:"http://localhost:3001/avatar/"+editingStudent?.avatar}
      onChangeAvt={(e)=>{
        handleAvatar(e)
      }}
      >
      </FormFeature>
      {/* Add Student */}
      <FormFeature
      title="Add Học Sinh"
      visible={isEditingAdd}
      onCancel={()=>{
        setEditingStudent({firstname:"",lastname:"",age:"",class:"",avatar:""})
        setIsEditingAdd('modal')
        setErrors({})
        setPreviewImage()
      }}
      onOk={()=>{
        handleAddSubmit()
      }
      }
      onChangeInput={handleChange}
      firstname={editingStudent?.firstname}
      lastname={editingStudent?.lastname}
      age={editingStudent?.age}
      class={editingStudent?.class}
      avatar={previewImage}
      Errors={errors}
      onChangeAvt={(e)=>{
        handleAvatar(e)
      }}
      >
      </FormFeature>
    </div>
  )
}

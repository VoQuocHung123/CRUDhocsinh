import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import FormFeature from '../../components/formFeature/FormFeature';
import Student from '../../components/student/Student';
import studentApi from '../../api/studentApi';
import Button from '../../components/button/Button';
import Pagination from '../../components/pagination/Pagination';
import queryString from 'query-string'
export default function StudentsManage() {
  const [activeForm, setActiveForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState({ firstname: "", lastname: "", age: "", classname: "", avatar: "" })
  const [dataStudent, setDataStudent] = useState([])
  const [previewImage, setPreviewImage] = useState()
  const [errors, setErrors] = useState({})
  const [numOfPage, setNumOfPage] = useState([])
  const [pagination,setPagination] = useState({
    page:1,
    limit:3
  })

  useEffect(() => {
    callStudent()
  }, [pagination])

  const handlePageChange = async (newPage)=>{
    setPagination({...pagination,page:newPage})
  }
  const updateStudent = (record) => {
    setActiveForm(true)
    setEditingStudent({ ...record })
  }
  const addStudent = () => {
    setActiveForm(true)
  }
  const deleteStudent = (record) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xoá học sinh có id ${record._id}`,
      okText: `Yes`,
      okType: `danger`,
      onOk: () => {
        const callDeleteStudent = async (id) => {
          await studentApi.deleteStudent(id)
          setDataStudent(prev => {
            return prev.filter((student) => student._id !== id)
          })
        }
        callDeleteStudent(record._id)
      }
    })
  }
  const callStudent = async () => {
    try {
      const query = queryString.stringify(pagination)
      const response = await studentApi.getbyPage(query)
      setDataStudent(response.data.student)
      const lengthPages = Math.ceil(response.data.countStudent / pagination.limit)
      const arrNumPage = []
      for (let i = 1; i <= lengthPages; i++) {
        arrNumPage.push(i)
      }
      setNumOfPage(arrNumPage)
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdateSubmit = async () => {
    setErrors(validate(editingStudent))
    if (Object.keys(validate(editingStudent)).length === 0) {
      try {
        const formData = new FormData()
        for (let name in editingStudent) {
          formData.append(name, editingStudent[name])
        }
        for (const value of formData.values()) {
          console.log(value);
        }
        const response = await studentApi.putStudent(editingStudent._id, formData)
        console.log(response.data)
        response.data = dataStudent.map(student => {
          if (student._id === response.data._id) {
            return response.data
          } else {
            return student
          }
        })
        setDataStudent(response.data)
        setPreviewImage(null)
        setEditingStudent({ firstname: "", lastname: "", age: "", classname: "", avatar: "" })
        setActiveForm(false)
      } catch (err) {
        console.log(err)
      }
    } else { console.log("Có Lỗi") }
  }
  const handleAddSubmit = async () => {
    setErrors(validate(editingStudent))
    if (Object.keys(validate(editingStudent)).length === 0) {
      try {
        const formData = new FormData()
        for (let name in editingStudent) {
          formData.append(name, editingStudent[name])
        }
        const response = await studentApi.postStudent(formData)
        // setDataStudent([response.data,...dataStudent])
        setEditingStudent({ firstname: "", lastname: "", age: "", classname: "", avatar: "" })
        callStudent()
        setPreviewImage()
        setActiveForm(false)
      } catch (err) {
        console.log(err)
      }
    }
    else { console.log("có lỗi") }
  }
  const validate = (values) => {
    const err = {};
    if (!values.firstname) {
      err.firstname = "Vui lòng nhập vào firstname"
    }
    if (!values.lastname) {
      err.lastname = "Vui lòng nhập vào lastname"
    }
    if (!values.age) {
      err.age = "Vui lòng nhập vào số tuổi "
    }
    if (!values.classname) {
      err.classname = "Vui lòng nhập vào tên lớp"
    }
    if (!values.avatar) {
      err.avatar = "Vui lòng thêm ảnh"
    }
    return err
  }
  return (
    <div className='content'>
      <Button title="Thêm Học Sinh" className="btn-add" onClick={addStudent} ></Button>
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
          {dataStudent.length === 0 ? <tr><td style={{ padding: 10, fontWeight: "bold", color: "red" }}>Không có dữ liệu</td></tr> : dataStudent.map((student, index) => {
            return <Student key={index} dataSource={student} onUpdate={updateStudent} onDelete={deleteStudent} ></Student>
          })}
        </tbody>
      </table>
      <div className="pagination">
        <Pagination 
          numOfPage={numOfPage}
          pagination={pagination}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
      {activeForm && 
      <FormFeature
        title={editingStudent && editingStudent._id ? "Update Học Sinh" : "Add Học Sinh"}
        visible={activeForm}
        onCancel={() => {
          setEditingStudent({ firstname: "", lastname: "", age: "", classname: "", avatar: "" })
          setActiveForm(false)
          setErrors({})
          setPreviewImage()
        }}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        setErrors={setErrors}
        errors={errors}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        handleSubmit={editingStudent && editingStudent._id ? handleUpdateSubmit : handleAddSubmit}
      >
      </FormFeature>
      }
    </div>
  )
}


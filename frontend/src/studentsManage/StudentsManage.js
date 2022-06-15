import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import FormFeature from '../components/FormFeature';
import Student from '../components/Student';
import studentApi from '../api/studentApi';
import Button from '../components/Button';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
export default function StudentsManage() {
  const [activeForm, setActiveForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState({ firstname: "", lastname: "", age: "", classname: "", avatar: "" })
  const [dataStudent, setDataStudent] = useState([])
  const [previewImage, setPreviewImage] = useState()
  const [errors, setErrors] = useState({})
  const [numOfPage, setNumOfPage] = useState([])
  const params = useParams();
  let page = +params.page
  useEffect(() => {
    console.log(params)
    callStudent()
  }, [])
  useEffect(() => {
    getStudentByPage()
  }, [page])

  const getStudentByPage = async () => {
    try {
      if (params.page === undefined) params.page = 1
      const response = await studentApi.getbyPage(params.page)
      setDataStudent(response.data)
    } catch (err) {
      console.log(err)
    }
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
          getStudentByPage()
          callStudent()
        }
        callDeleteStudent(record._id)
      }
    })
  }
  const callStudent = async () => {
    try {
      const response = await studentApi.getAll()
      const lengthPages = Math.ceil(response.data.length / 2)
      const arrNumPage = []
      for (let i = 1; i <= lengthPages; i++) {
        arrNumPage.push(i)
      }
      setNumOfPage(arrNumPage)
      // setDataStudent(response.data)
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
        const response = await studentApi.putStudent(editingStudent._id, formData)
        response.data = dataStudent.map(student => {
          if (student._id === response.data._id) {
            return response.data
          } else {
            return student
          }
        })
        setDataStudent(response.data)
        setPreviewImage()
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
      err.avatar = "vui lòng thêm ảnh"
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
        <Link to={`/page/${page === 1 ? page = 1 : page - 1}`} className='child-pagi' style={{ border: 'none' }}>&laquo;</Link>
        {numOfPage.map((item, index) => {
          return <Pagination params={params.page} value={item} key={index} />
        })}
        <Link to={`/page/${page === numOfPage.length ? page = numOfPage.length : page + 1}`} className='child-pagi' style={{ border: 'none' }}>&raquo;</Link>
      </div>
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
        Errors={errors}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        handleSubmit={editingStudent && editingStudent._id ? handleUpdateSubmit : handleAddSubmit}
      >
      </FormFeature>
    </div>
  )
}


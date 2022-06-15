import React from 'react'
import { Link } from 'react-router-dom'

export default function Pagination(props) {
  return (
    <>
        <Link to={`/page/${props.value}`}  className={+props.params === props.value ? 'child-pagi active':'child-pagi'}>{props.value}</Link>
    </>
  )
}

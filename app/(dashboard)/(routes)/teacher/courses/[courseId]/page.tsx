import React from 'react'

const CourseIdPage = ({params}:
    {params:
    {courseId: string,
    title: string
    }
}) => {
  return (
    <div>{params.title} Course Id:{params.courseId} </div>
  )
}

export default CourseIdPage
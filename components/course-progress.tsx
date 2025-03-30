import React from 'react'
import { Progress } from './ui/progress';

interface CourseProgressProps {
    value: number;
  variant: 'default' | 'success' ;
  size?: 'default' | 'sm' ;
};

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700"
}

const sizeByVariant = {
    default: "text-md",
    success: "text-xs"
}

const CourseProgress = ({
    value, size, variant
}:CourseProgressProps) => {
  return (
    <div>

    <Progress className='h-2' value={value}/>
    <p className='font-medium text-center mt-2 text-sky-700'>
        {Math.round(value)}% Complete
    </p>

    </div>
  )
}

export default CourseProgress
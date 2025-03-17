"use client"

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
interface CourseEnrollButtonProps{
    price: number;
    courseId: string;
}

const CourseEnrollButton = ({price, courseId}:CourseEnrollButtonProps) => {
  return (
    <div className="flex w-full md:w-auto items-center justify-center mb-2">
        <Button className="text-lg">
            Enroll for {formatPrice(price)}
        </Button>
    </div>
  )
}

export default CourseEnrollButton
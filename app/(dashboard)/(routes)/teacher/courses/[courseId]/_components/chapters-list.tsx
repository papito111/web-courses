'use client'

import React from 'react'
import {Chapter} from '@prisma/client'
import { UpdateData } from 'firebase/firestore';


interface ChaptersList {
  items: Chapter[];
  onReorder: (updateData:{id:string;position: number}[]) => void;
  
}


export const ChaptersList = () => {
  return (
    <div>ChaptersList</div> 
  )
}

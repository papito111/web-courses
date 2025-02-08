'use client'

import React from 'react'
import {Chapter} from '@prisma/client'
import { UpdateData } from 'firebase/firestore';


interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData:{id:string;position: number}[]) => void;
  onEdit: (id:string) => void;
};


export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}:ChaptersListProps) => {
  return (
    <div>ChaptersList</div> 
  )
}

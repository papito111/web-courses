'use client'

import React, { useEffect, useState } from 'react'
import {Chapter} from '@prisma/client'
import {DragDropContext, Droppable, Draggable, DropResult} from "@hello-pangea/dnd"
import { Badge } from '@/components/ui/badge';
import { Grip } from 'lucide-react';
interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData:{id:string;position: number}[]) => void;
  onEdit: (id:string) => void;
};
import { cn } from '@/lib/utils';

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}:ChaptersListProps) => {

  const [isMounted, setIsMounted] = useState(false)
  const[chapters,setChapters] = useState(items)
  
  useEffect(()=>{
    setIsMounted(true);
  }, []);

  useEffect(()=>{
    setChapters(chapters)
  }, [items]);

  if (!isMounted) {
    return null;
  }


  return (
    <DragDropContext onDragEnd={()=>{}}>
    <Droppable droppableId='chapters'>
      {(provided)=>(
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {chapters.map((chapter,index) => (
            <Draggable
              key={chapter.id}
              draggableId={chapter.id}
              index={index}>
                {(provided)=>
                (
                  <div className={cn("flex items center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                    chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                  )}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  >
                    <div className={cn("px-2 py-3 border-r border-r-slate-200 hover:bg-sky-200")}
                    {...provided.dragHandleProps}>
                      <Grip className='h-5 w-5' />
                    </div>
                    {chapter.title}
                    <div className='ml-auto pr-2 flex items-center gap-x-2'>
                      {chapter.isFree && (
                        <Badge>
                          Free
                        </Badge>
                      )}
                    </div>

                  </div>
                )}
              </Draggable>
          ))}
      {provided.placeholder}
        </div>
  )}
  </Droppable>
</DragDropContext>
          
  )
}

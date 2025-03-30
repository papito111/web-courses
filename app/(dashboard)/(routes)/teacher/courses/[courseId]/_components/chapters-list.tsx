'use client'

import React, { useEffect, useState } from 'react'
import { Chapter } from '@prisma/client'
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Badge } from '@/components/ui/badge';
import { Grip, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList: React.FC<ChaptersListProps> = ({
  items,
  onReorder,
  onEdit,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [chapters, setChapters] = useState(items)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items)
  }, [items]);

  if (!isMounted) {
    return null;
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedChapters = Array.from(chapters);
    const [movedChapter] = updatedChapters.splice(result.source.index, 1);
    updatedChapters.splice(result.destination.index, 0, movedChapter);

    setChapters(updatedChapters);

    const updateData = updatedChapters.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));

    onReorder(updateData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* <Droppable droppableId='chapters'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}>
                {(provided) => (
                  <div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
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
                      )} <Badge className={cn('bg-slate-400', chapter.isPublished && ("bg-emerald-400"))}>
                        {chapter.isPublished ? "Published": "Draft"}

                      </Badge>
                      <Pencil className='h-4 w-4 hover:opacity-50'
                      onClick={()=>onEdit(chapter.id)}/>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable> */}
    </DragDropContext>
  )
}
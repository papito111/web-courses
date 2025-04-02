'use client';

import React, { useEffect, useState } from 'react';
import { Chapter } from '@prisma/client';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';
import { Grip, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList: React.FC<ChaptersListProps> = ({ items, onReorder, onEdit }) => {
  const [chapters, setChapters] = useState<Chapter[]>(items);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = chapters.findIndex((chapter) => chapter.id === active.id);
    const newIndex = chapters.findIndex((chapter) => chapter.id === over.id);

    const updatedChapters = arrayMove(chapters, oldIndex, newIndex);
    setChapters(updatedChapters);

    const updateData = updatedChapters.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));

    onReorder(updateData);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={chapters.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div>
          {chapters.map((chapter) => (
            <SortableItem key={chapter.id} chapter={chapter} onEdit={onEdit} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

interface SortableItemProps {
  chapter: Chapter;
  onEdit: (id: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ chapter, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm',
        chapter.isPublished && 'bg-sky-100 border-sky-200 text-sky-700'
      )}
    >
      <div
        className="px-2 py-3 border-r border-r-slate-200 hover:bg-sky-200 cursor-pointer"
        {...listeners}
        {...attributes}
      >
        <Grip className="h-5 w-5" />
      </div>
      {chapter.title}
      <div className="ml-auto pr-2 flex items-center gap-x-2">
        {chapter.isFree && <Badge>Free</Badge>}
        <Badge className={cn('bg-slate-400', chapter.isPublished && 'bg-emerald-400')}>
          {chapter.isPublished ? 'Published' : 'Draft'}
        </Badge>
        <Pencil className="h-4 w-4 hover:opacity-50 cursor-pointer" onClick={() => onEdit(chapter.id)} />
      </div>
    </div>
  );
};

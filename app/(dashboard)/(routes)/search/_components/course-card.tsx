import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { IconBadge } from '@/components/icon-badge';
import { BookOpen } from 'lucide-react';

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
}

const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category,
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className='group hover:shadow-lg transition  overflow-hidden border rounded-lg p-3 shadow-md h-full bg-slate-50 backdrop-blur-md'>
                <div className='relative w-full aspect-video rounded-md overflow-hidden'>
                    <Image
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={title}
                        src={imageUrl}
                    />
                </div>
                <div className='flex flex-col pt-2 text-center'>
                    <div className='font-medium text-2xl group-hover:text-sky-900 transition line-clamp-2 md:text-base'>
                        {title}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                        {category}
                    </p>
                    <div className='text-sm my-3'>
                        <div className='flex justify-center items-center text-slate-600'>
                            <div className='pr-2'>
                                <IconBadge size="sm" icon={BookOpen} />
                            </div>
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard;
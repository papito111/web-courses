"use client"
import React from 'react'
import * as z from "zod";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {Form,FormControl,FormDescription,FormField,FormLabel,FormMessage} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


const CreatePage = () => {
  return (
    <div>Create page!!!</div>
  )
}

export default CreatePage
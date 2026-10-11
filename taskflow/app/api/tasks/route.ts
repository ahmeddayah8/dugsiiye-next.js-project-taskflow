import {NextResponse} from 'next/server';
import {auth} from '@/auth';
import {connectDB} from '@/lib/mongodb';
import Task from '@/models/Task';
import {z} from 'zod';
import {publishTaskChange} from '@/lib/pusher';
const schema=z.object({title:z.string().trim().min(1).max(150),description:z.string().max(2000).optional(),status:z.enum(['pending','in-progress','completed']).optional()});
export async function GET(){const session=await auth();if(!session?.user?.id)return NextResponse.json({error:'Unauthorized'},{status:401});try{await connectDB();const tasks=await Task.find({userId:session.user.id}).sort({createdAt:-1}).lean();return NextResponse.json(tasks)}catch{return NextResponse.json({error:'Unable to load tasks'},{status:500})}}
export async function POST(req:Request){const session=await auth();if(!session?.user?.id)return NextResponse.json({error:'Unauthorized'},{status:401});try{const data=schema.safeParse(await req.json());if(!data.success)return NextResponse.json({error:'Invalid task'},{status:400});await connectDB();const task=await Task.create({...data.data,userId:session.user.id});await publishTaskChange(session.user.id);return NextResponse.json(task,{status:201})}catch{return NextResponse.json({error:'Unable to create task'},{status:500})}}

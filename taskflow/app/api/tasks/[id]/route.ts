import {NextResponse} from 'next/server';
import {auth} from '@/auth';
import {connectDB} from '@/lib/mongodb';
import {publishTaskChange} from '@/lib/pusher';
import Task from '@/models/Task';
import mongoose from 'mongoose';
import {z} from 'zod';
const schema=z.object({title:z.string().trim().min(1).max(150).optional(),description:z.string().max(2000).optional(),status:z.enum(['pending','in-progress','completed']).optional()}).strict();
type Ctx={params:Promise<{id:string}>};
async function owner(ctx:Ctx){const session=await auth();const {id}=await ctx.params;return {userId:session?.user?.id,id}}
export async function GET(_:Request,ctx:Ctx){const {userId,id}=await owner(ctx);if(!userId)return NextResponse.json({error:'Unauthorized'},{status:401});if(!mongoose.isValidObjectId(id))return NextResponse.json({error:'Invalid ID'},{status:400});try{await connectDB();const task=await Task.findOne({_id:id,userId});return task?NextResponse.json(task):NextResponse.json({error:'Not found'},{status:404})}catch{return NextResponse.json({error:'Server error'},{status:500})}}
export async function PUT(req:Request,ctx:Ctx){const {userId,id}=await owner(ctx);if(!userId)return NextResponse.json({error:'Unauthorized'},{status:401});if(!mongoose.isValidObjectId(id))return NextResponse.json({error:'Invalid ID'},{status:400});try{const data=schema.safeParse(await req.json());if(!data.success||!Object.keys(data.data).length)return NextResponse.json({error:'Invalid task'},{status:400});await connectDB();const task=await Task.findOneAndUpdate({_id:id,userId},{$set:data.data},{new:true,runValidators:true});if(!task)return NextResponse.json({error:'Not found'},{status:404});await publishTaskChange(userId);return NextResponse.json(task)}catch{return NextResponse.json({error:'Server error'},{status:500})}}
export async function DELETE(_:Request,ctx:Ctx){const {userId,id}=await owner(ctx);if(!userId)return NextResponse.json({error:'Unauthorized'},{status:401});if(!mongoose.isValidObjectId(id))return NextResponse.json({error:'Invalid ID'},{status:400});try{await connectDB();const task=await Task.findOneAndDelete({_id:id,userId});if(!task)return NextResponse.json({error:'Not found'},{status:404});await publishTaskChange(userId);return NextResponse.json({message:'Deleted'})}catch{return NextResponse.json({error:'Server error'},{status:500})}}

import {auth} from '@/auth';
import {pusher} from '@/lib/pusher';
import {NextResponse} from 'next/server';
export async function POST(req:Request){const session=await auth();if(!session?.user?.id)return NextResponse.json({error:'Unauthorized'},{status:401});if(!pusher)return NextResponse.json({error:'Pusher not configured'},{status:503});const form=await req.formData();const socketId=String(form.get('socket_id')||'');const channel=String(form.get('channel_name')||'');if(channel!==`private-tasks-${session.user.id}`||!/^\d+\.\d+$/.test(socketId))return NextResponse.json({error:'Forbidden'},{status:403});return NextResponse.json(pusher.authorizeChannel(socketId,channel))}

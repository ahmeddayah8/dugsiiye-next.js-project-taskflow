import Pusher from 'pusher';
export const pusher = process.env.PUSHER_APP_ID && process.env.NEXT_PUBLIC_PUSHER_KEY && process.env.PUSHER_SECRET && process.env.NEXT_PUBLIC_PUSHER_CLUSTER ? new Pusher({appId:process.env.PUSHER_APP_ID,key:process.env.NEXT_PUBLIC_PUSHER_KEY,secret:process.env.PUSHER_SECRET,cluster:process.env.NEXT_PUBLIC_PUSHER_CLUSTER,useTLS:true}):null;
export async function publishTaskChange(userId:string){if(pusher)try{await pusher.trigger(`private-tasks-${userId}`,'changed',{at:Date.now()})}catch(e){console.error('Pusher notification failed',e)}}

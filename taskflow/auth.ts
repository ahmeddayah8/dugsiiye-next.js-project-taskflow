import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import {connectDB} from '@/lib/mongodb';
import User from '@/models/User';
const providers: import('next-auth/providers').Provider[] = [Credentials({credentials:{email:{},password:{}},async authorize(credentials){
 const parsed=z.object({email:z.string().email(),password:z.string().min(1)}).safeParse(credentials);
 if(!parsed.success)return null;
 await connectDB();const user=await User.findOne({email:parsed.data.email.toLowerCase()});
 if(!user?.password || !(await bcrypt.compare(parsed.data.password,user.password)))return null;
 return {id:String(user._id),name:user.name,email:user.email};
}})];
if(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) providers.push(Google);
if(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) providers.push(GitHub);
export const {handlers,auth,signIn,signOut}=NextAuth({providers,session:{strategy:'jwt'},pages:{signIn:'/login'},callbacks:{
 async signIn({user,account}){if(account?.provider==='credentials')return true;if(!user.email)return false;await connectDB();let dbUser=await User.findOne({email:user.email.toLowerCase()});if(!dbUser)dbUser=await User.create({name:user.name||'User',email:user.email,image:user.image});user.id=String(dbUser._id);return true},
 async jwt({token,user}){if(user)token.userId=user.id;return token},
 async session({session,token}){if(session.user && token.userId)session.user.id=String(token.userId);return session}
}});

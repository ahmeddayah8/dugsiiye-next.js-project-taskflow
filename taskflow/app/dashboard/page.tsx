import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import DashboardClient from '@/components/DashboardClient';
export default async function Dashboard(){const session=await auth();if(!session?.user?.id)redirect('/login');return <DashboardClient userId={session.user.id} name={session.user.name||'User'}/>}

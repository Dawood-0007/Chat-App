import React from 'react'
import App from '@/component/UserGen'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

const page = async ({ params }) => {
    const session = await getServerSession();
    if (!session) {
        redirect('/auth/signin');
    }

    const { name } = await params;
    const userName = session.user.name;
    const nameURL = userName.replace(/\s+/g, '');

const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/stream/${nameURL}`);
const data = await res.json();

console.log("User Token:", data.token);
  return (
    <div>
      <App name={name} token={data.token} session={session} />
    </div>
  )
}

export default page
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import Navbar from '@/component/Navbar';
import '@/assets/chat.css';
import Link from 'next/link';
import Image from 'next/image';

const page = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth/signin');
  }

  const forums = ["React", "Nextjs", "JavaScript", "CSS", "HTML"];

  return (
    <>
    <Navbar />
    <div className='chat-page'>
      <h1>Open Chat Forums</h1>
      <div className='chat-container'>
        {forums.map((forum) => (
          <div className='chat-box' key={forum}>
            <h3>{forum} Forum</h3>
            <Image src={`/${forum}.svg`} alt={`${forum} Forum`} width={100} height={50} className='forum-image'/>
            <button className='join-button'><Link href={`/forum/${forum}`}>Join</Link></button>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}

export default page
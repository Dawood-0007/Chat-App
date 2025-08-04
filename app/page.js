import '../assets/Home.css';
import React from 'react';
import Navbar from "@/component/Navbar";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="home-container"> 
      <div>
    <h1>Welcome to the Open Chat</h1>
    <p>Connect with people from around the world</p>
    <Link href="/chat">
      <button className="join-button">Join Now</button>
    </Link>
</div>
      <div className="image-container">
        <Image src="/chat.png" alt="Chat Image" width={500} height={300} />
      </div>
    </div>
    
    </>
  );
}

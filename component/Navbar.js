import React from 'react'
import Component from "@/component/login-btn";
import '../assets/Navbar.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar">
        <h1>Open Chat</h1>
        <nav className="nav-ul">
            <ul className="nav-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/chat">Chat</Link></li>
                <li><Component /></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
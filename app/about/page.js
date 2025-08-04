import React from 'react'
import Navbar from '@/component/Navbar';

const page = () => {
  return (
    <>
    <Navbar />
    <div className="about-page">
        <h1>About Us</h1>
        <p>Welcome to our chat application! This platform allows users to join various forums and engage in discussions on topics they are passionate about.</p>
        <p>Our mission is to create a friendly and inclusive environment where everyone can share their thoughts, ask questions, and learn from each other.</p>
        <p>Thank you for being a part of our community!</p>
        <p>For any inquiries, please contact us at <a href="mailto:dawoodqasim0007@gmail.com">dawoodqasim0007@gmail.com</a></p>
    </div>
    </>
  )
}

export default page
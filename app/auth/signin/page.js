'use client';
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import '@/assets/SignIn.css'
import Link from "next/link";

const page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/chat');
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (name.replace(/\s/g, "") == "" || email.replace(/\s/g, "") == "" || password.replace(/\s/g, "") == "") {
      setMsg("All fields are required and cannot contain empty spaces");
      return;
    } else {
      setName(name.trim());
      setEmail(email.trim());
    }

    const res = await signIn("credentials", {
      redirect: false,
      name,
      email,
      password,
      callbackUrl: "/chat", 
    });

    if (res.error) {
      console.error("Error signing in:", res.error);
    } else {
      router.push("/chat");
    }
  };

  return (
    <>
    <div className="signin-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
    <hr className="divider" />
    OR
    <hr className="divider" />
    <div className="social-login">
      <button onClick={() => signIn("github")}>Sign Up with GitHub</button>
    </div>
    <p>Already have an account? <Link href="/auth/login">Sign In</Link></p>
    <p className="error-message">{msg}</p>
    </div>
  </>
  );
}

export default page;

'use client';
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import '@/assets/SignIn.css'
import Link from "next/link";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/chat');
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmail(email.trim());

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/chat", 
    });

    if (res.error) {
      setMsg("Invalid Email or Password");
    } else {
      router.push("/chat");
    }
  };

  return (
    <>
    <div className="signin-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Sign In</h2>
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
      <button type="submit">Sign in</button>
    </form>
    <hr className="divider" />
    OR
    <hr className="divider" />
    <div className="social-login">
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
    <p>Don't have an account? <Link href="/auth/signin" className="page-redirection">create one</Link></p>
    <p className="error-message">{msg}</p>
    </div>
  </>
  );
}

export default page;

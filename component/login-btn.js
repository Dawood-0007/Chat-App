'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import "@/assets/SignIn.css"

export default function Component() {
  const { data: session } = useSession()
    console.log(session);
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className="btn">Log Out</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()} className="btn">Log In</button>
    </>
  )
}
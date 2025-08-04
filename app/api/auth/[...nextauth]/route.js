import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import mysql2 from "mysql2";
import bcrypt from "bcrypt";

const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "your username" },
        email: { label: "Email", type: "text", placeholder: "your_email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const [existingUserRows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [credentials.email]);
        const existingUser = existingUserRows[0];

        if (existingUser) {
          const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password);
          if (isPasswordValid) {
            console.log(`User found: ${existingUser.email}`);
            return existingUser;
          }
        } else {
          try {
            
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const [createUserResult] = await db.promise().query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [credentials.name, credentials.email, hashedPassword]);
            
            if (createUserResult.affectedRows === 1) {
              const [newUserRows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [credentials.email]);
              return newUserRows[0];
            }
          } catch (error) {
            console.error("Error creating user:", error);
            return null;
          }
        }
        
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      setEmail('');
      setPassword('');

      router.push('/');
    } catch (error) {
      console.error(error);
      setError('invalid email or password');
    }
  }

  return (
    <div className="min-h-full h-screen flex items-center justify-center p-12 px-4 sm:px-6 lg:px-8">
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
      <h1 className=' text-3xl'>Login</h1>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

        </div>
        <div>
            {error && <p className="text-red-500 text-[1.2rem]">{error}</p>}
          </div>

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10"
        >
          Login
        </button>

        <div>
          If you dont have an account, please <a href="/sign-up" className="text-indigo-600 hover:text-indigo-900">sign up</a>.
        </div>
      </form>
    </div>
  );
}
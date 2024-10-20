"use client";

import React, { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      const returnTo = searchParams.get('returnTo') || '/';
      router.push(returnTo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-12">
      <div className="flex items-center bg-neutral-900 justify-around h-screen md:h-[80vh] py-8 md:border-[0.5px] border-solid-gray-100 md:rounded-xl text-white">
        <div className="bg-blue-400 max-w-[400px] dark:bg-blue-400 rounded-xl hidden md:block">
          <Image src={"https://illustrations.popsy.co/amber/home-from-work.svg"} alt="signin illustration" width={400} height={600}></Image>
        </div>

        <div className="rounded-lg p-8 max-w-md w-full">
          <div className="text-center md:text-right">
            <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl mb-6">
              Welcome back to Dashboard
            </h1>
            <p className="mb-4">Sign in to continue </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input
                placeholder="swapnil@roc8.com"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
              <input
                placeholder="12345678"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 rounded-full hover:bg-blue-500 text-white font-semibold py-2 transition duration-200"
            >
               {loading ? (<><span className="animate-ping ">🚀🚀🚀🚀🚀🚀</span></>):"Login"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don’t have an account? <Link href="/register" className="text-blue-400 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const SuspendedLoginPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoginPage />
  </Suspense>
);

export default SuspendedLoginPage;

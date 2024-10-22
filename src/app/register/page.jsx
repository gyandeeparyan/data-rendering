"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";


const RegisterPage = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("kindness"); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const generateRandomEmail = () => {
    const positiveWords = ["kindness", "hope", "happiness", "joy", "love", "peace", "dream", "smile"];
    const randomWord = positiveWords[Math.floor(Math.random() * positiveWords.length)];
    const randomNumber = Math.floor(Math.random() * 1000); 
    return `${randomWord}${randomNumber}@roc8.com`; 
  };
  // Effect to set the email when component loads
  useEffect(() => {
    const randomEmail = generateRandomEmail();
    setEmail(randomEmail); 
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(email, password);
      const returnTo = searchParams.get("returnTo") || "/";
      router.push(returnTo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const returnTo = searchParams.get("returnTo");

  return (
    <div className="md:p-12">
      <div className="flex items-center bg-neutral-900 justify-around h-screen md:h-[80vh] py-8 md:border-[0.5px] border-solid-gray-100 md:rounded-3xl text-white">
        <div
          style={{
            backgroundImage:
              "linear-gradient(30deg, #060031FF 0%, #71C4FFFF 100%)",
          }}
          className="rounded-[30px] hidden md:block"
        >
          <Image
            src={"https://illustrations.popsy.co/amber/working-vacation.svg"}
            alt="signin illustration"
            width={400}
            height={600}
          />
        </div>

        <div className="rounded-lg p-8 max-w-md w-full">
          <div className="text-center md:text-right">
            <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl mb-6">
              🚀 Dashboard
            </h1>
            <p className="mb-4">Signup to continue</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="email@roc8.com"
                id="email"
                value={email} // Controlled input for email
                onChange={(e) => setEmail(e.target.value)} // Update email on change
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password} // Default password is always 'kindness'
                onChange={(e) => setPassword(e.target.value)} // Allow user to change if needed
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <p>default password is <span className="text-green-500">"kindness"</span></p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-full transition duration-200"
            >
              {loading ? (
                <>
                  <span className="animate-ping ">🚀🚀🚀🚀🚀🚀</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
              className="text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const SuspendedRegisterPage = () => (
  <Suspense
    fallback={
      <div className="flex flex-row min-h-screen px-4 justify-center items-center">
        <p>🚀 Sky is not the limit, your mind is !</p>
      </div>
    }
  >
    <RegisterPage />
  </Suspense>
);

export default SuspendedRegisterPage;

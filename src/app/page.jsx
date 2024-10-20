"use client"
import Dashboard from "@/components/Dashboard";
import dynamic from 'next/dynamic';

const MyDashboard = dynamic(() => import('@/components/Dashboard'), {
  ssr: false 
});
export default function Home() {
  return (
    <div >
      <main >
      <MyDashboard/>
     
      </main>
     
    </div>
  );
}

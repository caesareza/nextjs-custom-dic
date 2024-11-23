// 'use client'
import di from "@/di/container";

export default function Home() {

    const data = di.resolve('getMessage').execute()

    console.log('data', data)

  return (
    <div>
      <h1>Dependency Injection Container</h1>
    </div>
  );
}

'use client'

import di from "@/di/container";

export default function Home() {
    const data = di.resolve('getMessage').execute()
    const hai = di.resolve('getDetailMessage').execute(5)

    console.log('data', data)
    console.log('hai', hai)

  return (
    <div>
      <h1>Dependency Injection Container</h1>
    </div>
  );
}

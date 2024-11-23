'use client'

import di from "@/di/main";

export default function Home() {
    const data = di.resolve('getMessage').execute()
    const hai = di.resolve('getDetailMessage').execute(12)

    console.log('data', data)
    console.log('hai', hai)

  return (
    <div>
      <h1>Dependency Injection Container Test</h1>
    </div>
  );
}

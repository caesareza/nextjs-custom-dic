'use client';

import di from '@/di/main';

export default function Home() {
    const data = di.resolve('getMessage').execute();
    const hai = di.resolve('getDetailMessage').execute(12);
    const env = di.resolve('envAdapter').APP_BASE_URL;

    console.log('data', data);
    console.log('hai', hai);
    console.log('env', env);

    return (
        <main>
            <h1>Dependency Injection Container</h1>
        </main>
    );
}

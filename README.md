# NextJS Website with Dependency Injection Container (DIC)
Simple dependency injection (DI) container to manage and resolve dependencies.

## Create the Services
Define the services that will be used in your application. For example, getMessage and getDetailMessage.

```javascript
export const MessageService = {
    getMessage: () => ({
        execute: () => 'default message',
    }),

    getDetailMessage: () => ({
        execute: (id: number) => `Message for ID: ${id}`,
    }),
};
```

## Create the DI Container
(DI) container to manage and resolve dependencies.
```javascript
/*
    DIContainer<Services extends Record<string, any>>
    we use any because we need to receive any type of the input such as array, object, string, etc.
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
export class DIContainer<Services extends Record<string, any>> {
    private dependencies: Map<keyof Services, Services[keyof Services]>;

    constructor() {
        this.dependencies = new Map();
    }

    register<K extends keyof Services>(name: K, dependency: Services[K]) {
        this.dependencies.set(name, dependency);
    }

    resolve<K extends keyof Services>(name: K): Services[K] {
        const dependency = this.dependencies.get(name);
        if (!dependency) {
            throw new Error(`Dependency ${String(name)} not found`);
        }
        return dependency;
    }
}
```


## Register Services in the DI Container
Register your services in the DI container during the application initialization.
```javascript
import { DIContainer } from '@/di/container';
import { Services } from '@/services';
import { envAdapter } from '@/services/envAdapter';

interface EnvAdapter {
    APP_BASE_URL: string;
    API_KEY: string;
    NODE_ENV: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type ServiceMap = {
    envAdapter: EnvAdapter;
} & Record<string, { execute: (...args: any[]) => any }>;

const di = new DIContainer<ServiceMap>();

Object.entries(Services).forEach(([key, service]) => {
    di.register(key, service());
});

di.register('envAdapter', envAdapter);

export default di;
```

## Usage in the Page
```javascript
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
```

## Goal of using DIC
The primary goal of using a Dependency Injection Container (DIC) is to improve modularity, scalability, testability, and maintainability of an application by centralizing how dependencies (e.g., services, configurations) are managed, instantiated, and injected into various parts of the application.

### Key Goals of Using a DIC
1. Centralized Dependency Management\
    What: All dependencies are registered and resolved from a single container.\
    Why: Ensures consistent creation and configuration of dependencies.\
    Example: Instead of manually instantiating ApiService everywhere, the DIC manages its lifecycle:

2. Inversion of Control (IoC)\
   What: The DIC controls how objects are created and their dependencies are injected.\
   Why: Promotes loose coupling between components by letting the container manage object creation.\
   Example: A UserService doesn't instantiate its own dependencies; the DIC injects them:\
    ```javascript
    class UserService {
        constructor(private apiService: ApiService) {}
    }
    ```
   
3. Modularity and Scalability\
   What: Breaks the application into loosely coupled modules that interact through well-defined interfaces.\
   Why: Adding or replacing modules becomes easier without affecting other parts of the system.\
   Example: Dynamically register environment-specific services like ProdApiService or DevApiService.


### Benefits of Using a DIC
1. Improved Code Organization: Dependencies are managed in a central location, reducing clutter.
2. Easier Refactoring: Dependencies can be swapped or modified without breaking the application. 
3. Enhanced Testability: Mocking and isolating components becomes straightforward. 
4. Scalable Architecture: Supports adding new modules or features with minimal changes. 
5. Consistent Behavior: Shared dependencies behave the same across the application.

### When to Use a DIC
1. Large Applications: With many interconnected modules and dependencies. 
2. Multi-Environment Setups: To manage environment-specific configurations dynamically. 
3. Highly Testable Systems: When unit tests, integration tests, or mocks are critical. 
4. Dynamic Architectures: Applications with feature toggles, plugins, or swappable modules. 
5. Dependency-Heavy Applications: Systems with many shared services (e.g., logging, API clients, database connections).

## Summary
The goal of a DIC is to simplify dependency management by:
1. Centralizing service registration and resolution. 
2. Promoting loose coupling and modular design. 
3. Enhancing testability, scalability, and maintainability.
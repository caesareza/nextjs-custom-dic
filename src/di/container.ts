type ServiceMap = {
    getMessage: { execute: () => string };
    getDetailMessage: { execute: (id: number) => string };
};

/*
    DIContainer<Services extends Record<string, any>>
    we use any because we need to receive any type of the input such as array, object, string, etc.
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
class DIContainer<Services extends Record<string, any>> {
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

const di = new DIContainer<ServiceMap>();

di.register("getMessage", {
    execute: () => "default message",
});
di.register("getDetailMessage", {
    execute: (id: number) => {
        return `hai ` + id
    }
})

export default di
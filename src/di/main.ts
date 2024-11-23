import { DIContainer } from "@/di/container";
import { Services } from "@/services";

/* eslint-disable @typescript-eslint/no-explicit-any */
type ServiceMap = Record<string, { execute: (...args: any[]) => any}>

const di = new DIContainer<ServiceMap>()

Object.entries(Services).forEach(([key, service]) => {
    di.register(key, service())
})

export default di

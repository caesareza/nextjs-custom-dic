import { DIContainer } from '@/di/container'
import { Services } from '@/services'
import { envAdapter } from '@/services/envAdapter'

interface EnvAdapter {
    APP_BASE_URL: string
    API_KEY: string
    NODE_ENV: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type ServiceMap = {
    envAdapter: EnvAdapter
} & Record<string, { execute: (...args: any[]) => any }>

const di = new DIContainer<ServiceMap>()

/*
    Object.entries(Services)
    this will register all the function through forEach loop
 */
Object.entries(Services).forEach(([key, service]) => {
    di.register(key, service())
})

/*
    this line here do a register static variable
    (e.g. ENV, Constant, route)
 */
di.register('envAdapter', envAdapter)

export default di

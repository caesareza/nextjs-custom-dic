class DIContainer {
    private services: Map<string, unknown> = new Map()

    register(name: string, service: unknown){
        this.services.set(name, service)
    }

    resolve(name: string){
        const service = this.services.get(name)
        if (!service) {
            throw new Error(`Service "${name}" not found in DI container`)
        }

        return service
    }
}

const di = new DIContainer()
import {MessageServiceFactory} from "@/services/MessageService";

di.register('getMessage', MessageServiceFactory.getMessage)

export default di
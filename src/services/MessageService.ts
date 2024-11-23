interface Service {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    execute: (args: any) => any;
}

// export const getMessage: Service = {
//     execute: () => "default message",
// };

export const getDetailMessage: Service = {
    execute: (id: number) => {
        return 'this is ' + id
    }
}
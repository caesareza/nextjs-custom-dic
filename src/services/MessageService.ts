export const MessageService = {
    getMessage: () => ({
        execute: () => 'default message',
    }),

    getDetailMessage: () => ({
        execute: (id: number) => `Message for ID: ${id}`,
    }),
}

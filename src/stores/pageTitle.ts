import { defineStore } from 'pinia';

export const useEventPageTitleStore = defineStore('pageTitle', {
    state: () => ({
        eventPayload: "",
    }),
    actions: {
        triggerEvent(payload: string) {
            this.eventPayload = payload;
        },
    },
});
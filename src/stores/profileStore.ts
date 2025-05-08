import { defineStore } from 'pinia';
import type {User} from "@/models/User.ts";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: {} as User,
    }),
    actions: {
        addProfile(user: User) {
            this.profile = user;
        },
    },
});
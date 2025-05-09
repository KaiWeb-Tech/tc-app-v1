import { AuthManager } from '@/api/AuthManager.ts';

export interface User {
    id: number;
    nickname: string;
    password: string;
    email: string;
    avatar: string;
    lang: string;
    roles: string;
    auth_provider: string;
}

export const UserRepository = {
    login: async function(user: User): Promise<any> {
        return await AuthManager.login(user);
    },

    getProfile: async function (): Promise<User | undefined> {
        return AuthManager.profile()
    },

    updateProfile: async function (user: User): Promise<void> {
        return AuthManager.updateProfile(user);
    }
}
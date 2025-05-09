import type {User} from "@/models/User.ts";
import {EndPoints} from "@/api/EndPoints.ts";
import {ApiService} from "@/api/ApiService.ts";

export class AuthManager {
    private static setToken(token: string): void {
        localStorage.setItem("tc_token", token);
    }

    private static getToken(): string | null {
        return localStorage.getItem("tc_token");
    }

    private static clearToken(): void {
        localStorage.removeItem("tc_token")
    }

    public static getAuthHeaders(): { Authorization?: string } {
        const token = this.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    public static async login(user: User) {
        try {
            const response = await fetch(EndPoints.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, password: user.password }),
                credentials: 'include',
            });

            if (response.ok) {
                const res = await response.json();
                this.setToken(res.token);
                return res;
            } else {
                console.error('Login failed:', response.statusText);
                return response.status;
            }
        } catch (error) {
            console.error('Error during login:', error);
            return;
        }
    }

    public static async profile() {
        try {
            const response = await fetch(EndPoints.PROFILE, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed:', response.statusText);
                return;
            }
        } catch (error) {
            console.error('Error during profile retrieving:', error);
            return;
        }
    }

    public static async updateProfile(user: User) {
        try {
            const response = await fetch(EndPoints.PROFILE, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`,
                },
                body: JSON.stringify(user),
                credentials: 'include',
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed:', response.statusText);
                return;
            }
        } catch (error) {
            console.error('Error during profile updating:', error);
            return;
        }
    }
}
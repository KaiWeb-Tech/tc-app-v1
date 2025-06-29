import {EndPoints} from "@/api/EndPoints.ts";
import type {Category} from "@/models/Category.ts";

export class CategoryManager {
    private static getToken(): string | null {
        return localStorage.getItem("tc_token");
    }

    public static getAuthHeaders(): { Authorization?: string } {
        const token = this.getToken();
        return token ? {Authorization: `Bearer ${token}`} : {};
    }

    public static async list() {
        try {
            const response = await fetch(EndPoints.CATEGORIES, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getToken()}`,},
                credentials: 'include',
            })

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed:', response.statusText);
                return
            }
        } catch (error) {
            console.error('Error during retrieve list', error);
            return
        }
    }

    public static async getById(id: string) {
        try {
            const response = await fetch(`${EndPoints.CATEGORIES}/${id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getToken()}`,},
                credentials: 'include',
            })

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed:', response.statusText);
                return
            }
        } catch (error) {
            console.error('Error during retrieve category', error);
            return
        }
    }

    public static async addCategory(category: Category) {
        try {
            const response = await fetch(EndPoints.CATEGORIES, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`,
                },
                body: JSON.stringify(category),
                credentials: 'include',
            })

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed:', response.statusText);
                return;
            }
        } catch (error) {
            console.error('Error during category creation:', error);
            return;
        }
    }

    public static async delete(id: string) {
        try {
            const response = await fetch(EndPoints.CATEGORIES + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`,
                },
                credentials: 'include',
            })

            if (response.ok) {
                return response.statusText;
            } else {
                console.error('Failed:', response.statusText);
                return;
            }
        } catch (error) {
            console.error('Error during delete', id);
            return
        }
    }
}
import {EndPoints} from "@/api/EndPoints.ts";
import {buildDynamicUrl} from "@/utils/common.ts";

export class CardManager {
    private static getToken(): string | null {
        return localStorage.getItem("tc_token");
    }

    public static getAuthHeaders(): { Authorization?: string } {
        const token = this.getToken();
        return token ? {Authorization: `Bearer ${token}`} : {};
    }

    public static async list(categoryId: string) {
        try {
            const url = buildDynamicUrl(EndPoints.CARDS, {categoryId: categoryId});
            const response = await fetch(`${url}`, {
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
}
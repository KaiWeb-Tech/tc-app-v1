import {CardManager} from "@/api/CardManager.ts"

export interface Card {
    id: string;
    front_side: string;
    back_side: string;
    description: string;
}

export const CardRepository = {
    getAll: async function(categoryId: string): Promise<any> {
        const list = await CardManager.list(categoryId)
        return list.data
    }
}
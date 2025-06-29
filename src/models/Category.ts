import {CategoryManager} from "@/api/CategoryManager.ts";

export interface Category {
    id: string;
    name: string;
    description: string;
    color: string;
}

export const CategoryRepository = {
    getAll: async function(): Promise<any> {
        const list = await CategoryManager.list()
        return list.data
    },

    update: async function(id: string, data: Partial<Category>): Promise<any> {
        return await CategoryManager.update(id, data)
    },

    getById: async function(id: string): Promise<any> {
        return await CategoryManager.getById(id)
    },

    addCategory: async function(category: Category): Promise<any> {
        return await CategoryManager.addCategory(category);
    },

    deleteCategory: async function(category: Category): Promise<any> {
        return await CategoryManager.delete(category.id)
    }
}
import { defineStore } from 'pinia';
import type {Category} from "@/models/Category.ts";

export const useCategoryStore = defineStore('currentCategory', {
    state: () => ({
        category: {} as Category,
    }),
    actions: {
        setCategory(category: Category) {
            this.category = category;
        },
    },
});
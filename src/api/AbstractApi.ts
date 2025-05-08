import axios, { type AxiosInstance } from 'axios';
import {AuthManager} from "@/api/AuthManager.ts";

export abstract class AbstractApi<T> {
    protected readonly axiosInstance: AxiosInstance;

    protected constructor() {
        this.axiosInstance = axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.axiosInstance.interceptors.request.use((config) => {
            const authHeaders = AuthManager.getAuthHeaders();
            if (authHeaders.Authorization) {
                config.headers.Authorization = authHeaders.Authorization;
            }
            return config;
        });
    }

    public abstract create(data: T): Promise<T>;

    public abstract getById(id: string | number): Promise<T>;

    public abstract getAll(id: string | number): Promise<T>;

    public abstract update(id: string | number, data: Partial<T>): Promise<T>;

    public abstract delete(id: string | number): Promise<void>;
}
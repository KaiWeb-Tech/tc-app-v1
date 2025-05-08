import { AbstractApi } from './AbstractApi';

export class ApiService<T> extends AbstractApi<T> {
    private readonly resource: string;

    constructor(resource: string) {
        super()
        this.resource = resource;

        this.axiosInstance.defaults.withCredentials = true;
    }

    public async create(data: T): Promise<T> {
        const response = await this.axiosInstance.post<T>(`/${this.resource}`, data);
        return response.data;
    }

    public async getById(id: string | number): Promise<T> {
        const response = await this.axiosInstance.get<T>(`/${this.resource}/${id}`);
        return response.data;
    }

    public async getAll(): Promise<T> {
        const response = await this.axiosInstance.get<T>(`/${this.resource}`);
        return response.data;
    }

    public async update(id: string | number, data: Partial<T>): Promise<T> {
        const response = await this.axiosInstance.put<T>(`/${this.resource}/${id}`, data);
        return response.data;
    }

    public async delete(id: string | number): Promise<void> {
        await this.axiosInstance.delete(`/${this.resource}/${id}`);
    }
}
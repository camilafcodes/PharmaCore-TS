export interface Imanageable<T> {
    create(body: T): Promise<T | null>;
    read(): Promise<T[]>;
    searchById(id: number): Promise<T | null>;
    remove(id: number): Promise<boolean>;
    update(body: Partial<T>): Promise<T | null>;
}


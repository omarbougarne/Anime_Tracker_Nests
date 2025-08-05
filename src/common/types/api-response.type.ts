export type ApiResponse<T> = Promise<{
    success: boolean;
    data?: T | null;
    error?: string;
    message: string;
}>;
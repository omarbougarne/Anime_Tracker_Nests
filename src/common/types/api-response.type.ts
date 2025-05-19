export type ApiResponse<T> = Promise<{
    success: boolean;
    data?: T;
    error?: string;
    message: string;
}>;
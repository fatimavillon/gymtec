export const getDataSource = (): 'mock' | 'api' => {
    const source = process.env.NEXT_PUBLIC_DATA_SOURCE;
    if (source === 'mock' || source === 'api') {
        return source;
    }
    return 'mock';
};

export const getApiBaseUrl = (): string | null => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || null;
};

export const isUsingApi = (): boolean => {
    const source = getDataSource();
    const apiUrl = getApiBaseUrl();
    return source === 'api' && !!apiUrl;
};
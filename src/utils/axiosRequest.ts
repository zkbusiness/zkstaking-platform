import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    data?: Record<string, any>;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`; // Preset server URL

const axiosRequest = {
    get: async <T>(endpoint: string, options?: Record<string, any>): Promise<T> => {
        return sendRequest<T>('GET', endpoint, { params: options });
    },
    post: async <T>(endpoint: string, options?: Record<string, any>): Promise<T> => {
        return sendRequest<T>('POST', endpoint, { data: options });
    },
    put: async <T>(endpoint: string, options?: Record<string, any>): Promise<T> => {
        return sendRequest<T>('PUT', endpoint, { data: options });
    },
    delete: async <T>(endpoint: string, options?: Record<string, any>): Promise<T> => {
        return sendRequest<T>('DELETE', endpoint, { params: options });
    },
};

// Utility function for making requests
const sendRequest = async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, { headers, data, params }: RequestOptions): Promise<T> => {
    try {
        // Configuring the request based on method
        const config: AxiosRequestConfig = {
            method,
            url: `${BASE_URL}${endpoint}`,
            headers,
            data: method === 'POST' || method === 'PUT' ? data : undefined,  // Use data only for POST/PUT
            params: method === 'GET' || method === 'DELETE' ? params : undefined,  // Use params only for GET/DELETE
        };

        const response: AxiosResponse<T> = await axios(config);
        return response.data;
    } catch (error: any) {
        // Error handling
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};

export default axiosRequest;
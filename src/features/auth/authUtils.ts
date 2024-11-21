export const saveToken = (token: string): void => localStorage.setItem('jwt', token);
export const getToken = (): string | null => localStorage.getItem('jwt');
export const removeToken = (): void => localStorage.removeItem('jwt');

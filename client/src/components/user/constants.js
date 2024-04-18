const getBaseUrl = () => {
    const { hostname, protocol } = window.location;
    return `${protocol}//${hostname}:8081/`; 
};

export const API_URL = getBaseUrl();
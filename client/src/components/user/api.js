import { API_URL } from "./constants";

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}utilisateur`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchAgence = async () => {
    try {
        const response = await fetch(`${API_URL}agence`);
        if (!response.ok) {
            throw new Error('Failed to fetch agence');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchGroupement = async () => {
    try {
        const response = await fetch(`${API_URL}groupement`);
        if (!response.ok) {
            throw new Error('Failed to fetch groupement');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Add other API call functions as needed

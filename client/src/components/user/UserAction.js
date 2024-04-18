import Swal from 'sweetalert2';
import { API_URL } from './constants';


export const handleDeleteSelectedUsers = async (selectedUsers, setUsers) => {
    try {
        await Promise.all(selectedUsers.map(async (userId) => {
            const response = await fetch(`${API_URL}utilisateur/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user with ID ${userId}`);
            }
        }));
        setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user.Us_id)));
        Swal.fire('Success', 'Selected users deleted successfully', 'success');
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to delete selected users', 'error');
    }
};

export const handleDeleteUser = async (userId, setUsers) => {
    const confirmDelete = await Swal.fire({
        icon: 'warning',
        title: 'êtes vous sûr?',
        text: 'cet action est irréversible',
        showCancelButton: true,
        confirmButtonText: 'oui, supprimer !',
        cancelButtonText: 'Anuller',
    });

    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`${API_URL}utilisateur/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setUsers((prevUsers) => prevUsers.filter((user) => user.Us_id !== userId));
            Swal.fire('Deleted!', 'Utilisateur supprimé.', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to delete user', 'error');
        }
    }
};

export const handleCreateUser = async (newUserData, setNewUserData, handleCloseDialog, fetchUsers) => {
    console.log('Creating user with data:', newUserData);
    try {
        const response = await fetch(`${API_URL}utilisateur`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserData)
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        setNewUserData({
            Us_nom: '',
            Us_matricule: '',
            Us_login: '',
            Us_mail: '',
            Us_pwd: '',
            Fo_id: '',
            Grp_code: '',
            Agence_id: ''
        });
        handleCloseDialog();
        fetchUsers();
        Swal.fire('Success', 'User created successfully', 'success');
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create user',
            confirmButtonText : 'ok',
            showConfirmButton: true,
            customClass: {
                container: 'swal-container',
            },
            didOpen: () => {
                document.querySelector('.swal-container').style.zIndex = '9999'; 
            },
        });                
    }
};

export const handleUpdateValidation = async (userId, validate, fetchUsers) => {
    try {
        const response = await fetch(`${API_URL}utilisateur/${userId}/validation`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ validate })
        });
        if (!response.ok) {
            throw new Error('Failed to update user validation status');
        }
        fetchUsers();
        Swal.fire('Success', 'User validation status updated successfully', 'success');
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to update user validation status', 'error');
    }
};

// Add other event handlers as needed

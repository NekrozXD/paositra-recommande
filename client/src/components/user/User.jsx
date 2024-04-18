        import React, { useEffect, useState } from 'react';
        import { FaTrash,FaEdit, FaInfoCircle,FaCheckCircle, FaTimesCircle  } from 'react-icons/fa';
        import { Table, Button, Form } from 'react-bootstrap';
        import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
        import Swal from 'sweetalert2';
        import './user.css';
        import { MaterialUserDialog } from './MaterialUiUserDialog';
        import { UserTable } from './UserTable';
        import { handleCreateUser, handleDeleteSelectedUsers, handleDeleteUser,handleUpdateValidation } from './UserAction';
        import { fetchUsers, fetchAgence, fetchGroupement } from './api';

        const getBaseUrl = () => {
            const { hostname, protocol } = window.location;
            return `${protocol}//${hostname}:8081/`; 
        };

        const API_URL = getBaseUrl();

        export const UserComponent = () => {
            const [users, setUsers] = useState([]);
            const [selectedUsers, setSelectedUsers] = useState([]);
            const [Agence, setAgence] = useState([]);
            const [Groupement, setGroupement] = useState([]);
            const [openDialog, setOpenDialog] = useState(false);
            const [newUserData, setNewUserData] = useState({
                Us_nom: '',
                Us_matricule: '',
                Us_login: '',
                Us_mail: '',
                Us_pwd: '',
                Fo_id: '',
                Grp_code: '',
                Agence_id: ''
            });
            const handleDeleteSelected = async () => {
                await handleDeleteSelectedUsers(selectedUsers, setUsers);
                setSelectedUsers([]); // Clear selected users after deletion
            };
        
            const handleDelete = async (userId) => {
                await handleDeleteUser(userId, setUsers);
            };
        

            const handleOpenDialog = () => {
                setOpenDialog(true); // Update the openDialog state to open the dialog
            };
        
            const handleCloseDialog = () => {
                setOpenDialog(false); // Update the openDialog state to close the dialog
            };
        
            const handleCreate = async () => {
                try {
                    await handleCreateUser(newUserData, setNewUserData, handleCloseDialog, fetchUsers);
                    Swal.fire('Success', 'User created successfully', 'success');
                } catch (error) {
                    console.error(error);
                    Swal.fire('Error', 'Failed to create user', 'error');
                }
            };
            const fetchData = async () => {
                const userData = await fetchUsers();
                const agenceData = await fetchAgence();
                const groupementData = await fetchGroupement();
                setUsers(userData);
                setAgence(agenceData);
                setGroupement(groupementData);
            };
        
            useEffect(() => {
                fetchData();
            }, []);       

            const handleCheckboxChange = (userId, checked) => {
                if (checked) {
                    setSelectedUsers([...selectedUsers, userId]);
                } else {
                    setSelectedUsers(selectedUsers.filter((id) => id !== userId));
                }
            };
            const handleChange = (e) => {
                const { name, value } = e.target;
                setNewUserData((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            };
            
            
            const handleUpdateValidate = async (userId, validate) => {
                try {
                    await handleUpdateValidation(userId, validate, fetchData);
                } catch (error) {
                    console.error(error);
                    Swal.fire('Error', 'Failed to update user validation status', 'error');
                }
            };

            return (
                <div className='user'>
                <div style={{display:'flex',flexDirection:'row', gap:'20px', backgroundColor:'transparent', alignItems:'center', padding:'5px', borderRadius:'16px'}}>
                <h2>Utilisateurs</h2>
                <span>&nbsp;</span>
                <button  style={{marginLeft:'auto'}} class="c-button">
                    <span  className="c-main" onClick={handleOpenDialog}>
                        <span className="c-ico"><span className="c-blur"></span> <span className="ico-text">+</span></span>
                        ajouter
                    </span>
                </button>
                {selectedUsers.length > 0 && (
                    <Button
                        style={{ color: 'white', borderRadius: '5px', backgroundColor: 'red', border: 'none', borderRadius:'16px', padding: '5px', height:'50px'}}
                        onClick={handleDeleteSelected}
                    >
                        <FaTrash /> supprimer
                    </Button>
                )}
            </div>

                <div style={{minHeight:'83vh', maxHeight:'83vh', overflowY:'auto', background:'var(--secondary-color)', boxShadow:'var(--light-shadow1)', marginTop:'10px'}}>
                <UserTable
                    users={users}
                    selectedUsers={selectedUsers}
                    handleCheckboxChange={handleCheckboxChange}
                    handleDelete={handleDelete}
                    handleUpdateValidation={handleUpdateValidate}
                />
                    </div>
                    <MaterialUserDialog
                    open={openDialog} // Pass the state variable here
                    handleClose={handleCloseDialog}
                    newUserData={newUserData}
                    handleChange={handleChange}
                    handleCreateUser={handleCreate}
                    Agence={Agence}
                    Groupement={Groupement}
                />
                </div>
            );
        };

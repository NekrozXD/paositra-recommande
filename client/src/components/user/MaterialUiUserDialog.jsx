import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import Swal from 'sweetalert2';

export const MaterialUserDialog = ({ open, handleClose, newUserData, handleChange, handleCreateUser, Agence, Groupement }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    backgroundColor: 'var(--secondary-color)',
                    padding: '15px',
                    color: '#f1f1f1',
                    borderRadius: '16px',
                    boxShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                },
            }}
        >
            <DialogTitle style={{color:'var(--base-text-color)'}}>Create New User</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '500px', padding: '5px', gap: '10px' }}>
                <TextField InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} label="Matricule" name="Us_matricule" value={newUserData.Us_matricule} onChange={handleChange} />
                <TextField InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} label="Nom" name="Us_nom" value={newUserData.Us_nom} onChange={handleChange} />
                <TextField InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} label="Login" name="Us_login" value={newUserData.Us_login} onChange={handleChange} />
                <TextField InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} label="Email" name="Us_mail" value={newUserData.Us_mail} onChange={handleChange} />
                <TextField InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} label="Password" name="Us_pwd" value={newUserData.Us_pwd} onChange={handleChange} />
                <InputLabel style={{ color: 'var(--base-text-color)' }}>Agence</InputLabel>
                <FormControl>
                    <Select style={{ color: 'var(--base-text-color)' }} name="Agence_id" value={newUserData.Agence_id} onChange={handleChange}>
                        {Agence.map((agence) => (
                            <MenuItem key={agence.Agence_id} value={agence.Agence_id}>{agence.Agence_nom}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <InputLabel style={{ color: 'var(--base-text-color)' }}>Groupement</InputLabel>
                <FormControl>
                    <Select style={{ color: 'var(--base-text-color)' }} name="Grp_code" value={newUserData.Grp_code} onChange={handleChange}>
                        {Groupement.map((groupement) => (
                            <MenuItem key={groupement.Grp_code} value={groupement.Grp_code}>{groupement.Grp_nom}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <InputLabel style={{ color: 'var(--base-text-color)' }}>Fonction</InputLabel>
                <FormControl>
                    <Select style={{ color: 'var(--base-text-color)' }} name="Fo_id" value={newUserData.Fo_id} onChange={handleChange}>
                        <MenuItem InputProps={{ style: { color: 'var(--base-text-color)' } }} value={1}>admin</MenuItem>
                        <MenuItem InputProps={{ style: { color: 'var(--base-text-color)' } }} value={2}>saisie</MenuItem>
                        <MenuItem InputProps={{ style: { color: 'var(--base-text-color)' } }} value={3}>Verifs</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ height: '50px', color: 'white', backgroundColor: 'var(--button-blue-color)', borderRadius: '16px', padding: '15px' }}>Anuller</Button>
                <Button onClick={handleCreateUser} style={{ height: '50px', color: 'white', backgroundColor: 'var(--button-blue-color)', borderRadius: '16px', padding: '15px' }}>Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
};

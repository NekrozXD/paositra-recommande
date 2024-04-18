import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem,InputLabel, Button } from "@mui/material";

export const GroupMaterialUi = ({ open, handleClose, handleChange, handleAddGroup, formData }) => {
  const handleAddGroupAndClose = () => {
    handleAddGroup();
    handleClose();
  };
  
  // In your JSX
 
  
    return (
        <Dialog 
        open={open} 
        onClose={handleClose}  
        PaperProps={{
                style: {
                backgroundColor: 'var(--secondary-color)', 
                padding: '15px', 
                color: '#f1f1f1',
                borderRadius: '16px' ,
                boxShadow:'1px 1px 2px rgba(0,0,0,0.2)'
                },
            }}>
        <DialogTitle style={{color:'var(--base-text-color)'}}>Nouveau Groupement</DialogTitle>
        <DialogContent>
        <TextField
  autoFocus
  InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} 
  margin="dense"
  label="Nom"
  type="text"
  fullWidth
  name="Grp_nom" 
  value={formData.Grp_nom} 
  onChange={handleChange}
/>
<TextField
InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} 
  margin="dense"
  label="Code"
  type="text"
  fullWidth
  name="Grp_code" 
  value={formData.Grp_code} 
  onChange={handleChange}
/>
<TextField
InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} 
  margin="dense"
  label="Mail"
  type="text"
  fullWidth
  name="Grp_mail" 
  value={formData.Grp_mail} 
  onChange={handleChange}
/>
<TextField
InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} 
  margin="dense"
  label="Adresse"
  type="text"
  fullWidth
  name="Grp_adresse" 
  value={formData.Grp_adresse} 
  onChange={handleChange}
/>
<TextField
InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} 
  margin="dense"
  label="Responsable"
  type="text"
  fullWidth
  name="Grp_responsable" 
  value={formData.Grp_responsable} 
  onChange={handleChange}
/>
<TextField
InputLabelProps={{ style: { color: 'var(--base-text-color)' } }} InputProps={{ style: { color: 'var(--base-text-color)' } }} 
  margin="dense"
  label="Contact"
  type="text"
  fullWidth
  name="Grp_contact" 
  value={formData.Grp_contact} 
  onChange={handleChange}
/>
<InputLabel  style={{color:'var(--base-text-color)'}} value="0">Sélectionner le type</InputLabel>
<Select
  margin="dense"
  label="Type"
  fullWidth
  name="Grp_type" 
  value={formData.Grp_type} 
  onChange={handleChange}
  style={{color:'var(--base-text-color)' , background:'var(--secondary-color)'}}
>
  
  <MenuItem InputProps={{ style: { color: 'var(--base-text-color)' } }}  value="centri">Centri</MenuItem>
  <MenuItem InputProps={{ style: { color: 'var(--base-text-color)' } }}  value="societe">Societe</MenuItem>
  <MenuItem InputProps={{ style: { color: 'var(--base-text-color)' } }}  value="agence_postale">Agence postale</MenuItem>
</Select>
        </DialogContent>
        <DialogActions>
          <Button style={{backgroundColor:'var(--button-blue-color)', padding:'15px', borderRadius:'4px' , color:'white'}} onClick={handleClose}>Annuler</Button>
          <Button
            style={{ backgroundColor: 'var(--button-blue-color)', padding: '15px', borderRadius: '4px', color: 'white' }}
            onClick={handleAddGroupAndClose}
          >
            Ajouter
  </Button>
  </DialogActions>
      </Dialog>
    )
}
import React, { useEffect, useState } from "react";
import { Form, Button, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Swal from 'sweetalert2'
import './groupement.css'
import './user.css'
import GroupementTable from "./GroupementTable";
import { GroupMaterialUi } from "./MaterialUiGroup";
import { fetchGroups, addGroup, deleteGroup, updateGroup, deleteSelectedGroups } from "./groupementAction";

const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  return `${protocol}//${hostname}:8081/`; 
};

const API_URL = getBaseUrl();

export const GroupementComponent =(props) => {

  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [formData, setFormData] = useState({
    Grp_nom: "",
    Grp_code: "",
    Grp_adresse: "",
    Grp_responsable: "",
    Grp_contact: "",
    Grp_type: "",
    Grp_mail: "",
  }); 

  const handleDeleteSelected = () => {
    deleteSelectedGroups(selectedGroupIds, groups, setGroups, fetchGroups, toast);
  };

const handleAddGroup = () => {
  addGroup(formData, setGroups, setFormData, handleClose, fetchGroups, toast, setIsEditing);
};

useEffect(() => {
  fetchGroups(setGroups, setIsEditing);
}, []);


  const handleDeleteGroup = (id) => {
    deleteGroup(id, groups, setGroups, toast);
    fetchGroups();
  };

  const handleUpdateGroup = () => {
    updateGroup(selectedGroupId, formData, fetchGroups, setFormData, setSelectedGroupId, toast);
  };

  const handleEditGroup = (group) => {
    setFormData({
      Grp_nom: group.Grp_nom,
      Grp_code: group.Grp_code,
      Grp_adresse: group.Grp_adresse,
      Grp_responsable: group.Grp_responsable,
      Grp_contact: group.Grp_contact,
      Grp_type: group.Grp_type,
      Grp_mail: group.Grp_mail,
    });
    setSelectedGroupId(group.Grp_id);
    setIsEditing(true);
    handleClickOpen(); // Open the dialog for editing
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleCheckboxChange = (id) => {
    setSelectedGroupIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  return (
    <div className="groupement">
      <div className="row">
        <GroupMaterialUi
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleAddGroup={handleAddGroup}
          formData={formData}
        />
      </div>
      <div  style={{display:'flex'}}> 
        <h2>Liste des Groupements</h2>   
        <button  style={{marginLeft:'auto'}} class="c-button">
          <span  className="c-main" onClick={handleClickOpen}>
            <span className="c-ico"><span className="c-blur"></span> <span className="ico-text">+</span></span>
            ajouter
          </span>
        </button> 
        <span>&nbsp;</span>
        {selectedGroupIds.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <Button variant="danger" onClick={handleDeleteSelected}>
              Supprimer sélectionnés
            </Button>
          </div>
        )}
      </div>
      <div className="row" style={{  boxShadow: 'var(--light-shadow1)' , minHeight:'85vh',maxHeight:'85vh', display:'flex', width:'100%',alignItems:'flex-start', justifyContent:'flex-start', flexDirection:'column', padding:'5px', marginTop:'10px', backgroundColor:'var(--secondary-color)'}}>
        <GroupementTable
          groups={groups}
          selectedGroupIds={selectedGroupIds}
          handleCheckboxChange={handleCheckboxChange}
          handleEditGroup={handleEditGroup}
          handleDeleteGroup={handleDeleteGroup}
        />        
      </div>
      <ToastContainer />
    </div>
  );
};

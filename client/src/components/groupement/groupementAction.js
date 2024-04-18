import axios from "axios";
import Swal from 'sweetalert2';
import { API_URL } from "../user/constants";

export const fetchGroups = (setGroups, setIsEditing) => {
  axios
    .get(`${API_URL}groupement`)
    .then((res) => {
      console.log('All Groups:', res.data);
      setGroups(res.data);
      setIsEditing(false);
    })
    .catch((err) => console.log("Error fetching data:", err));
};

export const addGroup = (formData, setGroups, setFormData, handleClose, fetchGroups, toast, setIsEditing) => {
  axios
    .post(`${API_URL}groupement`, formData)
    .then((res) => {
      console.log("Group added successfully:", res.data);
      setGroups((prevGroups) => [...prevGroups, res.data]);
      setFormData({
        Grp_nom: "",
        Grp_code: "",
        Grp_adresse: "",
        Grp_responsable: "",
        Grp_contact: "",
        Grp_type: "",
        Grp_mail: "",
      });
      toast.success("group added successfully");
      fetchGroups(setGroups, setIsEditing); 
    })
    .catch((err) => {
      console.error("Error adding group:", err);
    });
};



export const deleteGroup = (id, groups, setGroups, toast) => {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Cette action est irréversible!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Non',
    confirmButtonText: 'Oui! Supprimer'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
      .delete(`${API_URL}groupement/${id}`)
      .then(() => {
        const updatedGroups = groups.filter((group) => group.Grp_id !== id);
        setGroups(updatedGroups);
        toast.error('group deleted successfully')
      })
      .catch((err) => console.log("Error deleting group:", err));;
    }
  });
};

export const updateGroup = (selectedGroupId, formData, fetchGroups, setFormData, setSelectedGroupId, toast) => {
  if (!selectedGroupId) {
    console.error("No group selected for update");
    return;
  }

  axios.put(`${API_URL}groupement/${selectedGroupId}`, formData)
    .then((res) => {
      console.log("Group updated successfully:", res.data);
      fetchGroups();
      setFormData({
        Grp_nom: "",
        Grp_code: "",
        Grp_adresse: "",
        Grp_responsable: "",
        Grp_contact: "",
        Grp_type: "",
        Grp_mail: "",
      });
      setSelectedGroupId(null);
      toast.info('group info updated');
      
    })
    .catch((err) => {
      console.error("Error updating group:", err);
    });
};

export const deleteSelectedGroups = (selectedGroupIds, groups, setGroups, fetchGroups, toast) => {
  selectedGroupIds.forEach((groupId) => {
    axios
      .delete(`${API_URL}groupement/${groupId}`)
      .then(() => {
        const updatedGroups = groups.filter((group) => group.Grp_id !== groupId);
        setGroups(updatedGroups);
        Swal.fire({
          icon: 'success',
          title: 'Groupement supprimé!',
        });
        
        fetchGroups();
      })
      .catch((err) => console.log("Error deleting group:", err));
  });
};

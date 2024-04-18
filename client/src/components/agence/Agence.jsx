import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Agence.scss'

const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  return `${protocol}//${hostname}:8081/`; 
};

const API_URL = getBaseUrl();

export default function Agence ({ onDetailClick }) {
  const [agences, setAgences] = useState([]);
  const [selectedAgenceId, setSelectedAgenceId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    Agence_nom: "",
    Agence_code: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchData = () => {
    axios
      .get(`${API_URL}agence`) 
      .then((res) => setAgences(res.data))
      .catch((err) => console.log("Error fetching data:", err));
  };

  const handleAddAgence = () => {
    axios.post(`${API_URL}agence`, formData) 
      .then((res) => {
        console.log("Agence added successfully:", res.data);
        setAgences([...agences, res.data]);
        setFormData({
          Agence_nom: "",
          Agence_code: "",
        });
        toast.success('Agence ajoutée avec succès');
        fetchData();
      })
      .catch((err) => {
        console.error("Error adding agence:", err);
      });
  };


  useEffect(() => {
    fetchData();
  }, [agences]);

  const handleDeleteAgence = (agence) => {
    console.log("Received agence for deletion:", agence);
  
    if (!agence || !agence.agence_Id) {
      console.error("Invalid agence object:", agence);
      return;
    }
  
    console.log("Deleting Agence with ID:", agence.agence_Id);
  
    axios
      .delete(`${API_URL}agence/${agence.agence_Id}`) 
      .then(() => {
        const updatedAgences = agences.filter((a) => a.agence_Id !== agence.agence_Id);
        setAgences(updatedAgences);
        toast.error('Agence supprimée');
      })
      .catch((err) => console.log("Error deleting agence:", err));
  };

  const handleUpdateAgence = () => {
    console.log("Selected Agence Id:", selectedAgenceId);
  
    if (!selectedAgenceId) {
      console.error("No agence selected for update");
      return;
    }
  
    axios.put(`${API_URL}agence/${selectedAgenceId}`, formData) 
      .then((res) => {
        console.log("Agence updated successfully:", res.data);
        fetchData();
        setFormData({
          Agence_nom: "",
          Agence_code: "",
        });
        toast.info('Agence mis à jour');
        setSelectedAgenceId(null);
        setIsEditing(false); 
      })
      .catch((err) => {
        console.error("Error updating agence:", err);
      });
  };

  const handleEditAgence = (agence) => {
    console.log("Editing agence:", agence);
    setFormData({
      Agence_nom: agence.Agence_nom,
      Agence_code: agence.Agence_code,
    });
    setSelectedAgenceId(agence.Agence_id);
    setIsEditing(true); 
  };

  const handleClear = (e) => {
    e.preventDefault();
      setIsEditing(false);
      setFormData({
        Agence_nom: "",
        Agence_code: "",
      });
  }

  const showDetail = (agence) => {
    onDetailClick(agence);
  };

 return (
  <div className='agence' style={{ display: 'flex', gap:'25px' }}>
    <div style={{ flex: 1 , boxShadow: 'var(--light-shadow)', backgroundColor: 'var(--secondary-color)'}}>
      <h2>Liste des Bureaux</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Code</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {agences.map((agence) => (
            <tr key={agence.agence_Id}>
              <td>{agence.Agence_nom}</td>
              <td>{agence.Agence_code}</td>
              <td>
                <div>
                  <button className="delete" onClick={() => handleDeleteAgence(agence)}>Delete</button>
                  <button className='edit' onClick={() => handleEditAgence(agence)}>Edit</button>
                </div>
              </td>
              <td>
                <div>
                  <button onClick={() => showDetail(agence)}>Details</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ flex: 1 ,boxShadow: 'var(--light-shadow)', backgroundColor: 'var(--secondary-color)'}}>
      <div style={{ width: '100%' }}>
        <form>
          <h1>{isEditing ? "Modifier Bureau" : "Nouveau bureau"}</h1>
          <button type="button" onClick={handleClear}>Clear</button>
          <div>
            <input
              placeholder="Nom de l'agence"
              type="text"
              id="Agence_nom"
              name="Agence_nom"
              value={formData.Agence_nom}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <input
              placeholder="Code de l'agence"
              type="text"
              id="Agence_code"
              name="Agence_code"
              value={formData.Agence_code}
              onChange={handleInputChange}
            />
          </div>

          {isEditing ? (
            <button className='Ajouter' type="button" onClick={handleUpdateAgence}>
              Mettre à jour Agence
            </button>
          ) : (
            <button className='Ajouter' type="button" onClick={handleAddAgence}>
              Ajouter Agence
            </button>
          )}
        </form>
      </div>
    </div>
    <ToastContainer />
  </div>
);
};
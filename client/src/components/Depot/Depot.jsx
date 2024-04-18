  import React, { useState,useEffect } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import './Depot.scss'
  import { verifyBeneficiaire, fetchBeneficiaireGroupCode, fetchAgenceNom, sendEnvoiData } from './DepotAction.js';
  const getBaseUrl = () => {
    const { hostname, protocol } = window.location;
    return `${protocol}//${hostname}:8081/`; // Assuming backend is always on port 8081
  };
  
  const API_URL = getBaseUrl();

  export const DepotComponent = ({ onHistoryClick, lightMode }) => {
    const [expediteurName, setExpediteurName] = useState('');
  const [expediteurAddress, setExpediteurAddress] = useState('');
  const [destinataireName, setDestinataireName] = useState('');
  const [destinataireAddress, setDestinataireAddress] = useState('');
  const [destinataireTel, setDestinataireTel] = useState('');
  const [numero, setNumero] = useState('');
  const [montant, setMontant] = useState('');
  const [poids, setPoids] = useState('');
  const [taxes, setTaxes] = useState('');
  const [lastDeposits, setLastDeposits] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [selectedInput, setSelectedInput] = useState(null);
  const [registers, setRegisters] = useState([]);
  const [selectedRegister, setSelectedRegister] = useState(null);

    const fetchBeneficiaireSuggestions = async (inputValue) => {
      try {
        const response = await fetch(`${API_URL}benefs?Ben_Nom=${inputValue}`);
        const beneficiaireData = await response.json();

        // Filter suggestions based on input value
        const filteredSuggestions = beneficiaireData.filter(suggestion =>
          suggestion.Ben_Nom.toLowerCase().includes(inputValue.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error('Error fetching beneficiaire suggestions:', error);
        setSuggestions([]);
      }
    };

    const fetchRegisters = async () => {
      try {
        const response = await fetch(`${API_URL}registre`);
        const data = await response.json();
        setRegisters(data);
      } catch (error) {
        console.error('Error fetching registers:', error);
      }
    };
  
    useEffect(() => {
      fetchRegisters(); // Fetch registers data initially
    }, []);

    const handleSuggestionClick = (suggestion) => {
      if (selectedInput === 'expediteur') {
        setExpediteurName(suggestion.Ben_Nom);
        setExpediteurAddress(suggestion.Ben_Addresse);
        setSelectedSuggestion(suggestion);
      } else if (selectedInput === 'destinataire') {
        setDestinataireName(suggestion.Ben_Nom);
        setDestinataireAddress(suggestion.Ben_Addresse);
        setSelectedSuggestion(suggestion);
      }
    
      setSuggestions([]); // Clear suggestions
    };
    
    useEffect(() => {
      const fetchLastDeposits = async () => {
        try {
          const response = await fetch(`${API_URL}envoi/last5`);
          const data = await response.json();
          setLastDeposits(data);
        } catch (error) {
          console.error('Error fetching last deposits:', error);
        }
      };
    
      fetchLastDeposits(); // Fetch data initially
    
      const intervalId = setInterval(() => {
        fetchLastDeposits(); // Fetch data every 500ms
      }, 500);
    
      // Clear interval when component is unmounted
      return () => clearInterval(intervalId);
    }, []);
    
    // Envoi des depots vers database
   
    
    const handleEnvoiClick = async () => {
      console.log('Handling Envoi Click');
      try {
        // Verify expediteur and destinataire
        const expediteurExists = await verifyBeneficiaire(expediteurName, expediteurAddress);
        if (!expediteurExists) {
          toast.error('Expediteur inexistant');
          return;
        }
    
        const destinataireExists = await verifyBeneficiaire(destinataireName, destinataireAddress);
        if (!destinataireExists) {
          toast.error('Destinataire inexistant');
          return;
        }
    
        // Fetch expediteur group code
        const expediteurGrpCode = await fetchBeneficiaireGroupCode(expediteurName);
        if (!expediteurGrpCode) {
          toast.error('Erreur lors de la récupération du code de groupe pour l\'expediteur');
          return;
        }
    
        // Fetch agence nom
        const agenceNom = await fetchAgenceNom(expediteurGrpCode);
        if (!agenceNom) {
          alert('Agence nom not found for the expediteur');
          return;
        }
    
        // Prepare envoi data
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
        const envoiData = {
          Env_num: numero,
          Env_poids: poids,
          Env_exp: expediteurName,
          Env_dest: destinataireName,
          Env_taxe: montant, // Use 'montant' for taxes
          Env_date_depot: formattedDate.slice(0, 10),
          Env_agence_depot: agenceNom,
          registre_id: selectedRegister ? selectedRegister.id : null // Use selectedRegister ID if available
        };
    
        // Send envoi data
        await sendEnvoiData(envoiData);
    
        // Reset form
        setExpediteurName('');
        setExpediteurAddress('');
        setDestinataireName('');
        setDestinataireAddress('');
        setDestinataireTel('');
        setNumero('');
        setMontant('');
        setPoids('');
        setTaxes('');
        setSelectedSuggestion(null);
    
        toast.success('Dépôt effectué avec succès');
      } catch (error) {
        console.error('Error handling envoi:', error);
        toast.error('Une erreur est survenue lors du dépôt');
      }
    };
    

    const handleHistoriqueClick = () => {
      onHistoryClick();
    };

    return (
      <div className='depot'>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
      <h2>Particulier</h2>
     
      <button style={{padding:'15px', borderRadius:'4px', backgroundColor:'var(--button-blue-color)', color:'#fff', marginLeft:'auto'}} onClick={handleEnvoiClick}>
        <span>Deposer</span>
      </button>
        </div>
        <div>
      <label>registre :</label>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', textAlign:'center', width:'max-content  '}}>
          <span></span>
          <select
  value={selectedRegister ? selectedRegister.id : ''}
 onChange={(e) => {
  const selectedId = e.target.value;
  console.log('Selected Register ID:', selectedId); // Log selectedRegisterId here
  const selectedRegister = registers.find((register) => register.id === parseInt(selectedId));
  setSelectedRegister(selectedRegister);
}}

  style={{
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px'
  }}
>
  <option value=''>Select a register</option>
  {registers.map((register) => (
    <option key={register.id} value={register.id}>
      {register.nom}
    </option>
  ))}
</select>

      </div>
        </div>
      <div className='depot-input'>
        
  <div>
    <h2 style={{width:'100%', display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>Expediteur</h2>
    <input
      type="text"
      placeholder="Expediteur"
      value={selectedInput === 'expediteur' && selectedSuggestion ? selectedSuggestion.Ben_Nom : expediteurName}
      onChange={(e) => {
        setExpediteurName(e.target.value);
        setSelectedSuggestion(null);
        fetchBeneficiaireSuggestions(e.target.value);
        setSelectedInput('expediteur');
      }}
      style={{
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px'
      }}
    />
    {suggestions.length > 0 && selectedInput === 'expediteur' && (
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.Ben_Nom}
          </li>
        ))}
      </ul>
    )}
    <input
      type="text"
      placeholder="Address"
      value={expediteurAddress || ''}
      onChange={(e) => setExpediteurAddress(e.target.value)}
      style={{
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px'
      }}
    />
  </div>
  <div>
      <h2 style={{width:'100%', display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}} >AR</h2>
      <input
        type="text"
        placeholder="Destinataire"
        value={selectedInput === 'destinataire' && selectedSuggestion ? selectedSuggestion.Ben_Nom : destinataireName}
        onChange={(e) => {
          setDestinataireName(e.target.value);
          setSelectedSuggestion(null);
          fetchBeneficiaireSuggestions(e.target.value);
          setSelectedInput('destinataire');
        }}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      <input
        type="text"
        placeholder="Address"
        value={destinataireAddress}
        onChange={(e) => setDestinataireAddress(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
  </div>  
  
    <div>
    <h2 style={{width:'100%', display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}} >Destinataire</h2>
    <input
      type="text"
      placeholder="Destinataire"
      value={selectedInput === 'destinataire' && selectedSuggestion ? selectedSuggestion.Ben_Nom : destinataireName}
      onChange={(e) => {
        setDestinataireName(e.target.value);
        setSelectedSuggestion(null);
        fetchBeneficiaireSuggestions(e.target.value);
        setSelectedInput('destinataire');
      }}
      style={{
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px'
      }}
    />
    {suggestions.length > 0 && selectedInput === 'destinataire' && (
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.Ben_Nom}
          </li>
        ))}
      </ul>
    )}
    <input
      type="text"
      placeholder="Address"
      value={destinataireAddress}
      onChange={(e) => setDestinataireAddress(e.target.value)}
      style={{
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px'
      }}
    />
    <input
      className='bottom-input'
      type="text"
      placeholder='Tel if exterieur'
      value={destinataireTel}
      onChange={(e) => setDestinataireTel(e.target.value)}
      style={{
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px'
      }}
    />
  </div>
  <div>
      <h2 style={{display:'flex',width:'100%', textAlign:'center'}}><span>Détails du colis</span>
      <select
    style={{
      padding: '8px',
      marginLeft: 'auto',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    }}
  >
    <option value = '' > selectioner le type</option>
    <option value='option1'>Option 1</option>
    <option value='option2'>Option 2</option>
    <option value='option3'>Option 3</option>
  </select></h2>
      <input
        type='text'
        placeholder='Numero'
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      <input
        type='text'
        placeholder='Montant'
        value={taxes}
        onChange={(e) => setTaxes(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      <input
        className='bottom-input'
        type='text'
        placeholder='Poids'
        value={poids}
        onChange={(e) => setPoids(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
    
    </div>
</div>

      <div className='content-area-table'>
        <div className='data-table-info'>
        <h1 className="data-table-title" >Dernier dépôts</h1>
        <div className="data-table-diagram">
        <table style={{width:'100%', textAlign:'center'}}>
          <thead>
            <tr>
              <th>Numéro d'envoi</th>
              <th>Poids</th>
              <th>éxpediteur</th>
              <th>Destinataire</th>
              <th>Date de dépôt</th>
              <th>Agence</th>
            </tr>
          </thead>
          <tbody>
            {lastDeposits.map((deposit) => (
              <tr key={deposit.Env_num}>
                <td>{deposit.Env_num}</td>
                <td>{deposit.Env_poids} g </td>
                <td>{deposit.Env_exp}</td>
                <td>{deposit.Env_dest}</td>
                <td>{deposit.Env_date_depot}</td>
                <td>{deposit.Env_agence_depot}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>
      <ToastContainer />
    </div>    
    );
  };


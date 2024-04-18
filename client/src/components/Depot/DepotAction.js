import { API_URL } from "../user/constants";

export const handleEnvoiClick = async () => {
    console.log('Handling Envoi Click');
    try {
      const expediteurExists = await verifyBeneficiaire(expediteurName, expediteurAddress);

      if (!expediteurExists) {

        return;
      }

      const destinataireExists = await verifyBeneficiaire(destinataireName, destinataireAddress);

      if (!destinataireExists) {
        return;
      }
      const expediteurGrpCode = await fetchBeneficiaireGroupCode(expediteurName);

      if (!expediteurGrpCode) {
        return;
      }
      
      const agenceNom = await fetchAgenceNom(expediteurGrpCode);
      

      if (!agenceNom) {
        alert('Agence nom not found for the expediteur');
        return;
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

      const envoiData = {
        Env_num: numero,
        Env_poids: poids,
        Env_exp: expediteurName,
        Env_dest: destinataireName,
        Env_taxe: taxes,
        Env_date_depot: formattedDate.slice(0, 10),
        Env_agence_depot: agenceNom,
      };

      const response = await sendEnvoiData(envoiData);

      if (response && response.error) {
        throw new Error(`Failed to send envoi data: ${response.error}`);
      }

      console.log('Envoi added successfully!');

      // Reset state
      setExpediteurName('');
      setExpediteurAddress('');
      setDestinataireName('J');
      setDestinataireAddress('');
      setDestinataireTel('');
      setNumero('');
      setTaxes('');
      setPoids('');

    } catch (error) {
      console.error('Error handling envoi:', error);
    }
  };

  export const fetchBeneficiaireGroupCode = async (name) => {
    try {
      const response = await fetch(`${API_URL}benefs?Ben_Nom=${name}`);
      const beneficiaireData = await response.json();

      console.log(`Beneficiaire data for ${name}:`, beneficiaireData);

      if (beneficiaireData.length > 0) {
        const expediteurData = beneficiaireData.find(beneficiaire => beneficiaire.Ben_Nom === name);
        return expediteurData.Grp_code;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching beneficiaire data:', error);
      return null;
    }
  };

  //verification des baneficiaire expediteur et destinataire
  export const verifyBeneficiaire = async (name) => {
    try {
      const response = await fetch(`${API_URL}benefs?Ben_Nom=${name}`);
      const beneficiaireData = await response.json();
  
      console.log(`Verifying ${name}:`, beneficiaireData);
  
      const beneficiaireExists = beneficiaireData.some(beneficiaire => beneficiaire.Ben_Nom === name);
  
      if (beneficiaireExists) {
        console.log('Beneficiaire exists!');
        return true;
      } else {
        console.log('Beneficiaire does not exist.');
        return false;
      }
    } catch (error) {
      console.error('Error fetching beneficiaire data:', error);
      return false;
    }
  };
  


  export const fetchAgenceNom = async (Grp_code) => {
    try {
      const agenceResponse = await fetch(`${API_URL}agence`);
      const agenceData = await agenceResponse.json();
  
      console.log(`Agence data:`, agenceData);
  
      const matchedAgence = agenceData.find(agence => agence.Agence_code === Grp_code);
  
      if (!matchedAgence) {
        console.error(`No matching Agence for Grp_code: ${Grp_code}`);
        return null;
      }

      const agenceNom = matchedAgence.Agence_nom;
  
      if (!agenceNom) {
        console.error(`Agence nom not found for Agence_code: ${Grp_code}`);
        return null;
      }
  
      return agenceNom;
    } catch (error) {
      console.error('Error fetching agence nom:', error);
      return null;
    }
  };

  export const sendEnvoiData = async (envoiData) => {
    try {
      const response = await fetch(`${API_URL}envoi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(envoiData),
      });
  
      const responseData = await response.json();
  

      if (!response.ok) {
        console.error('Failed to send envoi data:', responseData.message);
        throw new Error(`Failed to send envoi data: ${responseData.message}`);
      }
  
      console.log('Envoi data sent successfully', responseData);
      console.log('Env_num:', envoiData.Env_num);
  
    
      if (responseData.Env_num !== null) {

        const historiqueData = {
          Env_num: envoiData.Env_num || '',
          HIst_evenement: 'EMA',
          Hist_date: envoiData.Env_date_depot || new Date().toISOString().slice(0, 19).replace("T", " "),
          Hist_etat: '1',
          Hist_agence: envoiData.Env_agence_depot || '',
        };
        

        const historiqueResponse = await fetch(`${API_URL}historique`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(historiqueData),
        });
  
        const parsedHistoriqueResponse = await historiqueResponse.json();
  
        if (!historiqueResponse.ok) {
          console.error('Failed to create historique entry:', parsedHistoriqueResponse.message);
          throw new Error(`Failed to create historique entry: ${parsedHistoriqueResponse.message}`);
        }
  
        console.log('Historique entry created successfully', parsedHistoriqueResponse);
  
        setSuccessPopup(true);
  
        setExpediteurName('');
        setExpediteurAddress('');
        setDestinataireName('');
        setDestinataireAddress('');
        setDestinataireTel('');
        setNumero('');
        setTaxes('');
        setPoids('');
      } else {
        console.error('Env_num is null in the response');
        throw new Error('Env_num is null in the response');
      }
    } catch (error) {
  
      console.error('Error handling envoi:', error);
    }
  };
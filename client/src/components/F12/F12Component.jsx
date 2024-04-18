import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import 'jspdf-autotable';
import { Container, Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import F12Table from './F12Table';
import { FaCircle } from 'react-icons/fa';
import { handlePreviewPDF } from './F12_pdf.Jsx';

const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  return `${protocol}//${hostname}:8081/`;
};

const API_URL = getBaseUrl();

export const F12Component = ({ lightMode }) => {
  const [historiqueData, setHistoriqueData] = useState([]);
  const [beneficiaryData, setBeneficiaryData] = useState([]);
  const [groupBy, setGroupBy] = useState('agence');
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [pdfContent, setPdfContent] = useState('');
  const [selectedAgence, setSelectedAgence] = useState(null);
  
  useEffect(() => {
    fetchHistoriqueData();
    fetchBeneficiaryData();
  }, []);

  const fetchHistoriqueData = async () => {
    try {
      const response = await fetch(`${API_URL}envoi`);
      const data = await response.json();
      setHistoriqueData(data);
    } catch (error) {
      console.error('Error fetching historique data:', error);
    }
  };

  const fetchBeneficiaryData = async () => {
    try {
      const response = await fetch(`${API_URL}benefs`);
      const data = await response.json();
      setBeneficiaryData(data);
    } catch (error) {
      console.error('Error fetching beneficiary data:', error);
    }
  };

  const organizeHistoriqueDataByBeneficiaryAddress = () => {
    const organizedData = {};

    historiqueData.forEach((envoi) => {
      const beneficiaryName = envoi.Env_dest;
      const beneficiaryAddress = getBeneficiaryAddress(beneficiaryName);

      if (!organizedData[beneficiaryAddress]) {
        organizedData[beneficiaryAddress] = [];
      }

      organizedData[beneficiaryAddress].push(envoi);
    });

    return organizedData;
  };

  const organizeHistoriqueDataByAgence = () => {
    const organizedData = {};

    historiqueData.forEach((envoi) => {
      const agence = envoi.Env_agence_depot;

      if (!organizedData[agence]) {
        organizedData[agence] = [];
      }

      organizedData[agence].push(envoi);
    });

    return organizedData;
  };

  const getBeneficiaryAddress = (beneficiaryName) => {
    const beneficiary = beneficiaryData.find((b) => b.Ben_Nom === beneficiaryName);
    return beneficiary ? beneficiary.Ben_Addresse : '';
  };

  const organizedData = groupBy === 'address' ? organizeHistoriqueDataByBeneficiaryAddress() : organizeHistoriqueDataByAgence();
4
const handlePreview = (groupKey) => {
  handlePreviewPDF(groupKey, organizedData, getBeneficiaryAddress);
};

  
  return (
    <div style={{ display: 'flex', gap:'20px' }}>
    <div style={{ flex: 1, background:'var(--secondary-color)', boxShadow:'var(--light-shadow1)', marginTop:'10px' ,padding:'15px'}}>
      {selectedAgence && (
        <div style={{color:'var(--base-text-color)'}}>
          <h2>{`bureau de deposition: ${selectedAgence} (${
            organizedData[selectedAgence].length !== 1
              ? `nombre de depots: ${organizedData[selectedAgence].length}`
              : 'nombre de depot: 1'
          })`}</h2>
          <button style={{padding:'15px' , borderRadius:'4px', color:'white', backgroundColor:'var(--button-blue-color)', marginTop:'10px'}} onClick={() => handlePreview(selectedAgence)}>Génerer liste F12</button>

          <F12Table organizedData={organizedData[selectedAgence]} groupBy={groupBy} getBeneficiaryAddress={getBeneficiaryAddress} />
        </div>
      )}
      
{!selectedAgence && (
  <div className='F12-hist'>
   Selectionez une liste
  </div>
)}
      

      {showPdfPreview && (
        <div className="pdf-preview-section">
          <iframe title="PDF Preview" src={pdfContent} width="100%" height="600px" />
          <button onClick={() => setShowPdfPreview(false)}>Close Preview</button>
        </div>
      )}
    </div>
    <div className='agence-sidebar' style={{width:'15%'}} >
        <h3>liste des bureaux: </h3>
      {Object.keys(organizedData).map((groupKey) => (
        <div key={groupKey} className='agence-item' style={{ gap: '5px' }}>
          <div
            className='agence-menu'
            style={{ padding: '15px', background: 'var(--secondary-color)', marginTop: '5px', gap: '5px', alignContent: 'center' ,alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setSelectedAgence(groupKey)}
          >
            <FaCircle size={'10px'} /> {groupKey} (
            {organizedData[groupKey].length !== 1 ? `nombre de depots: ${organizedData[groupKey].length}` : 'nombre de depot: 1'}
            )
          </div>
        </div>
      ))}

      </div>
  </div>
);
};


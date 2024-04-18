import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";


import { useState, useEffect } from "react";
const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  return `${protocol}//${hostname}:8081/`; // Assuming backend is always on port 8081
};

const API_URL = getBaseUrl();

const AreaTable = () => {

  const [lastDeposits, setLastDeposits] = useState([]);

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

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Derniers dépôts  </h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
             <tr>
        <th>éxpediteur</th>
        <th>Destinataire</th>
        <th >Numéro d'envoi</th>
        <th>Poids</th>
        <th style={{textAlign:'center'}} >Date de déposition</th>
        <th>Bureau de départ</th>
      </tr>
    </thead>
    <tbody>
      {lastDeposits.map((deposit) => (
        <tr key={deposit.Env_num}>
          <td>{deposit.Env_exp}</td>
          <td>{deposit.Env_dest}</td>
          <td>{deposit.Env_num}</td>
          <td>{deposit.Env_poids} g </td>
          <td style={{textAlign:'center'}}>{deposit.Env_date_depot}</td>
          <td style={{textAlign:'center', width:'250px'}}>{deposit.Env_agence_depot}</td>
        </tr>
      ))}
    </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;

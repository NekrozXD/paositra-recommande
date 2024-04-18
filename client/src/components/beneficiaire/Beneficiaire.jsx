import React, { useEffect, useState } from 'react';
import { API_URL } from '../../components/user/constants'
import './Beneficiaire.scss'

export const BeneficiaireComponent = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetch(`${API_URL}combinedData`)
      .then(response => response.json())
      .then(data => {
        console.log('Combined Data:', data);
        const sortedData = data.sort((a, b) => (a.Grp_code > b.Grp_code) ? 1 : -1);
        setCombinedData(sortedData);
      })
      .catch(error => console.error('Error fetching combined data:', error));
  }, []);

  useEffect(() => {
    if (combinedData.length > 0 && filterValue !== '') {
      const filtered = combinedData.filter(item => item.Grp_code === filterValue);
      setFilteredData(filtered);
    } else {
      setFilteredData(combinedData);
    }
  }, [combinedData, filterValue]);

  // Group the data by grp_code
  const groupedData = {};
  combinedData.forEach(item => {
    if (!groupedData[item.Grp_code]) {
      groupedData[item.Grp_code] = [];
    }
    groupedData[item.Grp_code].push(item);
  });

  return (
    <div className='beneficiaire'>
      <h1>Liste des beneficiaires </h1>
      <div>
        <label htmlFor="groupCodeFilter">Filter by Group Code: </label>
        <input
          type="text"
          id="groupCodeFilter"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      {Object.keys(groupedData).map((grpCode, index) => (
        <div key={index}>
        <h2>{grpCode} : {groupedData[grpCode][0].Grp_nom}</h2>
          <table className='table' style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
            <thead >
              <tr>
                <th>select</th>
                <th>id</th>
                <th>CIN</th>
                <th>Beneficiaire</th>
                <th>Adresse</th>
                <th>code</th>
                <th>action</th>
                <th>details</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[grpCode].map((item, index) => (
                <tr key={index}>
                    <td>
                        <input
                            type="checkbox"
                            checked={false}
                        />
                    </td>
                    <td>{item.Ben_id}</td>
                <td>{item.Ben_code}</td>
                  <td >{item.Ben_Nom}</td>
                  <td>{item.Ben_Addresse}</td>
                  <td>{item.Grp_code}</td>
                  <td style={{width:'200px', gap:'15px'}}>
                    <button style={{padding:'15px' , backgroundColor:'red', color:'white' ,borderRadius:'4px'}}>delete</button>
                    <button style={{padding:'15px', backgroundColor:'var(--button-blue-color)', color:'white', marginLeft:'15px',borderRadius:'4px'}}>edit</button>
                    
                  </td>
                  <td style={{width:'150px'}}>
                  <button style={{ backgroundColor: 'green', color: 'white',padding:'15px', borderRadius:'4px'  }} onClick={() => showDetail(group)}>
                                      Voir details
                                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {Object.keys(groupedData).length === 0 && <p>No data available</p>}
    </div>
  );
};

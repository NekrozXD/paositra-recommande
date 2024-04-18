import React from 'react';

const F12Table = ({ organizedData, groupBy, getBeneficiaryAddress }) => (
  <div className='groupement' style={{padding:'15px'}} >
    <table className='' style={{textAlign:'center', width:'100%', borderCollapse:'collapse'}}>
      <thead>
        <tr>
          <th>Expediteur</th>
          <th>Destinataire</th>
          <th>Details</th>
          <th>Date</th>
          <th>{groupBy === 'address' ? 'Agence' : 'Address'}</th>
        </tr>
      </thead>
      <tbody>
        {organizedData
          .sort((a, b) => new Date(a.Env_date_depot) - new Date(b.Env_date_depot))
          .map((envoi, index) => (
            <tr key={index}>
              <td>{envoi.Env_exp}</td>
              <td>{envoi.Env_dest}</td>
              <td>{`N°: ${envoi.Env_num}, Poids: ${envoi.Env_poids}g , Taxe: ${envoi.Env_taxe} Ar`}</td>
              <td>
                {envoi.Env_date_depot &&
                  new Date(envoi.Env_date_depot).toLocaleDateString('en-US', {
                    timeZone: 'Africa/Nairobi',
                  })}
              </td>
              <td>{groupBy === 'address' ? envoi.Env_agence_depot : getBeneficiaryAddress(envoi.Env_dest)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default F12Table;

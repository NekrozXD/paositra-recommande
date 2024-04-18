import React from 'react'

const GroupementTable = ({ groups, selectedGroupIds, handleCheckboxChange, handleEditGroup, handleDeleteGroup }) =>{
  return (
    <table className="" style={{textAlign:'center', width:'100%', borderCollapse:'collapse'}}>
                <thead>
                    <tr>
                        <th>select</th>
                        <th>Nom</th>
                        <th>Code</th>
                        <th>Adresse</th>
                        <th>type</th>
                        <th>nombre de bénéficiaires</th>
                        <th>Action</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.Grp_id}>
                                <td>
                                <input
                            type="checkbox"
                            checked={selectedGroupIds.includes(group.Grp_id)}
                            onChange={() => handleCheckboxChange(group.Grp_id)}
                            />

                        </td>
                            <td>{group.Grp_nom}</td>
                            <td>{group.Grp_code}</td>
                            <td>{group.Grp_adresse}</td>
                            <td>{group.Grp_type}</td>
                            <td width={'150px'}>150</td>
                            <td style={{gap:'5px', width:'200px'}} className="col-md-2">
                            <button style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' ,padding:'15px', borderRadius:'4px' }} onClick={() => handleDeleteGroup(group.Grp_id)}>
                                      Supprimer
                                  </button>
                                  <button style={{ backgroundColor: 'var(--button-blue-color)', color: 'white', marginRight: '5px' ,padding:'15px', borderRadius:'4px' }} onClick={() => handleEditGroup(group)}>
                                      Modifier
                                  </button>    
                            </td>
                            <td>
                            <button style={{ backgroundColor: 'green', color: 'white',padding:'15px', borderRadius:'4px'  }} onClick={() => showDetail(group)}>
                                      Voir listes
                                  </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
  )
}

export default GroupementTable
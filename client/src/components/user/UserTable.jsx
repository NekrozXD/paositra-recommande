import { Button, Form } from "react-bootstrap";
import { FaCheckCircle,FaEdit, FaTrash, FaInfoCircle,FaTimesCircle } from "react-icons/fa";

export const UserTable = ({ users, selectedUsers, handleCheckboxChange, handleDelete, handleUpdateValidation }) => {
    return (
        <table className='user' style={{ borderCollapse: 'collapse', width: '80vw', textAlign: 'center', background:'var(--secondary-color)', alignItems:'center', justifyContent:'center',marginTop:'15px', width:'100%' }}>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Etat</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(users) && users.map((user) => (
                    <tr key={user.Us_id}>
                        <td>
                            {user.Us_matricule !== '21450' && (
                                <Form.Check
                                    type='checkbox'
                                    checked={selectedUsers.includes(user.Us_id)}
                                    onChange={(e) => handleCheckboxChange(user.Us_id, e.target.checked)}
                                />
                            )}
                        </td>
                        <td>{user.Us_matricule}</td>
                        <td>{user.Us_nom}</td>
                        <td>{user.Us_login}</td>
                        <td>{user.Us_mail}</td>
                        <td>{user.validate === 1 ? 'Activated' : 'Blocked'}</td>
                        <td>
                            {user.Us_nom === 'RAZAFIMAHATRATRA Dimbiniaina Fitahiana' ? (
                                <span>Super Admin</span>
                            ) : (   
                                <div style={{gap:'5px',alignItems:'center', display:'flex',justifyContent:'center'}}> 
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: user.validate === 1 ? '#dc3545' : '#28a745',
                                            color: 'white',
                                            borderRadius: '16px',
                                            padding: '5px',
                                            marginRight: '10px',
                                            height: '50px',
                                            width: '50px',
                                        }}
                                        onClick={() =>
                                            handleUpdateValidation(user.Us_id, user.validate === 1 ? 0 : 1)
                                        }
                                    >
                                        {user.validate === 1 ?<FaTimesCircle size="1x" /> : <FaCheckCircle />}
                                    </Button>
                                    <Button variant="contained" style={{backgroundColor:'#fef102', borderRadius:'16px',color:'black', border:'none',padding:'5px', height:'50px', width:'50px'}}><FaEdit fontSize={'25px'}/></Button>
                                    <span>&nbsp;</span>
                                    <Button variant="contained" style={{backgroundColor:'#dc3545', borderRadius:'16px',color:'white', border:'none',padding:'5px', height:'50px',width:'50px'}} onClick={() => handleDelete(user.Us_id)}> <FaTrash/></Button>
                                    <span>&nbsp;</span>
                                    <Button variant="contained" style={{backgroundColor:'var(--button-blue-color)', borderRadius:'16px',color:'white', border:'none',padding:'5px', height:'50px',width:'50px'}} > <FaInfoCircle/></Button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
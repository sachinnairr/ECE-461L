import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function LoginPage() {
    const [existingUsername, setExistingUsername] = React.useState("");
    const [existingPassword, setExistingPassword] = React.useState("");
    const [existingId, setExistingId] = React.useState("");
    const [newUsername, setNewUsername] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newId, setNewId] = React.useState("");

    function login(username, password, id){
        //TODO
    }
    function createAccount(username, password, id){
        //TODO
    }
    return(
        <div>
            <div className="field-set">
            <h2 className="field-set-title">Existing User</h2>
                <div className='field'>
                    <div className='field-label'>Enter Username</div>
                 <TextField id="outlined-basic" label="" variant="outlined" value={existingUsername} onChange={(event) => setExistingUsername(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Enter Password"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingPassword} onChange={(event) => setExistingPassword(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"User ID"}</div>
                     <TextField id="outlined-basic" label="" variant="outlined" value={existingId} onChange={(event) => setExistingId(event.target.value)}/>
                </div>
                <div><Button variant="contained" onClick={(event) => login(existingUsername, existingPassword, existingId)}>Login</Button></div>
            </div>
           <div className="field-set">
            <h2 className="field-set-title">Create Account</h2>
            <div className='field'>
                    <div className='field-label'>{"Enter Username"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={newUsername} onChange={(event) => setNewUsername(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Enter Password"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={newPassword} onChange={(event) => setNewPassword(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Re-Enter Password"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined"/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"User ID"}</div>
                     <TextField id="outlined-basic" label="" variant="outlined" value={newId} onChange={(event) => setNewId(event.target.value)}/>
                </div>
                <div><Button variant="contained" onClick={(event) => createAccount(newUsername, newPassword, newId)}>Create Account</Button></div>
            </div>
        </div>
        
    );
}
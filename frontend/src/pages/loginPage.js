import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function LoginPage() {
    const [existingFirstname, setExistingFirstname] = React.useState("");
    const [existingLastname, setExistingLastname] = React.useState("");
    const [existingPassword, setExistingPassword] = React.useState("");
    const [existingId, setExistingId] = React.useState("");
    const [newFirstname, setNewFirstname] = React.useState("");
    const [newLastname, setNewLastname] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newId, setNewId] = React.useState("");
    const [message, setMessage] = React.useState("Message Goes Here")

    function login(firstname, lastname, password, id){
        const data = { username: {
            "first": firstname,
            "last": lastname
        }, 
                       password: password,
                       userid: id };
        
        fetch('http://127.0.0.1:80/users/login', {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.text())
        .then((text) => {
        console.log(text)
        setMessage(text)
      });
    }
    
    function createAccount(firstname, lastname, password, id){
        const data = { username: {
            "first": firstname,
            "last": lastname
        }, 
                       password: password,
                       userid: id };
        
        fetch('http://127.0.0.1:80/users', {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.text())
        .then((text) => {
        console.log(text)
        setMessage(text)
    });
    }

    return(
        <div>
            <div className="field-set">
            <h2 className="field-set-title">Existing User</h2>
                <div className='field'>
                    <div className='field-label'>Enter First Name</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingFirstname} onChange={(event) => setExistingFirstname(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Enter Last Name"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingLastname} onChange={(event) => setExistingLastname(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Enter Password"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingPassword} onChange={(event) => setExistingPassword(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"User ID"}</div>
                     <TextField id="outlined-basic" label="" variant="outlined" value={existingId} onChange={(event) => setExistingId(event.target.value)}/>
                </div>
                <div><Button variant="contained" onClick={(event) => login(existingFirstname, existingLastname, existingPassword, existingId)}>Login</Button></div>
            </div>
           <div className="field-set">
            <h2 className="field-set-title">Create Account</h2>
            <div className='field'>
                <div className='field-label'>{"Enter First Name"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={newFirstname} onChange={(event) => setNewFirstname(event.target.value)}/>
            </div>
                <div className='field'>
                    <div className='field-label'>{"Enter Last Name"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={newLastname} onChange={(event) => setNewLastname(event.target.value)}/>
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
                <div><Button variant="contained" onClick={(event) => createAccount(newFirstname, newLastname, newPassword, newId)}>Create Account</Button></div>
            </div>
            <div className="field-set">
                <h2 className="field-set-title">Server Response</h2>
                <div className='field'>
                    <div className='field-label'>{message}</div>
                </div>
            </div>
        </div>
        
    );
}
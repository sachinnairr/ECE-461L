import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function LoginPage(props) {
    const [existingPassword, setExistingPassword] = React.useState("");
    const [existingId, setExistingId] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("")
    const [newId, setNewId] = React.useState("");
    const [message, setMessage] = React.useState("Message Goes Here");
    const [toggle1, setToggle1] = React.useState(false);
    const [toggle2, setToggle2] = React.useState(false);

    function login(password, id){
        const data = {
                       password: password,
                       userid: id };
        
        fetch('https://test461.herokuapp.com/users/login', {
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
        if(text === "Correct password"){
            props.handler(id) 
        }
        setMessage(text)
      }); 
    }
    function createAccount(username, repassword, password, id){
        if(repassword !== password){
            setMessage("Passwords do not match");
        }else{
             const data = { username: username,
                       password: password,
                       userid: id };
        
        fetch('https://test461.herokuapp.com/users', {
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
       
    }
    return(
        <div>
            <div className="field-set">
            <h2 className="field-set-title">Existing User</h2>
                <div className='field'>
                    <div className='field-label'>{"User ID"}</div>
                     <TextField id="outlined-basic" label="" variant="outlined" value={existingId} onChange={(event) => setExistingId(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Enter Password"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" type={toggle1 ? "text" : "password"} value={existingPassword} onChange={(event) => setExistingPassword(event.target.value)}/>
                </div>
                <Stack spacing={2} direction="row">
                <div><Button variant="contained" onClick={(event) => setToggle1(!toggle1) }>{toggle1 ? "Hide Password" : "Show Password"}</Button></div>
                <div><Button variant="contained" onClick={(event) => login(existingPassword, existingId)}>Login</Button></div>
                </Stack>
            </div>
           <div className="field-set">
            <h2 className="field-set-title">Create Account</h2>
                <div className='field'>
                    <div className='field-label'>{"Enter Username"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div> 
                <div className='field'>
                    <div className='field-label'>{"User ID"}</div>
                     <TextField id="outlined-basic" label="" variant="outlined" value={newId} onChange={(event) => setNewId(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Enter Password"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" type={toggle2 ? "text" : "password"} value={newPassword} onChange={(event) => setNewPassword(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Re-Enter Password"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" type={toggle2 ? "text" : "password"} value={rePassword} onChange={(event) => setRePassword(event.target.value)}/>
                </div>
                <Stack spacing={2} direction="row">
                     <div><Button variant="contained" onClick={(event) => setToggle2(!toggle2) }>{toggle2 ? "Hide Password" : "Show Password"}</Button></div>
                    <div><Button variant="contained" onClick={(event) => createAccount(username, newPassword, rePassword, newId)}>Create Account</Button></div>
                </Stack>
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
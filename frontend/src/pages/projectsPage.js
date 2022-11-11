import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function ProjectsPage(props) {
    const [existingId, setExistingId] = React.useState("");
    const [newName, setNewName] = React.useState("");
    const [newDescription, setNewDescription] = React.useState("");
    const [newId, setNewId] = React.useState("");
    const [authUsers, setAuthUsers] = React.useState("");
    const [response, setResponse] = React.useState("No Response Yet");

    function existingProject(id){
        const data = { projectId: id,
            userId: props.userId
         };
        
        fetch('http://127.0.0.1:80/projects/get', {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.text())
        .then((text) => {
        if(text === "Project Accessed") props.handler(id, newName, newDescription, authUsers);
        console.log(text)
        setResponse(text)
      });
    }
    function createProject(name, description, id, authusers){
        const authorized = authusers.split(" ");
        const data = { ID: id,
            Name: name,
            Description : description,
            AuthorizedUsers : authorized
        };

        fetch('http://127.0.0.1:80/projects', {
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
        setResponse(text)
      });
    }
    return(
        <div>
            <div className="field-set">
                <h2 className="field-set-title">{"Use Existing Project"}</h2>
                <div className='field'>
                    <div className='field-label'>{"Enter Project ID"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingId} onChange={(event) => setExistingId(event.target.value)}/>
                </div>
                <div><Button variant="contained" onClick={(event) => existingProject(existingId)}>Use Project</Button></div>
            </div>

            <div className="field-set">
                <h2 className="field-set-title">{"Create Project"}</h2>
                <div className='field'>
                    <div className='field-label'>{"Name"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={newName} onChange={(event) => setNewName(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Description"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={newDescription} onChange={(event) => setNewDescription(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Project ID"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={newId} onChange={(event) => setNewId(event.target.value)}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Authorized Users (Separate with a space)"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={authUsers} onChange={(event) => setAuthUsers(event.target.value)}/>
                </div>
                <div><Button variant="contained" onClick={(event) => createProject(newName, newDescription, newId, authUsers)}>Create Project</Button></div>
            </div>

            <div className="field-set">
                <h2 className="field-set-title">Server Response</h2>
                <div className='field'>
                    <div className='field-label'>{response}</div>
                </div>
            </div>
        </div>
    );
}
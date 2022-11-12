import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function ProjectsPage(props) {
    const [existingId, setExistingId] = React.useState(props.pid);
    const [existingName, setExistingName] = React.useState(props.pname);
    const [existingDescription, setExistingDescription] = React.useState(props.pdes);
    const [existingUsers, setExistingUsers] = React.useState(props.pauth);
    const [newName, setNewName] = React.useState("");
    const [newDescription, setNewDescription] = React.useState("");
    const [newId, setNewId] = React.useState("");
    const [newAuthUsers, setNewAuthUsers] = React.useState("");
    const [response, setResponse] = React.useState("No Response Yet");
    const [flag, setFlag] = React.useState(props.projFlag);
    function flagHandler(flag){
        setFlag(flag)
        props.handler2(flag)
        if(!flag) props.handler("","","","")
    }
    let projectBox;
    if(flag){
        projectBox = 
                <div className="field-set">
            <h2 className="field-set-title">{"Current Project"}</h2>
            <div className='field'>
                    <div className='field-label'>{"Name"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingName}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Description"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingDescription}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Project ID"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingId}/>
                </div>
                <div className='field'>
                    <div className='field-label'>{"Authorized Users"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingUsers}/>
                </div>
                <div><Button variant="contained" onClick={(event) => flagHandler(false)}>Exit Project</Button></div>
           
             </div>   
        }else{
            projectBox = <></>
        }
    
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
        if(text === "Project Accessed"){
            getProject(id)
        }
        console.log(text)
        setResponse(text)
      });
    }

    function getProject(id){
        const data = { projectId: id
         };

        fetch('http://127.0.0.1:80/projects/getID', {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.json())
        .then((json) => {
            flagHandler(true)
            console.log(json)
            props.handler(json.ID, json.Name, json.Description, json.AuthorizedUsers)
            setExistingUsers(json.AuthorizedUsers)
            setExistingId(json.ID)
            setExistingName(json.Name)
            setExistingDescription(json.Description)
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
    let existingBox;
    let createBox;
    let resp;
    if(flag){
        existingBox = <></>
        createBox = <></>
        resp = <></>
    }else{
        existingBox =  <div className="field-set">
                <h2 className="field-set-title">{"Use Existing Project"}</h2>
                <div className='field'>
                    <div className='field-label'>{"Enter Project ID"}</div>
                    <TextField id="outlined-basic" label="" variant="outlined" value={existingId} onChange={(event) => setExistingId(event.target.value)}/>
                </div>
                <div><Button variant="contained" onClick={(event) => existingProject(existingId)}>Use Project</Button></div>
            </div>
        createBox = <div className="field-set">
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
                    <TextField id="outlined-basic" label="" variant="outlined" value={newAuthUsers} onChange={(event) => setNewAuthUsers(event.target.value)}/>
                </div>
                <div><Button variant="contained" onClick={(event) => createProject(newName, newDescription, newId, newAuthUsers)}>Create Project</Button></div>
            </div>
        resp = <div className="field-set">
        <h2 className="field-set-title">Server Response</h2>
        <div className='field'>
            <div className='field-label'>{response}</div>
        </div>
    </div>
    }
    return(
        <div>
            {existingBox}
            {projectBox}
            {createBox}
            {resp}
        </div>
    );
}
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function ProjectsPage() {
    const [existingId, setExistingId] = React.useState("");
    const [newName, setNewName] = React.useState("");
    const [newDescription, setNewDescription] = React.useState("");
    const [newId, setNewId] = React.useState("");
    function existingProject(id){
        //TODO
    }
    function createProject(name, description, id){
        //TODO
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
                <div><Button variant="contained" onClick={(event) => createProject(newName, newDescription, newId)}>Create Project</Button></div>
            </div>
        </div>
    );
}
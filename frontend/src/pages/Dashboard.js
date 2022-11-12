import React from 'react';
import TitleBox from '../components/titleBox';
import "../styles.css";
import LoginPage from './loginPage';
import ProjectsPage from './projectsPage';
import HardwarePage from './hardwarePage';

export default function Dashboard() {
    const [state, setState] = React.useState("Login");
    console.log(state);
    let buttons;
    let page;
const [username, setUsername] = React.useState("Not Logged In");
const [projectId, setProjectId] = React.useState("No Project ID");
const [projectName, setProjectName] = React.useState("No Project Name");
const [projectDescription, setProjectDescription] = React.useState("No Project Description");
const [projectAuthorized, setProjectAuthorized] = React.useState("No Authorized Users")
function setHandler(arg){
    if(arg==="Login") setState("Login");
    if(arg==="Manage Projects" && username !=="Not Logged In")setState("Manage Projects");
    if(arg==="Manage Hardware" && username !=="Not Logged In" && projectId !== "No Project ID")setState("Manage Hardware");
}
const loginHandler = (user) => {
    setUsername(user);
}
const projectHandler = (id, name, description, authorized) => {
    setProjectId(id);
    setProjectName(name);
    setProjectDescription(description);
    setProjectAuthorized(authorized);
}
if(state==="Login"){
     buttons = <div className='nav-box'>
    <div className='nav-clicked' onClick={(e) => setHandler("Login")}>Login</div>
    <div className='nav-section' onClick={(e) => setHandler("Manage Projects")}>Manage Projects</div>
    <div className='nav-section' onClick={(e) => setHandler("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <LoginPage handler={loginHandler}/>
}
if(state==="Manage Projects"){
     buttons = <div className='nav-box'>
    <div className='nav-section' onClick={(e) => setHandler("Login")}>Login</div>
    <div className='nav-clicked' onClick={(e) => setHandler("Manage Projects")}>Manage Projects</div>
    <div className='nav-section' onClick={(e) => setHandler("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <ProjectsPage handler={projectHandler} userId={username}/>
}
if(state==="Manage Hardware"){
     buttons = <div className='nav-box'>
    <div className='nav-section' onClick={(e) => setHandler("Login")}>Login</div>
    <div className='nav-section' onClick={(e) => setHandler("Manage Projects")}>Manage Projects</div>
    <div className='nav-clicked' onClick={(e) => setHandler("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <HardwarePage/>
}

    // if(username === "Not Logged In"){
    //     return(
    //         <div>
    //             <TitleBox title="Login"/>
    //             <div className='nav-box'>
    //                 <div className='nav-clicked' onClick={(e) => setState("Login")}>Login</div>
    //                 <div className='nav-section' onClick={(e) => setState("Manage Projects")}>Manage Projects</div>
    //                 <div className='nav-section' onClick={(e) => setState("Manage Hardware")}>Manage Hardware</div>
    //             </div>
    //             <LoginPage handler={loginHandler}/>
    //             <p>User ID: {username}</p>
    //         </div>
    //     );
    // }else{
        return(
        <div>
            <TitleBox title={state}/>
            {buttons}
            {page}
            <p>User ID: {username}</p>
            <p>Project ID: {projectId}</p>
        </div>
    );
    
    
}
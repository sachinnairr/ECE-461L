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
const [projectId, setProjectId] = React.useState("");
const [projectName, setProjectName] = React.useState("No Project Name");
const [projectDescription, setProjectDescription] = React.useState("No Project Description");
const [projectAuthorized, setProjectAuthorized] = React.useState("No Authorized Users")
const [projectFlag, setprojectFlag] = React.useState(false);
const [loginFlag, setLoginFlag] = React.useState(false);
function setHandler(arg){
    if(arg==="Login") setState("Login");
    if(arg==="Manage Projects" && username !=="Not Logged In")setState("Manage Projects");
    if(arg==="Manage Hardware" && username !=="Not Logged In" && projectId !== "")setState("Manage Hardware");
}
const flagHandler = (flag) => {
    setprojectFlag(flag);
}
const flagHandler2 = (flag) => {
    setLoginFlag(flag);
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
    page = <LoginPage username={username} handler={loginHandler} loginFlag={loginFlag} handler2={flagHandler2}/>
}
if(state==="Manage Projects"){
     buttons = <div className='nav-box'>
    <div className='nav-section' onClick={(e) => setHandler("Login")}>Login</div>
    <div className='nav-clicked' onClick={(e) => setHandler("Manage Projects")}>Manage Projects</div>
    <div className='nav-section' onClick={(e) => setHandler("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <ProjectsPage pid={projectId} pname={projectName} pdes={projectDescription} pauth={projectAuthorized} handler={projectHandler} userId={username} projFlag={projectFlag} handler2={flagHandler}/>
}
if(state==="Manage Hardware"){
     buttons = <div className='nav-box'>
    <div className='nav-section' onClick={(e) => setHandler("Login")}>Login</div>
    <div className='nav-section' onClick={(e) => setHandler("Manage Projects")}>Manage Projects</div>
    <div className='nav-clicked' onClick={(e) => setHandler("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <HardwarePage/>
}
        return(
        <div>
            <TitleBox title={state} username={username}/>
            {buttons}
            {page}
        </div>
    );
    
    
}
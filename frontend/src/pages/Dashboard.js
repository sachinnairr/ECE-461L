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
const [project, setProject] = React.useState("No Project");


const loginHandler = (user) => {
    setUsername(user);
}
const projectHandler = (project) => {
    setProject(project);
}
if(state==="Login"){
     buttons = <div className='nav-box'>
    <div className='nav-clicked' onClick={(e) => setState("Login")}>Login</div>
    <div className='nav-section' onClick={(e) => setState("Manage Projects")}>Manage Projects</div>
    <div className='nav-section' onClick={(e) => setState("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <LoginPage handler={loginHandler}/>
}
if(state==="Manage Projects"){
     buttons = <div className='nav-box'>
    <div className='nav-section' onClick={(e) => setState("Login")}>Login</div>
    <div className='nav-clicked' onClick={(e) => setState("Manage Projects")}>Manage Projects</div>
    <div className='nav-section' onClick={(e) => setState("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <ProjectsPage handler={projectHandler} userId={username}/>
}
if(state==="Manage Hardware"){
     buttons = <div className='nav-box'>
    <div className='nav-section' onClick={(e) => setState("Login")}>Login</div>
    <div className='nav-section' onClick={(e) => setState("Manage Projects")}>Manage Projects</div>
    <div className='nav-clicked' onClick={(e) => setState("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <HardwarePage/>
}

    if(username === "Not Logged In"){
        return(
            <div>
                <TitleBox title="Login"/>
                <div className='nav-box'>
                    <div className='nav-clicked' onClick={(e) => setState("Login")}>Login</div>
                    <div className='nav-section' onClick={(e) => setState("Manage Projects")}>Manage Projects</div>
                    <div className='nav-section' onClick={(e) => setState("Manage Hardware")}>Manage Hardware</div>
                </div>
                <LoginPage handler={loginHandler}/>
                <p>Logged in as: {username}</p>
                <p>Accessing project: {project}</p>
            </div>
        );
    }else{
        return(
        <div>
            <TitleBox title={state}/>
            {buttons}
            {page}
            <p>Logged in as: {username}</p>
            <p>Accessing project: {project}</p>
        </div>
    );
    }
    
}
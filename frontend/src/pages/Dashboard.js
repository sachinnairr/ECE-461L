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
if(state=="Login"){
     buttons = <div className='nav-box'>
    <div className='nav-clicked' onClick={(e) => setState("Login")}>Login</div>
    <div className='nav-section' onClick={(e) => setState("Manage Projects")}>Manage Projects</div>
    <div className='nav-section' onClick={(e) => setState("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <LoginPage/>
}
if(state=="Manage Projects"){
     buttons = <div className='nav-box'>
    <div className='nav-section' onClick={(e) => setState("Login")}>Login</div>
    <div className='nav-clicked' onClick={(e) => setState("Manage Projects")}>Manage Projects</div>
    <div className='nav-section' onClick={(e) => setState("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <ProjectsPage/>
}
if(state=="Manage Hardware"){
     buttons = <div className='nav-box'>
    <div className='nav-section' onClick={(e) => setState("Login")}>Login</div>
    <div className='nav-section' onClick={(e) => setState("Manage Projects")}>Manage Projects</div>
    <div className='nav-clicked' onClick={(e) => setState("Manage Hardware")}>Manage Hardware</div>
    </div>
    page = <HardwarePage/>
}
    return(
        <div>
            <TitleBox title={state}/>
            {buttons}
            {page}
        </div>
    );
}
// import React from 'react';
// export default function HardwarePage() {
//     return(
//         <div>
//         </div>
//     );
// }

import React from 'react';
import '../projects2.css';

const PROJ_NAME = 0;
const USER = 1;
const HW1_AVAIL = 2;
const HW1_CAP = 3;
const HW2_AVAIL = 4;
const HW2_CAP = 5;

function hardwarePage() {
	return (
		<div className="project2">
			<header className="App-header">
				<Projects />
			</header>
		</div>
	);
}

export default hardwarePage;

class Projects extends React.Component {
	render() {
		return (
			<div className="projectWrap">
				<p className="projectTitle">Projects</p>
				<ProjectData />
				<div className="emptySpace" />
			</div>
		)
	}
}

class ProjectData extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currProjectName: "",
			currProjectUser: "",
			project_list: []
		};

		//this.state.project_list.push([0, "Project", "User 1", "HWSet1: 0/100", "HWSet2: 0/100"])
	}

	renderProject(i, proj, usr, hw1, hw2) {
		return (
			<Project
				key={i.toString()}
				idx={i}
				Name={proj}
				User={usr}
				HWSet1={hw1}
				HWSet2={hw2}
				onCheckInClick={() => this.handleCheckIn(i)}
				onCheckOutClick={() => this.handleCheckOut(i)}
			/>
		)
	}

	renderNewProject() {
		return (
			<ProjectAdder
				onNewProjectClick={() => this.handleNewProject()}
				onNewProjectName={() => this.handleNewProjectName()}
				onNewProjectUser={() => this.handleNewProjectUser()}
			/>
		)
	}

	render() {
		const new_project_list = []
		const project_list = this.state.project_list.slice()
		for(let i = 0; i < project_list.length; i++) {
			const project_data = project_list[i];
			new_project_list.push(this.renderProject(project_data[0],
				project_data[1],
				project_data[2],
				project_data[3],
				project_data[4]))
		}
		return (
			<div>
				{new_project_list}
				<div className="emptySpace" />
				{this.renderNewProject()}
			</div>
		)
	}


	handleCheckIn(i) {
		const project_list = this.state.project_list.slice();

		const check_in_val = document.getElementById("check_in:" + project_list[i][1]).value;
		if(check_in_val !== "" && !isNaN(check_in_val)) {


			project_list[i][3] = "HWSet 1: " + check_in_val + "/100";

			this.setState({
				project_list: project_list
			});

			document.getElementById("check_in:" + project_list[i][1]).value = "";
		}

		GetCheckInData(project_list[i], parseInt(check_in_val));
	}

	handleCheckOut(i) {
		const project_list = this.state.project_list.slice();
		project_list[i][3] = "HWSet 1: 0/100";
		this.setState({
			project_list: project_list
		});
	}

	handleNewProject() {
		const projectName = this.state.currProjectName;
		const projectUser = this.state.currProjectUser;
		if (typeof projectName === 'string' && typeof projectUser === 'string') {
			if (projectName.trim() !== '' && projectUser.trim() !== '') {
				const project_list = this.state.project_list.slice();
				project_list.push([project_list.length, projectName, projectUser, "HWSet 1: 0/100", "HWSet 2: 0/100"]);
				this.setState({
					project_list: project_list,
				})
				document.getElementById("newProjectName").value = "";
				document.getElementById("newProjectUser").value = "";
			}
		}
	}

	handleNewProjectName() {
		var newProjectName = document.getElementById("newProjectName").value;
		this.setState({
			currProjectName: newProjectName
		})
	}

	handleNewProjectUser() {
		var newProjectUser = document.getElementById("newProjectUser").value;
		this.setState({
			currProjectUser: newProjectUser
		})
	}

}


async function GetCheckInData(project_list, val) {

	const newData = {"HWSet1": val, "HWSet2": 50};
	console.log(newData);

	return newData;
}


function Project(props) {
	return (
		<div className="project">
			{/* Title */}
			<div className="column">
				<p className="projectName">{props.Name}</p>
			</div>
			{/* Users with Access */}
			<div className="column">
				<p className="user">{props.User}</p>
			</div>
			{/* Sets available */}
			<div className="column">
				<p className="hwDescription">{props.HWSet1}</p>
				<p className="hwDescription">{props.HWSet2}</p>
			</div>
			{/* Select HW */}
			<div className="column">
				<p className="hwDescription">Select HWSet:</p>
				<select className="hwSelect" name="hwset" id="hwset">
					<option value="hws1">HWSet 1</option>
					<option value="hws1">HWSet 2</option>
				</select>
			</div>
			{/* Check In */}
			<div className="column">
				<input className="hwInput"
					id={"check_in:" + props.Name}
					type="text"
					placeholder="Enter Value" />
				<button className="checkBtn"
					type="button"
					onClick={props.onCheckInClick} >
					Check In
				</button>
			</div>
			{/* Check Out*/}
			<div className="column">
				<input className="hwInput"
					id={"check_out:" + props.Name}
					type="text"
					placeholder="Enter Value" />
				<button className="checkBtn"
					type="button"
					onClick={props.onCheckOutClick} >
					Check Out
				</button>
			</div>
			{/* Join or Leave */}
			<div className="column">
				<button className="joinBtn" type="button">Join</button>
			</div>
		</div>
	)
}

function ProjectAdder(props) {
	return (
		<div className="project">
			{/* Title */}
			<div className="newProjectColumn">
				<input className="newProjectInput"
					id="newProjectName"
					type="text"
					placeholder="Enter Project Name"
					onChange={props.onNewProjectName}
				/>
			</div>
			{/* Users with Access */}
			<div className="newProjectColumn">
				<input className="newProjectInput"
					id="newProjectUser"
					type="text"
					placeholder="Enter User Name"
					onChange={props.onNewProjectUser}
				/>
			</div>
			{/* Join or Leave */}
			<div className="newProjectColumn">
				<button className="addProjectBtn" type="button" onClick={props.onNewProjectClick}>Add Project</button>
			</div>
		</div>
	)
}
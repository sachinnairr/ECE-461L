// import React from 'react';
// export default function HardwarePage() {
//     return(
//         <div>
//         </div>
//     );
// }

import React from 'react';
import '../projects2.css';
import Button from '@mui/material/Button';

function hardwarePage() {
	return (
		<div className="project2">
			<header className="App-header">
				<Hardware />
			</header>
		</div>
	);
}

export default hardwarePage;

class Hardware extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hw1Capacity: 100,
			hw1Availability: 100,
			hw2Capacity: 100,
			hw2Availability: 100,
			hwSelected: "HWSet1",
			quantityIn: 0,
			quantityOut: 0
		};
		this.getCapacity()
		this.getAvailability()

		this.checkIn = this.checkIn.bind(this);
		this.checkOut = this.checkOut.bind(this);
		
		this.setAvailability = this.setAvailability.bind(this);
		this.setCapacity = this.setCapacity.bind(this);
		
		this.setHW1Capacity = this.setHW1Capacity.bind(this);
		this.setHW2Capacity = this.setHW2Capacity.bind(this);
		this.setHW1Availability = this.setHW1Availability.bind(this);
		this.setHW2Availability = this.setHW2Availability.bind(this);
		this.setHWSelected = this.setHWSelected.bind(this);
		this.setQuantityIn = this.setQuantityIn.bind(this);
		this.setQuantityOut = this.setQuantityOut.bind(this);

		this.getAvailability = this.getAvailability.bind(this);
		this.getCapacity = this.getCapacity.bind(this);

		this.render = this.render.bind(this)
	}

	//Setters
	setHW1Capacity(cap){
		this.setState({hw1Capacity: cap})
	}
	setHW1Availability(av){
		this.setState({hw1Availability: av})
	}
	setHW2Capacity(cap){
		this.setState({hw2Capacity: cap})
	}
	setHW2Availability(av){
		this.setState({hw2Availability: av})
	}
	setHWSelected(selected){
		this.setState({hwSelected: selected})
	}
	setQuantityIn(q){
		this.setState({quantityIn: q})
	}
	setQuantityOut(q){
		this.setState({quantityOut: q})
	}




	//Getters from the database
	getCapacity(){
		var data = {
			Name: "HWSet1"};

		fetch('http://127.0.0.1:80/hwsets/getCapacity', {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.text())
        .then((text) => {
			this.setState({hw1Capacity : parseInt(text)})
		}); 

		data = {
		Name: "HWSet2"};

		fetch('http://127.0.0.1:80/hwsets/getCapacity', {
			method: 'POST', 
			body: JSON.stringify(data),
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		}).then((response) => response.text())
		.then((text) => {
			this.setState({hw2Capacity : parseInt(text)})
		}); 
	}

	getAvailability(){
		var data = {
			Name: "HWSet1"};

		fetch('http://127.0.0.1:80/hwsets/getAvailability', {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.text())
        .then((text) => {
			this.setState({hw1Availability : parseInt(text)})
		}); 

		data = {
		Name: "HWSet2"};

		fetch('http://127.0.0.1:80/hwsets/getAvailability', {
			method: 'POST', 
			body: JSON.stringify(data),
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		}).then((response) => response.text())
		.then((text) => {
			this.setState({hw2Availability : parseInt(text)})
		}); 
	}

	//Setters to the database
	setCapacity(){
		var data;
		if(this.state.hwSelected== "HWSet1"){
			data = {
				Name: this.state.hwSelected,
				Quantity: this.state.quantityIn
			};
		}else{
			data = {
				Name: this.state.hwSelected,
				Quantity: this.state.quantityIn
			};
		}

		fetch('http://127.0.0.1:80/hwsets/setCapacity', {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.text())
        .then((text) => {
		if(this.state.hwSelected== "HWSet1"){
			this.state.hw1Capacity = parseInt(text)
		}else{
			this.state.hw2Capacity = parseInt(text)
		}
      }); 
	}

	setAvailability(){
		var data = null
		if(this.state.hwSelected== "HWSet1"){
			data = {
				Name: this.state.hwSelected,
				Quantity: this.state.quantityIn
			};
		}else{
			data = {
				Name: this.state.hwSelected,
				Quantity: this.state.quantityIn
			};
		}

		fetch('http://127.0.0.1:80/hwsets/setAvailability', {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => response.text())
        .then((text) => {
		if(this.state.hwSelected== "HWSet1"){
			this.state.hw1Availability = parseInt(text)
		}else{
			this.state.hw2Availability = parseInt(text)
		}
      });  
	  this.render()
	}

	//Checkin & Checkout
	checkIn(){
			var data = null
			if(this.state.hwSelected== "HWSet1"){
				data = {
					Name: this.state.hwSelected,
					Quantity: this.state.quantityIn
				};
			}else{
				data = {
					Name: this.state.hwSelected,
					Quantity: this.state.quantityIn
				};
			}

			fetch('http://127.0.0.1:80/hwsets/checkIn', {
				method: 'POST', 
				body: JSON.stringify(data),
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			}).then((response) => response.text())
			.then((text) => {
			if(this.state.hwSelected== "HWSet1"){
				this.setHW1Availability(parseInt(text))
			}else{
				this.setHW2Availability(parseInt(text))
			}
		});  
		console.log(this.state.hwSelected + " HW1 Available: " + this.state.hw1Availability.toString())
		this.render()
	}

	checkOut(){
		var data = null
			if(this.state.hwSelected== "HWSet1"){
				data = {
					Name: this.state.hwSelected,
					Quantity: this.state.quantityOut
				};
			}else{
				data = {
					Name: this.state.hwSelected,
					Quantity: this.state.quantityOut
				};
			}

			fetch('http://127.0.0.1:80/hwsets/checkOut', {
				method: 'POST', 
				body: JSON.stringify(data),
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			}).then((response) => response.text())
			.then((text) => {
			if(this.state.hwSelected== "HWSet1"){
				this.setHW1Availability(parseInt(text))
			}else{
				this.setHW2Availability(parseInt(text))
			}
		});  
		console.log(this.state.hwSelected + " HW1 Available: " + this.state.hw1Availability.toString())
		this.render()
	}

	render() {
		return (
			<div className="projectWrap">
				<p className="projectTitle">Hardware</p>
				<div className="project">
					{/* Sets available */}
					<div className="column">
						<p className="hwDescription">{this.state.hw1Availability + "/" + this.state.hw1Capacity}</p>
						<p className="hwDescription">{this.state.hw2Availability + "/" + this.state.hw2Capacity}</p>
					</div>
					{/* Select HW */}
					<div className="column">
						<p className="hwDescription">Select HWSet:</p>
						<select className="hwSelect" name="hwset" id="hwset" onChange={(event) => this.setHWSelected(event.target.value)}>
							<option value="HWSet1">HWSet1</option>
							<option value="HWSet2">HWSet2</option>
						</select>
					</div>
					{/* Check In */}
					<div className="column">
						<input className="hwInput"
							id={"check_in:"}
							type="text"
							placeholder="Enter Value" 
							onChange={(event) => this.setQuantityIn(event.target.value)}
							/>
						<Button variant="contained" onClick={(event) => this.checkIn()}>Check In</Button>
					</div>
					{/* Check Out*/}
					<div className="column">
						<input className="hwInput"
							id={"check_out:"} 
							type="text"
							placeholder="Enter Value" 
							onChange={(event) => this.setQuantityOut(event.target.value)}/>
						<Button variant="contained" onClick={(event) => this.checkOut()}>Check Out</Button>
					</div>
					{/* Join or Leave */}
					{/*<div className="column">*/}
					{/*	<button className="joinBtn" type="button">Join</button>*/}
					{/*</div>*/}
				</div>
				<div className="emptySpace" />
			</div>
		)
	}
}

// class ProjectData extends React.Component {



// 	handleCheckIn(i) {


// 		const project_list = this.state.project_list.slice();
		
// 		const check_in_val = document.getElementById("check_in:" + project_list[i][1]).value;
// 		//const current_avail = document.getElementById(project_list[i][3]).value;
// 		//const hwset_val = document.getElementById("HW").value;
// 		if(check_in_val !== "" && !isNaN(check_in_val)) {


// 			project_list[i][3] = "HWSet 1: " + check_in_val + "/100";

// 			this.setState({
// 				project_list: project_list
// 			});

// 			document.getElementById("check_in:" + project_list[i][1]).value = "";
// 		}

// 		GetCheckInData(project_list[i], parseInt(check_in_val));
// 	}

// 	handleCheckOut(i) {
// 		const project_list = this.state.project_list.slice();
// 		project_list[i][3] = "HWSet 1: 0/100";
// 		this.setState({
// 			project_list: project_list
// 		});
// 	}
// }

// function Project(props) {
// 	return (
// 		<div className="project">
// 			{/* Sets available */}
// 			<div className="column">
// 				<p className="hwDescription">{props.HWSet1}</p>
// 				<p className="hwDescription">{props.HWSet2}</p>
// 			</div>
// 			{/* Select HW */}
// 			<div className="column">
// 				<p className="hwDescription">Select HWSet:</p>
// 				<select className="hwSelect" name="hwset" id="hwset" onChange={(event) => setUsername(event.target.value)}>
// 					<option value="hws1">HWSet 1</option>
// 					<option value="hws1">HWSet 2</option>
// 				</select>
// 			</div>
// 			{/* Check In */}
// 			<div className="column">
// 				<input className="hwInput"
// 					id={"check_in:" + props.Name}
// 					type="text"
// 					placeholder="Enter Value" />
// 				<button className="checkBtn"
// 					type="button"
// 					onClick={props.onCheckInClick} >
// 					Check In
// 				</button>
// 			</div>
// 			{/* Check Out*/}
// 			<div className="column">
// 				<input className="hwInput"
// 					id={"check_out:" + props.Name}
// 					type="text"
// 					placeholder="Enter Value" />
// 				<button className="checkBtn"
// 					type="button"
// 					onClick={props.onCheckOutClick} >
// 					Check Out
// 				</button>
// 			</div>
// 			{/* Join or Leave */}
// 			{/*<div className="column">*/}
// 			{/*	<button className="joinBtn" type="button">Join</button>*/}
// 			{/*</div>*/}
// 		</div>
// 	)
// }

// function ProjectAdder(props) {
// 	return (
// 		<div className="project">
// 			{/* Title */}
// 			<div className="newProjectColumn">
// 				<input className="newProjectInput"
// 					id="newProjectName"
// 					type="text"
// 					placeholder="Enter Project Name"
// 					onChange={props.onNewProjectName}
// 				/>
// 			</div>
// 			{/* Users with Access */}
// 			<div className="newProjectColumn">
// 				<input className="newProjectInput"
// 					id="newProjectUser"
// 					type="text"
// 					placeholder="Enter User Name"
// 					onChange={props.onNewProjectUser}
// 				/>
// 			</div>
// 			{/* Join or Leave */}
// 			<div className="newProjectColumn">
// 				<button className="addProjectBtn" type="button" onClick={props.onNewProjectClick}>Add Project</button>
// 			</div>
// 		</div>
// 	)
// }
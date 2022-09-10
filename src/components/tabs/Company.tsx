import React from "react";
import { Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { CompanyInfo } from "../../types";

function Company({ company }: { company?: CompanyInfo }) {
	return (
		<Row>
			<Col>
				<FormGroup>
					<FormLabel>ID</FormLabel>
					<FormControl type={"text"} defaultValue={company?.id} readOnly={true}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Name</FormLabel>
					<FormControl type={"text"} defaultValue={company?.name}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Vill</FormLabel>
					<FormControl type={"number"} defaultValue={company?.vill} min={0} step={1}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Difficulty</FormLabel>
					<FormSelect defaultValue={company?.properties["GameDifficulty"]}>
						<option value={"None"} disabled={true}>Choose one</option>
						<option value={"Story"}>Story</option>
						<option value={"Safty"}>Safety</option>
						<option value={"Easy"}>Easy</option>
						<option value={"Normal"}>Normal</option>
						<option value={"Hard"}>Hard</option>
						<option value={"Merciless"}>Cruel</option>
					</FormSelect>
				</FormGroup>
			</Col>
		</Row>
	);
}

export default Company;

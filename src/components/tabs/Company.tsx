import React from "react";
import { Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { CompanyInfo } from "../../types";

function Company({ company }: { company?: CompanyInfo }) {
	return (
		<Row>
			<Col>
				<FormGroup>
					<FormLabel>ID</FormLabel>
					<FormControl type={"text"} value={company?.id} readOnly={true}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Name</FormLabel>
					<FormControl type={"text"} value={company?.name}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Vill</FormLabel>
					<FormControl type={"number"} value={company?.vill} min={0} step={1}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Difficulty</FormLabel>
					<FormSelect value={company?.properties["GameDifficulty"]}>
						<option>dunno</option>
						<option value={"Merciless"}>Merciless</option>
					</FormSelect>
				</FormGroup>
			</Col>
		</Row>
	);
}

export default Company;

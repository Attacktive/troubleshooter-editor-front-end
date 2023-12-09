import React from "react";
import { Button, Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { CompanyInfo } from "../../types";

export default function Company({ company }: { company: CompanyInfo }) {
	const onApply = () => console.log("onApply");

	return (
		<Row>
			<Col>
				<FormGroup>
					<FormLabel>ID</FormLabel>
					<FormControl type="number" name="id" defaultValue={company.id} key={company.id} readOnly/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Name</FormLabel>
					<FormControl type="text" name="name" defaultValue={company.name} key={company.name}/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Vill</FormLabel>
					<FormControl type="number" name="vill" defaultValue={company.vill} min={0} step={1} key={company.vill}/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Difficulty</FormLabel>
					<FormSelect name="properties.GameDifficulty" defaultValue={company.properties.GameDifficulty} key={company.properties.GameDifficulty}>
						<option value="None" disabled={true}>Choose one</option>
						<option value="Story">Story</option>
						<option value="Safty">Safety</option>
						<option value="Easy">Easy</option>
						<option value="Normal">Normal</option>
						<option value="Hard">Hard</option>
						<option value="Merciless">Cruel</option>
					</FormSelect>
				</FormGroup>
				<FormGroup className="mt-4 text-end">
					<Button onClick={onApply}>Apply</Button>
				</FormGroup>
			</Col>
		</Row>
	);
}

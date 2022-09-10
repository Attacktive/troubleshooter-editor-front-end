import React from "react";
import { Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { CompanyInfo } from "../../types";

export default function Company({ company }: { company?: CompanyInfo }) {
	const dataFetched = (company && company.id > 0);

	return (
		<Row>
			<Col>
				<FormGroup>
					<FormLabel>ID</FormLabel>
					<FormControl type={"number"} defaultValue={company?.id} readOnly={true}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Name</FormLabel>
					<FormControl type={"text"} defaultValue={company?.name} readOnly={!dataFetched}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Vill</FormLabel>
					<FormControl type={"number"} defaultValue={company?.vill} min={0} step={1} readOnly={!dataFetched}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Difficulty</FormLabel>
					<FormSelect defaultValue={company?.properties["GameDifficulty"]} disabled={!dataFetched}>
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

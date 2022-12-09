import React from "react";
import { useForm } from "react-hook-form";
import { Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { CompanyInfo } from "../../types";

export default function Company({ company }: { company?: CompanyInfo }) {
	const { register, setValue } = useForm<CompanyInfo>();

	const dataFetched = (company && company.id > 0);
	if (dataFetched) {
		setValue("id", company.id);
		setValue("name", company.name);
		setValue("vill", company.vill);
		setValue("properties", company.properties);
	}

	return (
		<Row>
			<Col>
				<FormGroup>
					<FormLabel>ID</FormLabel>
					<FormControl type={"number"} { ...register("id") } readOnly={true}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Name</FormLabel>
					<FormControl type={"text"} { ...register("name") } readOnly={!dataFetched}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Vill</FormLabel>
					<FormControl type={"number"} { ...register("vill") } min={0} step={1} readOnly={!dataFetched}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Difficulty</FormLabel>
					<FormSelect { ...register("properties.GameDifficulty") } disabled={!dataFetched}>
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

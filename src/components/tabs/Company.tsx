import React, { useEffect, useState } from "react";
import { Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { CompanyInfo } from "../../types";

export default function Company({ company }: { company: CompanyInfo }) {
	const [formData, setFormData] = useState<CompanyInfo>({
		id: 0,
		name: "",
		vill: -1,
		properties: { GameDifficulty: "None" }
	});

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => onFormControlChange(event);
	const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => onFormControlChange(event);
	const onFormControlChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;

		const newData = {
			...formData,
			[name]: value
		};

		// TODO: Ewwww. Any alternatives?
		if (name === "properties.GameDifficulty") {
			newData.properties.GameDifficulty = value;
		}

		setFormData(newData);
	}

	const dataFetched = (company.id > 0);
	useEffect(
		() => {
		if (dataFetched) {
				setFormData({
					id: company.id,
					name: company.name,
					vill: company.vill,
					properties: company.properties
				});
			}
		},
		[company]
	);

	return (
		<Row>
			<Col>
				<FormGroup>
					<FormLabel>ID</FormLabel>
					<FormControl type="number" name="id" value={formData.id} readOnly={true}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Name</FormLabel>
					<FormControl type="text" name="name" value={formData.name} readOnly={!dataFetched} onChange={onInputChange}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Vill</FormLabel>
					<FormControl type="number" name="vill" value={formData.vill} min={0} step={1} readOnly={!dataFetched} onChange={onInputChange}/>
				</FormGroup>
				<FormGroup>
					<FormLabel>Difficulty</FormLabel>
					<FormSelect name="properties.GameDifficulty" value={formData.properties.GameDifficulty} disabled={!dataFetched} onChange={onSelectChange}>
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

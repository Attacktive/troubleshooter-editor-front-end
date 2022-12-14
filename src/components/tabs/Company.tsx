import React, { useEffect, useRef, useState } from "react";
import { Button, Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { CompanyInfo } from "../../types";

export default function Company({ initialCompany }: { initialCompany: CompanyInfo }) {
	const [ignored, setFormData] = useState<CompanyInfo>({
		id: 0,
		name: "",
		vill: -1,
		properties: { GameDifficulty: "None" }
	});

	const id = useRef<HTMLInputElement>(null);
	const name = useRef<HTMLInputElement>(null);
	const vill = useRef<HTMLInputElement>(null);
	const difficulty = useRef<HTMLSelectElement>(null);

	const dataFetched = (initialCompany.id > 0);
	useEffect(
		() => {
			if (dataFetched) {
				setFormData({
					id: initialCompany.id,
					name: initialCompany.name,
					vill: initialCompany.vill,
					properties: initialCompany.properties
				});
			}
		},
		[dataFetched, initialCompany]
	);

	const onApply = () => {
		if (id.current && name.current && vill.current && difficulty.current) {
			setFormData({
				id: parseInt(id.current.value),
				name: name.current.value,
				vill: parseInt(vill.current.value),
				properties: { GameDifficulty: difficulty.current.value }
			});
		}
	};

	return (
		<Row>
			<Col>
				<FormGroup>
					<FormLabel>ID</FormLabel>
					<FormControl ref={id} type="number" name="id" defaultValue={initialCompany.id} key={initialCompany.id} readOnly={true}/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Name</FormLabel>
					<FormControl ref={name} type="text" name="name" defaultValue={initialCompany.name} key={initialCompany.name} readOnly={!dataFetched}/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Vill</FormLabel>
					<FormControl ref={vill} type="number" name="vill" defaultValue={initialCompany.vill} min={0} step={1} key={initialCompany.vill} readOnly={!dataFetched}/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Difficulty</FormLabel>
					<FormSelect ref={difficulty} name="properties.GameDifficulty" defaultValue={initialCompany.properties.GameDifficulty} key={initialCompany.properties.GameDifficulty} disabled={!dataFetched}>
						<option value={"None"} disabled={true}>Choose one</option>
						<option value={"Story"}>Story</option>
						<option value={"Safty"}>Safety</option>
						<option value={"Easy"}>Easy</option>
						<option value={"Normal"}>Normal</option>
						<option value={"Hard"}>Hard</option>
						<option value={"Merciless"}>Cruel</option>
					</FormSelect>
				</FormGroup>
				<FormGroup className="mt-4 text-end">
					<Button onClick={onApply}>Apply</Button>
				</FormGroup>
			</Col>
		</Row>
	);
}

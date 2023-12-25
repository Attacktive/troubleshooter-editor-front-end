import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { CompanyInfo } from "types";

export default function Company({ company, setCompany, readonly = false }: { company: CompanyInfo, setCompany: Dispatch<SetStateAction<CompanyInfo>>, readonly?: boolean }) {
	const setName = (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value;
		setCompany({ ...company, name });
	};
	const setVill = (event: ChangeEvent<HTMLInputElement>) => {
		const vill = event.target.valueAsNumber;
		setCompany({ ...company, vill });
	};

	const setDifficulty = (event: ChangeEvent<HTMLSelectElement>) => {
		const difficulty = event.target.value;

		setCompany({
			...company,
			properties: {
				...company.properties,
				GameDifficulty: difficulty
			}
		});
	};

	return (
		<Row>
			<Col>
				<FormGroup>
					<FormLabel>ID</FormLabel>
					<FormControl type="number" defaultValue={company.id} readOnly/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Name</FormLabel>
					<FormControl type="text" defaultValue={company.name} disabled={readonly} onInput={setName}/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Vill</FormLabel>
					<FormControl type="number" defaultValue={company.vill} min={0} step={1} disabled={readonly} onInput={setVill}/>
				</FormGroup>
				<FormGroup className="mt-2">
					<FormLabel>Difficulty</FormLabel>
					<FormSelect defaultValue={company.properties.GameDifficulty} disabled={readonly} onInput={setDifficulty}>
						<option value={undefined} disabled>Choose one</option>
						<option value="Story">Story</option>
						<option value="Safty">Safety</option>
						<option value="Easy">Easy</option>
						<option value="Normal">Normal</option>
						<option value="Hard">Hard</option>
						<option value="Merciless">Cruel</option>
					</FormSelect>
				</FormGroup>
			</Col>
		</Row>
	);
}

import React, { useRef, useState } from "react";
import { CompanyInfo, defaultCompany, ItemCollection, QuestCollection, RosterCollection } from "types";
import { Button, Col, FormControl, FormGroup, Row, Tab, Tabs } from "react-bootstrap";
import Company from "components/tabs/Company";
import Roster from "components/tabs/Rosters";
import Item from "components/tabs/Items";
import Quest from "components/tabs/Quests";

const apiRoot = import.meta.env.VITE_API_ROOT;

export default function Content() {
	const fileForm = useRef<HTMLFormElement>();
	const mainForm = useRef<HTMLFormElement>();

	const [fileSelected, setFileSelected] = useState<boolean>(false);
	const [fileUploaded, setFileUploaded] = useState<boolean>(false);

	const [company, setCompany] = useState<CompanyInfo>(defaultCompany);
	const [items, setItems] = useState<ItemCollection>([]);
	const [rosters, setRosters] = useState<RosterCollection>([]);
	const [quests, setQuests] = useState<QuestCollection>([]);

	const debuggingOutput = useRef<string>("");

	const onFileChange = () => {
		setFileSelected(Boolean(fileForm.current));
	};

	const upload = () => {
		const formData = new FormData(fileForm.current);

		fetch(
			`${apiRoot}/upload`,
			{
				method: "post",
				body: formData
			}
		)
		.then(response => response.json())
		.then(object => {
			console.debug("response of /upload", object);

			debuggingOutput.current = JSON.stringify(object);

			const { company, rosters, items, quests } = object;

			setCompany(company);
			setItems(items);
			setRosters(rosters);
			setQuests(quests);

			setFileUploaded(true);
		})
		.catch(error => {
			console.error(error);
			debuggingOutput.current = error;

			resetComponents();

			setFileUploaded(false);
		});
	};

	const save = () => {
		const formData = new FormData(fileForm.current);
		formData.append("edited", JSON.stringify({ company, rosters, items, quests }));

		fetch(
			`${apiRoot}/save`,
			{
				method: "post",
				body: formData
			}
		)
		.then(response => response.blob())
		.then(downloadFile)
		.catch(error => {
			console.error(error);
			debuggingOutput.current = error;
		});
	};

	const quickCheats = () => {
		const formData = new FormData(fileForm.current);

		fetch(
			`${apiRoot}/quick-cheats`,
			{
				method: "post",
				body: formData
			}
		)
		.then(response => response.blob())
		.then(downloadFile)
		.catch(error => {
			console.error(error);
			debuggingOutput.current = error;
		});
	};

	const resetComponents = () => {
		setCompany(defaultCompany);
		setItems([]);
		setRosters([]);
		setQuests([]);
	};

	const downloadFile = (blob: Blob) => {
		const url = URL.createObjectURL(blob);
		console.debug("url", url);

		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.setAttribute("download", "cheated.sav");
		anchor.click();
	};

	return (
		<>
			<Row as="form" ref={fileForm} className="mt-2">
				<Col xs={4}>
					<FormGroup>
						<FormControl type="file" name="file" accept={".sav,.bak"} onChange={onFileChange}/>
					</FormGroup>
				</Col>
				<Col xs={2}>
					<Button type="button" disabled={!fileSelected} onClick={upload}>Upload</Button>
				</Col>
				<Col>
					<Button type="button" disabled={!fileSelected || !fileUploaded} onClick={save}>Save</Button>
				</Col>
				<Col>
					<Button type="button" disabled={!fileSelected || !fileUploaded} onClick={quickCheats}>Quick Cheats!</Button>
				</Col>
			</Row>

			<Row as="form" ref={mainForm} className="mt-4">
				<Col>
					<Tabs>
						<Tab title="Company" eventKey="company">
							<Company company={company} setCompany={setCompany} readonly={true}/>
						</Tab>
						<Tab title="Rosters" eventKey="rosters">
							<Roster rosters={rosters} readonly={true}/>
						</Tab>
						<Tab title="Items" eventKey="items">
							<Item items={items} readonly={true}/>
						</Tab>
						<Tab title="Quests" eventKey="quests">
							<Quest quests={quests} readonly={true}/>
						</Tab>
					</Tabs>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col>
					<FormControl as="textarea" defaultValue={debuggingOutput.current} rows={6}/>
				</Col>
			</Row>
		</>
	);
}

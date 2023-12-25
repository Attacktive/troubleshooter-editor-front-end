import React, { useMemo, useRef, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { CompanyInfo, defaultCompany, ItemCollection, QuestCollection, RosterCollection } from "types";
import { Button, Col, FormControl, FormGroup, Row, Tab, Tabs } from "react-bootstrap";
import Company from "components/tabs/Company";
import Roster from "components/tabs/Rosters";
import Item from "components/tabs/Items";
import Quest from "components/tabs/Quests";
import Spinner from "./Spinner";

const apiRoot = import.meta.env.VITE_API_ROOT;
const axiosRequestConfig: AxiosRequestConfig = { responseType: "blob" };

export default function Content() {
	const mainForm = useRef<HTMLFormElement>(null);
	const fileInput = useRef<HTMLInputElement>(null);
	const debuggingOutput = useRef("");

	const [fileIsUploaded, setFileIsUploaded] = useState(false);
	const [toShowSpinner, setToShowSpinner] = useState(false);
	const [company, setCompany] = useState<CompanyInfo>(defaultCompany);
	const [items, setItems] = useState<ItemCollection>([]);
	const [rosters, setRosters] = useState<RosterCollection>([]);
	const [quests, setQuests] = useState<QuestCollection>([]);

	const fileIsSelected = useMemo(
		() => {
			return Boolean(fileInput.current?.files?.length);
		},
		[fileInput]
	);

	const upload = () => {
		const formData = new FormData();
		formData.append("file", fileInput.current!.files![0])

		setToShowSpinner(true);

		axios.post(`${apiRoot}/upload`, formData)
			.then(response => response.data)
			.then(object => {
				console.debug("response of /upload", object);

				debuggingOutput.current = JSON.stringify(object);

				const { company, rosters, items, quests } = object;

				setCompany(company);
				setItems(items);
				setRosters(rosters);
				setQuests(quests);

				setFileIsUploaded(true);
			})
			.catch(error => {
				console.error(error);
				debuggingOutput.current = error;

				resetComponents();

				setFileIsUploaded(false);
			})
			.finally(() => setToShowSpinner(false));
	};

	const save = () => {
		const stringified = JSON.stringify({ company, rosters, items, quests });
		const blob = new Blob(
			[stringified],
			{ type: "application/json" }
		);

		const formData = new FormData();
		formData.append("file", fileInput.current!.files![0])
		formData.append("edited", blob);

		setToShowSpinner(true);

		axios.post(`${apiRoot}/save`, formData, axiosRequestConfig)
			.then(response => response.data)
			.then(downloadFile)
			.catch(error => {
				console.error(error);
				debuggingOutput.current = error;
			})
			.finally(() => setToShowSpinner(false));
	};

	const quickCheats = () => {
		const formData = new FormData();
		formData.append("file", fileInput.current!.files![0])

		setToShowSpinner(true);

		axios.post(`${apiRoot}/quick-cheats`, formData, axiosRequestConfig)
			.then(response => response.data)
			.then(downloadFile)
			.catch(error => {
				console.error(error);
				debuggingOutput.current = error;
			})
			.finally(() => setToShowSpinner(false));
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
			<Spinner show={toShowSpinner}/>
			<Row className="mt-2">
				<Col xs={4}>
					<FormGroup>
						<FormControl ref={fileInput} type="file" name="file" accept={".sav,.bak"}/>
					</FormGroup>
				</Col>
				<Col xs={2}>
					<Button type="button" disabled={!fileIsSelected} onClick={upload}>Upload</Button>
				</Col>
				<Col>
					<Button type="button" disabled={!fileIsSelected || !fileIsUploaded} onClick={save}>Save</Button>
				</Col>
				<Col>
					<Button type="button" disabled={!fileIsSelected || !fileIsUploaded} onClick={quickCheats}>Quick Cheats!</Button>
				</Col>
			</Row>

			<Row as="form" ref={mainForm} className="mt-4">
				<Col>
					<Tabs>
						<Tab title="Company" eventKey="company">
							<Company company={company} setCompany={setCompany}/>
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

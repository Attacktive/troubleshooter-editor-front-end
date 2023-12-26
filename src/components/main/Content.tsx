import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { CompanyInfo, defaultCompany, ItemCollection, Properties, QuestCollection, RosterCollection, SaveData, truncateCompanyInfo, truncateItems } from "types";
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
	const debuggingOutput = useRef("");
	const companyProperties = useRef<Properties>();

	const [fileIsUploaded, setFileIsUploaded] = useState(false);
	const [toShowSpinner, setToShowSpinner] = useState(false);
	const [file, setFile] = useState<File>();
	const [company, setCompany] = useState<CompanyInfo>(defaultCompany);
	const [items, setItems] = useState<ItemCollection>([]);
	const [rosters, setRosters] = useState<RosterCollection>([]);
	const [quests, setQuests] = useState<QuestCollection>([]);

	const fileIsSelected = useMemo(() => file, [file]);

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFile(event.target.files?.[0]);
	};

	const upload = () => {
		setToShowSpinner(true);

		axios.post<SaveData>(`${apiRoot}/upload`, generateFormData())
			.then(({ data: saveData }) => {
				console.debug("response of /upload", saveData);

				debuggingOutput.current = JSON.stringify(saveData);

				const { company, rosters, items, quests } = truncateSaveData(saveData);

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
		setToShowSpinner(true);

		axios.post<Blob>(`${apiRoot}/save`, generateFormData(true), axiosRequestConfig)
			.then(({ data: blob }) => downloadFile(blob))
			.catch(error => {
				console.error(error);
				debuggingOutput.current = error;
			})
			.finally(() => setToShowSpinner(false));
	};

	const quickCheats = () => {
		setToShowSpinner(true);

		axios.post<Blob>(`${apiRoot}/quick-cheats`, generateFormData(), axiosRequestConfig)
			.then(({ data: blob }) => downloadFile(blob))
			.catch(error => {
				console.error(error);
				debuggingOutput.current = error;
			})
			.finally(() => setToShowSpinner(false));
	};

	const truncateSaveData = (saveData: SaveData): SaveData => {
		const { company, items, quests, rosters } = saveData;

		companyProperties.current = company.properties;

		const truncatedCompany = truncateCompanyInfo(company);
		const truncatedItems = truncateItems(items);

		return {
			company: truncatedCompany,
			items: truncatedItems,
			quests,
			rosters
		};
	};


	const generateFormData = (toSubmitEdits: boolean = false) => {
		if (!file) {
			throw Error(`File is ${file}!`);
		}

		const formData = new FormData();
		formData.append("file", file);

		if (toSubmitEdits) {
			const stringified = JSON.stringify({ company, rosters, items, quests });
			const blob = new Blob(
				[stringified],
				{ type: "application/json" }
			);

			formData.append("edited", blob);
		}

		return formData;
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
						<FormControl type="file" accept={".sav,.bak"} onChange={(event: ChangeEvent<HTMLInputElement>) => onFileChange(event)}/>
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
						<Tab title="Items" eventKey="items">
							<Item items={items} readonly={true}/>
						</Tab>
						<Tab title="Rosters" eventKey="rosters">
							<Roster rosters={rosters} readonly={true}/>
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

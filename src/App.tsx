import "./App.css";
import github from "./images/github.svg";
import { apiRoot } from "./constants";
import React, { useRef, useState } from "react";
import { Button, Col, Container, FormControl, FormGroup, Row, Tab, Tabs } from "react-bootstrap";
import Company from "./components/tabs/Company";
import { CompanyInfo, defaultCompany, ItemCollection, QuestCollection, RosterCollection } from "./types";
import Item from "./components/tabs/Items";
import Roster from "./components/tabs/Rosters";
import Quest from "./components/tabs/Quests";

export default function App() {
	const fileForm = useRef<HTMLFormElement>();
	const mainForm = useRef<HTMLFormElement>();
	const temporaryOutput = useRef<HTMLTextAreaElement>(null);

	const [fileSelected, setFileSelected] = useState<boolean>(false);
	const [fileUploaded, setFileUploaded] = useState<boolean>(false);

	const [company, setCompany] = useState<CompanyInfo>(defaultCompany);
	const [items, setItems] = useState<ItemCollection>([]);
	const [rosters, setRosters] = useState<RosterCollection>([]);
	const [quests, setQuests] = useState<QuestCollection>([]);

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

			if (temporaryOutput.current !== null) {
				temporaryOutput.current.value = JSON.stringify(object);
			}

			const { company, rosters, items, quests } = object;

			setCompany(company);
			setItems(items);
			setRosters(rosters);
			setQuests(quests);

			setFileUploaded(true);
		})
		.catch(error => {
			console.error(error);

			resetComponents();

			setFileUploaded(false);
		});
	};

	const resetComponents = () => {
		setCompany(defaultCompany);
		setItems([]);
		setRosters([]);
		setQuests([]);
	};

	const download = () => {
		alert("TODO: download");
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
		.then(blob => {
			console.debug("response of quick-cheats", blob);

			const url = URL.createObjectURL(blob);
			console.debug("url", url);

			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.setAttribute("download", "game.sav");
			anchor.click();
		})
		.catch(console.error);
	};

	return (
		<div>
			<header>
				<title>Troubleshooter Editor</title>
				<meta name="description" content="Troubleshooter Editor"/>
				<link rel="icon" href="/favicon.ico"/>
			</header>

			<Container fluid as="main">
				<Row>
					<Col>
						<h1 id="header">
							Troubleshooter Editor
						</h1>
					</Col>
				</Row>
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
						<Button type="button" disabled={true} onClick={download}>Save</Button>
					</Col>
					<Col>
						<Button type="button" disabled={!fileSelected || !fileUploaded} onClick={quickCheats}>Quick Cheats!</Button>
					</Col>
				</Row>

				<Row as="form" ref={mainForm} className="mt-4">
					<Col>
						<Tabs>
							<Tab title="Company" eventKey="company">
								<Company company={company} readonly={true}/>
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
						<textarea ref={temporaryOutput} readOnly style={{ width: "100%", minHeight: "300px" }}/>
					</Col>
				</Row>

				<footer id="footer">
					<a
						href="https://github.com/Attacktive/troubleshooter-editor"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span>
							<img src={github} alt="to the GitHub repository" width={48} height={48}/>
						</span>
					</a>
				</footer>
			</Container>
		</div>
	);
}

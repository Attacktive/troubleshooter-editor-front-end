import React, { useRef, useState } from "react";
import "./App.css";
import github from "./images/github.svg";
import { apiRoot } from "./constants";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Company from "./components/tabs/Company";
import Item from "./components/tabs/Items";
import Roster from "./components/tabs/Rosters";
import { CompanyInfo, defaultCompany, ItemCollection, QuestCollection, RosterCollection } from "./types";
import Quest from "./components/tabs/Quests";

export default function App() {
	const fileForm = useRef<HTMLFormElement>();
	const mainForm = useRef<HTMLFormElement>();
	const temporaryOutput = useRef<HTMLTextAreaElement>(null);

	const [fileSelected, setFileSelected] = useState<boolean>(false);
	const [fileUploaded, setFileUploaded] = useState<boolean>(false);

	const [company, setCompany] = useState<CompanyInfo>(defaultCompany);
	const [rosters, setRosters] = useState<RosterCollection>([]);
	const [items, setItems] = useState<ItemCollection>([]);
	const [quests, setQuests] = useState<QuestCollection>([]);

	function onFileChange() {
		setFileSelected(Boolean(fileForm.current));
	}

	function upload() {
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
				if (temporaryOutput.current !== null) {
					temporaryOutput.current.value = JSON.stringify(object);
				}

				setCompany(object["company"]);
				setRosters(object["rosters"]);
				setItems(object["items"]);
				setQuests(object["quests"]);

				setFileUploaded(true);
			})
			.catch(error => {
				console.log(error);

				setCompany(defaultCompany);
				setRosters([]);
				setItems([]);
				setQuests([]);

				setFileUploaded(false);
			});
	}

	function download() {
		alert("TODO: download");
	}

	return (
		<div>
			<header>
				<title>Troubleshooter Editor</title>
				<meta name="description" content="Troubleshooter Editor"/>
				<link rel="icon" href="/favicon.ico"/>
			</header>

			<Container fluid as={"main"}>
				<Row>
					<Col>
						<h1 id={"header"}>
							Troubleshooter Editor
						</h1>
					</Col>
				</Row>
				<Row as={"form"} ref={fileForm} className={"mt-2"}>
					<Col xs={4}>
						<input type={"file"} name={"file"} accept={".sav,.bak"} onChange={onFileChange}/>
					</Col>
					<Col xs={2}>
						<button type={"button"} disabled={!fileSelected} onClick={upload}>Upload</button>
					</Col>
					<Col>
						<button type={"button"} disabled={!fileSelected || !fileUploaded} onClick={download}>Save</button>
					</Col>
				</Row>

				<Row as={"form"} ref={mainForm} className={"mt-4"}>
					<Col>
						<Tabs>
							<Tab title={"Company"} eventKey={"company"}>
								<Company company={company}/>
							</Tab>
							<Tab title={"Rosters"} eventKey={"rosters"}>
								<Roster rosterCollection={rosters}/>
							</Tab>
							<Tab title={"Items"} eventKey={"items"}>
								<Item itemCollection={items}/>
							</Tab>
							<Tab title={"Quests"} eventKey={"quests"}>
								<Quest questCollection={quests}/>
							</Tab>
						</Tabs>
					</Col>
				</Row>

				<Row className={"mt-4"}>
					<Col>
						<textarea ref={temporaryOutput} readOnly={true} style={{ width: "100%", minHeight: "300px" }}/>
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

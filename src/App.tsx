import React, { useRef } from "react";
import "./App.css";
import github from "./images/github.svg";
import { Container, Row, Col } from "react-bootstrap";

function App() {
	const fileForm = useRef<HTMLFormElement>();
	const temporaryOutput = useRef<HTMLTextAreaElement>(null);

	function upload() {
		const formData = new FormData(fileForm.current);

		fetch(
			"/files/upload",
			{
				method: "post",
				body: formData
			}
		).then(response => {
			console.log(response);
			temporaryOutput.current!.value = response.toString();
		}).catch(error => console.log(error));
	}

	function download() {
		alert("TODO: download");
	}

	return (
		<div>
			<Container fluid as={"main"}>
				<header>
					<title>Troubleshooter Editor</title>
					<meta name="description" content="Troubleshooter Editor"/>
					<link rel="icon" href="/favicon.ico"/>
				</header>

				<Row>
					<Col>
						<h1>
							Troubleshooter Editor
						</h1>
					</Col>
				</Row>
				<Row as={"form"} ref={fileForm} className={"mt-4"}>
					<Col xs={2}>
						<input type={"file"} name={"file"} accept={".sav,.bak"}/>
					</Col>
					<Col xs={2}>
						<button type={"button"} onClick={upload}>Upload</button>
					</Col>
					<Col>
						<button type={"button"} onClick={download}>Save</button>
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

export default App;

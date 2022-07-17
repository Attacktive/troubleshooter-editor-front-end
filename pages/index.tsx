import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Row, Col } from "react-bootstrap";

const Home: NextPage = () => {
	function upload() {
		alert("upload");
	}

	function download() {
		alert("download");
	}

	return (
		<div>
			<Container fluid as={"main"}>
				<Head>
					<title>Troubleshooter Editor</title>
					<meta name="description" content="Troubleshooter Editor"/>
					<link rel="icon" href="/favicon.ico"/>
				</Head>

				<Row>
					<Col>
						<h1 className={styles.title}>
							Troubleshooter Editor
						</h1>
					</Col>
				</Row>
				<Row as={"form"} id={"file-form"} className={"mt-4"}>
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
						<textarea id={"temp-output"} readOnly={true} style={{ width: "100%", minHeight: "300px" }}/>
					</Col>
				</Row>
			</Container>

			<footer className={styles.footer}>
				<a
					href="https://github.com/Attacktive/troubleshooter-editor"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className={styles.logo}>
						<Image src="/github.svg" alt="GitHub Logo" width={36} height={36}/>
					</span>
				</a>
			</footer>
		</div>
	);
};

export default Home;

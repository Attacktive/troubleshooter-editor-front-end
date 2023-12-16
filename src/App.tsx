import "./App.css";
import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/main/Header";
import Content from "./components/main/Content";
import Footer from "./components/main/Footer";

export default function App() {
	return (
		<div>
			<Container fluid as="main">
				<Header/>
				<Content/>
				<Footer/>
			</Container>
		</div>
	);
}

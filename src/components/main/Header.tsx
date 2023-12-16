import React from "react";
import { Col, Row } from "react-bootstrap";

export default function Header() {
	return (
		<header>
			<Row>
				<Col>
					<h1 id="header">Troubleshooter Editor</h1>
				</Col>
			</Row>
		</header>
	);
}

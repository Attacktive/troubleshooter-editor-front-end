import "./Spinner.css";
import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

export default function Spinner({ show = false }: { show: boolean }) {
	if (show) {
		return (<div className="overlay">
			<BootstrapSpinner animation="border" variant="danger" className="spinner"/>
		</div>);
	} else {
		return (<></>);
	}
}

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
	render(<App/>);
	const elements = screen.getAllByText(/Troubleshooter Editor/);
	elements.forEach(element => {
		console.log(element);
		expect(element).toBeInTheDOM();
	});
});

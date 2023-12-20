import { render, screen } from '@testing-library/react'
import App from "./App";
import { expect, test } from "vitest";

test(
	"renders correctly",
	() => {
		render(<App/>);
		const titleElement = screen.getByRole("heading");
		console.debug("titleElement", titleElement);
		expect(titleElement).toBeInTheDOM();
	}
);

import React from "react";
import { Accordion, Button, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { RosterCollection } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Roster({ rosters, readonly = false }: { rosters: RosterCollection, readonly: boolean }) {
	const onApply = () => console.log("onApply");

	return (
		<Row>
			<Col>
				<Accordion>
					{
						rosters.map(roster => {
							return (
								<AccordionItem key={`${roster.id}`} eventKey={`${roster.id}`}>
									<AccordionHeader>#{roster.id} {roster.name}</AccordionHeader>
									<AccordionBody>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type="text" defaultValue={roster.name} disabled={readonly}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Class</FormLabel>
											{/* TODO: change it to a select maybe */}
											<FormControl type="text" defaultValue={roster.class} disabled={readonly}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Level</FormLabel>
											<FormControl type="number" defaultValue={roster.level} min={0} step={1} disabled={readonly}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Exp</FormLabel>
											<FormControl type="number" defaultValue={roster.exp} min={0} step={1} disabled={readonly}/>
										</FormGroup>
										{/* TODO: handle properties */}
										{JSON.stringify(roster.properties)}
									</AccordionBody>
								</AccordionItem>
							);
						})
					}
				</Accordion>
				<FormGroup className="mt-4 text-end">
					<Button disabled={readonly} onClick={onApply}>Apply</Button>
				</FormGroup>
			</Col>
		</Row>
	);
}

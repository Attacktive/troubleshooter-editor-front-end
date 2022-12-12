import React from "react";
import { Accordion, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { RosterCollection } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Roster({ rosterCollection }: { rosterCollection?: RosterCollection }) {
	const dataFetched = (rosterCollection && rosterCollection.length > 0);

	return (
		<Row>
			<Col>
				<Accordion>
					{
						rosterCollection?.map(roster => {
							return (
								<AccordionItem key={`${roster.id}`} eventKey={`${roster.id}`}>
									<AccordionHeader>#{roster.id} {roster.name}</AccordionHeader>
									<AccordionBody>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type={"text"} defaultValue={roster.name}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Class</FormLabel>
											{/* TODO: change it to a select maybe */}
											<FormControl type={"text"} defaultValue={roster.class} readOnly={!dataFetched}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Level</FormLabel>
											<FormControl type={"number"} defaultValue={roster.level} min={0} step={1} readOnly={!dataFetched}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Exp</FormLabel>
											<FormControl type={"number"} defaultValue={roster.exp} min={0} step={1} readOnly={!dataFetched}/>
										</FormGroup>
										{/* TODO: handle properties */}
										{JSON.stringify(roster.properties)}
									</AccordionBody>
								</AccordionItem>
							);
						})
					}
				</Accordion>
			</Col>
		</Row>
	);
}

import React from "react";
import { Accordion, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Rosters } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

function Roster({ rosters }: { rosters?: Rosters }) {
	return (
		<Row>
			<Col>
				<Accordion>
					{
						rosters?.map(roster => {
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
											<FormControl type={"text"} defaultValue={roster.class}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Level</FormLabel>
											<FormControl type={"number"} defaultValue={roster.level} min={0} step={1}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Exp</FormLabel>
											<FormControl type={"number"} defaultValue={roster.exp} min={0} step={1}/>
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

export default Roster;

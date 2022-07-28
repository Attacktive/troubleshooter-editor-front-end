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
								<AccordionItem eventKey={`${roster.id}`}>
									<AccordionHeader>#{roster.id} {roster.name}</AccordionHeader>
									<AccordionBody>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type={"text"} value={roster.name}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Class</FormLabel>
											{/* TODO: change it to a select maybe */}
											<FormControl type={"text"} value={roster.class}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Level</FormLabel>
											<FormControl type={"number"} value={roster.level} min={0} step={1}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Exp</FormLabel>
											<FormControl type={"number"} value={roster.exp} min={0} step={1}/>
										</FormGroup>
										{/* TODO: handle properties */}
										{
											Object.keys(roster.properties).map(key => {
												return (
													<p>{key}: {roster.properties[key]}</p>
												);
											})
										}
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
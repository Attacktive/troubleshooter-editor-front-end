import React from "react";
import { Accordion, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Quests } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

function Quest({ quests }: { quests?: Quests }) {
	return (
		<Row>
			<Col>
				<Accordion>
					{
						quests?.map(quest => {
							return (
								<AccordionItem key={`${quest.index}`} eventKey={`${quest.index}`}>
									<AccordionHeader>#{quest.index} {quest.name}</AccordionHeader>
									<AccordionBody>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type={"text"} value={quest.name}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Stage</FormLabel>
											<FormControl type={"number"} value={quest.stage} min={0} step={1}/>
										</FormGroup>
										{/* TODO: handle properties */}
										{JSON.stringify(quest.properties)}
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

export default Quest;

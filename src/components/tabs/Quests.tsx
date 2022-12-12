import React from "react";
import { Accordion, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { QuestCollection } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Quest({ questCollection }: { questCollection?: QuestCollection }) {
	const dataFetched = (questCollection && questCollection.length > 0);

	return (
		<Row>
			<Col>
				<Accordion>
					{
						questCollection?.map(quest => {
							return (
								<AccordionItem key={`${quest.index}`} eventKey={`${quest.index}`}>
									<AccordionHeader>#{quest.index} {quest.name}</AccordionHeader>
									<AccordionBody>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type={"text"} defaultValue={quest.name} readOnly={!dataFetched}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Stage</FormLabel>
											<FormControl type={"number"} defaultValue={quest.stage} min={0} step={1} readOnly={!dataFetched}/>
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

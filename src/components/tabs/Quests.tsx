import React from "react";
import { Accordion, AccordionHeader, AccordionItem, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import AccordionBody from "react-bootstrap/AccordionBody";
import { QuestCollection } from "types";

export default function Quest({ quests, readonly = false }: { quests: QuestCollection, readonly: boolean }) {
	return (
		<Row>
			<Col>
				<Accordion>
					{
						quests.map(quest => {
							return (
								<AccordionItem key={quest.index} eventKey={quest.index.toString()}>
									<AccordionHeader>#{quest.index} {quest.name}</AccordionHeader>
									<AccordionBody>
										<input type="hidden"/>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type="text" defaultValue={quest.name} disabled={readonly}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Stage</FormLabel>
											<FormControl type="number" defaultValue={quest.stage} min={0} step={1} disabled={readonly}/>
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

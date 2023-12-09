import React from "react";
import { Accordion, Button, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { QuestCollection } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Quest({ quests }: { quests: QuestCollection }) {
	const onApply = () => console.log("onApply");

	return (
		<Row>
			<Col>
				<Accordion>
					{
						quests.map(quest => {
							return (
								<AccordionItem key={`${quest.index}`} eventKey={`${quest.index}`}>
									<AccordionHeader>#{quest.index} {quest.name}</AccordionHeader>
									<AccordionBody>
										<input type="hidden"/>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type="text" defaultValue={quest.name}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Stage</FormLabel>
											<FormControl type="number" defaultValue={quest.stage} min={0} step={1}/>
										</FormGroup>
										{/* TODO: handle properties */}
										{JSON.stringify(quest.properties)}
									</AccordionBody>
								</AccordionItem>
							);
						})
					}
				</Accordion>
				<FormGroup className="mt-4 text-end">
					<Button onClick={onApply}>Apply</Button>
				</FormGroup>
			</Col>
		</Row>
	);
}

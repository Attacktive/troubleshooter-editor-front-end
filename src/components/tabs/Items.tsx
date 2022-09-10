import React from "react";
import { Accordion, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Items } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Item({ items }: { items?: Items }) {
	const dataFetched = (items && items.length > 0);

	return (
		<Row>
			<Col>
				<Accordion>
					{
						items?.map(item => {
							return (
								<AccordionItem key={`${item.id}`} eventKey={`${item.id}`}>
									<AccordionHeader>#{item.id} {item.type}</AccordionHeader>
									<AccordionBody>
										<FormGroup>
											<FormLabel>Type</FormLabel>
											<FormControl type={"text"} defaultValue={item.type} readOnly={!dataFetched}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Count</FormLabel>
											<FormControl type={"number"} defaultValue={item.count} min={0} step={1} readOnly={!dataFetched}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Level</FormLabel>
											{/* TODO: change it to a select maybe */}
											<FormControl type={"text"} defaultValue={item.status}/>
										</FormGroup>
										{/* TODO: handle properties */}
										{JSON.stringify(item.properties)}
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

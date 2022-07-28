import React from "react";
import { Accordion, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Items } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

function Item({ items }: { items?: Items }) {
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
											<FormControl type={"text"} value={item.type}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Count</FormLabel>
											<FormControl type={"number"} value={item.count} min={0} step={1}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Level</FormLabel>
											{/* TODO: change it to a select maybe */}
											<FormControl type={"text"} value={item.status}/>
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

export default Item;

import React from "react";
import { Accordion, Button, Col, FormControl, FormGroup, FormLabel, FormSelect, FormText, Row } from "react-bootstrap";
import { ItemCollection } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Item({ items, readonly = false }: { items: ItemCollection, readonly: boolean }) {
	const options = [
		"Accuracy",
		"Armor",
		"AttackPower",
		"Block",
		"BluntResistance",
		"CriticalStrikeChance",
		"CriticalStrikeDeal",
		"Dodge",
		"ESPPower",
		"FireResistance",
		"IceResistance",
		"LightningResistance",
		"MaxHP",
		"MoveDist",
		"OverchargeDuration",
		"Resistance",
		"SightRange",
		"SlashingResistance",
		"Speed"
		// TODO: add known options
	].map((name, index) => <option key={index} value={name}>{name}</option>);

	const onApply = () => console.log("onApply");

	return (
		<Row>
			<Col>
				<Accordion>
					{
						items.map(item => {
							return (
								<AccordionItem key={`${item.id}`} eventKey={`${item.id}`}>
									<AccordionHeader>#{item.id} {item.type}</AccordionHeader>
									<AccordionBody>
										<FormGroup className="mt-2">
											<FormLabel>Type</FormLabel>
											<FormControl name="type" defaultValue={item.type} disabled={readonly}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Count</FormLabel>
											<FormControl name="count" defaultValue={item.count} min={0} step={1} disabled={readonly}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Status</FormLabel>
											<FormSelect defaultValue={item.status} disabled={readonly}>
												<option value="inventory">Inventory</option>
												<option value="equipped">Equipped</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>OptionKey</FormLabel>
											<FormControl type="text" name="optionKey" list="option-keys" defaultValue={item.properties?.["Option/OptionKey"]} disabled={readonly}/>
											<datalist id="option-keys">
												<option value="Extreme">Extreme</option>
												<option value="MartialArtist">MartialArtist</option>
												<option value="MeteorScout">MeteorScout</option>
												<option value="MoonScout">MoonScout</option>
												<option value="StormGuardian">StormGuardian</option>
												<option value="TwilightCollector">TwilightCollector</option>
												{/* TODO: Add known keys */}
											</datalist>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Bound to the character?</FormLabel>
											<FormSelect name="isBound" defaultValue={item.properties?.["Binded"]} disabled={readonly}>
												<option value="true">true</option>
												<option value="false">false</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Protected?</FormLabel>
											<FormSelect name="isProtected" defaultValue={item.properties?.["Protected"]} disabled={readonly}>
												<option value="true">true</option>
												<option value="false">false</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-3">
											<FormLabel>New?</FormLabel>
											<FormSelect name="isNew" defaultValue={item.properties?.["IsNew"]} disabled={readonly}>
												<option value="true">true</option>
												<option value="false">false</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-3">
											<FormLabel>Property 1</FormLabel>
											<FormControl type="text" name="optionType1" list="options-datalist" defaultValue={item.properties?.["Option/Type1"]} disabled={readonly}/>
											<datalist id="options-datalist">
												{options}
											</datalist>
											<FormControl type="text" name="optionValue1" defaultValue={item.properties?.["Option/Value1"]} disabled={readonly}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Property 2</FormLabel>
											<FormControl type="text" name="optionType2" list="options-datalist" defaultValue={item.properties?.["Option/Type2"]} disabled={readonly}/>
											<datalist id="options-datalist">
												{options}
											</datalist>
											<FormControl type="text" name="optionValue2" defaultValue={item.properties?.["Option/Value2"]} disabled={readonly}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Property 3</FormLabel>
											<FormControl type="text" name="optionType3" list="options-datalist" defaultValue={item.properties?.["Option/Type3"]} disabled={readonly}/>
											<datalist id="options-datalist">
												{options}
											</datalist>
											<FormControl type="text" name="optionValue3" defaultValue={item.properties?.["Option/Value3"]} disabled={readonly}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Property 4</FormLabel>
											<FormControl type="text" name="optionType4" list="options-datalist" defaultValue={item.properties?.["Option/Type4"]} disabled={readonly}/>
											<datalist id="options-datalist">
												{options}
											</datalist>
											<FormControl type="text" name="optionValue4" defaultValue={item.properties?.["Option/Value4"]} disabled={readonly}/>
										</FormGroup>
										{/* TODO: Remove below as soon as debugging is done */}
										<Accordion className="mt-3">
											<AccordionItem eventKey={`${item.id}-raw`}>
												<AccordionHeader>Raw data</AccordionHeader>
												<AccordionBody>
													<FormGroup>
														<FormText style={{ whiteSpace: "pre-wrap" }}>
															{JSON.stringify(item.properties, null, 2)}
														</FormText>
													</FormGroup>
												</AccordionBody>
											</AccordionItem>
										</Accordion>
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

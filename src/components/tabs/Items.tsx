import React from "react";
import { Accordion, Button, Col, FormControl, FormGroup, FormLabel, FormSelect, FormText, Row } from "react-bootstrap";
import { ItemCollection, ItemInfo } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Item({ items, readonly = false }: { items: ItemCollection, readonly: boolean }) {
	const optionKeys = [
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
		// TODO: add known option keys
	].map((name, index) => <option key={index} value={name}>{name}</option>);

	const options = (item: ItemInfo) => Array.from({ length: 5 })
		.map((_, index: number) => {
			const ordinal = index + 1;

			return (
				<FormGroup key={`item-${item.id}-option-${ordinal}`} className="mt-2">
					<FormLabel>Property {ordinal}</FormLabel>
					<FormControl type="text" name={`optionType${ordinal}`} list="options-datalist" defaultValue={item.properties?.[`Option/Type${ordinal}`]} disabled={readonly}/>
					<datalist id="options-datalist">
						{optionKeys}
					</datalist>
					<FormControl type="text" name={`optionValue${ordinal}`} defaultValue={item.properties?.[`Option/Value${ordinal}`]} disabled={readonly}/>
				</FormGroup>
			);
		});

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
										<FormGroup className="mt-3 mb-1">
											<FormLabel>New?</FormLabel>
											<FormSelect name="isNew" defaultValue={item.properties?.["IsNew"]} disabled={readonly}>
												<option value="true">true</option>
												<option value="false">false</option>
											</FormSelect>
										</FormGroup>
										{options(item)}
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

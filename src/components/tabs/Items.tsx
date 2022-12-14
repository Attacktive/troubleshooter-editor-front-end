import React, { createRef, useEffect, useRef, useState } from "react";
import { Accordion, Button, Col, FormControl, FormGroup, FormLabel, FormSelect, FormText, Row } from "react-bootstrap";
import { ItemCollection, ItemInfo } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Item({ initialItems }: { initialItems: ItemCollection }) {
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

	const [items, setItems] = useState<ItemCollection>(Array.from(initialItems));
	const refs = useRef(items.map(() => {
		return {
			id: createRef<HTMLInputElement>(),
			type: createRef<HTMLInputElement>(),
			count: createRef<HTMLInputElement>(),
			status: createRef<HTMLSelectElement>(),
			"is-new": createRef<HTMLSelectElement>(),
			"is-bound": createRef<HTMLSelectElement>(),
			"is-protected": createRef<HTMLSelectElement>(),
			"option-key": createRef<HTMLInputElement>(),
			"option-type1": createRef<HTMLInputElement>(),
			"option-value1": createRef<HTMLInputElement>(),
			"option-type2": createRef<HTMLInputElement>(),
			"option-value2": createRef<HTMLInputElement>(),
			"option-type3": createRef<HTMLInputElement>(),
			"option-value3": createRef<HTMLInputElement>(),
			"option-type4": createRef<HTMLInputElement>(),
			"option-value4": createRef<HTMLInputElement>(),
		};
	}));

	console.log("refs", refs);

	useEffect(
		() => {
			if (initialItems.length > 0) {
				setItems(initialItems);
			}
		},
		[initialItems]
	);

	const onApply = () => {
		if (refs.current) {
			const newItems: ItemCollection = refs.current
				.filter(ref => ref.id.current && ref.type.current && ref.count.current && ref.status.current && ref["is-new"].current && ref["is-bound"].current && ref["is-protected"].current && ref["option-key"].current && ref["option-type1"].current && ref["option-value1"].current && ref["option-type2"].current && ref["option-value2"].current && ref["option-type3"].current && ref["option-value3"].current && ref["option-type4"].current && ref["option-value4"].current)
				.map(ref => {
					const item: ItemInfo = {
						id: parseInt(ref.id.current!!.value),
						type: ref.type.current!!.value,
						count: parseInt(ref.count.current!!.value),
						status: ref.status.current!!.value,
						properties: {
							"Is-New": ref["is-new"].current!!.value,
							"Binded": ref["is-bound"].current!!.value,
							"Protected": ref["is-protected"].current!!.value,
							"Option/OptionKey": ref["option-key"].current!!.value,
							"Option/Type1": ref["option-type1"].current!!.value,
							"Option/Value1": ref["option-value1"].current!!.value,
							"Option/Type2": ref["option-type2"].current!!.value,
							"Option/Value2": ref["option-value2"].current!!.value,
							"Option/Type3": ref["option-type3"].current!!.value,
							"Option/Value3": ref["option-value3"].current!!.value,
							"Option/Type4": ref["option-type4"].current!!.value,
							"Option/Value4": ref["option-value4"].current!!.value
						}
					};

					return item;
				});

			setItems(newItems);
		}
	};

	return (
		<Row>
			<Col>
				<Accordion>
					{
						items.map((item, index) => {
							return (
								<AccordionItem key={`${item.id}`} eventKey={`${item.id}`}>
									<AccordionHeader>#{item.id} {item.type}</AccordionHeader>
									<AccordionBody>
										<FormGroup className="mt-2">
											<FormLabel>Type</FormLabel>
											<FormControl ref={refs.current[index].id} type="text" name="type" value={items[index].type}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Count</FormLabel>
											<FormControl ref={refs.current[index].count} type="number" name="count" value={items[index].count} min={0} step={1}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Status</FormLabel>
											<FormSelect ref={refs.current[index].status} name="status" value={items[index].status}>
												<option value="inventory">Inventory</option>
												<option value="equipped">Equipped</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>OptionKey</FormLabel>
											<FormControl ref={refs.current[index]["option-key"]} type="text" name="optionKey" list="option-keys" value={items[index].properties["Option/OptionKey"]}/>
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
											<FormSelect ref={refs.current[index]["is-bound"]} name="isBound" value={items[index].properties["Binded"]}>
												<option value="true">true</option>
												<option value="false">false</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Protected?</FormLabel>
											<FormSelect ref={refs.current[index]["is-protected"]} name="isProtected" value={items[index].properties["Protected"]}>
												<option value="true">true</option>
												<option value="false">false</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-3">
											<FormLabel>New?</FormLabel>
											<FormSelect ref={refs.current[index]["is-new"]} name="isNew" value={items[index].properties["IsNew"]}>
												<option value="true">true</option>
												<option value="false">false</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-3">
											<FormLabel>Property 1</FormLabel>
											<FormControl type="text" ref={refs.current[index]["option-type1"]} name="optionType1" list="options-datalist" value={items[index].properties["Option/Type1"]}/>
											<datalist id="options-datalist">
												{options}
											</datalist>
											<FormControl type="text" ref={refs.current[index]["option-value1"]} name="optionValue1" value={items[index].properties["Option/Value1"]}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Property 2</FormLabel>
											<FormControl type="text" ref={refs.current[index]["option-type2"]} name="optionType2" list="options-datalist" value={items[index].properties["Option/Type2"]}/>
											<datalist id="options-datalist">
												{options}
											</datalist>
											<FormControl type="text" ref={refs.current[index]["option-value2"]} name="optionValue2" value={items[index].properties["Option/Value2"]}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Property 3</FormLabel>
											<FormControl type="text" ref={refs.current[index]["option-type3"]} name="optionType3" list="options-datalist" value={items[index].properties["Option/Type3"]}/>
											<datalist id="options-datalist">
												{options}
											</datalist>
											<FormControl type="text" ref={refs.current[index]["option-value3"]} name="optionValue3" value={items[index].properties["Option/Value3"]}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Property 4</FormLabel>
											<FormControl type="text" ref={refs.current[index]["option-type4"]} name="optionType4" list="options-datalist" value={items[index].properties["Option/Type4"]}/>
											<datalist id="options-datalist">
												{options}
											</datalist>
											<FormControl type="text" ref={refs.current[index]["option-value4"]} name="optionValue4" value={items[index].properties["Option/Value4"]}/>
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
					<Button onClick={onApply}>Apply</Button>
				</FormGroup>
			</Col>
		</Row>
	);
}

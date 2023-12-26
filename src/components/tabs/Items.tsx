import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Accordion, Col, FormControl, FormGroup, FormLabel, FormSelect, FormText, Row } from "react-bootstrap";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import { isItemStatus, ItemCollection, ItemInfo, ItemStatus } from "types";

type AssignmentFunction<T> = (item: ItemInfo, value: T) => void;

function updateItem<T>(items: ItemCollection, setItems: Dispatch<SetStateAction<ItemCollection>>, assignmentFunction: AssignmentFunction<T>, id: number, value: T) {
	const currentItem = items.find(item => item.id === id);
	if (currentItem) {
		assignmentFunction(currentItem, value);
		setItems(items);
	} else {
		console.warn(`Failed to find Item with id ${id}; does nothing.`);
	}
}

export default function Item({ items, setItems, readonly = false }: { items: ItemCollection, setItems: Dispatch<SetStateAction<ItemCollection>>, readonly: boolean }) {
	const setType = (event: ChangeEvent<HTMLInputElement>, id: number) => {
		updateItem(items, setItems, (item: ItemInfo, value: string) => item.type = value, id, event.target.value);
	};

	const setCount = (event: ChangeEvent<HTMLInputElement>, id: number) => {
		updateItem(items, setItems, (item: ItemInfo, value: number) => item.count = value, id, event.target.valueAsNumber);
	};

	const setStatus = (event: ChangeEvent<HTMLSelectElement>, id: number) => {
		const status = event.target.value;
		if (isItemStatus(status)) {
			updateItem(items, setItems, (item: ItemInfo, value: ItemStatus) => item.status = value, id, status);
		} else {
			console.warn(`The status ${status} is not a valid status value for an Item; does nothing.`);
		}
	}

	const setIsBound = (event: ChangeEvent<HTMLSelectElement>, id: number) => {
		updateItem(items, setItems, (item: ItemInfo, value: string) => item.properties["Binded"] = value, id, event.target.value);
	};

	const setOptionRatio = (event: ChangeEvent<HTMLInputElement>, id: number) => {
		updateItem(items, setItems, (item: ItemInfo, value: string) => item.properties["Option/OptionRatio"] = value, id, event.target.value);
	};

	const setOptionKey = (event: ChangeEvent<HTMLInputElement>, id: number) => {
		updateItem(items, setItems, (item: ItemInfo, value: string) => item.properties["Option/OptionKey"] = value, id, event.target.value);
	}

	const setOptionType = (event: ChangeEvent<HTMLInputElement>, id: number, ordinal: number) => {
		updateItem(items, setItems, (item: ItemInfo, value: string) => item.properties[`Option/Type${ordinal}`] = value, id, event.target.value);
	}

	const setOptionValue = (event: ChangeEvent<HTMLInputElement>, id: number, ordinal: number) => {
		updateItem(items, setItems, (item: ItemInfo, value: string) => item.properties[`Option/Value${ordinal}`] = value, id, event.target.value);
	}

	const optionOptions = ["Accuracy", "Armor", "AttackPower", "Block", "BluntResistance", "CriticalStrikeChance", "CriticalStrikeDeal", "Dodge", "EarthResistance", "ESPPower", "FireResistance", "IceResistance", "LightningResistance", "MaxAddSP", "MaxHP", "MaxVigor", "MoveDist", "OverchargeDuration", "PiercingResistance", "RegenVigor", "Resistance", "SightRange", "SlashingResistance", "Speed", "WaterResistance", "WindResistance"]
		.map((name, index) => <option key={index} value={name}>{name}</option>);

	const optionKeyOptions = ["Abyss", "Adventurer", "Archisage", "Ascetic", "Assassin", "Barbarian", "Bear", "Berserker", "Butcher", "Chaser", "Clown", "Collector", "Conqueror", "Crocodile", "Cyclopes", "DarkChaser", "DarkCollector", "Deathblow", "Destiny", "Elephant", "Emperor", "Ettin", "Explorer", "Extreme", "Fighter", "FlameArrow", "FlameBlade", "FlameDestroyer", "FlameFanatic", "FlameGuardian", "FlameMage", "FlameOverload", "FlameRuler", "FlameScout", "FlameSentinel", "FlameShield", "FlameSoldier", "FlameWall", "FlashArrow", "FlashBlade", "FlashDestroyer", "FlashFanatic", "FlashGuardian", "FlashMage", "FlashOverload", "FlashRuler", "FlashScout", "FlashSentinel", "FlashShield", "FlashSoldier", "FlashWall", "Fortress", "Fox", "FrostArrow", "FrostBlade", "FrostDestroyer", "FrostFanatic", "FrostGuardian", "FrostMage", "FrostOverload", "FrostRuler", "FrostScout", "FrostSentinel", "FrostShield", "FrostSoldier", "FrostWall", "Giant", "Gorilla", "Guide", "Gunman", "Hero", "HighSpeed", "Hippopotamus", "Hunter", "Infallibility", "IronWall", "King", "Knight", "Lion", "Looter", "Luck", "Lupin", "MartialArtist", "Messiah", "MeteorGuardian", "MeteorScout", "MeteorSentinel", "MeteorShield", "MeteorWall", "Miracle", "Mirage", "MistArrow", "MistBlade", "MistFanatic", "MistGuardian", "MistMage", "MistRuler", "MistScout", "MistSentinel", "MistShield", "MistSoldier", "MistWall", "Monkey", "MoonGuardian", "MoonScout", "MoonSentinel", "MoonShield", "MoonWall", "Overload", "Pioneer", "Prophet", "Scout", "Sentinel", "Sequent", "Settler", "Shadow", "Sharpshooter", "Sniper", "Soul", "SoulChaser", "SoulCollector", "SoulGuardian", "SoulGuide", "Spirit", "SpiritGuardian", "StarGuardian", "StarScout", "StarSentinel", "StarShield", "StarWall", "StormArrow", "StormBlade", "StormDestroyer", "StormFanatic", "StormGuardian", "StormMage", "StormScout", "StormSentinel", "StormShield", "StormSoldier", "StormWall", "StrangeChance", "Strategist", "Superman", "Swordman", "Swordmaster", "Thief", "Traveler", "Turtle", "TwilightChaser", "TwilightCollector", "VerdureArrow", "VerdureBlade", "VerdureFanatic", "VerdureGuardian", "VerdureMage", "VerdureRuler", "VerdureScout", "VerdureSentinel", "VerdureShield", "VerdureSoldier", "VerdureWall", "Victory", "Warrior", "Wolf", "Zenith"]
		.map((name, index) => <option key={index} value={name}>{name}</option>);

	const options = (item: ItemInfo) => Array.from({ length: 5 })
		.map((_, index: number) => {
			const ordinal = index + 1;

			return (
				<FormGroup key={`item-${item.id}-option-${ordinal}`} className="mt-2">
					<FormLabel>Property {ordinal}</FormLabel>

					<FormControl type="text" name={`optionType${ordinal}`} list="options-datalist" value={item.properties?.[`Option/Type${ordinal}`]} disabled={readonly} onInput={(event: ChangeEvent<HTMLInputElement>) => setOptionType(event, item.id, ordinal)}/>
					<datalist id="options-datalist">
						{optionOptions}
					</datalist>

					<FormControl type="text" name={`optionValue${ordinal}`} value={item.properties?.[`Option/Value${ordinal}`]} disabled={readonly} onInput={(event: ChangeEvent<HTMLInputElement>) => setOptionValue(event, item.id, ordinal)}/>
				</FormGroup>
			);
		});

	return (
		<Row>
			<Col>
				<Accordion>
					{
						items.map(item => {
							return (
								<AccordionItem key={item.id} eventKey={item.id.toString()}>
									<AccordionHeader>#{item.id} {item.type}</AccordionHeader>
									<AccordionBody>
										<FormGroup className="mt-2">
											<FormLabel>Type</FormLabel>
											<FormControl type="text" value={item.type} disabled={readonly} onInput={(event: ChangeEvent<HTMLInputElement>) => setType(event, item.id)}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Count</FormLabel>
											<FormControl type="number" value={item.count} min={0} step={1} disabled={readonly} onInput={(event: ChangeEvent<HTMLInputElement>) => setCount(event, item.id)}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Status</FormLabel>
											<FormSelect value={item.status} disabled={readonly} onInput={(event: ChangeEvent<HTMLSelectElement>) => setStatus(event, item.id)}>
												<option value="inventory">Inventory</option>
												<option value="warehouse">Warehouse</option>
												<option value="equipped">Equipped</option>
												<option value="stasis">Stasis</option>
												<option value="mailbox">Mailbox</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Bound to the character?</FormLabel>
											<FormSelect value={item.properties?.["Binded"]} disabled={readonly} onInput={(event: ChangeEvent<HTMLSelectElement>) => setIsBound(event, item.id)}>
												<option value="True">true</option>
												<option value="False">false</option>
											</FormSelect>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Option Ratio</FormLabel>
											<FormControl type="number" value={item.properties?.["Option/OptionRatio"]} disabled={readonly} onInput={(event: ChangeEvent<HTMLInputElement>) => setOptionRatio(event, item.id)}/>
										</FormGroup>
										<FormGroup className="mt-2">
											<FormLabel>Option Key</FormLabel>
											<FormControl type="text" list="option-keys" value={item.properties?.["Option/OptionKey"]} disabled={readonly} onInput={(event: ChangeEvent<HTMLInputElement>) => setOptionKey(event, item.id)}/>
											<datalist id="option-keys">
												{optionKeyOptions}
											</datalist>
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
			</Col>
		</Row>
	);
}

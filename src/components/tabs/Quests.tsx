import React, { createRef, useEffect, useRef, useState } from "react";
import { Accordion, Button, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { QuestCollection, QuestInfo } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Quest({ initialQuests }: { initialQuests: QuestCollection }) {
	const [quests, setQuests] = useState<QuestCollection>(Array.from(initialQuests));
	const refs = useRef(quests.map(() => {
		return {
			index: createRef<HTMLInputElement>(),
			name: createRef<HTMLInputElement>(),
			stage: createRef<HTMLInputElement>()
		};
	}));

	useEffect(
		() => {
			if (initialQuests.length > 0) {
				setQuests(initialQuests);
			}
		},
		[initialQuests]
	);

	const onApply = () => {
		if (refs.current) {
			const newQuests: QuestCollection = refs.current.filter(ref => ref.index.current && ref.name.current && ref.stage.current)
				.map(ref => {
					const quest: QuestInfo = {
						index: parseInt(ref.index.current!!.value),
						name: ref.name.current!!.value,
						stage: parseInt(ref.stage.current!!.value),
						properties: {}
					};

					return quest;
				});

			setQuests(newQuests);
		}
	};

	return (
		<Row>
			<Col>
				<Accordion>
					{
						initialQuests.map((quest, index) => {
							return (
								<AccordionItem key={`${quest.index}`} eventKey={`${quest.index}`}>
									<AccordionHeader>#{quest.index} {quest.name}</AccordionHeader>
									<AccordionBody>
										<input type="hidden" ref={refs.current[index].index}/>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type="text" ref={refs.current[index].name} defaultValue={quest.name}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Stage</FormLabel>
											<FormControl type="number" ref={refs.current[index].stage} defaultValue={quest.stage} min={0} step={1}/>
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

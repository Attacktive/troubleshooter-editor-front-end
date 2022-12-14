import React, { createRef, useEffect, useRef, useState } from "react";
import { Accordion, Button, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { RosterCollection, RosterInfo } from "../../types";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";

export default function Roster({ initialRosters }: { initialRosters: RosterCollection }) {
	const [rosters, setRosters] = useState<RosterCollection>(Array.from(initialRosters));
	const refs = useRef(rosters.map(() => {
		return {
			id: createRef<HTMLInputElement>(),
			name: createRef<HTMLInputElement>(),
			class: createRef<HTMLInputElement>(),
			level: createRef<HTMLInputElement>(),
			exp: createRef<HTMLInputElement>()
		};
	}));

	useEffect(
		() => {
			if (initialRosters.length > 0) {
				setRosters(initialRosters);
			}
		},
		[initialRosters]
	);

	const onApply = () => {
		if (refs.current) {
			const newRosters: RosterCollection = refs.current
				.filter(ref => ref.id.current && ref.name.current && ref.class.current && ref.level.current && ref.exp.current)
				.map(ref => {
					const roster: RosterInfo = {
						id: parseInt(ref.id.current!!.value),
						name: ref.name.current!!.value,
						class: ref.class.current!!.value,
						level: parseInt(ref.level.current!!.value),
						exp: parseInt(ref.exp.current!!.value),
						properties: {}
					};

					return roster;
				});

			setRosters(newRosters);
		}
	};

	return (
		<Row>
			<Col>
				<Accordion>
					{
						initialRosters.map((roster, index) => {
							return (
								<AccordionItem key={`${roster.id}`} eventKey={`${roster.id}`}>
									<AccordionHeader>#{roster.id} {roster.name}</AccordionHeader>
									<AccordionBody>
										<input type="hidden" ref={refs.current[index].id}/>
										<FormGroup>
											<FormLabel>Name</FormLabel>
											<FormControl type="text" ref={refs.current[index].name} defaultValue={roster.name}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Class</FormLabel>
											{/* TODO: change it to a select maybe */}
											<FormControl type="text" ref={refs.current[index].class} defaultValue={roster.class}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Level</FormLabel>
											<FormControl type="number" ref={refs.current[index].level} defaultValue={roster.level} min={0} step={1}/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Exp</FormLabel>
											<FormControl type="number" ref={refs.current[index].exp} defaultValue={roster.exp} min={0} step={1}/>
										</FormGroup>
										{/* TODO: handle properties */}
										{JSON.stringify(roster.properties)}
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

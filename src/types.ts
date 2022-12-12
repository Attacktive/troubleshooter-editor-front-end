type Properties = {
	[key: string]: string;
};

export type CompanyProperties = {
	GameDifficulty: string
};

export type CompanyInfo = {
	id: number,
	name: string,
	vill: number,
	properties: CompanyProperties
};

export const defaultCompany: CompanyInfo = Object.freeze({
	id: 0,
	name: "",
	vill: 0,
	properties: {
		GameDifficulty: ""
	}
});

export type RosterInfo = {
	id: number,
	name: string,
	class: string,
	level: number,
	exp: number,
	properties: Properties
};

export type RosterCollection = RosterInfo[];

export type ItemInfo = {
	id: number,
	type: string,
	count: number,
	status: string,
	properties: Properties
};

export type ItemCollection = ItemInfo[];

export type QuestInfo = {
	index: number,
	name: string,
	stage: number,
	properties: Properties
};

export type QuestCollection = QuestInfo[];

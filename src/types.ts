export interface SaveData {
	company: CompanyInfo;
	items: ItemCollection;
	quests: QuestCollection;
	rosters: RosterCollection;
}

export interface Properties {
	[key: string]: string;
}

export interface CompanyProperties extends Properties {
	GameDifficulty: string
}

export interface CompanyInfo {
	id: number,
	name: string,
	vill: number,
	properties: CompanyProperties
}

export const defaultCompany: CompanyInfo = Object.freeze({
	id: 0,
	name: "",
	vill: 0,
	properties: {
		GameDifficulty: ""
	}
});

export interface RosterInfo {
	id: number,
	name: string,
	class: string,
	level: number,
	exp: number,
	properties: Properties
}

export type RosterCollection = RosterInfo[];

export interface ItemInfo {
	id: number,
	type: string,
	count: number,
	status: "inventory" | "warehouse" | "equipped" | "statis" | "mailbox",
	properties: Properties
}

export type ItemCollection = ItemInfo[];

export interface QuestInfo {
	index: number,
	name: string,
	stage: number,
	properties: Properties
}

export type QuestCollection = QuestInfo[];

export function truncateCompanyInfo(company: CompanyInfo): CompanyInfo {
	return {
		id: company.id,
		name: company.name,
		vill: company.vill,
		properties: {
			GameDifficulty: company.properties.GameDifficulty
		}
	};
}

export function truncateItems(items: ItemCollection): ItemCollection {
	return items.filter(item => item.status === "equipped");
}

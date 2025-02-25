import type { CollectionConfig, GroupField } from "payload";

const HOST_ADDRESS = "https://tripviewer.vercel.app";

const zbor: Omit<GroupField, "name"> = {
	type: "group",
	fields: [
		{
			name: "companieAeriana",
			type: "text",
			required: true,
			admin: { width: "30%" },
		},
		{
			name: "numarZbor",
			type: "text",
			required: true,
			admin: { width: "30%" },
		},
		{
			name: "aeroportPlecare",
			type: "text",
			required: true,
			admin: { width: "30%" },
		},
		{
			name: "dataPlecare",
			type: "date",
			required: true,
			admin: {
				width: "30%",
				date: {
					pickerAppearance: "dayAndTime",
					timeIntervals: 5,
				},
			},
		},
		{
			name: "aeroportSosire",
			type: "text",
			required: true,
			admin: { width: "30%" },
		},
		{
			name: "dataSosire",
			type: "date",
			required: true,
			admin: {
				width: "30%",
				date: {
					pickerAppearance: "dayAndTime",
					timeIntervals: 5,
				},
			},
		},
	],
};

const zboruri: Omit<GroupField, "name"> = {
	type: "group",
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "orasPlecare",
					type: "text",
					required: true,
					admin: { width: "30%" },
				},
				{
					name: "orasSosire",
					type: "text",
					required: true,
					admin: { width: "30%" },
				},
				{
					name: "areEscala",
					type: "checkbox",
					label: "Are escala?",
					admin: {
						width: "30%",
						style: { marginTop: "2.8em" },
					},
				},
			],
		},
		{
			name: "zbor",
			...zbor,
		},
		{
			name: "escala",
			type: "group",
			admin: {
				condition: (_, siblingData) => Boolean(siblingData?.areEscala),
			},
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "aeroport",
							type: "text",
							admin: { width: "50%" },
						},
						{
							name: "durata",
							type: "text",
							admin: {
								placeholder: "2h 30m",
								width: "50%",
							},
						},
					],
				},
			],
		},
		{
			name: "zbor2",
			admin: {
				condition: (_, siblingData) => Boolean(siblingData?.areEscala),
			},
			...zbor,
		},
	],
} as const;

const ghid: GroupField = {
	name: "ghid",
	type: "group",
	fields: [
		{
			name: "nume",
			type: "text",
			required: true,
		},
		{
			name: "telefon",
			type: "text",
			required: true,
		},
		{
			name: "informatiiSuplimentare",
			type: "text",
			label: "Informatii Suplimentare",
		},
	],
};

const informatiiSuplimentareExcursie: GroupField = {
	name: "informatiiSuplimentareExcursie",
	type: "group",
	fields: [
		{
			name: "informatii",
			type: "richText",
			localized: true,
			admin: {
				style: {
					border: "1px solid var(--theme-elevation-200)",
					borderRadius: "4px",
					padding: "8px",
					transition: "border 0.2s ease-in-out",
				},
			},
		},
	],
};

export const Trips: CollectionConfig = {
	slug: "trips",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "titlu",
			type: "text",
			required: true,
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			admin: {
				description: `Slug-ul este un identificator unic folosit în URL pentru a genera linkul final. Exemplu: ${HOST_ADDRESS}/trips/aurore, unde aurore e slug-ul.`,
			},
		},
		{
			name: "imagine",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "zborDePlecare",
			...zboruri,
		},
		{
			name: "zborDeIntoarcere",
			...zboruri,
		},
		ghid,
		informatiiSuplimentareExcursie,
		{
			name: "itinerariuZile",
			type: "array",
			fields: [
				{
					name: "titlu",
					type: "text",
					required: true,
				},
				{
					name: "activitati",
					type: "textarea",
					required: true,
				},
			],
		},
	],
};

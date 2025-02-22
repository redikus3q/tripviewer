import { Media, Trip } from "@/payload-types";
import config from "@payload-config";
import {
	Bed,
	Book,
	Calendar,
	CircleUserRound,
	EllipsisVertical,
	MapPin,
	Phone,
	Plane,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BasePayload, getPayload } from "payload";
import ReadOnlyRichText from "../../rtl_parser";

// const NoSSR = dynamic(() => import("../../components/no-ssr"), { ssr: false });

function formatDate(dateString: string, format = "DD-MM-YYYY") {
	return moment(dateString).format(format);
}

function formatDateTime(dateString: string, format = "DD-MM-YYYY HH:mm") {
	return moment(dateString).format(format);
}

function FlightInformation(props: {
	flight: Trip["zborDePlecare"] | Trip["zborDeIntoarcere"];
}) {
	const flight = props.flight;
	return (
		<div className="">
			<h2 className="text-xl font-semibold mb-2">
				{flight.orasPlecare} spre {flight.orasSosire}
			</h2>
			<div className="mb-4 flex items-center border-b pb-4">
				<div className="w-8 flex items-center">
					<Calendar className="w-5 h-5 text-blue-600 mr-3" />
				</div>
				<span className="text-base text-gray-700">
					<strong>{formatDate(flight.zbor.dataPlecare)}</strong>
				</span>
			</div>

			<div className="mb-4 flex items-center">
				<div className="w-8 flex items-center">
					<Plane className="w-5 h-5 text-blue-600 mr-3" />
				</div>
				<span className="text-base text-gray-700">
					Zbor: <strong>{"Austrian Airlines"}</strong>{" "}
					<strong>{flight.zbor.numarZbor}</strong>
				</span>
			</div>

			<div className="mb-1 flex items-center">
				<div className="w-8 flex items-center">
					<MapPin className="text-blue-600 mr-3" />
				</div>
				<span className="text-base text-gray-700">
					Plecare: <strong>{flight.zbor.aeroportPlecare}</strong> la{" "}
					{formatDateTime(flight.zbor.dataPlecare)}
				</span>
			</div>

			<div className="mb-1 flex items-center">
				<div className="w-8 flex items-center">
					<EllipsisVertical className="text-blue-600 mr-3" />
				</div>
				<span className="text-sm text-gray-700">3 ore</span>
			</div>

			<div className="mb-4 flex items-center border-b pb-4 last:pb-0">
				<div className="w-8 flex items-center">
					<MapPin className="text-blue-600 mr-3" />
				</div>
				<span className="text-base text-gray-700">
					Sosire: <strong>{flight.zbor.aeroportSosire}</strong> la{" "}
					{formatDateTime(flight.zbor.dataSosire)}
				</span>
			</div>

			{flight.areEscala && (
				<>
					<div className="mb-4 flex items-center border-b pb-4">
						<div className="w-8 flex items-center">
							<Bed className="text-blue-600 mr-3" />
						</div>
						<span className="text-base text-gray-700">
							Escala: <strong>{flight.escala?.aeroport}</strong>{" "}
							{flight.escala?.durata}
						</span>
					</div>

					<div className="mb-4 flex items-center">
						<div className="w-8 flex items-center">
							<Plane className="w-5 h-5 text-blue-600 mr-3" />
						</div>
						<span className="text-base text-gray-700">
							Zbor: <strong>{"Austrian Airlines"}</strong>{" "}
							<strong>{flight.zbor2?.numarZbor}</strong>
						</span>
					</div>

					<div className="mb-1 flex items-center">
						<div className="w-8 flex items-center">
							<MapPin className="text-blue-600 mr-3" />
						</div>
						<span className="text-base text-gray-700">
							Plecare: <strong>{flight.zbor2?.aeroportPlecare}</strong> la{" "}
							{formatDateTime(flight.zbor2!.dataPlecare)}
						</span>
					</div>

					<div className="mb-1 flex items-center">
						<div className="w-8 flex items-center">
							<EllipsisVertical className="text-blue-600 mr-3" />
						</div>
						<span className="text-sm text-gray-700">3 ore</span>
					</div>

					<div className="mb-4 flex items-center">
						<div className="w-8 flex items-center">
							<MapPin className="text-blue-600 mr-3" />
						</div>
						<span className="text-base text-gray-700">
							Sosire: <strong>{flight.zbor2?.aeroportSosire}</strong> la{" "}
							{formatDateTime(flight.zbor2!.dataSosire)}
						</span>
					</div>
				</>
			)}
		</div>
	);
}

function NavBar() {
	return (
		<div className="navbar bg-base-90/80 backdrop-blur-sm shadow-lg w-full inset-ring-blue-500 flex flex-col items-center justify-items-center">
			<div className="navbar-start"></div>
			<div className="navbar-center m-2">
				<Image
					src="/logo.png"
					alt="Sigla Nordic Tours"
					width={120}
					height={38}
				/>
			</div>
			<div className="navbar-end"></div>
		</div>
	);
}

function TitleSection(props: { image: Media }) {
	return (
		<div className="flex w-full items-center justify-between mb-6">
			<div>
				<h1 className="text-xl lg:text-3xl font-extrabold text-gray-800">
					Excursia dumneavoastră
				</h1>
				<p className="text-gray-700 text-base lg:text-lg">
					O privire de ansamblu asupra călătoriei tale viitoare.
				</p>
				<p className="text-gray-500 text-sm lg:text-base">
					Detalii pentru a asigura o experiență de călătorie fără probleme.
				</p>
			</div>
			<Image
				src={props.image.url!}
				alt={props.image.alt!}
				width={120}
				height={38}
				className="rounded-xl shadow-lg w-28 h-28 object-cover border-2 border-gray-400"
			/>
		</div>
	);
}

function FlightSection(props: { trip: Trip }) {
	return (
		<>
			<h2 className="text-lg lg:text-2xl font-semibold text-gray-800 mt-10 mb-6 border-b-2 border-blue-200 pb-2">
				Detalii despre zbor
			</h2>

			<div className="">
				<div className="mb-6 p-4 border-l-4 mb-8 border-blue-500 bg-blue-50 rounded">
					<h3 className="text-base lg:text-lg font-bold text-blue-800 mb-3">
						Zbor de plecare
					</h3>

					<FlightInformation flight={props.trip.zborDePlecare} />
				</div>

				<div className="mb-6 p-4 border-l-4 mb-8 border-blue-500 bg-blue-50 rounded">
					<h3 className="text-lg font-bold text-blue-800 mb-3">
						Zbor de întoarcere
					</h3>

					<FlightInformation flight={props.trip.zborDeIntoarcere} />
				</div>
			</div>
		</>
	);
}

function ScheduleSection(props: { trip: Trip }) {
	return (
		<>
			<h2 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2">
				Program pe zile
			</h2>

			<div>
				{props.trip.itinerariuZile?.map((day, index) => (
					<div key={index} className="mb-6">
						<h3 className="text-base lg:text-xl font-medium text-gray-800">
							Ziua {index + 1}: {day.titlu}
						</h3>
						<p>{day.activitati}</p>
					</div>
				))}
			</div>
		</>
	);
}

const fetchImageUrl = async (id: string, payload: BasePayload) => {
	if (!id) return null;

	const {
		docs: [media],
	} = await payload.find({
		collection: "media",
		where: {
			id: {
				equals: id,
			},
		},
		depth: 2,
	});
	if (!media) return notFound();

	return media.url;
};

// Function to replace all upload IDs with their respective URLs
/* eslint-disable  @typescript-eslint/no-explicit-any */
const replaceUploadIdsWithUrls = async (value: any, payload: BasePayload) => {
	if (value == undefined || value == null) {
		return "";
	}
	const updatedValue = [];

	// Iterate through the value and replace upload IDs with URLs
	for (let i = 0; i < value.length; i++) {
		const node = value[i];

		if (node.type === "upload" && node.value?.id) {
			const mediaUrl = await fetchImageUrl(node.value.id, payload);
			if (mediaUrl) {
				// Replace the ID with the URL
				updatedValue.push({ ...node, value: { ...node.value, url: mediaUrl } });
			} else {
				updatedValue.push(node);
			}
		} else {
			updatedValue.push(node);
		}
	}

	return updatedValue;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
function AdditionalInformationSection(props: { informatiiSuplimentare: any }) {
	return (
		<div className="mb-8">
			<h2 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2">
				Informatii suplimentare
			</h2>

			<div suppressHydrationWarning className="mb-4 flex items-center">
				<ReadOnlyRichText value={props.informatiiSuplimentare} />
			</div>
		</div>
	);
}

function TourGuideSection(props: { trip: Trip }) {
	return (
		<div className="mb-8">
			<h2 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2">
				Informatii ghid
			</h2>

			<div>
				<div className="mb-4 flex items-center">
					<div className="w-8 flex items-center">
						<CircleUserRound className="w-5 h-5 text-blue-600 mr-3" />
					</div>
					<span className="text-base text-gray-700">
						Nume: <strong>{props.trip.ghid.nume}</strong>
					</span>
				</div>

				<div className="mb-4 flex items-center">
					<div className="w-8 flex items-center">
						<Phone className="w-5 h-5 text-blue-600 mr-3" />
					</div>
					<span className="text-base text-gray-700">
						Telefon: <strong>{props.trip.ghid.telefon}</strong>
					</span>
				</div>

				<div className="mb-4 flex items-center">
					<div className="w-8 flex items-center">
						<Book className="w-5 h-5 text-blue-600 mr-3" />
					</div>
					<span className="text-base text-gray-700">
						Informatii: {props.trip.ghid.informatiiSuplimentare}
					</span>
				</div>
			</div>
		</div>
	);
}

export default async function Home({ params }: { params: { slug: string } }) {
	const payload = await getPayload({ config });
	const parameters = await params;

	const {
		docs: [trip],
	} = await payload.find({
		collection: "trips",
		where: {
			slug: {
				equals: parameters.slug,
			},
		},
		depth: 2,
	});

	if (!trip) return notFound();

	const informatiiSuplimentareRaw =
		trip.informatiiSuplimentareExcursie?.informatii;

	const informatiiSuplimentare = await replaceUploadIdsWithUrls(
		informatiiSuplimentareRaw,
		payload
	);

	return (
		<div className="items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
			<NavBar />
			<main className="w-full">
				<div className="flex flex-col w-full justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
					<div className="m-5 lg:w-[calc(100%-500px)]">
						<TitleSection image={trip.imagine as Media} />

						<div className="bg-white rounded-xl p-5 shadow-lg">
							<h1 className="text-xl lg:text-3xl font-extrabold text-gray-800 mb-4 mt-4 text-center">
								{trip.titlu}
							</h1>

							<FlightSection trip={trip} />

							<AdditionalInformationSection
								informatiiSuplimentare={informatiiSuplimentare}
							/>

							<TourGuideSection trip={trip} />

							<ScheduleSection trip={trip} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

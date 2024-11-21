import React, { useState } from "react";

interface DominoCard {
	original: [number, number];
	howMany: [number, number];
}

const Source: [number, number][] = [
	[6, 1],
	[4, 3],
	[5, 1],
	[3, 4],
	[1, 1],
	[3, 4],
	[1, 2],
];

function TakeHome() {
	const [dominoCard, setDominoCard] = useState<[number, number][]>([...Source]);

	//SHOWING ALL DATA
	function InitalDataShows(data: [number, number][]): string {
		let display = "";
		for (let index = 0; index < data.length; index++) {
			const item = data[index];
			display += `[${item[0]}, ${item[1]}]`;
			if (index !== data.length - 1) {
				display += ", ";
			}
		}
		return display;
	}

	//SHOW HOW MANY DOUBLE NUMBERS APPEAR
	const double = (): number => {
		return dominoCard.filter(([a, b]) => a === b).length;
	};

	//SORT DATA ASCENDING
	const ascending = (): void => {
		let ascended = [...dominoCard].sort((a, b) => {
			let sumA = a[0] + a[1];
			let sumB = b[0] + b[1];
			if (sumA === sumB) {
				return a[0] - b[0];
			} else {
				return sumA - sumB;
			}
		});
		setDominoCard(ascended);
	};

	//SORT DATA DESCENDING
	const descending = (): void => {
		let descended = [...dominoCard].sort((a, b) => {
			let sumA = a[0] + a[1];
			let sumB = b[0] + b[1];
			if (sumA === sumB) {
				return b[0] - a[0];
			} else {
				return sumB - sumA;
			}
		});
		setDominoCard(descended);
	};

	//FLIP THE CARDS FUNCTION
	const flip = (): void => {
		let flipped = dominoCard.map(([a, b]) => [b, a] as [number, number]);
		setDominoCard(flipped);
	};

	//Remove Duplicate
	const removeDuplicate = (): void => {
		let processedCards: DominoCard[] = [];
		const cardCount: Record<string, number> = {};

		for (let i = 0; i < dominoCard.length; i++) {
			let currentCard = dominoCard[i];
			//Diurutin setiap kartu dari angka kecil
			let sortedCard =
				currentCard[0] < currentCard[1]
					? currentCard
					: [currentCard[1], currentCard[0]];

			//hitung setiap kemunculan
			let cardKey = sortedCard.toString();
			if (cardCount[cardKey] !== undefined) {
				cardCount[cardKey] += 1;
			} else {
				cardCount[cardKey] = 1;
			}
			console.log(cardKey);
			console.log("Perhitungan Card Count ada berapa", cardCount);

			processedCards.push({
				original: currentCard,
				howMany: sortedCard as [number, number],
			});
		}
		console.log("This is processed cards + ", processedCards);

		const nonDuplicate: [number, number][] = [];

		for (let i = 0; i < processedCards.length; i++) {
			let { original, howMany } = processedCards[i];
			let cardKey = howMany.toString();

			//hilangkan yang kepimilikan nya bukan satu
			if (cardCount[cardKey] === 1) {
				nonDuplicate.push(original);
				console.log(nonDuplicate);
			}
		}
		setDominoCard(nonDuplicate);
	};

	const reset = (): void => {
		setDominoCard([...Source]);
	};

	const removeByCertainTotal = (total: number): void => {
		const filtered = dominoCard.filter(([a, b]) => a + b !== total);
		setDominoCard(filtered);
	};

	return (
		<div className="min-h-screen p-5">
			<h1 className="text-2xl font-bold mb-5">Dominoes</h1>

			<div className="p-4 bg-slate-300 border my-5 ">
				<p>
					<strong>Source:</strong>
				</p>
				<div>{InitalDataShows(Source)}</div>
			</div>

			<div className="p-4 bg-slate-300">
				<strong>Double Numbers:</strong>
				<div>{double()}</div>
			</div>

			<div className="bg-slate-50 p-4 shadow mb-4 flex flex-wrap gap-3">
				{dominoCard.map((e, index) => (
					<div
						className="border border-gray-400 rounded-md p-2 bg-gray-50 flex flex-col items-center"
						key={index}
					>
						<div>{e[0]}</div>
						<div>-</div>
						<div>{e[1]}</div>
					</div>
				))}
			</div>

			<div className="flex flex-wrap gap-2 mb-4">
				<button
					className="bg-blue-500 text-white py-2 px-4 rounded-md"
					onClick={ascending}
				>
					Sort (Ascending)
				</button>
				<button
					className="bg-blue-500 text-white py-2 px-4 rounded-md"
					onClick={descending}
				>
					Sort (Descending)
				</button>
				<button
					className="bg-blue-500 text-white py-2 px-4 rounded-md"
					onClick={flip}
				>
					Flip
				</button>
				<button
					className="bg-blue-500 text-white py-2 px-4 rounded-md"
					onClick={removeDuplicate}
				>
					Remove Duplicates
				</button>
				<button
					className="bg-blue-500 text-white py-2 px-4 rounded-md"
					onClick={reset}
				>
					Reset
				</button>
			</div>

			<div className="block mb-2">
				<input
					type="number"
					id="removeTotal"
					className="border border-gray-300 rounded-md p-2 w-full mb-2"
					placeholder="Enter total to remove"
				/>
				<button
					className="bg-blue-500 text-white p-2 rounded-md"
					onClick={() => {
						const inputValue = (
							document.getElementById("removeTotal") as HTMLInputElement
						).value;
						removeByCertainTotal(Number(inputValue));
					}}
				>
					Remove
				</button>
			</div>
		</div>
	);
}

export default TakeHome;

import { useEffect, useState } from 'react';
import PokeCard from '../PokeCard';
import styles from './PokeGrid.module.css';

const PokeGrid = () => {
	const [pokemons, setPokemons] = useState([]);
	// TODO Add filters
	const [filter, setFilter] = useState({
		offset: 0,
		limit: 20
	});
	const [nextPage, setNextPage] = useState(null);

	const fetchPokemons = async (next) => {
		console.log('entra', searchWord);
		let POKEAPI_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${filter.offset}&limit=${filter.limit}`;

		if (next) {
			POKEAPI_URL = next;
		}

		const initial = await fetch(POKEAPI_URL);
		const initialJson = await initial.json();

		if (initialJson?.next) {
			setNextPage(initialJson.next);
		}

		const detailsData = initialJson.results.map(async (pokemon) => {
			const preFetchData = await fetch(pokemon.url);
			return preFetchData.json();
		});

		// uncomment this code if you want to see how it looks await Promise.all(detailsData)
		// const response = await Promise.all(detailsData)
		// console.log(response)
		// const fetchTypes = async () => {
		// 	const pokeTypes = await fetch('https://pokeapi.co/api/v2/type/');
		// 	return pokeTypes.json();
		// };

		const payload = (await Promise.all(detailsData)).map((data) => ({
			id: data.id,
			name: data.name,
			image: data.sprites.other['official-artwork'].front_default,
			types: data.types
		}));

		setPokemons(pokemons.concat(payload));
	};

	useEffect(() => {
		fetchPokemons();
	}, [searchWord]);

	const loadMorePokemons = () => {
		if (nextPage) {
			fetchPokemons(nextPage);
		}
	};

	return (
		<>
			<section className={styles.pokegrid}>
				{pokemons &&
					pokemons.map((pokemon) => (
						<PokeCard
							key={pokemon.id}
							id={pokemon.id}
							name={pokemon.name}
							sprite={pokemon.image}
							types={pokemon.types}
						/>
					))}
			</section>
			<div>
				<button onClick={loadMorePokemons}>More</button>
			</div>
		</>
	);
};

export default PokeGrid;

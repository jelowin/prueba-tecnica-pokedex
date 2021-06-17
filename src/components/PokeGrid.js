import { useEffect } from 'react';
import PokeCard from './PokeCard';

const PokeGrid = () => {
	const fetchPokemon = async () => {
		const initial = await fetch('https://pokeapi.co/api/v2/type/1');
		const initialJson = await initial.json();

		const detailsData = initialJson.pokemon.map(async (i) => {
			const preFetchData = await fetch(i.pokemon.url);
			return preFetchData.json();
		});

		// uncomment this code if you want to see how it looks await Promise.all(detailsData)
		// const response = await Promise.all(detailsData)
		// console.log(response)
		const payload = (await Promise.all(detailsData)).map((data) => ({
			name: data.name,
			image: data.sprites['front_default']
		}));
		console.log(payload);
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<>
			<div className='title-wrapper'>
				<h1>Pokedex</h1>
			</div>
			<section className='poke-grid'>
				{pokemons &&
					pokemons.map((pokemon) => (
						<PokeCard
							key={pokemon.id}
							name={pokemon.name}
							sprites={pokemon.sprites}
						/>
					))}
			</section>
		</>
	);
};

export default PokeGrid;

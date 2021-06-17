const PokeCard = ({ name, sprites }) => {
	return (
		<article className='poke-card'>
			<div>
				<img src={sprites.front_default} alt={name} />
			</div>
			<h3>{name}</h3>
		</article>
	);
};

export default PokeCard;

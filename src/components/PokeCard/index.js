import styles from './PokeCard.module.css';

const PokeCard = ({ id, name, sprite, types }) => {
	return (
		<article key={id} className={styles.pokecard}>
			<div>
				<img className={styles.pokesprite} src={sprite} alt={name} />
			</div>
			<h3>{name}</h3>
			{types.map(({ type }, index) => (
				<p key={index}>{type.name}</p>
			))}
		</article>
	);
};

export default PokeCard;

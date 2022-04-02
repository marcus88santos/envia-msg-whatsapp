import styles from '../styles/mensagensVisualizacao.module.css'

export default function mensagensVisualizacao () {
	return (
		<section className={styles.mensagensVisualizacao}>
			<div className='section__title'>
				<img src='/icon-visualizacao.jpg' alt='visualizacao' />
				<h1>Visualização</h1>
			</div>
		</section>
	)
}

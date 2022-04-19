import react from 'react'
import styles from '../styles/enviar.module.css'

export default function Enviar (props) {
	return (
		<section className={styles.enviar}>
			<div className='section__title'>
				<div className='section__title_icon'>
					<i className='pi pi-send' style={{}} />
				</div>
				<h1>Enviar</h1>
			</div>
		</section>
	)
}

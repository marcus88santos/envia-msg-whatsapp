import styles from '../styles/header.module.css'
// import { Link } from 'react-router-dom'
const logo_linkedin = '/logo-linkedin-white.png'
const logo_github = '/logo-github-white.png'
const logo_whatsapp = '/logo-whatsapp-white.png'
const logo_facebook = '/logo-facebook-white.png'

export default function Header () {
	return (
		<header className={styles.header}>
			<img
				className={styles.header__logoPessoal}
				src='/logo.png'
				alt='logo'
			/>
			<div className={styles.header__logos}>
				<a
					href='http://linkedin.com/in/marcus88santos'
					target='_blank'
					rel='noopener noreferrer'>
					<img src={logo_linkedin} alt='linkedin' />
				</a>
				<a
					href='http://github.com/marcus88santos'
					target='_blank'
					rel='noopener noreferrer'>
					<img src={logo_github} alt='github' />
				</a>
				<a
					href='http://facebook.com/mf8santos'
					target='_blank'
					rel='noopener noreferrer'>
					<img src={logo_facebook} alt='facebook' />
				</a>
				<a
					href='https://wa.me/+5579996510482'
					target='_blank'
					rel='noopener noreferrer'>
					<img src={logo_whatsapp} alt='whatsapp' />
				</a>
			</div>
		</header>
	)
}

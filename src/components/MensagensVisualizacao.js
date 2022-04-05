import styles from '../styles/mensagensVisualizacao.module.css'
import htmlParser from 'html-react-parser'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FaCamera } from 'react-icons/fa'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { IoIosVideocam } from 'react-icons/io'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { MdOutlineMic } from 'react-icons/md'

export default function mensagensVisualizacao (props) {
	return (
		<section className={styles.mensagensVisualizacao}>
			<div className='section__title'>
				<img src='/icon-visualizacao.jpg' alt='visualizacao' />
				<h1>Visualização</h1>
			</div>
			<div className={styles.mensagensVisualizacao__tela}>
				<div className={styles.mensagensVisualizacao__tela__header}>
					<div
						className={
							styles.mensagensVisualizacao__tela__header_contact
						}>
						<div
							className={
								styles.mensagensVisualizacao__tela__header_avatar
							}>
							<i className='pi pi-arrow-left'></i>
							<FaUser />
						</div>
						<div
							className={
								styles.mensagensVisualizacao__tela__header_name
							}>
							<span>Contato</span>
							<br />
							<span>Online</span>
						</div>
					</div>
					<div
						className={styles.mensagensVisualizacao__tela__header_icons}>
						<IoIosVideocam />
						<FaPhoneAlt />
						<BiDotsVerticalRounded />
					</div>
				</div>
				<div className={styles.mensagensVisualizacao__tela__body}>
					<div className={styles.mensagensVisualizacao__tela__body_msgs}>
						{props.msgList.map((msg, i) => {
							function msgTextAlterada (msg) {
								let msgAlterada = ''
								if (msg.msgText) {
									msgAlterada = '<span>' + msg.msgText + '</span>'
									msgAlterada = msgAlterada.replaceAll(
										/\*.+\*/g,
										reg => {
											return (
												'<b>' +
												reg.substring(1, reg.length - 1) +
												'</b>'
											)
										}
									)
									msgAlterada = htmlParser(msgAlterada)
								}
								return msgAlterada
							}
							return msg.msgTipo ? (
								<div
									className={
										styles.mensagensVisualizacao__tela__body_msgs_msg
									}
									key={msg.msgId}>
									<div
										className={
											styles.mensagensVisualizacao__tela__body_msgs_textImg
										}>
										{msg.msgTipo ? (
											msg.msgTipo == 'texto' ? (
												msgTextAlterada(msg)
											) : (
												<image src={msg.msgUrl.base64} alt='' />
											)
										) : null}
										<span>
											<svg
												viewBox='0 0 16 15'
												width='13'
												height='12'
												className=''>
												<path
													fill='currentColor'
													d='m15.01 3.316-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z'></path>
											</svg>
										</span>
									</div>
									<span
										className={
											styles.mensagensVisualizacao__tela__body_msgs_fala
										}
										style={
											i == 0
												? { visibility: 'visible' }
												: { visibility: 'hidden' }
										}>
										<svg
											viewBox='0 0 8 13'
											width='8'
											height='13'
											className=''>
											<path
												opacity='.13'
												d='M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z'></path>
											<path
												fill='currentColor'
												d='M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z'></path>
										</svg>
									</span>
								</div>
							) : null
						})}
					</div>
					<div className={styles.mensagensVisualizacao__tela__body_footer}>
						<div
							className={
								styles.mensagensVisualizacao__tela__body_footer_icons
							}>
							<MdOutlineEmojiEmotions />
							<span>Mensagem</span>
							<i className={'pi pi-paperclip'}></i>
							<AiFillDollarCircle />
							<FaCamera />
						</div>
						<div
							className={
								styles.mensagensVisualizacao__tela__body_footer_mic
							}>
							<MdOutlineMic />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

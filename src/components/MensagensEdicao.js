import react from 'react'
import Image from 'next/image'
import styles from '../styles/mensagensEdicao.module.css'
import Mensagem from './Mensagem'
import { Button } from 'primereact/button'

export default function MensagensEdicao (props) {
	const [msgList, setMsgList] = react.useState(props.msgList)
	const [maxId, setMaxId] = react.useState(1)

	react.useEffect(() => {
		setMsgList(props.msgList)
	}, [props.msgList])

	react.useEffect(() => {
		updateMaxId()
	}, [msgList])

	function handleDelete (id) {
		props.setMsgList(msgList.filter(msg => msg.msgId !== id))
	}

	function handleSave (msg) {
		let newMsgList = []
		for (let i = 0; i < msgList.length; i++) {
			if (msgList[i].msgId == msg.msgId) {
				newMsgList.push(msg)
			} else {
				newMsgList.push(msgList[i])
			}
		}
		props.setMsgList(newMsgList)
	}

	function handleAdd () {
		let novaMensagem = {
			msgId: maxId,
			msgTipo: '',
			msgText: '',
			msgUrl: {},
		}
		props.setMsgList([...msgList, novaMensagem])
	}

	function updateMaxId () {
		let id = 1
		msgList.forEach(msg => {
			if (msg.msgId >= id) {
				id = msg.msgId + 1
			}
		})
		setMaxId(id)
	}

	return (
		<section className={styles.mensagensEdicao}>
			<div className='section__title'>
				<Image src='/icon-mensagens.png' alt='mensagens' />
				<h1>Mensagens</h1>
			</div>
			<div className='mensagens'>
				{msgList.map(msg => {
					return (
						<Mensagem
							msg={msg}
							key={msg.msgId}
							handleDelete={handleDelete}
							handleSave={handleSave}
						/>
					)
				})}
			</div>
			<Button
				icon='pi pi-plus'
				className={`p-button-rounded p-button-info p-button-sm ${styles.button}`}
				onClick={handleAdd}
			/>
		</section>
	)
}

import react from 'react'
import styles from '../styles/mensagens.module.css'
import MensagensEdicao from './MensagensEdicao'
import MensagensVisualizacao from './MensagensVisualizacao'

export default function Mensagens (props) {
	const [msgList, setMsgList] = react.useState(props.msgList)

	react.useEffect(() => {
		setMsgList(props.msgList)
	}, [props.msgList])

	return (
		<div className={styles.mensagens}>
			<MensagensEdicao msgList={msgList} setMsgList={props.setMsgList} />
			<MensagensVisualizacao msgList={msgList} />
		</div>
	)
}

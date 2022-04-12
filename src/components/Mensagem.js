import styles from '../styles/mensagem.module.css'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { FaRegSmile } from 'react-icons/fa'

import react from 'react'

const msgTipos = [
	{ label: 'Texto', value: 'texto' },
	{ label: 'Imagem', value: 'imagem' },
]

export default function Mensagem (props) {
	const [msg, setMsg] = react.useState({})
	const [msgTipo, setMsgTipo] = react.useState(props.msg.msgTipo || '')
	const [msgText, setMsgText] = react.useState(props.msg.msgText || '')
	const [msgUrl, setMsgUrl] = react.useState(props.msg.msgUrl || {})
	const [btnSaveToggle, setBtnSaveToggle] = react.useState(true)

	react.useEffect(() => {
		setMsg({
			msgId: props.msg.msgId,
			msgTipo: msgTipo,
			msgText: msgText,
			msgUrl: msgUrl,
		})
	}, [msgTipo, msgText, msgUrl])

	react.useEffect(() => {
		if (Object.keys(msg).length > 0) {
			if (
				(msg.msgTipo != props.msg.msgTipo && msg.msgTipo) ||
				(msg.msgText != props.msg.msgText && msg.msgText) ||
				(msg.msgUrl != props.msg.msgUrl && msg.msgUrl)
			) {
				setBtnSaveToggle(false)
			}
		}
	}, [msg])

	function handleDelete () {
		props.handleDelete(props.msg.msgId)
	}

	function handleSave () {
		props.handleSave(msg)
		setBtnSaveToggle(true)
	}

	function handleEmoji () {
		//
	}

	function handleUpload (e) {
		// console.log(e.files)
		let file = e.files[0]
		let reader = new FileReader()
		reader.onloadend = () => {
			// console.log(reader.result)
			let img = new Image()
			img.src = reader.result
			img.onload = function () {
				console.log(this.width + ' ' + this.height)
				setMsgUrl({
					name: file.name,
					base64: reader.result,
					height: this.height,
					width: this.width,
				})
			}
		}
		reader.readAsDataURL(file)
	}

	return (
		<div className={styles.mensagem}>
			<div className={styles.mensagem__header}>
				<Dropdown
					className={styles.mensagem__input_tipo}
					value={msgTipo}
					options={msgTipos}
					onChange={e => setMsgTipo(e.value)}
					placeholder='Tipo de mensagem'
				/>
				<Button
					icon='pi pi-trash'
					className={`p-button p-button-raised p-button-rounded p-button-danger p-button-sm ${styles.mensagem__button}`}
					onClick={handleDelete}
				/>
				<Button
					icon='pi pi-save'
					className={`p-button p-button-raised p-button-rounded p-button-success p-button-sm ${styles.mensagem__button}`}
					onClick={handleSave}
					disabled={btnSaveToggle}
				/>
			</div>
			<div className={styles.mensagem__body}>
				<span
					className={`p-input-icon-left ${styles.mensagem__body__text}`}
					style={{ display: msgTipo == 'texto' ? 'block' : 'none' }}>
					<FaRegSmile
						className={` ${styles.mensagem__icon_emoji}`}
						onClick={handleEmoji}
					/>
					<InputTextarea
						className={`p-inputtext-sm ${styles.mensagem__body__text_input}`}
						value={msgText}
						onChange={e => setMsgText(e.target.value)}
						rows={1}
						placeholder='Mensagem'
						autoResize
					/>
				</span>
				<span
					className={styles.mensagem__body__upload}
					style={{ display: msgTipo == 'imagem' ? 'flex' : 'none' }}>
					<label
						htmlFor={`imgInp${msg.msgId}`}
						className='p-button p-button-raised'>
						<i className='pi pi-folder-open'></i>
						{msgUrl.name ? (
							<span>Substituir</span>
						) : (
							<span>Escolher</span>
						)}
					</label>
					<input
						accept='image/*'
						type='file'
						id={`imgInp${msg.msgId}`}
						onChange={e => handleUpload(e.target)}
					/>
					{msgUrl.name ? (
						<span>Arquivo: {msgUrl.name}</span>
					) : (
						<span>Escolha uma imagem</span>
					)}
				</span>
			</div>
		</div>
	)
}

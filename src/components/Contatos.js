import react from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { MdOutlineScheduleSend } from 'react-icons/md'
import styles from '../styles/contatos.module.css'

export default function Contatos (props) {
	const [contatos, setContatos] = react.useState(props.contatos)
	const [contatosSelecionados, setContatosSelecionados] = react.useState(
		props.contatosSelecionados
	)

	react.useEffect(() => {
		setContatos(props.contatos)
	}, [props.contatos])

	react.useEffect(() => {
		setContatosSelecionados(props.contatosSelecionados)
	}, [props.contatosSelecionados])

	function handleUpload (e) {
		setContatos(prevState => ({
			...prevState,
			status: 'Carregando...',
			icone: 'pi pi-spin pi-spinner',
		}))
		let file = e.target.files[0]
		lerCSV(file)
	}
	function lerCSV (file) {
		let reader = new FileReader()
		reader.onload = function (e) {
			let csv = e.target.result
			separarContatos(csv)
		}
		reader.readAsText(file)
	}
	function separarContatos (csv) {
		// console.log(csv)
		let dados = csv.split('\n')
		// console.log(dados)
		let colunasTel = []
		let colunas = dados[0].split(',')
		let contatosCsv = []
		for (let i = 0; i < colunas.length; i++) {
			colunas[i].match(/Phone[^Type]*?Value/) ? colunasTel.push(i) : null
		}
		for (let i = 1; i < dados.length - 1; i++) {
			let infoContato = dados[i].split(',')
			// console.log(infoContato)
			for (let t = 0; t < colunasTel.length; t++) {
				infoContato[`${colunasTel[t]}`].length > 0
					? contatosCsv.push({
							nome: infoContato[0],
							telefone: infoContato[`${colunasTel[t]}`].split(
								' ::: '
							)[0],
					  })
					: null
			}
		}
		padronizarTels(contatosCsv)
	}
	function padronizarTels (contatosCsv) {
		// console.log(contatos)
		let contatosErrados = []
		contatosCsv.map(contato => {
			contato.telefone = contato.telefone.replace('-', '')
			contato.telefone = contato.telefone.replaceAll(' ', '')
			contato.telefone = contato.telefone.replace('+', '')
			if (contato.telefone.length == 8) {
				contato.telefone = '55799' + contato.telefone
			}
			if (contato.telefone.length == 9) {
				contato.telefone = '5579' + contato.telefone
			}
			if (contato.telefone.substring(0, 2) == '55') {
				if (contato.telefone.length - 4 == 8) {
					contato.telefone =
						contato.telefone.substring(0, 4) +
						'9' +
						contato.telefone.substring(4, contato.telefone.length)
				}
			}
			if (contato.telefone.substring(0, 3) == '041') {
				contato.telefone =
					'55' + contato.telefone.substring(3, contato.telefone.length)
			}
			if (contato.telefone.substring(0, 1) == '0') {
				contato.telefone =
					'55' + contato.telefone.substring(1, contato.telefone.length)
			}
			if (contato.telefone.length == 11) {
				contato.telefone = '55' + contato.telefone
			}
			if (contato.telefone.substring(0, 2) != '55') {
				contato.telefone = '55' + contato.telefone
			}
			if (contato.telefone.substring(0, 2) == '55') {
				if (contato.telefone.length - 4 == 8) {
					contato.telefone =
						contato.telefone.substring(0, 4) +
						'9' +
						contato.telefone.substring(4, contato.telefone.length)
				}
			}
			if (
				contato.telefone.length != 13 ||
				contato.telefone.substring(0, 2) != '55'
			) {
				contatosErrados.push({
					nome: contato.nome,
					telefone: contato.telefone,
				})
			}
			if (contato.nome.substring(0, 1) == '"')
				contato.nome = contato.nome.substring(1, contato.nome.length)
			return contato
		})
		verifDuplicContatos(contatosCsv, contatosErrados)
	}

	function verifDuplicContatos (contatosCsv, contatosErrados) {
		let contatosDuplicados = []

		contatosCsv.forEach(contato => {
			for (let i = 0; i < contatosCsv.length; i++) {
				if (
					contato.telefone == contatosCsv[i].telefone &&
					contato.nome != contatosCsv[i].nome
				) {
					let pos = contatosDuplicados
						.map(el => {
							return el.telefone
						})
						.indexOf(contato.telefone)

					if (contatosDuplicados.length == 0) {
						contatosDuplicados.push({
							nome: contato.nome,
							telefone: contato.telefone,
						})
						contatosDuplicados.push({
							nome: contatosCsv[i].nome,
							telefone: contato.telefone,
						})
					} else {
						if (pos == -1) {
							contatosDuplicados.push({
								nome: contato.nome,
								telefone: contato.telefone,
							})
							contatosDuplicados.push({
								nome: contatosCsv[i].nome,
								telefone: contato.telefone,
							})
						}
					}
				}
			}
		})

		contatosDuplicados.map(contato => {
			contato.telefone =
				'+' +
				contato.telefone.substring(0, 2) +
				' (' +
				contato.telefone.substring(2, 4) +
				') ' +
				contato.telefone.substring(4, 5) +
				' ' +
				contato.telefone.substring(5, 9) +
				'-' +
				contato.telefone.substring(9, 13)
			return contato
		})

		contatosCsv.map(contato => {
			if (contato.telefone.length == 13) {
				contato.telefone =
					'+' +
					contato.telefone.substring(0, 2) +
					' (' +
					contato.telefone.substring(2, 4) +
					') ' +
					contato.telefone.substring(4, 5) +
					' ' +
					contato.telefone.substring(5, 9) +
					'-' +
					contato.telefone.substring(9, 13)
			}
			return contato
		})

		props.setContatos(prevState => ({
			...prevState,
			botao: 'Substituir Contatos',
			contatos: contatosCsv,
			duplicados: contatosDuplicados,
			errados: contatosErrados,
			icone: 'pi pi-check',
			status: 'Concluído',
		}))
	}

	const contatosErradosHeader = (
		<div
			className='table-header'
			style={{ color: 'darkred', fontSize: '17px' }}>
			Telefones fora de padrão
		</div>
	)
	const contatosDuplicadosHeader = (
		<div
			className='table-header'
			style={{ color: 'darkorange', fontSize: '17px' }}>
			Telefones duplicados
		</div>
	)
	const contatosHeader = (
		<div
			className='table-header'
			style={{ color: 'black', fontSize: '17px' }}>
			<b style={{ color: 'darkred' }}>
				{contatosSelecionados
					? new Intl.NumberFormat('pt-BR').format(
							contatosSelecionados.length
					  )
					: 0}{' '}
			</b>
			{' de '}
			<b>
				{contatos.contatos
					? new Intl.NumberFormat('pt-BR').format(contatos.contatos.length)
					: 0}
			</b>
			{' Selecionados'}
		</div>
	)
	const enviadosHeader = (
		<MdOutlineScheduleSend
			style={{
				'font-size': '20px',
				display: 'flex',
			}}
		/>
	)
	const enviadoBodyTemplate = rowData => {
		const contato = rowData.enviado
		return (
			<>
				<i className='pi pi-circle'></i>
			</>
		)
	}
	function handleSelection (e) {
		props.setContatosSelecionados(e.value)
	}
	const matchModesNome = [
		{ label: 'Inicia com', value: FilterMatchMode.STARTS_WITH },
		{ label: 'Contém', value: FilterMatchMode.CONTAINS },
	]
	const matchModesTelefone = [
		{ label: 'Contém', value: FilterMatchMode.CONTAINS },
	]

	return (
		<section className={styles.contatos}>
			<div className='section__title'>
				<div className='section__title_icon'>
					<i className='pi pi-users' style={{}} />
				</div>
				<h1>Contatos</h1>
			</div>
			<span className={styles.contatos__upload}>
				<label
					htmlFor='contatosInp'
					className='p-button p-component p-button-raised p-button-warning'>
					<i className='pi pi-folder-open'></i>
					{contatos.botao}
				</label>
				<input
					accept='.csv'
					type='file'
					id='contatosInp'
					onChange={e => handleUpload(e)}
					value=''
				/>
				<span className={styles.contatos__upload_status}>
					{contatos.status}
				</span>
				<i
					className={`${contatos.icone} ${styles.contatos__upload_icone}`}></i>
			</span>
			{Object.keys(contatos).length > 0 ? (
				contatos.errados.length > 0 ? (
					<DataTable
						className={`${styles.contatos__upload} ${styles.contatos__upload_errados}`}
						size='small'
						value={contatos.errados}
						paginator
						rows={10}
						stripedRows
						header={contatosErradosHeader}
						responsiveLayout='scroll'>
						<Column field='nome' header='Nome'></Column>
						<Column field='telefone' header='Telefone'></Column>
					</DataTable>
				) : null
			) : null}
			{Object.keys(contatos).length > 0 ? (
				contatos.duplicados.length > 0 ? (
					<DataTable
						className={`${styles.contatos__upload} ${styles.contatos__upload_errados}`}
						size='small'
						value={contatos.duplicados}
						paginator
						rows={10}
						stripedRows
						header={contatosDuplicadosHeader}
						responsiveLayout='scroll'>
						<Column field='nome' header='Nome'></Column>
						<Column field='telefone' header='Telefone'></Column>
					</DataTable>
				) : null
			) : null}
			{Object.keys(contatos).length > 0 ? (
				contatos.contatos.length > 0 ? (
					<DataTable
						className={`${styles.contatos__upload} ${styles.contatos__upload_errados}`}
						size='small'
						value={contatos.contatos}
						paginator
						rows={10}
						stripedRows
						header={contatosHeader}
						selection={contatosSelecionados}
						onSelectionChange={e => handleSelection(e)}
						dataKey='telefone'
						responsiveLayout='scroll'>
						<Column
							selectionMode='multiple'
							className={
								styles.contatos__upload_contatosHeader
							}></Column>
						<Column
							field='nome'
							header='Nome'
							sortable
							filter
							filterPlaceholder='Digite um nome'
							showFilterOperator={false}
							filterMatchModeOptions={matchModesNome}></Column>
						<Column
							field='telefone'
							header='Telefone'
							filterPlaceholder='Digite um número'
							showFilterOperator={false}
							filterMatchMode='contains'
							filterMatchModeOptions={matchModesTelefone}
							showFilterMatchModes={false}
							filter></Column>
						<Column
							className={`${styles.contatos__upload_contatosEnviados} ${styles.contatos__upload_contatosHeader}`}
							header={enviadosHeader}
							body={enviadoBodyTemplate}></Column>
					</DataTable>
				) : null
			) : null}
		</section>
	)
}

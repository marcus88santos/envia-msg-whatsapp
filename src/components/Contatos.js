import react from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import styles from '../styles/contatos.module.css'

export default function Contatos (props) {
	const [contatos, setContatos] = react.useState(props.contatos)
	const [contatosCsv, setContatosCsv] = react.useState({
		status: 'Escolha um arquivo ".csv"',
		botao: 'Carregar contatos',
		icone: '',
		errados: [],
		duplicados: [],
	})
	function handleUpload (e) {
		setContatosCsv(prevState => ({
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
		let contatos = []
		for (let i = 0; i < colunas.length; i++) {
			colunas[i].match(/Phone[^Type]*?Value/) ? colunasTel.push(i) : null
		}
		for (let i = 1; i < dados.length - 1; i++) {
			let infoContato = dados[i].split(',')
			// console.log(infoContato)
			for (let t = 0; t < colunasTel.length; t++) {
				infoContato[`${colunasTel[t]}`].length > 0
					? contatos.push({
							nome: infoContato[0],
							telefone: infoContato[`${colunasTel[t]}`].split(
								' ::: '
							)[0],
					  })
					: null
			}
		}
		padronizarTels(contatos)
	}
	function padronizarTels (contatos) {
		// console.log(contatos)
		let contatosErrados = []
		contatos.map(contato => {
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
			return contato
		})
		setContatosCsv(prevState => ({
			...prevState,
			errados: contatosErrados,
		}))
		// console.log(contatosErrados)
		verifDuplicContatos(contatos)
	}
	function verifDuplicContatos (contatos) {
		//VERIFICAR DUPLICIDADE
		// console.log(contatos)

		let contatosDuplicados = []

		contatos.forEach(contato => {
			for (let i = 0; i < contatos.length; i++) {
				if (
					contato.telefone == contatos[i].telefone &&
					contato.nome != contatos[i].nome
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
							nome: contatos[i].nome,
							telefone: contato.telefone,
						})
					} else {
						if (pos == -1) {
							contatosDuplicados.push({
								nome: contato.nome,
								telefone: contato.telefone,
							})
							contatosDuplicados.push({
								nome: contatos[i].nome,
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

		setContatosCsv(prevState => ({
			...prevState,
			duplicados: contatosDuplicados,
		}))

		setContatosCsv(prevState => ({
			...prevState,
			botao: 'Substituir Contatos',
			status: 'Concluído',
			icone: 'pi pi-check',
		}))
	}

	const contatosErradosHeader = (
		<div className='table-header' style={{ color: 'darkred' }}>
			Telefones fora de padrão
		</div>
	)
	const contatosDuplicadosHeader = (
		<div className='table-header' style={{ color: 'darkorange' }}>
			Contatos Duplicados
		</div>
	)

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
					{contatosCsv.botao}
				</label>
				<input
					accept='.csv'
					type='file'
					id='contatosInp'
					onChange={e => handleUpload(e)}
					value=''
				/>
				<span className={styles.contatos__upload_status}>
					{contatosCsv.status}
				</span>
				<i
					className={`${contatosCsv.icone} ${styles.contatos__upload_icone}`}></i>
			</span>
			{contatosCsv.errados.length > 0 ? (
				<DataTable
					className={`${styles.contatos__upload} ${styles.contatos__upload_errados}`}
					size='small'
					value={contatosCsv.errados}
					paginator
					rows={10}
					header={contatosErradosHeader}
					responsiveLayout='scroll'>
					<Column field='nome' header='Nome'></Column>
					<Column field='telefone' header='Telefone'></Column>
				</DataTable>
			) : null}
			{contatosCsv.duplicados.length > 0 ? (
				<DataTable
					className={`${styles.contatos__upload} ${styles.contatos__upload_errados}`}
					size='small'
					value={contatosCsv.duplicados}
					paginator
					rows={10}
					header={contatosDuplicadosHeader}
					responsiveLayout='scroll'>
					<Column field='nome' header='Nome'></Column>
					<Column field='telefone' header='Telefone'></Column>
				</DataTable>
			) : null}
		</section>
	)
}

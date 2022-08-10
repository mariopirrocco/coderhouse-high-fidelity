
const express = require('express')
const app = express()
const port = 8080

const Container = require('./Container')
const catalogue = new Container('catalogue.txt')

const loadCatalogue = async() => {
	await catalogue.save({artist: 'Fito Páez', record: 'El amor después del amor'})
	await catalogue.save({artist: 'Soda Stereo', record: 'Canción animal'})
	await catalogue.save({artist: 'Charly García', record: 'Parte de la religión'})
	await catalogue.save({artist: 'Particio Rey', record: 'Oktubre'})
}
loadCatalogue();

app.get('/products', (req, res) => {

	try {
		const showAll = async () => {
			const data = await catalogue.getAllRecords()
			let content = ''
			data.map((record)=>{
				content += 
				`<p>
					<strong>Artista:</strong> ${record.artist}<br>
					<strong>Disco:</strong> ${record.record}<br>
					------------------------------------------------
				</p>`
			})
			res.send(content)
		} 
		showAll()
	} catch(e) {
		res.send(`There was an error ${e} accessing your request: ` )
	}	
})

app.get('/randomProduct', (req, res) => {
	try {
		const showRandomProduct = async () => {
			let randomProduct = ''
			const data = await catalogue.getAllRecords()
			let randomId = Math.ceil(Math.random() * data.length)
			let record = await catalogue.getById(randomId)
			randomProduct += 
			`<p>
					<strong>Artista:</strong> ${record.artist}<br>
					<strong>Disco:</strong> ${record.record}
			</p>`
			res.send(randomProduct)
		} 
		showRandomProduct()
	} catch(e) {
		res.send(`There was an error ${e} accessing your request: ` )
	}	
	
})

const server = app.listen(port, () => {
	console.log('Server is up and running')
})

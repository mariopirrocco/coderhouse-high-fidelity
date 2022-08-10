const fs = require('fs')
class Container {
	constructor(fileName) {
		this.fileName = fileName
		fs.promises.writeFile(`./${fileName}`, '')
	}
	
	async save(object) {
		try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')			
			if(!data) {			
				object.id = 1
				const myArray = [object]
				await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(myArray))
				return object.id
			} else {
				data = JSON.parse(data)
				object.id = data.length + 1
				data.push(object)
				await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
				return object.id
			}
		} catch(err) {
			console.log('There was an error loading records to the catalogue: ', err)
		}
	}
	
  async getById(id) {
		try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			const retrieve = data.filter( record => record.id === id)
			if(retrieve.length === 0) {
				console.log('Record unavailable at the moment')
				return null
			} else {
				const [retrieved] = retrieve
				// console.log('======= return record by id =======')
				// console.log(retrieved)
				return retrieved
			}
		} catch(err) {
			console.log('There was an error when looking for your record: ', err)
		}
		
  }

  async getAllRecords() {
		try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			const allRecords = data.slice()
			// console.log('======= show all records =======')
			// console.log(allRecords)
			return allRecords			
		} catch(err) {
			console.log('There was an error retrieving the catalogue: ', err)
		}
  }
	
  async deleteById(id) {
		try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			console.log('======= delete record by id =======')
			const index = data.findIndex(record => record.id === id)
			
			if(index !== -1) {
				// const deleted = data.splice(index, 1)
        data[index] = null
				// const deletedRecord = JSON.stringify(deleted[0])
				// console.log(`This is the deleted record: ${deletedRecord}`)
				await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
			} else {
				console.log('No record was removed')
			}
		} catch(err) {
			console.log('There was an error deleting your record: ', err)
		}
  }

  async deleteAll() {
		console.log('======= delete all records =======')
		console.log('All records were removed')
		await fs.promises.writeFile(`./${this.fileName}`, '')
  }
}

module.exports = Container

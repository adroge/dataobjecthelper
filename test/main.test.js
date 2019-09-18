const expect = require('chai').expect
const doh = require('../index')

describe('main tests', () => {

	it('tests empty object', () => {
		let obj = {}
		expect(doh.has(obj, 'a')).to.be.false
	})

	it('tests undefined object', () => {
		let obj = undefined
		expect(doh.has(obj, 'a')).to.be.false
	})

	it('tests empty path', () => {
		let obj = {a:'string'}
		expect(doh.has(obj, '')).to.be.true
	})

	it('tests undefined path', () => {
		let obj = {a:'string'}
		expect(doh.has(obj, undefined)).to.be.true
	})

	it('tests that an existing property is identified', () => {
		let obj = { 'a': { b: {} } }
		expect(doh.has(obj, 'a')).to.be.true
		expect(doh.has(obj, 'a.b')).to.be.true
	})

	it('tests that a nonexistent property is not identified', () => {
		let obj = { a: { b: {} } }
		expect(doh.has(obj, 'c')).to.be.false
		expect(doh.has(obj, 'a.b.c')).to.be.false
	})

	it('tests that properties can be identified through arrays', () => {
		let obj = {a: {b: [{name:'someone'}, {name: 'someone else'}]}}
		expect(doh.has(obj, 'a.b[0].name')).to.be.true
		expect(doh.has(obj, 'a.b[1].name')).to.be.true
	})

	it('tests that properties cannot be identified through arrays if the item does not exist', () => {
		let obj = {a: {b: [{name:'someone'}]}}
		expect(doh.has(obj, 'a.b[3].name')).to.be.false
	})

})

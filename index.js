class DataObjectHelper {

	has (inputObject, propertyPath) {
		let property,
			remainingPath,
			firstDotIndex,
			nextObject

		if (!inputObject) {
			return false
		}

		if (!propertyPath) {
			return true
		}

		firstDotIndex = propertyPath.indexOf('.')
		if (firstDotIndex !== -1) {
			property = propertyPath.substring(0, firstDotIndex)
			remainingPath = propertyPath.substring(firstDotIndex + 1)
		} else {
			property = propertyPath
		}

		if (propertyNameMatchesArrayFormat(property)) {
			let parsedArrayProperty = parseArrayPropertyName(property)

			if (typeof inputObject === 'object' && Reflect.has(inputObject, parsedArrayProperty.property) && Array.isArray(inputObject[parsedArrayProperty.property]) && inputObject[parsedArrayProperty.property].length > parsedArrayProperty.index) {
				nextObject = inputObject[parsedArrayProperty.property][parsedArrayProperty.index]
			}
		} else {
			if (typeof inputObject === 'object' && Reflect.has(inputObject, property)) {
				nextObject = inputObject[property]
			}
		}

		return this.has(nextObject, remainingPath)
	}

}

const propertyNameMatchesArrayFormat = inputValue => {
	return inputValue.match(/^\D\w*\[\d+\]$/) !== null
}

const parseArrayPropertyName = property => {
	return {
		property: property.substring(0, property.indexOf('[')),
		index: parseInt(property.match(/\w+\[(\d+)\]/)[1])
	}
}

module.exports = new DataObjectHelper()

# Data Object Helper

Ever have to deal with massive and complex data structures, and don't want to do things like this?

```javascript
...
if (obj && obj.sections && obj.sections[0] && obj.sections[0].spaces && obj.sections[0].spaces[3] && ...)
...
```

You can consider this approach.

```javascript
const doh = require('dataobjecthelper')

...

if (doh.has(obj, 'sectons[0].spaces[3].location.name')) {
	console.log('Horray!')
}
...
```

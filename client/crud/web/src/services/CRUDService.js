import {selectedKey} from '../components/KeyList';
import {read} from 'bluzelle';

export const activeValue = observable(null);


// Worry about undoing later
// But this is where we'd do it.

observe(selectedKey, (newVal, oldVal) => {

	activeValue.set(null);


	if(newVal !== null) {

		// We can say that if the value is an object, 
		// wrap in an OMR. See: JSONEditor.js.

		read(newVal).then(value =>
			activeValue.set(value));

	}

});
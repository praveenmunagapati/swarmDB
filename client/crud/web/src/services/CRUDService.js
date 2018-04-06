import {selectedKey} from '../components/KeyList';
import {read} from 'bluzelle';
import {observe} from 'mobx';

export const activeValue = observable(undefined);


// Worry about undoing later
// But this is where we'd do it.

observe(selectedKey, ({newValue, oldValue}) => {

	activeValue.set(undefined);


	if(newValue !== undefined) {

		// We can say that if the value is an object, 
		// wrap in an OMR. See: JSONEditor.js.

		read(newValue).then(value =>
			activeValue.set(value));

	}

});
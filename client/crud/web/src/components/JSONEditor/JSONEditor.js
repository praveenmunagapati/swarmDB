import {RenderTree} from "./Trees/RenderTree";
import {observe} from 'mobx';
import {activeValue} from '../../services/CRUDService';

import {isObservableArray, isObservable, toJS} from 'mobx';
import {isPlainObject, mapValues, extend} from 'lodash';



const activeObservableMap = observable();


export const observableMapRecursive = obj => {

    const omr = isPlainObject(obj) ? observable.map(mapValues(obj, observableMapRecursive)) :
        Array.isArray(obj) ? observable.array(obj.map(observableMapRecursive)) : obj;

    isObservable(omr) && observe(omr, () => onChange());

    return omr;

};


// We update the underyling object of activeValue to mirror activeObservableMap;
// the observers on activeValue are not called.

const onChange = () => {

    const v = activeValue.get();

    for(let prop in v) { 
        delete v[prop];
    }

    extend(v, toJS(activeObservableMap.get()));

};



observe(activeValue, ({newValue}) => {

	if(typeof newValue === 'object' 
        && !(newValue instanceof ArrayBuffer)) {

		activeObservableMap.set(observableMapRecursive(newValue));

	}

});



@observer
export class JSONEditor extends Component {

    render() {

        if (activeObservableMap.get() === undefined) {

            return null;

        }


        return <RenderTree 
            val={activeObservableMap.get()} 
            set={v => activeObservableMap.set(observableMapRecursive(v))}
            />;

    }
}
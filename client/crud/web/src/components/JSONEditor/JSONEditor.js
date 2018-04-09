import {RenderTree} from "./Trees/RenderTree";
import {observe} from 'mobx';
import {activeValue} from '../../services/CRUDService';


const activeObservableMap = observable();



import {isObservableArray, isObservable, toJS} from 'mobx';
import {isPlainObject, mapValues, extend} from 'lodash';


// export const get = (obj, propName) =>
//     () => {
//         isObservableArray(obj) ? obj[propName] : obj.get(propName);
//     };

// export const set = (obj, propName) =>
//     val => obj[propName] = observableMapRecursive(val);

// export const del = (obj, propName) =>
//     () => {
//         isObservableArray(obj) ? obj.splice(propName, 1) : obj.delete(propName);
//     };



export const observableMapRecursive = obj => {

    const omr = isPlainObject(obj) ? observable.map(mapValues(obj, observableMapRecursive)) :
        Array.isArray(obj) ? observable.array(obj.map(observableMapRecursive)) : obj;

    isObservable(omr) && observe(omr, () => onChange());

    return omr;

};


const onChange = () => {
    
    const v = activeValue.get();

    for(let prop in v) { 
        delete v[prop];
    }

    extend(v, toJS(activeObservableMap.get()));

};



observe(activeValue, ({newValue}) => {

	if(typeof newValue === 'object') {

		activeObservableMap.set(observableMapRecursive(newValue));

	}

});






// Get it working first



// Amend omr with observers to call `onChange`.

// We want this to be recursive all the way down to simple changes.

// observe(activeObservableMap, )



// We pass down get(), set(), and del().


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
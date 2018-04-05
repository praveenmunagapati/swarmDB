import {JSONEditor} from "./JSONEditor";
import {PlainTextEditor} from './PlainTextEditor';
import {FileEditor} from "./FileEditor/FileEditor";

import {obsevableMapRecursive as omr} from '../util/mobXUtils';

import {activeValue} from '../services/CRUDService';


@observer
export class Editor extends Component {

    render() {

        const type = typeof activeValue.get();


        if(type === 'object') {

            return <JSONEditor/>;

        }


        if(type === 'string') {

            return <PlainTextEditor/>;

        }


        return <div>No Editor for this data type.</div>;

    }

};

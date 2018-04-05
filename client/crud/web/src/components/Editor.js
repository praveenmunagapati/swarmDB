import {JSONEditor} from "./JSONEditor";
import {PlainTextEditor} from './PlainTextEditor';
import {FileEditor} from "./FileEditor/FileEditor";

import {obsevableMapRecursive as omr} from '../util/mobXUtils.js';


export const Editor = ({value}) => {

    const type = typeof value;


    if(type === 'object') {

        return <JSONEditor value={omr(value)}/>;

    }


    if(type === 'string') {

        return <PlainTextEditor value={value}/>;

    }


    if(type === 'undefined') {

        return <div>Loading...</div>;

    }


    return <div>No Editor for this data type.</div>;

};

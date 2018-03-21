import {RenderTree} from "./Trees/RenderTree";
import {pipe} from 'lodash/fp';
import {getRaw, addPrefix} from "../keyData";
import {observableMapRecursive as omr} from "../../util/mobXUtils";
import {arrayToStr, strToArray} from "../../util/encoding";
import {enableExecution, enableExecutionForChildren} from "../../services/CommandQueueService";

import {isObservable} from 'mobx';


export const PREFIX = 0;

@observer
@enableExecution
@enableExecutionForChildren
export class JSONEditor extends Component {

    getChildContext() {
        const {keyData} = this.props;


        console.log('getChildContext() is being called', this.props.keyName);

        return {
            execute: args => this.context.execute({
                onSave: () => this.onSave(keyData.get('interpreted')), ...args })
        };
    }

    onSave(interpreted) {

        console.log('onSave keyname:', this.props.keyName);

        return {
            [this.props.keyName]: addPrefix(serialize(interpreted), PREFIX).slice()
        };
    }

    interpret() {
        setTimeout(() => {
            const {keyData} = this.props;

            if (!keyData.has('interpreted')) {
                keyData.set('interpreted', omr(interpret(getRaw(keyData))));
                keyData.set('beginEditingTimestamp', new Date().getTime());
            }
        });
    }

    render() {
        const {keyData} = this.props;


        if(!keyData.has('interpreted')) {
            this.interpret();
            return <div>Interpreting...</div>;
        }

        return <RenderTree obj={keyData} propName='interpreted' isRoot={true}/>
    }
}


const interpret = pipe(arrayToStr, JSON.parse);
const serialize = pipe(JSON.stringify, strToArray);


export const objectToKeyData = obj => observable.map({
    bytearray: addPrefix(serialize(obj), PREFIX)});

export const defaultKeyData = () => objectToKeyData({});
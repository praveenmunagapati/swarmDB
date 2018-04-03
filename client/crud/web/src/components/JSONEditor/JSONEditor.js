import {RenderTree} from "./Trees/RenderTree";
import {pipe} from 'lodash/fp';
import {getRaw, addPrefix} from "../keyData";
import {observableMapRecursive as omr} from "../../util/mobXUtils";
import {arrayToStr, strToArray} from "../../util/encoding";
import {enableExecution, enableExecutionForChildren} from "../../services/CommandQueueService";

export const PREFIX = 0;

@observer
@enableExecution
@enableExecutionForChildren
export class JSONEditor extends Component {

    getChildContext() {
        const {keyData} = this.props;


        // TODO: We can sack the context thing.

        return {
            execute: this.context.execute;
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
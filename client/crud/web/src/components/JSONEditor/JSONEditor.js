import {RenderTree} from "./Trees/RenderTree";
import {observableMapRecursive as omr} from "../../util/mobXUtils";

import {activeValue} from '../../services/CRUDService';


@observer
export class JSONEditor extends Component {

    render() {

        // TODO: Change this

        // We should be wrapping activeValue in omr on read
        // And with get() set() functions in component.

        const obj = observable.map({ interpreted: omr(activeValue.get()) });

        return <RenderTree obj={obj} propName='interpreted' isRoot={true}/>;

    }
}
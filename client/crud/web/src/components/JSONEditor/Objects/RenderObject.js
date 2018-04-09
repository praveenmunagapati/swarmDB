import {Collapsible} from "../Collapsible";
import {Plus, Edit, Delete} from "../Buttons";
import {Hoverable} from '../Hoverable.js';
import {RenderTreeWithEditableKey} from "./RenderTreeWithEditableKey";
import {NewField} from "./NewField";
import {observableMapRecursive as omr} from '../JSONEditor';


@observer
export class RenderObject extends Component {

    constructor(props) {

        super(props);


        this.state = {
            showNewField: false
        };

    }


    render() {
        const {val, set, del, preamble, hovering, onEdit} = this.props;

        const buttons = hovering &&
            <React.Fragment>
                <Plus onClick={() => this.setState({showNewField: true})}/>
                {del && <Delete onClick={() => del()}/>}
                <Edit onClick={onEdit}/>
            </React.Fragment>;


        const newField = this.state.showNewField &&

            <Hoverable>

                <NewField

                    onChange={(key, v) => {

                        this.setState({showNewField: false});

                        val.set(key, omr(v));

                        // this.context.execute({
                        //     doIt: () => get(obj, propName).set(key, val),
                        //     undoIt: () => get(obj, propName).delete(key),
                        //     message: <span>New field <code key={1}>{key}</code>: <code key={2}>{JSON.stringify(val)}</code>.</span>});
                    }}

                    onError={() => this.setState({showNewField: false})}/>

            </Hoverable>;


        const fieldList = val.keys().sort().map(subkey =>
            <RenderTreeWithEditableKey
                key={subkey}

                preamble={subkey}

                val={val.get(subkey)}
                set={v => val.set(subkey, omr(v))}
                del={() => val.delete(subkey)}

                />);


        return (
            <Collapsible
                label={`{} (${val.keys().length} entries)`}
                buttons={buttons}
                preamble={preamble}>

                {newField}
                {fieldList}
            </Collapsible>
        );
    }
}
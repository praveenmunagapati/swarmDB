import {RenderTree} from "../Trees/RenderTree";
import {Collapsible} from "../Collapsible";
import {Plus, Edit, Delete} from "../Buttons";
import {Hoverable} from "../Hoverable";
import {NewField} from "./NewField";
import {observableMapRecursive as omr} from '../JSONEditor';


@observer
export class RenderArray extends Component {
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
                <Plus onClick={() => this.setState({ showNewField: true })}/>
                {del && <Delete onClick={() => del()}/>}
                <Edit onClick={onEdit}/>
            </React.Fragment>;


        const newField = this.state.showNewField &&
            <Hoverable>
                <NewField
                    preamble={val.length}
                    onChange={newObj => {

                        this.setState({ showNewField: false });

                        val.push(omr(newObj));

                        // this.context.execute({
                        //     doIt: () => get(obj, propName).push(newObj),
                        //     undoIt: () => get(obj, propName).pop(),
                        //     message: <span>Pushed <code key={1}>{JSON.stringify(newObj)}</code> to <code key={2}>{propName}</code>.</span>});
                    }}
                    onError={() => this.setState({showNewField: false})}/>
            </Hoverable>;


        const fieldList = val.map((value, index) =>
            <RenderTree
                key={index}

                val={value}
                set={v => val[index] = v}
                del={() => val.splice(index, 1)}

                preamble={<span>{index}</span>}/>);


        return <Collapsible
            label={`[] (${val.length} entries)`}
            buttons={buttons}
            preamble={preamble}>

            {fieldList}
            {newField}
        </Collapsible>;
    }
}
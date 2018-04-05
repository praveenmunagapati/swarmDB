import {enableExecution} from "../../services/CommandQueueService";
import {KeyListItem} from "./KeyListItem";
import {RemoveButton} from "./RemoveButton";
import {NewKeyField} from "./NewKey/NewKeyField";

import {keys as getKeys} from 'bluzelle';

export const selectedKey = observable(null);


const keys = observable([]);

export const refresh = () => 
    getKeys().then(k => keys.replace(k));


@enableExecution
@observer
export class KeyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewKey: false
        };

    }


    componentWillMount() {

        refresh();

    }


    render() {

        const keyList = keys.sort().map(keyname =>
            <KeyListItem key={keyname} {...{keyname}}/>);

        return (
            <div style={{padding: 10}}>
                <BS.ListGroup>
                    {keyList}
                    { this.state.showNewKey &&
                        <NewKeyField onChange={() => this.setState({showNewKey: false})}/> }
                </BS.ListGroup>
                <BS.ButtonGroup>
                    <AddButton onClick={() => this.setState({showNewKey: true})}/>
                    <RemoveButton/>
                </BS.ButtonGroup>
            </div>
        );
    }
}

const AddButton = ({onClick}) => (
    <BS.Button onClick={onClick} style={{color: 'green'}}>
        <BS.Glyphicon glyph='plus'/>
    </BS.Button>
);

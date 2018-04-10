import {enableExecution} from "../../services/CommandQueueService";
import {KeyListItem} from "./KeyListItem";
import {RemoveButton} from "./RemoveButton";
import {NewKeyField} from "./NewKey/NewKeyField";
import {activeValue, save, remove, reload} from '../../services/CRUDService';

import {keys as bzkeys} from 'bluzelle';


export const selectedKey = observable(null);


const keys = observable([]);

export const refreshKeys = () => 
    bzkeys().then(k => keys.replace(k));



@observer
export class KeyList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showNewKey: false
        };

    }


    componentWillMount() {

        refreshKeys();

    }


    render() {

        const keyList = keys.sort().map(keyname =>
            <KeyListItem key={keyname} keyname={keyname}/>);

        return (
            <div style={{padding: 10}}>
                <BS.ListGroup>

                    {keyList}

                    { this.state.showNewKey &&
                        <NewKeyField onChange={() => this.setState({showNewKey: false})}/> }
                
                </BS.ListGroup>


                <BS.ButtonToolbar>
                    <BS.ButtonGroup>

                        <AddButton onClick={() => this.setState({showNewKey: true})}/>
                        
                        {

                            activeValue.get() !== undefined &&

                            <BS.Button onClick={remove} style={{color: 'red'}}>
                                <BS.Glyphicon glyph='remove'/>
                            </BS.Button>

                        }

                    </BS.ButtonGroup>

                    <SaveReloadRemove/>
                </BS.ButtonToolbar>
            </div>
        );
    }
}

const AddButton = ({onClick}) => 

    <BS.Button onClick={onClick} style={{color: 'green'}}>
        <BS.Glyphicon glyph='plus'/>
    </BS.Button>;


const SaveReloadRemove = observer(({keyname}) =>

        <BS.ButtonGroup>
           <BS.Button onClick={reload} style={{color: 'DarkBlue'}}>
                <BS.Glyphicon glyph='refresh'/>
            </BS.Button>

            {

                activeValue.get() !== undefined &&
                
                <BS.Button onClick={save} style={{color: 'DarkGreen'}}>
                    <BS.Glyphicon glyph='floppy-save'/>
                </BS.Button>

            }

        </BS.ButtonGroup>);

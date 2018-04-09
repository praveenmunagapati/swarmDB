import {enableExecution} from "../../services/CommandQueueService";
import {KeyListItem} from "./KeyListItem";
import {RemoveButton} from "./RemoveButton";
import {NewKeyField} from "./NewKey/NewKeyField";
import {activeValue} from '../../services/CRUDService';

import {keys as getKeys, update, remove} from 'bluzelle';

export const selectedKey = observable(null);


const keys = observable([]);

export const refresh = () => 
    getKeys().then(k => keys.replace(k));


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
           <BS.Button onClick={reload}>
                <BS.Glyphicon glyph='refresh'/>
            </BS.Button>

            {

                activeValue.get() !== undefined &&
                
                <React.Fragment>
                    <BS.Button onClick={save}>
                        <BS.Glyphicon glyph='floppy-save'/>
                    </BS.Button>
                    <BS.Button onClick={removeKey}>
                        <BS.Glyphicon glyph='remove'/>
                    </BS.Button>
                </React.Fragment>

            }

        </BS.ButtonGroup>);


const save = () => 
    update(selectedKey.get(), activeValue.get());

const removeKey = () => 
    remove(selectedKey.get()).then(() => 
        reload());

const reload = () => {

    refresh().then(keys => {

        const sk = selectedKey.get(); 
        selectedKey.set();

        if(keys.includes(sk)) {

            selectedKey.set(sk);

        }

    });

}



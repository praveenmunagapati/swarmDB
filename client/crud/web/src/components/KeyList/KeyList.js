import {enableExecution} from "../../services/CommandQueueService";
import {KeyListItem} from "./KeyListItem";
import {RemoveButton} from "./RemoveButton";
import {NewKeyField} from "./NewKey/NewKeyField";
import {activeValue} from '../../services/CRUDService';

import {keys as getKeys, update, read, remove as removeKey} from 'bluzelle';

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
                    <BS.Button onClick={remove}>
                        <BS.Glyphicon glyph='remove'/>
                    </BS.Button>
                </React.Fragment>

            }

        </BS.ButtonGroup>);




// Move these into CRUD Service.

const save = () => 
    update(selectedKey.get(), activeValue.get());


const remove = () => {

    const sk = selectedKey.get(); 
    selectedKey.set();

    return removeKey(sk).then(() => {
        reload();
    });

};


export const rename = (oldKey, newKey) => new Promise(resolve => {

    read(oldKey).then(v => {

        removeKey(oldKey).then(() => {

            update(newKey, v).then(() => {

                if(selectedKey.get() === oldKey) {

                    selectedKey.set(newKey);

                }

                refresh().then(() => 
                    reload().then(resolve));

            });

        });

    }); 

});
    

const reload = () => new Promise(resolve => {

    refresh().then(keys => {

        const sk = selectedKey.get(); 
        selectedKey.set();

        if(keys.includes(sk)) {

            selectedKey.set(sk);

        }

        resolve();

    });

});
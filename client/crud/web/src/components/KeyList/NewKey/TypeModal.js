import {ObjIcon, TextIcon, FileIcon} from "../../ObjIcon";
import {enableExecution} from "../../../services/CommandQueueService";
import {selectedKey, refresh} from "../KeyList";
import {update, remove} from 'bluzelle';


@enableExecution
export class TypeModal extends Component {

    chooseJSON() {
        this.addNewKey({}, 'JSON');
    }

    chooseText() {
        this.addNewKey('', 'plain text');
    }

    chooseFile() {
        this.addNewKey('', 'file');
    }


    addNewKey(keyData, typeName) {

        const oldSelection = selectedKey.get();


        // Would we have to revise execution to do async/await?
        // For now, let's not. But consider it for the future.

        // In fact we should, but for now it's non-essential
        // provided our actions have decent timesteps.


        this.context.execute({

            doIt: () => 
                update(this.props.keyField, keyData).then(refresh),

            undoIt: () => 
                remove(this.props.keyField).then(refresh),

            message: <span>Created <code key={1}>{keyField}</code> as {typeName}.</span>
        
        });

        this.props.onHide();

    }


    render() {
        return (
            <BS.Modal show={true} onHide={this.props.onHide}>
                <BS.Modal.Header closeButton>
                    <BS.Modal.Title>
                        Select Key Type
                    </BS.Modal.Title>
                </BS.Modal.Header>
                <BS.Modal.Body>
                    <BS.ListGroup>
                        <BS.ListGroupItem onClick={this.chooseJSON.bind(this)}>
                            <ObjIcon/>
                            JSON Data
                        </BS.ListGroupItem>
                        <BS.ListGroupItem onClick={this.chooseText.bind(this)}>
                            <TextIcon/>
                            Plain Text
                        </BS.ListGroupItem>
                        <BS.ListGroupItem onClick={this.chooseFile.bind(this)}>
                            <FileIcon/>
                            File
                        </BS.ListGroupItem>
                    </BS.ListGroup>
                </BS.Modal.Body>
            </BS.Modal>
        );
    }
}
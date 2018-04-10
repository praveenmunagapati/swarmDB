import {JSONIcon, TextIcon, FileIcon} from "../../ObjIcon";
import {selectedKey, refresh} from "../KeyList";
import {update, remove} from 'bluzelle';


export class TypeModal extends Component {

    chooseJSON() {
        this.addNewKey({}, 'JSON');
    }

    chooseText() {
        this.addNewKey('', 'plain text');
    }

    chooseFile() {
        this.addNewKey(new Uint8Array(), 'file');
    }


    addNewKey(keyData, typeName) {

        const oldSelection = selectedKey.get();


        // Would we have to revise execution to do async/await?
        // For now, let's not. But consider it for the future.

        // In fact we should, but for now it's non-essential
        // provided our actions have decent timesteps.


        update(this.props.keyField, keyData).then(refresh);

        // this.context.execute({

        //     doIt: () => 
        //         update(this.props.keyField, keyData).then(refresh),

        //     undoIt: () => 
        //         remove(this.props.keyField).then(refresh),

        //     message: <span>Created <code key={1}>{keyField}</code> as {typeName}.</span>
        
        // });

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
                            <JSONIcon/><span style={{width: 10}}/>
                            JSON Data
                        </BS.ListGroupItem>
                        <BS.ListGroupItem onClick={this.chooseText.bind(this)}>
                            <TextIcon/><span style={{width: 10}}/>
                            Plain Text
                        </BS.ListGroupItem>
                        <BS.ListGroupItem onClick={this.chooseFile.bind(this)}>
                            <FileIcon/><span style={{width: 10}}/>
                            File
                        </BS.ListGroupItem>
                    </BS.ListGroup>
                </BS.Modal.Body>
            </BS.Modal>
        );
    }
}
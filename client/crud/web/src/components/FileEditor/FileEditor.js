import {enableExecution} from "../../services/CommandQueueService";
import {FileName} from './FileName';

export const PREFIX = 2;

@observer
@enableExecution
export class FileEditor extends Component {

    onSubmit(e) {

        e.preventDefault();
        
        if(!this.fileSelector) return;
        if(!this.fileSelector.files[0]) return;

        const file = this.fileSelector.files[0];

        const reader = new FileReader();


        const props = this.props;
        const execute = this.context.execute;

        reader.onload = function() {

            const oldBytearray = props.keyData.get('bytearray'),
                oldFilename = props.keyData.get('filename');


            execute({
                doIt: () => {
                    props.keyData.set('bytearray', [PREFIX, ...this.result]);
                    props.keyData.set('filename', file.name);
                },
                undoIt: () => {
                    props.keyData.set('bytearray', oldBytearray);
                    props.keyData.set('filename', oldFilename);
                },
                message: <span>Uploaded <code key={1}>{file.name}</code> to <code key={2}>{props.keyName}</code>.</span>,
                onSave: () => ({
                    [props.keyName]: props.keyData.get('bytearray')
                })
            });


        };

        reader.readAsArrayBuffer(file);

    }

    render() {

        const {keyData} = this.props;

        return (
            <div>
                {
                    keyData.get('filename') &&

                    <div>
                        Uploaded <FileName filename={keyData.get('filename')}/> successfully.
                    </div>
                }

                <form onSubmit={this.onSubmit.bind(this)}>
                    <input
                        type='file'
                        ref={el => this.fileSelector = el}/>
                    <input type='submit'/>
                </form>
            </div>
        );
    }

}


export const defaultKeyData = observable.map({
    bytearray: [PREFIX],
    filename: ''
});
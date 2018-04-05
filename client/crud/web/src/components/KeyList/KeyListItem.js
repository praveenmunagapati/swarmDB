import {ValIcon} from "../ObjIcon";
import {EditableField} from "../EditableField";
import {selectedKey} from "./KeyList";
import {activeValue} from '../../services/CRUDService';


@observer
export class KeyListItem extends Component {

    select(target) {

        selectedKey.set(target);

    }

    rename(newKey) {

        // const {obj, keyname: keyName} = this.props;


        // if(!obj.get(keyName).has('bytearray')) {
        //     alert('Must download object to rename.');
        //     return;
        // }

        // selectedKey.get() === keyName ? changeCurrentSelection.call(this) : changeNoncurrentSelection.call(this);


        // function renameInObj(obj, oldKey, newKey) {
        //     obj.set(newKey, obj.get(oldKey));
        //     obj.delete(oldKey);
        // }

        // function message() {
        //     return <span>Renamed <code key={1}>{keyName}</code> to <code key={2}>{newKey}</code>.</span>;
        // }


        // function changeCurrentSelection() {
        //     this.context.execute({
        //         doIt: () => {
        //             selectedKey.set(null);
        //             renameInObj(obj, keyName, newKey);
        //             selectedKey.set(newKey);
        //         },
        //         undoIt: () => {
        //             selectedKey.set(null);
        //             renameInObj(obj, newKey, keyName);
        //             selectedKey.set(keyName);
        //         },
        //         message: message()
        //     });
        // }

        // function changeNoncurrentSelection() {
        //     this.context.execute({
        //         doIt: () => renameInObj(obj, keyName, newKey),
        //         undoIt: () => renameInObj(obj, newKey, keyName),
        //         message: message()
        //     });
        // }

    }


    render() {

        const {keyname} = this.props;


        return (

            <BS.ListGroupItem
                onClick={() => selectedKey.get() === keyname ? this.select(null) : this.select(keyname)}
                active={selectedKey.get() === keyname}>

                {

                    activeValue.get() !== null &&

                        <span style={{display: 'inline-block', width: 25}}>
                            <ValIcon val={activeValue.get()}/>
                        </span>

                        // Plus save button & refresh button
                        // Can probably go into its own component

                }

                <EditableField
                    val={keyname}
                    onChange={this.rename.bind(this)}/>

                {

                    keyname === selectedKey.get() &&

                        <BS.Glyphicon
                            style={{float: 'right'}}
                            glyph='chevron-right'/>

                }

            </BS.ListGroupItem>

        );
    }
}

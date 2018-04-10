import {ValIcon} from "../ObjIcon";
import {EditableField} from "../EditableField";
import {selectedKey} from "./KeyList";
import {activeValue, rename} from '../../services/CRUDService';


@observer
export class KeyListItem extends Component {

    select(target) {

        selectedKey.set(target);

    }

    rename(newKey) {

        const { keyname: oldKey } = this.props;

        rename(oldKey, newKey);

    }


    render() {

        const {keyname} = this.props;


        return (

            <BS.ListGroupItem
                onClick={() => selectedKey.get() === keyname ? this.select(undefined) : this.select(keyname)}
                active={selectedKey.get() === keyname}>

                <Icon keyname={keyname}/>

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


const Icon = observer(({keyname}) =>

    <span style={{display: 'inline-block', width: 25}}>
        {

            activeValue.get() !== undefined &&
            selectedKey.get() === keyname &&

                <ValIcon val={activeValue.get()}/>
                

        }
    </span>

);
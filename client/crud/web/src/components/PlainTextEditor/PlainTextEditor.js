import {activeValue} from '../../services/CRUDService';


@observer
export class PlainTextEditor extends Component {

    constructor() {
        super();

        this.state = activeValue.get();

    }

    onSubmit(e) {
        e && e.preventDefault();

        activeValue.set(this.state);


        // const {keyName, keyData} = this.props;

        // const oldVal = keyData.get('localChanges');
        // const newVal = this.state.val;


        // this.context.execute({
        //     doIt: () => keyData.set('localChanges', newVal),
        //     undoIt: () => keyData.set('localChanges', oldVal),
        //     message: <span>Updated <code key={1}>{keyName}</code>.</span>
        // });
    }

    onChange(e) {

        this.setState(e.target.value);

    }


    render() {

        return (

            <div style={{height: '100%'}}>
                <BS.Form style={{height: '100%'}}>
                    <BS.FormControl
                        style={{height: '100%', resize: 'none'}}
                        componentClass="textarea"

                        value={this.state}

                        onChange={this.onChange.bind(this)}

                        onBlur={this.onSubmit.bind(this)}

                        />

                </BS.Form>
            </div>

        );

    }
}
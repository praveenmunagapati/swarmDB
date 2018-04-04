import {HashRouter, Route} from 'react-router-dom'
import {Main} from 'components/Main'
import {execute, enableExecutionForChildren} from "../services/CommandQueueService";
import DaemonSelector from 'bluzelle-client-common/components/DaemonSelector'


import DevTools from 'mobx-react-devtools';

// import {getNodes} from 'bluzelle-client-common/services/NodeService'

// Debugging
// import {configureDevtool} from 'mobx-react-devtools';
// configureDevtool({logEnabled: true});


import {getLocalDataStore} from '../services/DataService';
import {connect, keys} from 'bluzelle';


@observer
@enableExecutionForChildren
export class App extends Component {

    componentWillMount() {

        this.state = {
            connected: false
        };

    }


    getChildContext() {
        return {execute};
    }


    go() {

        connect('ws://localhost:8100/').then(() => {

            this.setState({
                connected: true
            });

        

            keys().then(keys => {

                const data = getLocalDataStore();

                keys.forEach(key => data.set(key, null));

            });

        });

    }


    render() {

        const data = getLocalDataStore();

        window.data = data;

        return (
            <div style={{height: '100%'}}>
                {/dev-tools/.test(window.location.href) && <DevTools/>}

                {
                    this.state.connected ?
                        <Main/> :
                        <DaemonSelector go={this.go.bind(this)}/>
                }

                {/*<HashRouter>
                    <Route component={data.keys().length ? Main : DaemonSelector} />
                </HashRouter>*/}
            </div>
        );
    }
};
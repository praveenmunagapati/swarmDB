export const RefreshButton = ({keyData}) => {
    return (
        <BS.OverlayTrigger placement="bottom" overlay={
            <BS.Tooltip id="refresh-tooltip">
                Downloaded version: {new Date(keyData.get('beginEditingTimestamp')).toLocaleTimeString()}.
                <br/>
                Current time: {new Date().toLocaleTimeString()}.
            </BS.Tooltip>
        }>
            <div style={{
                display: 'inline-block',
                marginRight: 8
            }}>
                <BS.Glyphicon glyph='refresh'
                              onClick={(e) => {
                                  e.stopPropagation();
                                  
                                  // Placeholder

                              }}
                              style={{
                                  verticalAlign: 'middle'
                              }}/>
            </div>
        </BS.OverlayTrigger>
    );
};
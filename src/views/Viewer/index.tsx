import React from "react";
import * as Cesium from "cesium";



interface Props extends Cesium.Viewer.ConstructorOptions {}


class Viewer extends React.Component<Props, any> {
    static COUNT = 0;

    constructor(props:Props) {
        super(props);

        this.state = {
            id: "viewer-id-" + (Viewer.COUNT++)
        };
    }

    componentDidMount() {
        const {
            ...options
        } = this.props;

        const {
            id
        } = this.state;


    }

    componentWillUnmount() {
        //
    }

    render() {
        const {
            id
        } = this.state;

        return (
            <div id={id} />
        );
    }
}


export default Viewer;
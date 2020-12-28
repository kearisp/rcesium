import React from "react";
import * as Cesium from "cesium";

import {
    withCesium,
    WithCesiumProps
} from "../../context";


type Options = Parameters<Cesium.Camera["setView"]>[0];

interface Props extends Options {
    once?:boolean;
}

interface CProps extends Props, WithCesiumProps {}


class CameraSetView extends React.Component<CProps, any> {
    constructor(props:CProps) {
        super(props);

        this.state = {
            created: false
        };
    }

    componentDidMount() {
        this.create();
    }

    componentDidUpdate(prevProps:Readonly<CProps>, prevState:Readonly<any>, snapshot?:any) {
        this.create();
    }

    create() {
        const {
            context,
            once,
            ...options
        } = this.props;

        const {
            created
        } = this.state;

        if(!created && context) {
            console.log(">_<", options);

            context.scene.camera.setView(options);

            this.setState({
                created: true
            });
        }
    }

    render() {
        return null;
    }
}


export default withCesium<React.ComponentType<Props>>(CameraSetView);
import React from "react";
import * as Cesium from "cesium";

import {
    withCesium,
    WithCesiumProps
} from "../../context";


interface Props {
    action?:(e:{position:Cesium.Cartesian2}) => void;
    type:Cesium.ScreenSpaceEventType;
    modifier?:Cesium.KeyboardEventModifier;
}

interface CProps extends Props, WithCesiumProps {}


class ScreenSpaceEvent extends React.Component<CProps, any> {
    constructor(props:CProps) {
        super(props);

        this.state = {
            created: false
        };
    }

    componentDidMount() {
        this.create();
    }

    componentDidUpdate(prevProps:Readonly<any>, prevState:Readonly<any>, snapshot?:any) {
        this.create();
    }

    componentWillUnmount() {
        this.destroy();
    }

    create() {
        const {
            context,
            action = () => undefined,
            type,
            modifier
        } = this.props;

        const {
            created
        } = this.state;

        if(context && !created) {
            context.screenSpaceEventHandler.setInputAction(action, type, modifier);

            this.setState({
                created: true
            });
        }
    }

    destroy() {
        const {
            context,
            type,
            modifier
        } = this.props;

        const {
            created
        } = this.state;

        if(created && context) {
            context.screenSpaceEventHandler.removeInputAction(type, modifier);
        }
    }

    render() {
        return (
            <div />
        );
    }
}


export default withCesium<React.ComponentType<Props>>(ScreenSpaceEvent);
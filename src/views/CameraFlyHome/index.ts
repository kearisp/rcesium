import React from "react";

import {
    withCesium,
    WithCesiumProps
} from "../../context";


interface Props {
    once?:boolean;
}

interface CProps extends Props, WithCesiumProps {}


class CameraFlyHome extends React.Component<CProps, any> {
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
            once
        } = this.props;

        const {
            created
        } = this.state;

        if(!created && context) {
            context.scene.camera.flyHome();

            if(once) {
                this.setState({
                    created: true
                });
            }
        }
    }

    render() {
        return null;
    }
}


export default withCesium<React.ComponentType<Props>>(CameraFlyHome);
import React from "react";

import {
    withCesium,
    WithCesiumProps
} from "../../context";


interface Props {
    onChange?:(areaPercentage:number) => void;
    onMoveEnd?:() => void;
}

interface CProps extends Props, WithCesiumProps {}


class Camera extends React.Component<CProps, any> {
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
            onChange,
            onMoveEnd
        } = this.props;

        const {
            created
        } = this.state;

        if(!created && context && context.camera) {
            if(onChange) {
                context.camera.changed.addEventListener(onChange, "camera");
            }

            if(onMoveEnd) {
                context.camera.moveEnd.addEventListener(onMoveEnd, "camera");
            }

            this.setState({
                created: true
            });
        }
    }

    componentWillUnmount() {
        const {
            context,
            onChange,
            onMoveEnd
        } = this.props;

        if(context && context.camera) {
            if(onChange) {
                context.camera.changed.removeEventListener(onChange, "camera");
            }

            if(onMoveEnd) {
                context.camera.moveEnd.removeEventListener(onMoveEnd, "camera");
            }
        }
    }

    render() {
        return null;
    }
}


export default withCesium<React.ComponentType<Props>>(Camera);
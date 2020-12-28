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

        if(context && !created) {
            if(onChange) {
                context.scene.camera.changed.addEventListener(onChange, "camera");
            }

            if(onMoveEnd) {
                context.scene.camera.moveEnd.addEventListener(onMoveEnd, "camera");
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

        // @ts-ignore
        if(context && context.scene && context.scene._view) {
            if(onChange) {
                context.scene.camera.changed.removeEventListener(onChange, "camera");
            }

            if(onMoveEnd) {
                context.scene.camera.moveEnd.removeEventListener(onMoveEnd, "camera");
            }
        }
    }

    render() {
        return (
            <div />
        );
    }
}


export default withCesium<React.ComponentType<Props>>(Camera);
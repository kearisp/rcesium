import React from "react";
import * as Cesium from "cesium";

import {
    getRestProps
} from "../../tools";

import {
    withCesium,
    WithCesiumProps
} from "../../context";


interface Props extends Cesium.Entity.ConstructorOptions {
    onClick?:(e:any) => void;
}

interface CProps extends Props, WithCesiumProps {}


class Entity extends React.Component<CProps, any> {
    static restProps = [
        "availability",
        "billboard",
        "box",
        "corridor",
        "cylinder",
        "description",
        "ellipse",
        "ellipsoid",
        "entityCollection",
        "label",
        "model",
        "name",
        "orientation",
        "path",
        "plane",
        "parent",
        "point",
        "polygon",
        "polyline",
        "polylineVolume",
        "position",
        "properties",
        "rectangle",
        "show",
        "tileset",
        "viewFrom",
        "wall"
    ];

    entity:Cesium.Entity|null = null;

    _clickHandler = (e:any) => {
        const {
            context
        } = this.props;

        if(context && this.entity) {
            let picked = context.scene.pick(e.position);

            if(picked) {
                let entity = picked.id || picked.primitive.id;

                if(entity instanceof Cesium.Entity) {
                    if(entity.id === this.entity.id) {
                        this.onClick(e);
                    }
                //     this.events.emit("click:" + id.id, id);
                }
            }
        }
    };

    constructor(props:CProps) {
        super(props);

        this.state = {
            id: null,
            created: false
        };
    }

    componentDidMount() {
        this.create();
    }

    componentDidUpdate(prevProps:Readonly<CProps>, prevState:Readonly<any>, snapshot?:any) {
        const {
            created
        } = this.state;

        if(!created) {
            this.create();
        }
        else {
            this.update();
        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    create() {
        const {
            context,
            onClick
        } = this.props;

        const options = getRestProps(this.props, Entity.restProps);

        const {
            created
        } = this.state;

        if(context && !created) {
            this.entity = new Cesium.Entity(options);

            context.entities.add(this.entity);

            if(onClick) {
                context.screenSpaceEventHandler.setInputAction(
                    this._clickHandler,
                    Cesium.ScreenSpaceEventType.LEFT_CLICK
                );
            }

            this.setState({
                created: true
            });
        }
    }

    update() {
        const options = getRestProps(this.props, Entity.restProps);

        if(this.entity) {
            for(let i in options) {
                // @ts-ignore
                this.entity[i] = options[i];
            }
        }
    }

    destroy() {
        const {
            context,
            onClick
        } = this.props;

        if(context && this.entity) {
            context.entities.remove(this.entity);

            if(onClick) {
                // context.screenSpaceEventHandler.remo
            }
        }
    }

    onClick(e:any) {
        const {
            onClick
        } = this.props;

        if(onClick) {
            onClick(e);
        }
    }

    render() {
        return (
            <div />
        );
    }
}


export default withCesium<React.ComponentType<Props>>(Entity);
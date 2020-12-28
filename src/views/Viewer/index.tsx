import React from "react";
import * as Cesium from "cesium";

import {
    getRestProps,
    getViewer,
    createViewer,
    destroyViewer
} from "../../tools";

import {Context} from "../../context";


interface Props extends Cesium.Viewer.ConstructorOptions {
    className?:string;
    onClick?:(e:any) => void;
}


class Viewer extends React.Component<Props, any> {
    static COUNT = 0;
    static restProps = [
        "animation",
        "baseLayerPicker",
        "fullscreenButton",
        "vrButton",
        "geocoder",
        "homeButton",
        "infoBox",
        "sceneModePicker",
        "selectionIndicator",
        "timeline",
        "navigationHelpButton",
        "navigationInstructionsInitiallyVisible",
        "scene3DOnly",
        "shouldAnimate",
        "clockViewModel",
        "selectedImageryProviderViewModel",
        "imageryProviderViewModels",
        "selectedTerrainProviderViewModel",
        "terrainProviderViewModels",
        "imageryProvider",
        "skyBox",
        "skyAtmosphere",
        "fullscreenElement",
        "showRenderLoopErrors",
        "automaticallyTrackDataSourceClocks",
        "contextOptions",
        "sceneMode",
        "mapProjection",
        "globe",
        "orderIndependentTranslucency",
        "creditContainer",
        "creditViewport",
        "dataSources",
        "terrainExaggeration",
        "mapMode2D",
        "projectionPicker",
        "requestRenderMode",
        "maximumRenderTimeChange"
    ];

    viewer:Cesium.Viewer|null = null;
    _clickHandler = (e:any) => {
        console.log("Viewer._clickHandler", e);
    };

    constructor(props:Props) {
        super(props);

        this.state = {
            id: "viewer-id-" + (Viewer.COUNT++),
            created: false
        };
    }

    componentDidMount() {
        this.create();
    }

    componentDidUpdate(prevProps:Readonly<Props>, prevState:Readonly<any>, snapshot?:any) {
        this.update();
    }

    componentWillUnmount() {
        this.destroy();
    }

    create() {
        const options = getRestProps(this.props, Viewer.restProps);

        const {
            id
        } = this.state;

        this.viewer = createViewer(id, options);

        if(this.viewer) {
            this.viewer.screenSpaceEventHandler.setInputAction(
                this._clickHandler,
                Cesium.ScreenSpaceEventType.LEFT_CLICK
            );

            console.log(">_<_<_<_<_,");

            this.setState({
                created: true
            });
        }
    }

    update() {
        //
    }

    destroy() {
        const {
            id
        } = this.state;

        destroyViewer(id);
    }

    render() {
        const {
            className,
            children
        } = this.props;

        const {
            id
        } = this.state;

        let viewer = getViewer(id);

        return (
            <Context.Provider
              value={viewer && !viewer.isDestroyed() ? {
                viewer: viewer,
                scene: viewer.scene,
                entities: viewer.dataSourceDisplay.defaultDataSource.entities,
                screenSpaceEventHandler: viewer.screenSpaceEventHandler
              } : null}>
                <div className={className} id={id} />

                {viewer && !viewer.isDestroyed() ? children : null}
            </Context.Provider>
        );
    }
}


export default Viewer;
import React from "react";
import * as Cesium from "cesium";


export interface ContextType {
    viewer:Cesium.Viewer;
    scene:Cesium.Scene;
    camera:Cesium.Camera|null;
    entities:Cesium.EntityCollection;
    screenSpaceEventHandler:Cesium.ScreenSpaceEventHandler;
}

export const Context = React.createContext<ContextType|null>(null);

export interface WithCesiumProps {
    context:ContextType|null;
}

export function withCesium<T>(Component:any):T {
    // @ts-ignore
    return (props:any) => {
        return (
            <Context.Consumer>
                {
                    (context:ContextType|null) => {
                        return (
                            // @ts-ignore
                            <Component
                              {...props}
                              context={context} />
                        );
                    }
                }
            </Context.Consumer>
        );
    };
};
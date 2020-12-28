import * as Cesium from "cesium";


const viewers:{
    [key:string]:Cesium.Viewer;
} = {};

export const getRestProps = (props:any, keys:string[]):any => {
    return Object.keys(props).reduce((rest:any, key:string) => {
        if(keys.includes(key)) {
            rest[key] = props[key];
        }

        return rest;
    }, {});
};

export const getViewer = (id:string):Cesium.Viewer|null => {
    return viewers[id] || null;
};

export const createViewer = (id:string, options:Cesium.Viewer.ConstructorOptions):Cesium.Viewer|null => {
    if(!viewers[id]) {
        let container = document.getElementById(id);

        if(container) {
            viewers[id] = new Cesium.Viewer(container, options);
        }
    }

    return viewers[id] || null;
};

export const destroyViewer = (id:string) => {
    if(viewers[id]) {
        viewers[id].destroy();

        delete viewers[id];
    }
};
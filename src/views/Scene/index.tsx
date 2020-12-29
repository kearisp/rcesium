import React from "react";
import {
    withCesium,
    WithCesiumProps
} from "../../context";
import {
    wrapListener
} from "../../tools";


interface Props {
    scope?:string;
    onPreUpdate?:() => void;
    onPostUpdate?:() => void;
    onPreRender?:() => void;
    onPostRender?:() => void;
}

interface CProps extends Props, WithCesiumProps {}


class Scene extends React.Component<CProps, any> {
    static defaultProps = {
        scope: "scene"
    };
    _preUpdateHandler = () => this.onPreUpdate();
    _postUpdateHandler = () => this.onPostUpdate();
    _preRenderHandler = () => this.onPreRender();
    _postRenderHandler = () => this.onPostRender();

    componentDidMount() {
        this.create();
    }

    componentWillUnmount() {
        this.destroy();
    }

    create() {
        const {
            context,
            scope
        } = this.props;

        if(context && context.scene) {
            context.scene.preUpdate.addEventListener(this._preUpdateHandler, scope);
            context.scene.postUpdate.addEventListener(this._postUpdateHandler, scope);
            context.scene.preRender.addEventListener(this._preRenderHandler, scope);
            context.scene.postRender.addEventListener(this._postRenderHandler, scope);
        }
    }

    destroy() {
        const {
            context,
            scope
        } = this.props;

        if(context && context.scene) {
            context.scene.preUpdate.removeEventListener(this._preUpdateHandler, scope);
            context.scene.postUpdate.removeEventListener(this._postUpdateHandler, scope);
            context.scene.preRender.removeEventListener(this._preRenderHandler, scope);
            context.scene.postRender.removeEventListener(this._postRenderHandler, scope);
        }
    }

    onPreUpdate() {
        const {
            onPreUpdate
        } = this.props;

        if(onPreUpdate) {
            onPreUpdate();
        }
    }

    onPostUpdate() {
        const {
            onPostUpdate
        } = this.props;

        if(onPostUpdate) {
            onPostUpdate();
        }
    }

    onPreRender() {
        const {
            onPreRender
        } = this.props;

        if(onPreRender) {
            onPreRender();
        }
    }

    onPostRender() {
        const {
            onPostRender
        } = this.props;

        if(onPostRender) {
            onPostRender();
        }
    }

    render() {
        return null;
    }
}


export default withCesium<React.ComponentType<Props>>(Scene);
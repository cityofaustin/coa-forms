import React from "react";

import "../../css/Modalbox.scss";

class Modalbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: props.message || "No Message",
            visible: true,
        };
    }

    render() {
        return(
            <div className="opo-modalbox">
                <div className="opo-modalbox__container">
                    <div className="opo-modalbox__title"></div>
                    <div className="opo-modalbox__crossbutton"></div>
                    <div className="opo-modalbox__separator"></div>
                    <div className="opo-modalbox__message">
                        {{this.state.message}}
                    </div>
                    <div className="opo-modalbox__separator"></div>
                    <div className="opo-modalbox__buttons"></div>
                </div>
            </div>

        );
    }



}
import React from "react";

import "../../css/Modalbox.scss";
import Confirmation from "./Confirmation";

class Modalbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Warning",
            link: props.link || "#"
        };
    }

    redirectToUrl(url) {
        window.location = url;
    }

    render() {
        return(
            <div className="opo-modalbox">
                <div className="opo-modalbox__container">
                    <div className="opo-modalbox__title">Warning</div>
                    <div className="opo-modalbox__crossbutton" onClick={() => this.props.hideModal()}>x</div>
                    <div className="opo-modalbox__separator"></div>
                    <div className="opo-modalbox__message">
                        <p>If you leave, your data will be lost.</p>
                        <p>Click <b>cancel</b> to close this message and return to the form.</p>
                        <p>Click <b>I want to leave</b> if you wish to exit this form.</p>
                    </div>
                    <div className="opo-modalbox__buttons">
                        <button onClick={() => this.props.hideModal()}>Cancel</button>
                        <button className="opo-modalbox__rightbutton" onClick={() => this.redirectToUrl(this.props.link)}>I want to leave</button>
                    </div>
                </div>
            </div>

        );
    }
}


export default Modalbox;
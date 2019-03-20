import React from "react";

import "../../css/Modalbox.scss";
import Confirmation from "./Confirmation";

class Modalbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Warning",
            language: "",
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
                    <div className="opo-modalbox__header">
                        <div className="opo-modalbox__title">Start over in Spanish?</div>
                        <div className="opo-modalbox__crossbutton" onClick={() => this.props.hideModal()}></div>
                    </div>

                    <div className="opo-modalbox__body">
                        <div className="opo-modalbox__message">
                            <p>Switching to Spanish will erase all the information you have previously entered.</p>
                            <p>Are you sure you want to switch?</p>
                        </div>
                        <div className="opo-modalbox__buttons">
                            <button className="opo-modalbox__rightbutton" onClick={() => this.redirectToUrl(this.props.link)}>Yes, start over in Spanish.</button>
                            <button onClick={() => this.props.hideModal()}>No, proceed in English.</button>
                        </div>
                    </div>

                </div>
            </div>

        ); // <!-- <div className="opo-modalbox__separator"></div> -->
    }
}


export default Modalbox;
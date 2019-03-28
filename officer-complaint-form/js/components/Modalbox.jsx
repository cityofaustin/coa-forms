import React from "react";

import "../../css/Modalbox.scss";

class Modalbox extends React.Component {

    constructor(props) {
        super(props);
    }

    redirectToUrl(url) {
        window.location = url;
    }

    render() {
        return(
            <div className="opo-modalbox">
                <div className="opo-modalbox__container">
                    <div className="opo-modalbox__header">
                        <div className="opo-modalbox__title">{this.props.title}</div>
                        <div className="opo-modalbox__crossbutton" onClick={() => this.props.hideModal()}></div>
                    </div>

                    <div className="opo-modalbox__body">
                        <div className="opo-modalbox__message">
                            <p>{this.props.message}</p>
                            <p>{this.props.calltoaction}</p>
                        </div>
                        <div className="opo-modalbox__buttons">
                            <button className="opo-modalbox__rightbutton" onClick={() => this.redirectToUrl(this.props.link)}>{this.props.buttonProceed}</button>
                            <button onClick={() => this.props.hideModal()}>{this.props.buttonCancel}</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default Modalbox;
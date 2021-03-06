import React, { Fragment } from 'react';
import { MDCTextField } from '@material/textfield';
import { uuidv4 } from '../utils/all';

class MDCTextFieldReact extends React.Component {

    componentDidMount() {
        this.mdc = new MDCTextField(this.refs.input);
        this.mdc.value = this.getValue();
    }

    onChange() {
        if (this.mdc.value !== this.props.value && this.props.onChange) {
            this.props.onChange(this.mdc.value)
        }
    }

    getValue() {
        return this.props.value ? this.props.value : "";
    }

    focus() {
        this.mdc.focus();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.value !== this.props.value) {
            this.mdc.value = this.getValue();
        }
    }

    render() {

        let randomFor = uuidv4();

        let topClasses = ["mdc-text-field"];

        let formType = "text";

        if (this.props.password === true) {
            formType = "password";
        }

        if(this.props.icon){
            topClasses.push("mdc-text-field--with-trailing-icon");
        }

        if (this.props.disabled === true) {
            topClasses.push("mdc-text-field--disabled");
        }

        if (this.props.classNames) {
            topClasses = topClasses.concat(this.props.classNames)
        }

        let label = <Fragment>
            <label className="mdc-floating-label" htmlFor={randomFor}>{this.props.label}</label>
        </Fragment>;

        if (this.props.notched === true) {
            label = <Fragment>
                <div className="mdc-notched-outline mdc-notched-outline--upgraded">
                    <div className="mdc-notched-outline__leading"></div>
                    <div className="mdc-notched-outline__notch">
                        <label className="mdc-floating-label" htmlFor={randomFor}>
                            {this.props.label}
                        </label>
                    </div>
                    <div className="mdc-notched-outline__trailing"></div>
                </div>
            </Fragment>
        }

        return <div ref={"input"} className={topClasses.join(" ")}>
            <input disabled={this.props.disabled} onChange={this.onChange.bind(this)} className="mdc-text-field__input"
                type={formType}
                id={randomFor} />
            {label}
            {(() => {
                if (this.props.icon) {
                    return <i class="material-icons mdc-text-field__icon" tabindex="0" role="button">{this.props.icon}</i>
                }
            })()}
            {(() => {
                if (!this.props.notched) {
                    return <div className="mdc-line-ripple"></div>
                }
            })()}

        </div>;
    }
}

export default MDCTextFieldReact;
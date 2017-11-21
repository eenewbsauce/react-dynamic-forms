import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ReactTree } from './react-tree';
const R = require('ramda');

class DynamicForm extends PureComponent {
    constructor(props) {
        super(props);

        this.getButton = this.getButton.bind(this);

        this.state = {
            valid: false,
            values: {}
        };
    }

    handleChange(e) {
        // let form = document.querySelector(`.${this.getFormName()}`);

        this.setState({
            // valid: !R.isNil(form) ? form.checkValidity() : false,
            values: Object.assign({}, this.state.values, {
                [e.target.name]: e.target.value
            })
        });
    }

    getFormName() {
        return R.find(R.propEq('type', 'form'))(this.props.config.children).className;
    }

    digestConfig(latestNode, config = this.props.config, isRecursive = false, nodeBeforeRecursion = false) {
        if (!isRecursive) {
            this.tree = new ReactTree(
                this.createElement(config.type),
                { ...config.props, className: config.className }
            );
            latestNode = this.tree.rootNode;
        } else {
            latestNode = this.tree.add(
                this.createElement(config.type),
                { ...config.props, className: config.className },
                latestNode
            );
        }

        if (config.children) {
            if (!isRecursive) {
                nodeBeforeRecursion = this.tree.rootNode;
            } else if (isRecursive && !nodeBeforeRecursion) {
                nodeBeforeRecursion = latestNode;
            }

            config.children.forEach((childConfig, i) => {
                if (!isRecursive && i > 0) {
                    nodeBeforeRecursion = false;
                }

                latestNode = this.digestConfig(latestNode, childConfig, true, nodeBeforeRecursion);
            });
        } else {
            latestNode = nodeBeforeRecursion;
        }

        if (isRecursive) {
            return latestNode;
        } else {
            this.renderedTree = React.createElement(this.tree.rootNode.element, this.tree.rootNode.props);
        }
    }

    createElement(elementType) {
        let output;

        switch (elementType) {
            case 'form':
                output = this.getForm();
                break;
            case 'select':
                output = this.getSelect();
                break;
            case 'p':
                output = this.getParagraph();
                break;
            case 'radio':
                output = this.getRadio();
                break;
            case 'submit':
            case 'button':
                output = this.getButton();
                break;
            case 'textarea':
                output = this.getTextarea();
                break;
            case 'div':
            default:
                output = this.getDiv();
                break;
        }

        return output;
    }

    resolveElementMarkup(elem) {
        this.elem = elem;
        this.digestConfig();
        ReactDOM.render(this.renderedTree, this.elem);

        setTimeout(() => {
            let form = document.querySelector(`.${this.getFormName()}`);

            this.setState({
                valid: !R.isNil(form) ? form.checkValidity() : false
            });
        }, 0)
    }

    getDiv() {
        return function Div(props) {
            return <div key={ props.id } className={ props.className }>
                {props.children.map((i) => {
                    return React.createElement(i.element, { ...i.props, key: i.props.id });
                })}
            </div>;
        };
    }

    getParagraph() {
        return function Paragraph(props) {
            return <p key={ props.id }>{ props.text }</p>;
        }
    }

    getForm() {
        return function(props) {
            return <form key={ props.id } name={ props.name } className={ props.className }>
                {props.children.map((i) => {
                    return React.createElement(i.element, { ...i.props, key: i.props.id });
                })}
            </form>
        };
    }

    getRadio() {
        let self = this;

        return function Radio(props) {
                return <label>
                    <input
                        type="radio"
                        name={props.name}
                        value={ props.value }
                        checked={ self.state.values[props.name] === props.value}
                        required={ props.required }
                        onChange={(e) => self.handleChange(e)}
                    />
                    { props.label }
                </label>
        }
    }

    getSelect() {
        let self = this;

        return function Select(props) {
            return (
                <select
                    key={ props.id }
                    className={ props.className }
                    required={ props.required }
                    onChange={(e) => self.handleChange(e)}
                    name={props.name}
                    value={self.state.values[props.name]}
                >
                    <option key={ 0 } value="">{ props.placeholder }</option>
                    {
                        props.options.map((option, i) => {
                            return <option key={ i+1 } value={ option }>{ option }</option>
                        })
                    }
                </select>
            );
        };
    }

    getButton() {
        let self = this;

        return function Button(props) {
            return <button
                key={ props.id }
                className={ props.className }
                onClick={ self.props[props.fn] }
                disabled={props.requiresValidation && !self.state.valid}
            >
                { props.text }
            </button>
        };
    }

    getTextarea() {
        return function Textarea(props) {
            return <textarea
                placeholder={props.placeholder}
            >
            </textarea>
        };
    }

    render() {
        return (
            <div>
                <button onClick={(e) => this.forceUpdate()}>reload</button>
                <div ref={(elem) => {
                    if (!R.isNil(elem)) {
                        this.resolveElementMarkup(elem)
                    }
                }}>
                </div>
            </div>
        );
    }
}

DynamicForm.propTypes = {
    config: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired
};

export default DynamicForm;

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ReactTree } from './react-tree';
const R = require('ramda');

class DynamicForm extends PureComponent {
    constructor(props) {
        super(props);
        this.tree = {};
    }

    digestConfig(config = this.props.config, isRecursive = false, latestNode, nodeBeforeRecursion) {
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

                latestNode = this.digestConfig(childConfig, true, latestNode, nodeBeforeRecursion);
            });
        } else {
            latestNode = nodeBeforeRecursion;
        }

        if (isRecursive) {
            return latestNode;
        } else {
            this.renderedTree = this.tree.render();
        }
    }

    createElement(elementType) {
        switch (elementType) {
            case 'div':
                return this.getDiv();
                break;
            case 'form':
                return this.getForm();
                break;
            case 'select':
                return this.getSelect();
                break;
            case 'p':
                return this.getParagraph();
                break;
            case 'radio':
                return this.getRadio();
                break;
            case 'button':
                return this.getButton();
                break;

        }
    }

    resolveElementMarkup(elem) {
        this.elem = elem;
        // this.renderTree();
        this.sampleRender();
    }

    renderTree() {
        this.digestConfig();
        ReactDOM.render(this.renderedTree, this.elem);
    }

    sampleRender() {
        this.tree = new ReactTree(this.getDiv(), { className: 'wrapper' });
        this.tree.add(this.dummyElement(), { name: 'wrapper:bert' });
        this.tree.add(this.dummyElement(), { name: 'wrapper:ryan' });
        let inner = this.tree.add(this.getInner(),  { className: 'inner1' });
        this.tree.add(this.dummyElement(), { name: 'inner1:ryan' }, inner);
        this.tree.add(this.dummyElement(), { name: 'inner1:tom' }, inner);
        let inner2 = this.tree.add(this.getInner(),  { className: 'inner2' });
        this.tree.add(this.dummyElement(), { name: 'inner2:mac' }, inner2);
        this.tree.add(this.dummyElement(), { name: 'inner2:sam' }, inner2);
        let rendered = this.tree.renderSample();
        ReactDOM.render(rendered, this.elem);
    }

    dummyElement() {
        return function Dummy(props) {
            return <p>Hello {props.name}</p>;
        }
    }

    getInner() {
        return function Inner(props) {
            return <div className={ props.className }>
                {props.children.map((i) => {
                    return React.createElement(i.element, {...i.props, key: i.props.id } );
                })}
            </div>;
        };
    }

    getDiv() {
        return function Div(props) {
            return <div key={Math.random()} className={ props.className }>
                {props.children.map((i) => {
                    return React.createElement(i.element, {...i.props, key: i.props.id } );
                })}
            </div>;
        };
    }

    getParagraph() {
        return function Paragraph(props) {
            return <p>{props.text}</p>;
        }
    }

    getForm() {
        return function(props) {
            return <form key={Math.random()}name={props.name}>
                {props.children.map((i) => {
                    return React.createElement(i.element, {...i.props, key: i.props.id } );
                })}
            </form>
        };
    }

    getRadio() {
        return function Radio(props) {
            return <div class="radio">
                <label>
                    <input type="radio" value={props.value} />
                    {props.placeholder}
                </label>
            </div>
        }
    }

    getSelect() {
        return function Select(props) {
            return (
                <select className={props.className}>
                    <option key={Math.random()}value="">{props.placeholder}</option>
                    {
                        props.options.map((option) => {
                            return <option key={option} value={option}>{option}</option>
                        })
                    }
                </select>
            );
        };
    }

    getButton() {
        return function Button(props) {
            return <button key={Math.random()} className={props.className} onClick={props.onClick}>{props.text}</button>
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
    config: PropTypes.object.isRequired
};

export default DynamicForm;

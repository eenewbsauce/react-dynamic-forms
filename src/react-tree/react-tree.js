import React from 'react';
import _ from 'lodash';
import ReactElement from './react-element';
import TreeNode from './tree-node';

const R = require('ramda');

export class ReactTree {
    constructor(element, props = {}) {
        this.nodeCount = 0;
        this.rootNode = new TreeNode(element, this.nodeCount, props);
        this.nodeCount++;
        this.recursions = 0;
        this.nodesRendered = 0;
    }

    add(element, props = {}, parentNode = this.rootNode) {
        let newNode = new TreeNode(element, this.nodeCount, props, parentNode);
        parentNode.children.push(newNode);
        this.nodeCount++;

        return newNode;
    }

    render(childNode = null, parentNode = null, isRecursive = false) {
        parentNode = this.findDeepestParent(parentNode);
        let iteration = 1;

        while(this.nodesRendered < (this.nodeCount - 1)) {
            if (parentNode && parentNode.children) {
                parentNode.children.forEach((child, i) => {
                    this.renderNode(parentNode, child);
                });
            }

            if (parentNode && parentNode.parentNode) {
                let numChildren = parentNode.parentNode.children.length - 1;
                let newParent = this.findDeepestParent(parentNode.parentNode, numChildren - iteration);

                if (newParent.id !== parentNode.id) {
                    iteration++;
                    parentNode = newParent;
                } else {
                    iteration = 1;
                }
            }
        }

        return React.createElement(this.rootNode.element, this.rootNode.props);
    }

    findDeepestParent(startingNode = false, index = false) {
        let node = startingNode
            ? startingNode
            : this.rootNode;

        let numChildren = _.get(node, 'children.length', 0);
        index = index ? index : numChildren - 1;

        if(numChildren > 0) {
            return this.findLastNode(node.children[index]).parentNode;
        } else {
            return node
        }
    }

    renderSample(childNode = null, parentNode = null, isRecursive = false) {
        parentNode = this.findDeepestParentSample(parentNode);
        let iteration = 1;

        while(this.nodesRendered < (this.nodeCount - 1)) {
            if (parentNode && parentNode.children) {
                parentNode.children.forEach((child, i) => {
                    this.renderNode(parentNode, child);
                });
            }

            if (parentNode && parentNode.parentNode) {
                let numChildren = parentNode.parentNode.children.length - 1;
                let newParent = this.findDeepestParent(parentNode.parentNode, numChildren - iteration);

                if (newParent.id !== parentNode.id) {
                    iteration++;
                    parentNode = newParent;
                } else {
                    iteration = 1;
                }
            }
        }

        return React.createElement(this.rootNode.element, this.rootNode.props);
    }

    renderNode(parentNode, childNode) {
        parentNode.props.children.push(new ReactElement(childNode.element, childNode.props));
        this.nodesRendered++;
    }

    findLastNode(startingNode = false) {
        let node = startingNode
            ? startingNode
            : this.rootNode;

        if(_.get(node, 'children.length', 0) > 0) {
            return this.findLastNode(R.last(node.children));
        } else {
            return node
        }
    }

    findDeepestParentSample(startingNode = false, index = false) {
        let node = startingNode
            ? startingNode
            : this.rootNode;

        let numChildren = _.get(node, 'children.length', 0);
        index = index ? index : numChildren - 1;

        if(numChildren > 0) {
            return this.findLastNode(node.children[index]).parentNode;
        } else {
            return node
        }
    }
}

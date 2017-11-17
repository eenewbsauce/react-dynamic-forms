import ReactElement from './react-element';
import TreeNode from './tree-node';

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
        this.linkNode(parentNode, newNode);
        this.nodeCount++;

        return newNode;
    }

    linkNode(parentNode, childNode) {
        parentNode.props.children.push(new ReactElement(childNode.element, childNode.props));
        this.nodesRendered++;
    }
}

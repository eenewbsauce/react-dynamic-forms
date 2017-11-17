export default class Node {
    constructor(element, id, props = {}, parentNode) {
        this.element = element;
        this.id = id;
        this.children = [];
        this.props = Object.assign({}, props, { children: [], id: this.id });
        this.parentNode = parentNode;
    }
}

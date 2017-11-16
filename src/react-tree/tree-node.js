import _ from 'lodash';
const R = require('ramda');

export default class Node {
    constructor(element, id, props = {}, parentNode) {
        this.element = element;
        this.id = id;
        this.children = [];
        this.props = Object.assign({}, props, { children: [], id: this.id });
        this.parentNode = parentNode;
    }

    hasOtherChildren(node) {
        return R.differenceWith((left, right) => {
            return left.id === right.id;
        }, this.children, [node]).length > 0;
    }

    countChildren() {
        return _.get(this, 'children.lenth', 0);
    }
}

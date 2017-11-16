export default class ReactElement {
    constructor(element, props = {}) {
        this.element = element;
        this.props = Object.assign({}, props);
    }
}

import Ember from "ember";

const {
  Mixin,
  observer
  } = Ember;

export default Mixin.create({
  /**!
   * Dynamically update the default height of each element
   */
  _defaultHeightDidChange: observer('defaultHeight', function() {
    this.set('_defaultHeight', null);

    var defaultHeight = this.__getEstimatedDefaultHeight();
    var viewState;
    var height;
    var childView;
    var children;

    this._taskrunner.schedule('render', this, function() {
      children = this.get('_children');
      Object.keys(children).forEach(childViewKey => {
        childView = children[childViewKey];
        if (!childView) {
          return;
        }
        viewState = childView.get('viewState');
        height = viewState === 'visible' || viewState === 'hidden' ? 0 : defaultHeight;
        childView.set('defaultHeight', height);
        childView.set('_height', 0);
        childView.element.style.minHeight = height + 'px';
      });

      //next(this, this._cycleViews);
      this._taskrunner.next(this, function() {
        this._cycleViews();
      });
    });
  }),

});

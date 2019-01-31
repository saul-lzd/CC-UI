/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'ojs/ojcustomelement'], function(oj)
{
/**
 * Copyright (c) 2018, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * Child mutation observer.
 * The implementation of the class is based on DOM MutationObserver and it is intended
 * for watching mutations for a custom element registered in JET.
 * The observer will watch for 'childList', 'attributes' and 'subtree' mutation types.
 * All received mutations will be filtered using metadata.extension._TRACK_CHILDREN
 * option on the watched element.
 * The specified handler will be called for the relevant mutations.
 * Valid _TRACK_CHILDREN settings:
 *  - none - (default) no tracking is done for child elements
 *  - immediate -  tracking is performed for the immediate level of custom elements
 *  - nearestCustomElement - the element will be searched for nearest custom
 *                           elements and tracking will be performed for them
 *                           if they are present.
 * @param {Element} element Custom DOM element registered in custom element registry for JET.
 * @param {function} handler A handler for relevant child mutations
 * @class
 * @since 6.0.0
 * @ignore
 */
// eslint-disable-next-line no-unused-vars
function ChildMutationObserver(element, handler) {
  var _element = element;
  var _handler = handler;
  var _trackOption = oj.BaseCustomElementBridge.getRegistered(element.tagName) ?
                  oj.BaseCustomElementBridge.getTrackChildrenOption(element) : 'none';
  /**
   * Filter DOM mutations.
   * @param {Array} mutations all DOM mutations for the element
   * @return {Array} filtered DOM mutaions
   */
  var _filterMutations = function (mutations) {
    var filteredMutations = [];

    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      var testElement = mutation.type === 'childList' ? mutation.target : mutation.target.parentNode;
      while (testElement) {
        if (testElement === _element) {
          // the mutation is relevant - push it to the array and stop the search
          filteredMutations.push(mutation);
          testElement = null;
        } else if (_trackOption === 'nearestCustomElement'
              && !oj.BaseCustomElementBridge.isValidCustomElementName(testElement.localName)) {
          // we search for the nearest custom element, the mutation might be relevant, walk the DOM up to find out
          testElement = testElement.parentNode;
        } else {
          // the mutation is not relevant - skip it
          testElement = null;
        }
      }
    }
    return filteredMutations;
  };

  var _mutationObserver = new MutationObserver(function (mutations) {
    var filteredMutations = _filterMutations(mutations);
    if (filteredMutations.length > 0) {
      _handler(filteredMutations);
    }
  });

  return {
    /**
     * Start watching for DOM mutations for a JET custom element. The mutation handler will be called
     * when a relevant mutation is detected - any relevant mutations should meet
     * the criteria provided by the metadata.extension._TRACK_CHILDREN option on the element.
     * @ignore
     */
    observe: function () {
      if (_trackOption !== 'none') {
        _mutationObserver.observe(_element,
          { attributes: true, childList: true, subtree: true, characterData: true });
      }
    },
    /**
     * Stop watching for DOM mutations.
     * @ignore
     */
    disconnect: function () {
      _mutationObserver.disconnect();
    }
  };
}

;return ChildMutationObserver;

});
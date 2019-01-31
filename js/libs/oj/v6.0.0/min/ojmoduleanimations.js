/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","knockout","jquery","ojs/ojthemeutils","ojs/ojanimation","promise"],function(n,e,t,i,o){n.ModuleAnimations={};n.ModuleAnimations;return n.ModuleAnimations._addContainedElements=function(n,t){for(var i=e.virtualElements.firstChild(n);i;)1===i.nodeType?t.push(i):8===i.nodeType&&this._addContainedElements(i,t),i=e.virtualElements.nextSibling(i)},n.ModuleAnimations._cacheVirtualViewRoot=function(n,e){n._ojOldRoot=e},n.ModuleAnimations._getVirtualViewRoot=function(n){return n._ojOldRoot},n.ModuleAnimations._defaultCanAnimate=function(e){if(e.isInitial)return!1;if(1===e.node.nodeType)return!0;if(8===e.node.nodeType){var t=[];if(n.ModuleAnimations._addContainedElements(e.node,t),t&&1===t.length)return n.ModuleAnimations._cacheVirtualViewRoot(e,t[0]),!0}return!1},n.ModuleAnimations._getOldView=function(e){var t;return 1===e.node.nodeType?t=e.node:8===e.node.nodeType&&(t=n.ModuleAnimations._getVirtualViewRoot(e)),t},n.ModuleAnimations._createViewParent=function(n){var e=t(document.createElement("div")),i={position:"absolute",height:n.offsetHeight+"px",width:n.offsetWidth+"px",left:n.offsetLeft+"px",top:n.offsetTop+"px"};e.appendTo(n.offsetParent),e.css(i),e.addClass("oj-animation-host-viewport");var o=document.createElement("div");return o.className="oj-animation-host",e.append(o),o},n.ModuleAnimations.createAnimation=function(e,t,i){return{canAnimate:n.ModuleAnimations._defaultCanAnimate,prepareAnimation:function(o){var a={},l=n.ModuleAnimations._getOldView(o);return t&&!i&&(a.newViewParent=n.ModuleAnimations._createViewParent(l)),e&&(a.oldViewParent=n.ModuleAnimations._createViewParent(l)),t&&i&&(a.newViewParent=n.ModuleAnimations._createViewParent(l)),a},animate:function(i){var a=i.oldViewParent,l=i.newViewParent,m=[];return a&&e&&m.push(o.startAnimation(a,"close",e)),l&&t&&m.push(o.startAnimation(l,"open",t)),Promise.all(m).then(function(){n.ModuleAnimations._postAnimationProcess(i)})}}},n.ModuleAnimations._removeViewParent=function(n,e){var t=n[e];if(t){var i=t.parentNode;i&&i.parentNode&&i.parentNode.removeChild(i)}},n.ModuleAnimations._postAnimationProcess=function(e){e.removeOldView(),e.insertNewView(),n.ModuleAnimations._removeViewParent(e,"newViewParent"),n.ModuleAnimations._removeViewParent(e,"oldViewParent")},n.ModuleAnimations._getModuleEffect=function(e){return null==n.ModuleAnimations._moduleEffects&&(n.ModuleAnimations._moduleEffects=i.parseJSONFromFontFamily("oj-animation-module-effects")),n.ModuleAnimations._moduleEffects?n.ModuleAnimations._moduleEffects[e]:null},n.ModuleAnimations._getImplementation=function(e){var t=n.ModuleAnimations._getModuleEffect(e);return t?n.ModuleAnimations.createAnimation(t.oldViewEffect,t.newViewEffect,t.newViewOnTop):null},n.ModuleAnimations._getNavigateMethod=function(e,t){return null==n.ModuleAnimations._navigateMethods&&(n.ModuleAnimations._navigateMethods=i.parseJSONFromFontFamily("oj-animation-navigate-methods")),n.ModuleAnimations._navigateMethods?n.ModuleAnimations._navigateMethods[t]:null},n.ModuleAnimations._navigateCanAnimate=function(e,t){var i=n.ModuleAnimations._getNavigateMethod(e,t);return!!n.ModuleAnimations[i]&&(null==n.ModuleAnimations[i].canAnimate||n.ModuleAnimations[i].canAnimate(e))},n.ModuleAnimations._navigatePrepareAnimation=function(e,t){var i=n.ModuleAnimations._getNavigateMethod(e,t);return n.ModuleAnimations[i]&&n.ModuleAnimations[i].prepareAnimation?n.ModuleAnimations[i].prepareAnimation(e):null},n.ModuleAnimations._navigateAnimate=function(e,t){var i=n.ModuleAnimations._getNavigateMethod(e,t);return n.ModuleAnimations[i]&&n.ModuleAnimations[i].animate?n.ModuleAnimations[i].animate(e):Promise.resolve()},n.ModuleAnimations._getNavigateImplementation=function(e){return{canAnimate:function(t){return n.ModuleAnimations._navigateCanAnimate(t,e)},prepareAnimation:function(t){return n.ModuleAnimations._navigatePrepareAnimation(t,e)},animate:function(t){return n.ModuleAnimations._navigateAnimate(t,e)}}},n.ModuleAnimations.coverLeft=n.ModuleAnimations._getImplementation("coverLeft"),n.ModuleAnimations.coverRight=n.ModuleAnimations._getImplementation("coverRight"),n.ModuleAnimations.revealLeft=n.ModuleAnimations._getImplementation("revealLeft"),n.ModuleAnimations.revealRight=n.ModuleAnimations._getImplementation("revealRight"),n.ModuleAnimations.coverStart="rtl"===n.DomUtils.getReadingDirection()?n.ModuleAnimations.coverRight:n.ModuleAnimations.coverLeft,n.ModuleAnimations.revealEnd="rtl"===n.DomUtils.getReadingDirection()?n.ModuleAnimations.revealLeft:n.ModuleAnimations.revealRight,n.ModuleAnimations.coverUp=n.ModuleAnimations._getImplementation("coverUp"),n.ModuleAnimations.revealDown=n.ModuleAnimations._getImplementation("revealDown"),n.ModuleAnimations.zoomIn=n.ModuleAnimations._getImplementation("zoomIn"),n.ModuleAnimations.zoomOut=n.ModuleAnimations._getImplementation("zoomOut"),n.ModuleAnimations.fade=n.ModuleAnimations._getImplementation("fade"),n.ModuleAnimations.pushStart=n.ModuleAnimations._getImplementation("pushStart"),n.ModuleAnimations.pushEnd=n.ModuleAnimations._getImplementation("pushEnd"),n.ModuleAnimations.navChild=n.ModuleAnimations._getNavigateImplementation("navChild"),n.ModuleAnimations.navParent=n.ModuleAnimations._getNavigateImplementation("navParent"),n.ModuleAnimations.drillIn=n.ModuleAnimations.navChild,n.ModuleAnimations.drillOut=n.ModuleAnimations.navParent,n.ModuleAnimations.navSiblingEarlier=n.ModuleAnimations._getNavigateImplementation("navSiblingEarlier"),n.ModuleAnimations.navSiblingLater=n.ModuleAnimations._getNavigateImplementation("navSiblingLater"),n.ModuleAnimations.switcher=function(e){return new function(){var t;function i(n){return function(e){return t[n].call(t,e)}}var o=this;this.canAnimate=function(a){var l=e(a);if(!(t=null==l?null:n.ModuleAnimations[l]))return!1;for(var m=["prepareAnimation","animate"],u=0;u<m.length;u++){var r=m[u];o[r]=i(r)}return i("canAnimate")(a)}}},n.ModuleAnimations});
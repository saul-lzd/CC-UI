/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["knockout","ojs/ojcore","ojs/ojbindingprovider"],function(e,t,n){return new function(){this.execute=function(t,n,r,i){var c=o(n),u=n.getAttribute("data-oj-as");return e.applyBindingsToDescendants(a(t,r,i,u),c),Array.prototype.slice.call(c.childNodes,0)},this.clean=function(t){return e.cleanNode(t)},this.resolveProperties=function(i,c,u,l,s,d,p){var v=a(i,s,d,c.getAttribute("data-oj-as")),f=function(e,a,i,c,u){var l=r.get(e);if(!l){l={},r.set(e,l);var s=o(e),d=s.querySelector(i);l.evalMap=function(e,r){for(var o=new Map,a=e?e.attributes:[],i=0;i<a.length;i++){var c=a[i],u=t.__AttributeUtils.attributeToPropertyName(c.name),l=u.split(".");if(r.has(l[0])){var s=t.__AttributeUtils.getExpressionInfo(c.value),d=s.expr;d&&o.set(l,n.createBindingExpressionEvaluator(d))}}return o}(d,c),l.staticMap=function(e,t,n){var r={};if(e){var o=e.style;o.display="none",o.position="absolute",e.setAttribute("data-oj-binding-provider","none"),n.appendChild(e),t.forEach(function(t){void 0!==e[t]&&(r[t]=e[t])}),n.removeChild(e)}return r}(d,c,u)}return l}(c,0,u,l,p||i),h={};f.evalMap.forEach(function(t,n){h[n[0]]=function(e,t,n){if(t.length<2)return n;for(var r=e[t[0]]||{},o=r,a=t.length-1,i=1;i<a;i++){var c=t[i],u=o[c]||{};o[c]=u,o=u}return o[t[a]]=n,r}(h,n,e.ignoreDependencies(t,null,[v]))});var g=t.CollectionUtils.copyInto,y=g({},f.staticMap,null,!0);return y=g(y,h,null,!0)};var r=new WeakMap;function o(e){var t=document.createElement("div");if(1!==e.nodeType||"template"!==e.tagName.toLowerCase())throw new Error("Invalid template node "+e);var n=e.content;return n?t.appendChild(document.importNode(n,!0)):Array.prototype.forEach.call(e.childNodes,function(e){t.appendChild(e.cloneNode(!0))}),t}function a(t,n,r,o){var a={$current:n},i=e.contextFor(t);return i?(r&&(a[r]=n),o&&(a[o]=n),a=i.extend(a)):a.$data={},Object.defineProperty(a,"_ojCacheScope",{value:t}),a}}});
/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","ojs/ojcontext","ojs/ojcomponentcore","ojs/ojlabel"],function(e,t){var n={properties:{direction:{type:"string",enumValues:["column","row"],value:"column"},labelEdge:{type:"string",enumValues:["start","top"],value:"top"},labelWidth:{type:"string",value:"33%"},labelWrapping:{type:"string",enumValues:["truncate","wrap"],value:"wrap"},maxColumns:{type:"number",value:1}},methods:{setProperty:{},getProperty:{},setProperties:{},refresh:{},getNodeBySubId:{},getSubIdByNode:{}},extension:{}};Object.freeze(n);var o=0;function a(e){var n,a,i,r,l,s,d=this,u=e.element,c="-labelled-by",f="data-oj-formlayout-bonus-dom",m="["+f+"]",v=!0;function h(){a&&(a(),a=null)}function b(){n&&(n(),n=null)}function p(e){var n=null;return e instanceof Element&&"labelHint"in e&&(A(e),n=function(e){var t=document.createElement("oj-label");t.setAttribute(f,""),t.setAttribute("data-oj-internal",""),t.setAttribute("data-oj-binding-provider","none"),t.setAttribute("data-oj-context","");var n=document.createElement("span");return n.id=e.id+"|hint",n.textContent=e.labelHint,t.appendChild(n),function(e,t){var n=e,o=t;"labelledBy"in o?(n.id=o.id+c,o.labelledBy=n.id):n.setAttribute("for",o.id)}(t,e),t}(e),e.parentElement.insertBefore(n,e),function(e,n){var o=n;t.getContext(o).getBusyContext().whenReady().then(function(){var t=e.helpHints;t&&(t.definition||t.source)&&(o.help=t),o.showRequired=e.required})}(e,n),function(e){e.addEventListener("labelHintChanged",y),e.addEventListener("helpHintsChanged",g),e.addEventListener("requiredChanged",x)}(e)),n}function y(e){var t=e.target,n=document.getElementById(t.id+"|hint");n&&(n.innerText=e.detail.value)}function g(e){var t=C(e.target);t&&(t.help=e.detail.value)}function x(e){var t=C(e.target);t&&(t.showRequired=e.detail.value)}function C(e){return"labelledBy"in e?document.getElementById(e.labelledBy):u.querySelector('oj-label[for="'+e.id+'"]')}function j(){return"column"===u.direction?"100%":Math.floor(1e5/u.maxColumns)/1e3+"%"}function E(e,t){var n=w("oj-flex-item");return n.style.webkitFlex="0 1 "+t,n.style.flex="0 1 "+t,n.style.maxWidth=t,n.style.width=t,e.appendChild(n),n}function L(e,t,n){var o,a;o=n?w("oj-flex"):e.previousElementSibling;var i=t?function(){if(!s&&(s=l,"start"===u.labelEdge&&"row"===u.direction)){var e=u.labelWidth.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);switch(e[2]){case"vw":case"vmin":case"vmax":case"%":s=e[1]/u.maxColumns+e[2]}}return s}():j();t||(a=E(o,"0px"));var r=w("oj-flex-item");if(o.appendChild(r),e.parentElement.insertBefore(o,e),r.appendChild(e),r.style.flex="0 0 "+i,r.style.maxWidth=i,r.style.width=i,t){var d=w("oj-flex-item");o.appendChild(d),"row"===u.direction&&"top"===u.labelEdge&&(d.appendChild(e),r.style.webkitFlex="0 1 0px",r.style.flex="0 1 0px",r.style.maxWidth="0px",r.style.width="0px",r.classList.add("oj-formlayout-no-label-flex-item"),d.classList.add("oj-formlayout-no-label-flex-item")),d.appendChild(t),d.style.webkitFlex="1 1 0",d.style.flex="1 1 0"}else a.classList.add("oj-formlayout-no-label-flex-item"),r.classList.add("oj-formlayout-no-label-flex-item");return o}function w(e){var t=document.createElement("div");return t.setAttribute(f,""),t.setAttribute("data-oj-internal",""),t.classList.add(e),t}function B(e){for(var t=e,n=!0;t!==u;){if("OJ-FORM-LAYOUT"===t.tagName){n=!1;break}if(null==(t=t.parentElement)){n=!1;break}}return n}function N(e){for(;e.firstElementChild;)e.parentNode.insertBefore(e.firstElementChild,e);e.parentNode.removeChild(e)}function A(e){var t=e;t.id||(t.id="oflId_"+o,o+=1)}d._rootElementMutationObserver=new MutationObserver(function(e){document.body.contains(u)?(!function(e){for(var t=e.length,n=0;n<t;n++){var o=e[n];if("attributes"===o.type&&"class"===o.attributeName){var a=r.indexOf(o.target);if(-1!==a&&o.target.classList.contains("oj-complete")){r.splice(a,1);var i=p(o.target);i&&L(i,o.target,o.target.hasAttribute("data-oj-needs-oj-flex-div"))}}}}(e),function(e){for(var t=e.length,n=0;n<t;n++){var o=e[n];if("childList"===o.type)for(var a=o.addedNodes.length,r=0;r<a;r++){var l=o.addedNodes[r];l.parentNode===u&&i.appendChild(l)}}}(e),function(e){for(var t=!0,n=e.length,o=0;o<n;o++){var a=e[o];if("childList"===a.type&&((i=a.target)===u||i&&"DIV"===i.tagName&&i.hasAttribute(f))&&B(a.target)){t=!1;break}}var i;return t}(e)||(!function(e){for(var t=e.length,n=0;n<t;n++){var o=e[n];if("childList"===o.type)for(var a=o.removedNodes.length,i=0;i<a;i++){var r=o.removedNodes[i];1===r.nodeType&&(r.removeEventListener("labelHintChanged",y),r.removeEventListener("helpHintsChanged",g),r.removeEventListener("requiredChanged",x))}}}(e),u.refresh())):this.disconnect()}),this.createDOM=function(){for(u.classList.add("oj-form-layout"),(i=document.createElement("div")).classList.add("oj-form"),i.setAttribute("data-oj-context",""),i.setAttribute("data-oj-internal",""),i.setAttribute(f,"");u.firstChild;)i.appendChild(u.firstChild);u.appendChild(i)},this.updateDOM=function(){!function(){if(!a){var e=t.getContext(u).getBusyContext(),n={description:"The oj-form-layout component with id = '"+u.id+"' is being rendered."};a=e.addBusyState(n)}}(),r=[],s=null,l="start"===u.labelEdge?u.labelWidth:"100%",t.getContext(i).getBusyContext().whenReady().then(function(){!function(){if(!n){var e=t.getContext(i).getBusyContext(),o={description:"The oj-form div for oj-form-layout component with id = '"+u.id+"' is being rendered."};n=e.addBusyState(o)}}(),d._rootElementMutationObserver.disconnect(),function(){var e=u.maxColumns;if("start"===u.labelEdge){var t=parseInt(u.labelWidth,10);(isNaN(t)||t>0)&&i.classList.add("oj-form-cols-labels-inline"),i.classList.add("oj-formlayout-labels-inline"),i.classList.remove("oj-form-cols")}else i.classList.add("oj-form-cols"),i.classList.remove("oj-form-cols-labels-inline"),i.classList.remove("oj-formlayout-labels-inline");"truncate"===u.labelWrapping?i.classList.add("oj-formlayout-labels-nowrap"):i.classList.remove("oj-formlayout-labels-nowrap");"row"===u.direction?(e=1,i.classList.add("oj-formlayout-form-across")):(e=u.maxColumns,i.classList.remove("oj-formlayout-form-across"));i.style.columnCount=e,i.style.webkitColumnCount=e,i.style.MozColumnCount=e}(),v||function(){for(var e=i.querySelectorAll(m),t=e.length,n=0;n<t;++n){var o=e[n];B(o)&&("OJ-LABEL"===o.tagName?o.parentElement.removeChild(o):N(o))}}(),function(){var e=i.firstElementChild,t=0,n="column"===u.direction;for(;e;){var o=e.tagName.toLowerCase();if(-1!==o.indexOf("-"))if("oj-label"===o){var a=e;if(!(e=e.nextElementSibling))throw A(u),A(a),b(),h(),new Error("oj-form-layout component with id='"+u.id+"' has an oj-label child element with id='"+a.id+"' but has no next sibling element that it is associated with.")}else"oj-label-value"===o?v||e.refresh():e.classList.contains("oj-complete")?p(e):((n||t%u.maxColumns==0)&&e.setAttribute("data-oj-needs-oj-flex-div",""),r.push(e));t+=1,e=e.nextElementSibling}}(),function(){var e,t=[],n=i.children.length,o="column"===u.direction,a=0,l=0;!function(e,t){for(var n=t,o=e.length-1;o>=0;o--)n[o]=e[o]}(i.children,t);for(;a<n;){var s=t[a];if(-1===r.indexOf(s)){var d=s.tagName.toLowerCase();if("oj-label"===d){var c=t[a+=1];e=L(s,c,o||l%u.maxColumns==0)}else e=L(s,null,o||l%u.maxColumns==0)}l+=1,a+=1}!function(e,t){var n=u.maxColumns,o=t%n,a=j();if("column"!==u.direction&&e&&o>0)for(var i=o;i<n;i++)E(e,a)}(e,l)}(),t.getContext(i).getBusyContext().whenReady().then(function(){u.hasAttribute("data-oj-context")?t.getContext(u).getBusyContext().whenReady().then(function(){d._rootElementMutationObserver.observe(u,{childList:!0,subtree:!0,attributes:!0})}):d._rootElementMutationObserver.observe(u,{childList:!0,subtree:!0,attributes:!0})}),b(),h(),v&&(v=!1)})}}n.extension._CONSTRUCTOR=a,e.CustomElementBridge.register("oj-form-layout",{metadata:n})});
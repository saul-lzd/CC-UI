/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojcontext","promise","ojs/ojanimation"],function(e,t,i,s){var n,a,o,r={properties:{disabled:{type:"boolean",value:!1},expandArea:{type:"string",enumValues:["disclosureIcon","header"],value:"header"},expanded:{type:"boolean",writeback:!0,value:!1},translations:{type:"object",value:{}}},methods:{refresh:{},setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojBeforeExpand:{},ojExpand:{},ojBeforeCollapse:{},ojCollapse:{}},extension:{}};n=0,a="oj-collapsible-open-icon",o="oj-collapsible-close-icon",e.__registerWidget("oj.ojCollapsible",t.oj.baseComponent,{widgetEventPrefix:"oj",options:{expanded:!1,disabled:!1,expandOn:"click",expandArea:"header",beforeExpand:null,expand:null,beforeCollapse:null,collapse:null},_ComponentCreate:function(){this._super(),this.element.addClass("oj-collapsible oj-component"),this._processPanels(),this._refresh(),this._initialRender=!0;var e=this.element[0];this._expandCollapseHandler(this._createEventObject(e,this.options.expanded?"ojexpand":"ojcollapse")),this._initialRender=void 0},_createEventObject:function(e,i){return{type:i,target:e,currentTarget:e,preventDefault:t.noop}},_NotifyContextMenuGesture:function(e,t,i){this._OpenContextMenu(t,i,{launcher:this._getCollapsibleIcon().first()})},_createIcons:function(){var e=this.options.expanded?a:o;(this._isDisabled()?t("<span>"):t("<a href='#'>")).addClass("oj-component-icon oj-clickable-icon-nocontext oj-collapsible-header-icon "+e).attr("aria-labelledby",this.header.attr("id")).prependTo(this.header)},_destroyIcons:function(){this.header.children(".oj-collapsible-header-icon").remove()},_destroy:function(){this._resolveBusyContext(),this._cleanup(),this.element.removeClass("oj-collapsible oj-component oj-expanded oj-collapsed oj-disabled"),this._isDisabled()&&this._findFocusables(this.header).removeAttr("tabIndex"),this.header.removeClass("oj-collapsible-header").each(function(){/^oj-collapsible/.test(this.id)&&this.removeAttribute("id")}),this._findFirstFocusableInHeader().removeAttr("role").removeAttr("aria-controls").removeAttr("aria-expanded").removeAttr("aria-disabled"),this._destroyIcons(),this.content.css("display","").removeAttr("aria-hidden").removeAttr("tabIndex").removeClass("oj-component-content oj-collapsible-content").each(function(){/^oj-collapsible/.test(this.id)&&this.removeAttribute("id")})},_cleanup:function(){this._tearDownEvents(),this.content&&(e.DomUtils.unwrap(this.content),this.wrapper=null)},_isDisabled:function(){return this.element.hasClass("oj-disabled")},_getExpandAreaSelector:function(){return"header"===this.options.expandArea?"> .oj-collapsible-header":"> .oj-collapsible-header > .oj-collapsible-header-icon"},_getCollapsibleIcon:function(){return this.header.find(".oj-collapsible-header-icon")},_setOption:function(e,t,i){if("expanded"!==e){if("disabled"===e)return this._super(e,t,i),void this.refresh();"expandOn"===e||"expandArea"===e?(this._tearDownEvents(),this._super(e,t,i),this._setupEvents()):this._super(e,t,i)}else{if(t===this.options.expanded)return;t?this.expand(!0):this.collapse(!0)}},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode;switch(e.keyCode){case i.SPACE:case i.ENTER:this._toggleHandler(e)}}},refresh:function(){this._super(),this._cleanup(),this._processPanels(),this._destroyIcons(),this._refresh()},_processHeaderSlots:function(){var i,s=this.element[0],n=!1,a=e.BaseCustomElementBridge.getSlotMap(s).header;if(a&&a.length)if(1===a.length)i=a[0];else{var o=t("<span slot='header'></span>");i=o[0];for(var r=0;r<a.length;r++)i.appendChild(a[r]);o.children().attr("slot",""),n=!0}else i=t("<span slot='header'></span>")[0],n=!0;return(n||0!==this.element.children().index(i))&&s.insertBefore(i,s.firstChild),t(i)},_processDefaultSlots:function(){var i,s=this.element[0],n=e.BaseCustomElementBridge.getSlotMap(s)[""];if(n&&1===n.length)i=n[0];else{if(i=t("<div></div>")[0],n&&n.length)for(var a=0;a<n.length;a++)i.appendChild(n[a]);s.appendChild(i)}return t(i)},_processPanels:function(){this._IsCustomElement()?this.header=this._processHeaderSlots():this.header=this.element.children(":first-child"),this.header.addClass("oj-collapsible-header"),this._IsCustomElement()?this.content=this._processDefaultSlots():this.content=this.header.next(),this.content.addClass("oj-collapsible-content oj-component-content"),this.content.wrap("<div></div>"),this.wrapper=this.content.parent().addClass("oj-collapsible-wrapper"),this.options.disabled&&this.element.addClass("oj-disabled"),this._isDisabled()&&this._findFocusables(this.header).attr("tabIndex",-1)},_refresh:function(){var e=this.header,t=this.content,i=this.options,s=this.element.attr("id");s||(s=n+=1);var a="oj-collapsible-"+s;this.collapsibleId=a;var o=e.attr("id"),r=t.attr("id");o||(o=a+"-header",e.attr("id",o)),r||(r=a+"-content",t.attr("id",r)),this._createIcons();var l=this._findFirstFocusableInHeader();l.attr("role","button").attr("aria-controls",r).attr("aria-expanded",i.expanded),this._isDisabled()&&l.attr("aria-disabled","true"),i.expanded?t.removeAttr("aria-hidden"):(this.wrapper.css({"max-height":0,"overflow-y":"hidden",display:"none"}),t.attr("aria-hidden","true")),this._setupEvents()},_setupEvents:function(){var i={keydown:this._keydown},s=this.options.expandOn;if(s){var n=this;t.each(s.split(" "),function(t,s){e.DomUtils.isValidIdentifier(s)&&(i[s]=n._toggleHandler)})}var a=this.element.find(this._getExpandAreaSelector());this._on(a,i),this._on(this.wrapper,{transitionend:this._transitionEndHandler,webkitTransitionEnd:this._transitionEndHandler}),this._isDisabled()||(this._on(this.element,{ojfocus:this._focusHandler,ojfocusout:this._focusHandler}),this._focusable({element:this._getCollapsibleIcon(),applyHighlight:!0}),this._AddHoverable(a),this._AddActiveable(a))},_tearDownEvents:function(){var e=this.element.find(this._getExpandAreaSelector());this._RemoveHoverable(e),this._RemoveActiveable(e),this._off(e),this.wrapper&&this._off(this.wrapper),this._off(this.element.add(this.content))},_toggleHandler:function(e){this._isDisabled()||e.isDefaultPrevented()||(this.options.expanded?this.collapse(!0,e):this.expand(!0,e),e.preventDefault(),e.stopPropagation(),this._getCollapsibleIcon().focus())},_calcEffectTime:function(e){for(var t=e.css("transitionProperty"),i=e.css("transitionDelay"),s=e.css("transitionDuration"),n=t.split(","),a=i.split(","),o=s.split(","),r=n.length,l=a.length,d=o.length,h=0,c=0;c<r;c++){var p=o[c%d],u=p.indexOf("ms")>-1?parseFloat(p):1e3*parseFloat(p);if(u>0){var _=a[c%l],f=_.indexOf("ms")>-1?parseFloat(_):1e3*parseFloat(_);h=Math.max(h,f+u)}}return h+100},_resolveTransition:function(e){var t=this;this._transitionTimer=setTimeout(function(){t._transitionEndHandler()},t._calcEffectTime(e))},_expandCollapseHandler:function(e){if((!this._isDisabled()||this._initialRender)&&e.target===this.element[0]&&(this._initialRender||!e.isDefaultPrevented||!e.isDefaultPrevented())){var t=this.element,i=this.content,n=this.wrapper,r="ojexpand"===e.type,l=this;if(e.preventDefault(),this._initialRender||this._changeExpandedOption(r),this._getCollapsibleIcon().toggleClass(a,r).toggleClass(o,!r||!1).end(),this._initialRender||document.hidden||this.element.hasClass("oj-collapsible-skip-animation"))r||(n.css("max-height",0),n.hide()),l._afterExpandCollapse(r,e);else{if(n.contentHeight=n.outerHeight(),!this._animationResolve){var d=s.getContext(t[0]).getBusyContext();this._animationResolve=d.addBusyState({description:"The collapsible id='"+this.element.attr("id")+"' is animating."})}this._transitionEnded=!1,r?(n.show(),setTimeout(function(){n.contentHeight+=i.outerHeight(),n.addClass("oj-collapsible-transition").css({"max-height":n.contentHeight}),l._resolveTransition(n)},0)):(n.removeClass("oj-collapsible-transition"),n.css({"max-height":n.contentHeight,"overflow-y":"hidden"}),0===n.contentHeight?l._transitionEndHandler():setTimeout(function(){n.addClass("oj-collapsible-transition").css({"max-height":0}),l._resolveTransition(n)},20))}}},_focusHandler:function(e){this._isDisabled()||("ojfocusout"===e.type?(this._findFirstFocusableInHeader().attr("tabIndex",-1),e.preventDefault(),e.stopPropagation()):"ojfocus"===e.type&&(this._findFirstFocusableInHeader().attr("tabIndex",0).focus(),e.preventDefault(),e.stopPropagation()))},_findFirstFocusableInHeader:function(){return this._findFocusables(this.header).first()},_findFocusables:function(e){return this._isDisabled()?e.find("span"):e.find("a,:input")},expand:function(e,t){if(!this._isDisabled()){var i={header:this.header,content:this.content};e&&!1===this._trigger("beforeExpand",t,i)||this._expandCollapseHandler(this._createEventObject(this.element[0],"ojexpand"))}},collapse:function(e,t){if(!this._isDisabled()){var i={header:this.header,content:this.content};e&&!1===this._trigger("beforeCollapse",t,i)||this._expandCollapseHandler(this._createEventObject(this.element[0],"ojcollapse"))}},_transitionEndHandler:function(e){if(!(this._isDisabled()||e&&e.target!==this.element[0])){var t=!1;e&&e.originalEvent&&(t="max-height"===e.originalEvent.propertyName),t&&this._transitionTimer&&(clearTimeout(this._transitionTimer),this._transitionTimer=void 0),e&&(e.preventDefault(),e.stopImmediatePropagation()),this._transitionEnded||(!t&&e||(this._transitionEnded=!0),this.options.expanded?this.wrapper.css({"max-height":9999,"overflow-y":""}):this.wrapper.hide(),this.wrapper.removeClass("oj-collapsible-transition"),this._afterExpandCollapse(this.options.expanded,e))}},_resolveBusyContext:function(){this._animationResolve&&(this._animationResolve(),this._animationResolve=null)},_afterExpandCollapse:function(e,t){var s=this.element,n=this.wrapper;e?(s.removeClass("oj-collapsed"),s.addClass("oj-expanded"),i.subtreeShown(n[0])):(s.removeClass("oj-expanded"),s.addClass("oj-collapsed"),i.subtreeHidden(n[0])),e?this.content.removeAttr("aria-hidden"):this.content.attr("aria-hidden","true"),this._findFirstFocusableInHeader().attr("aria-expanded",e),this._resolveBusyContext();var a={header:this.header,content:this.content};this._initialRender||(e?this._trigger("expand",t,a):this._trigger("collapse",t,a))},_changeExpandedOption:function(e){this.option("expanded",e,{_context:{writeback:!0,internalSet:!0}})},getNodeBySubId:function(e){if(null==e)return this.element?this.element[0]:null;switch(e.subId){case"oj-collapsible-content":return this.content[0];case"oj-collapsible-header":return this.header[0];case"oj-collapsible-disclosure":case"oj-collapsible-header-icon":return this._getCollapsibleIcon()[0]}return null},getSubIdByNode:function(e){for(var t=this.getNodeBySubId({subId:"oj-collapsible-disclosure"}),i=e;i;){if(i===this.content[0])return{subId:"oj-collapsible-content"};if(i===this.header[0])return{subId:"oj-collapsible-header"};if(i===t)return{subId:"oj-collapsible-disclosure"};i=i.parentElement}return null}}),r.extension._WIDGET_NAME="ojCollapsible",r.extension._CONTROLS_SUBTREE_HIDDEN=!0,e.CustomElementBridge.register("oj-collapsible",{metadata:r})});
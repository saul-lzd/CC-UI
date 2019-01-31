/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcontext","ojs/ojconfig","ojs/ojcomponentcore","ojs/ojattributegrouphandler","ojs/ojlocaledata","ojs/ojvalidation-base","ojs/ojvalidation-number","ojs/internal-deps/dvt/DvtToolkit","ojs/ojkeysetimpl","ojs/ojmap","ojs/ojlogger","ojdnd","promise"],function(e,t,n,i,r,s,o,a,l,h,d,u,_){e.AttributeGroupHandler=s.AttributeGroupHandler,e.ColorAttributeGroupHandler=s.ColorAttributeGroupHandler,e.ShapeAttributeGroupHandler=s.ShapeAttributeGroupHandler;var c={_SHAPE_REGEXP:/\d/,_SHAPE_ENUMS:{circle:!0,ellipse:!0,square:!0,rectangle:!0,diamond:!0,triangleUp:!0,triangleDown:!0,plus:!0,human:!0,star:!0},shapeParseFunction:function(e,t){var n=t||c._SHAPE_ENUMS;return function(t,i,r,s){if(e[i]){if(c._SHAPE_REGEXP.test(t))return t;if(n[t])return t;throw new Error("Found: '"+t+"'. Expected one of the following: "+Object.keys(n).toString())}return s(t)}}},p=function(e,t){this._path=t,this._root=e,this._delimiter="/"};p.prototype._resolveLeafObjectAndProperty=function(e,t,n,i){for(var r={};e&&t.indexOf(n)>-1;){var s=t.substring(0,t.indexOf(n));i&&void 0===e[s]&&(e[s]={}),e=e[s],t=t.substring(t.indexOf(n)+1,t.length)}return e&&(r.object=e,r.parameter=t),r},p.prototype._resolvePath=function(e){if(void 0===this._leaf){var t=this._resolveLeafObjectAndProperty(this._root,this._path,this._delimiter,e);this._leaf=t.object,this._param=t.parameter}},p.prototype.getValue=function(){return this._resolvePath(!1),void 0===this._leaf?void 0:this._leaf[this._param]},p.prototype.setValue=function(e,t){this._resolvePath(!0),!t&&this._leaf[this._param]||(this._leaf[this._param]=e)};var v={TEXT:function(e){var t={};return e&&(e.hasClass("oj-gauge-metric-label")?(t["font-size"]=!0,t.color=!0):e.hasClass("oj-treemap-node-header")&&(t["font-weight"]=!0)),v._buildTextCssPropertiesObject(e,t)},BACKGROUND:function(e,t,n,i){return v._buildCssBackgroundPropertiesObject(e)},ANIM_DUR:function(e){var t=e.css("animation-duration");if(t)return"ms"===t.slice(-2)?t=parseInt(t.slice(0,-2),10):"s"===t.slice(-1)&&(t=1e3*parseFloat(t.slice(0,-1))),t},_INHERITED_FONT_COLOR:"rgb(254, 0, 254)",_INHERITED_FONT_FAMILY:"Times",_INHERITED_FONT_SIZE:"1px",_INHERITED_FONT_WEIGHT:"1",_INHERITED_FONT_STYLE:"normal",_FONT_SIZE_BUFFER:4,_styleCache:{},defaultStyleProcessor:function(e,t){return e.css(t)},_buildCssBackgroundPropertiesObject:function(e){var t={};return e.css("border-top-color")&&(t.borderColor=e.css("border-top-color")),e.css("border-width")&&e.css("border-style")&&"none"!==e.css("border-style")&&(t.borderWidth=e.css("border-width")),e.css("background-color")&&(t.backgroundColor=e.css("background-color")),t},_buildTextCssPropertiesObject:function(e,t){var n={},i=e.css("font-family");return i&&i!==v._INHERITED_FONT_FAMILY&&(n.fontFamily=i.replace(/"/g,"'")),!(i=e.css("font-size"))||i.indexOf("px")>-1&&parseFloat(i)<v._FONT_SIZE_BUFFER||t["font-size"]||(n.fontSize=i),(i=e.css("font-weight"))&&i!==v._INHERITED_FONT_WEIGHT&&!t["font-weight"]&&(n.fontWeight=i),(i=e.css("color"))&&i!==v._INHERITED_FONT_COLOR&&!t.color&&(n.color=i),(i=e.css("font-style"))&&i!==v._INHERITED_FONT_STYLE&&(n.fontStyle=i),n},processStyles:function(e,n,i,r){var o,a=null,l=null,h="";for(o=0;o<i.length;o++)h=h+i[o]+" ";var d,u={},_={},c=Object.keys(r);for(o=0;o<c.length;o++){var p=r[d=c[o]];p instanceof Array||(p=[p]);var f=v._hasUncachedProperty(d,p);l||a||!f||((a=t(document.createElement("div"))).attr("style","display:none;"),e.append(a),a.attr("class",h),t(document.body).append(a),(l=t(document.createElement("div"))).css("font-size",v._INHERITED_FONT_SIZE),l.css("color",v._INHERITED_FONT_COLOR),l.css("font-weight",v._INHERITED_FONT_WEIGHT),l.css("font-style",v._INHERITED_FONT_STYLE),a.append(l)),u[d]=p,f&&(_[d]=v._createStyleDivs(l,d,p))}var m=s.ColorAttributeGroupHandler.__createAttrDiv();for(o=0;o<c.length;o++)d=c[o],v._processStyle(_[d],n,d,u[d]);m&&(s.ColorAttributeGroupHandler.__processAttrDiv(m),m.remove()),a&&a.remove()},_createStyleDivs:function(e,n,i){v._styleCache[n]||(v._styleCache[n]={});for(var r=null,s=0;s<i.length;s++){var o=i[s].property;if(o)void 0===v._styleCache[n][o]&&(r||((r=t(document.createElement("div"))).addClass(n),e.append(r)))}return r},_processStyle:function(e,t,n,i){for(var r=0;r<i.length;r++){var s=i[r],o=s.property;if(o){var a=v._styleCache[n][o];if(void 0===a&&e&&(a=v._resolveStyle(e,o),v._styleCache[n][o]=a),null!=a){var l=new p(t,s.path),h=l.getValue(),d="object"==typeof h;if(d&&h)for(var u=Object.keys(a),_=0;_<u.length;_++){var c=u[_];void 0===h[c]&&(h[c]=a[c])}else l.setValue(a,d)}}}},_resolveStyle:function(e,t){var n=v[t],i=n?n(e):v.defaultStyleProcessor(e,t);return null==i||"string"==typeof i&&""===i.replace(/^\s+/g,"")?null:i},_hasUncachedProperty:function(e,t){var n=v._styleCache[e];if(!n)return!0;for(var i=0;i<t.length;i++){var r=t[i].property;if(r)if(void 0===n[r])return!0}return!1}};return e.__registerWidget("oj.dvtBaseComponent",t.oj.baseComponent,{options:{trackResize:"on"},_ComponentCreate:function(){this._super(),this._renderCount=0,this._numDeferredObjs=0,this._optionsCopy=null,this._templateMap={},this._dataProviderState={},this._treeKeyDataMap=new u;for(var n=this._GetComponentStyleClasses(),i=0;i<n.length;i++)this.element.addClass(n[i]);this._referenceDiv=t(document.createElement("div")),this._referenceDiv.attr("style","visibility:hidden;"),this.element.append(this._referenceDiv);var s=this.element[0].parentElement;s&&s._dvtcontext?this._context=s._dvtcontext:this._context=new h.Context(this.element[0],null,this._referenceDiv[0]),this._context.oj=e,this._context.KeySetImpl=d,this._context.ojMap=u,this._context.setReadingDirection(this._GetReadingDirection()),this._context.setTooltipAttachedCallback(r.subtreeAttached),this._context.setOverlayAttachedCallback(r.subtreeAttached),this._context.setTooltipStyleClass("oj-dvt-tooltip"),this._context.setDatatipStyleClass("oj-dvt-datatip"),this._context.setFixContextCallback(this._FixRendererContext.bind(this)),this._context.setCustomElement(this._IsCustomElement()),t(document.body).hasClass("oj-hicontrast")&&h.Agent.setHighContrast(!0),this._component=this._CreateDvtComponent(this._context,this._HandleEvent,this),this._context.getStage().addChild(this._component),!1!==h.requireJS&&(this._setLocaleHelpers(),this._processTranslations()),this._LoadResources(),this._dataProviderEventListeners=[],this.options._environment="jet",this.options._widgetConstructor=r.__GetWidgetConstructor(this.element)},_AfterCreate:function(){this._super(),"off"!==this.options.trackResize&&this._addResizeListener(),this._ProcessOptions(),this._Render()},refresh:function(){this._super(),this._context.setReadingDirection(this._GetReadingDirection()),this._processTranslations(),this._Render()},getNodeBySubId:function(e){var t=this._component&&this._component.getAutomation?this._component.getAutomation():null;if(t){var n=this._ConvertLocatorToSubId(e);return t.getDomElementForSubId(n)}return null},getSubIdByNode:function(e){var t=this._component&&this._component.getAutomation?this._component.getAutomation():null;if(t){var n=t.getSubIdForDomElement(e);return n?this._ConvertSubIdToLocator(n):null}return null},_ConvertLocatorToSubId:function(e){return null},_ConvertSubIdToLocator:function(e){return null},_ProcessStyles:function(){v.processStyles(this.element,this.options,this._GetComponentStyleClasses(),this._GetChildStyleClasses())},_GetComponentStyleClasses:function(){return["oj-dvtbase"]},_GetChildStyleClasses:function(){var e={"oj-dvt-no-data-message":{path:"_statusMessageStyle",property:"TEXT"}};return e},_GetEventTypes:function(){return[]},_GetTranslationMap:function(){var e=this.options.translations,t={"DvtUtilBundle.CLEAR_SELECTION":e.labelClearSelection,"DvtUtilBundle.COLON_SEP_LIST":e.labelAndValue,"DvtUtilBundle.INVALID_DATA":e.labelInvalidData,"DvtUtilBundle.NO_DATA":e.labelNoData,"DvtUtilBundle.DATA_VISUALIZATION":e.labelDataVisualization,"DvtUtilBundle.STATE_SELECTED":e.stateSelected,"DvtUtilBundle.STATE_UNSELECTED":e.stateUnselected,"DvtUtilBundle.STATE_MAXIMIZED":e.stateMaximized,"DvtUtilBundle.STATE_MINIMIZED":e.stateMinimized,"DvtUtilBundle.STATE_EXPANDED":e.stateExpanded,"DvtUtilBundle.STATE_COLLAPSED":e.stateCollapsed,"DvtUtilBundle.STATE_ISOLATED":e.stateIsolated,"DvtUtilBundle.STATE_HIDDEN":e.stateHidden,"DvtUtilBundle.STATE_VISIBLE":e.stateVisible,"DvtUtilBundle.SCALING_SUFFIX_THOUSAND":e.labelScalingSuffixThousand,"DvtUtilBundle.SCALING_SUFFIX_MILLION":e.labelScalingSuffixMillion,"DvtUtilBundle.SCALING_SUFFIX_BILLION":e.labelScalingSuffixBillion,"DvtUtilBundle.SCALING_SUFFIX_TRILLION":e.labelScalingSuffixTrillion,"DvtUtilBundle.SCALING_SUFFIX_QUADRILLION":e.labelScalingSuffixQuadrillion},n=o.getMonthNames("abbreviated");return t["DvtUtilBundle.MONTH_SHORT_JANUARY"]=n[0],t["DvtUtilBundle.MONTH_SHORT_FEBRUARY"]=n[1],t["DvtUtilBundle.MONTH_SHORT_MARCH"]=n[2],t["DvtUtilBundle.MONTH_SHORT_APRIL"]=n[3],t["DvtUtilBundle.MONTH_SHORT_MAY"]=n[4],t["DvtUtilBundle.MONTH_SHORT_JUNE"]=n[5],t["DvtUtilBundle.MONTH_SHORT_JULY"]=n[6],t["DvtUtilBundle.MONTH_SHORT_AUGUST"]=n[7],t["DvtUtilBundle.MONTH_SHORT_SEPTEMBER"]=n[8],t["DvtUtilBundle.MONTH_SHORT_OCTOBER"]=n[9],t["DvtUtilBundle.MONTH_SHORT_NOVEMBER"]=n[10],t["DvtUtilBundle.MONTH_SHORT_DECEMBER"]=n[11],t},_VerifyConnectedForSetup:function(){return!0},_SetupResources:function(){this._super(),this._addDataProviderEventListeners()},_ReleaseResources:function(){this._super(),this._removeDataProviderEventListeners()},_processTranslations:function(){var e=this._GetTranslationMap();h.Bundle.addLocalizedStrings(e)},_setLocaleHelpers:function(){var e={};e.numberConverterFactory=a.Validation.getDefaultConverterFactory("number"),e.isoToDateConverter=function(e){if("string"==typeof e){var t=a.IntlConverterUtils.isoToDate(e),n=t.toJSON()?a.IntlConverterUtils.dateToLocalIso(t):e;return a.IntlConverterUtils.isoToLocalDate(n)}return e},e.dateToIsoWithTimeZoneConverter=function(e){if(e instanceof Date){var t=-1*e.getTimezoneOffset(),n=t>=0?"+":"-",i=Math.floor(Math.abs(t)/60),r=Math.abs(t)%60,s=n+(2!==i.toString().length?"0"+i:i)+":"+(2!==r.toString().length?r+"0":r);return a.IntlConverterUtils.dateToLocalIso(e)+s}return e},this._context.setLocaleHelpers(e)},_destroy:function(){this._context.hideTooltips(),this._context.destroy(),this._context=null;var e=this.element[0].parentElement;e&&e._dvtcontext&&(e._dvtcontext=null),this._component.destroy&&this._component.destroy(),this._component=null,this._removeResizeListener(),this._CleanAllTemplates(),this.element.children().remove(),this.element.removeAttr("role").removeAttr("tabIndex").removeAttr("aria-activedescendant");for(var t=this._GetComponentStyleClasses(),n=0;n<t.length;n++)this.element.removeClass(t[n]);this._MakeReady(),this._dataProviderState={},this._super()},_setOptions:function(e,n){this._superApply(arguments);for(var i=Object.keys(this._dataProviderState),r=0;r<i.length;r++){var s=i[r];e[s]&&(this._dataProviderState[s]={})}var o=this.options.trackResize;if("off"===o&&this._resizeListener?this._removeResizeListener():"off"===o||this._resizeListener||this._addResizeListener(),this._ProcessOptions(),!this._bUserDrivenChange){var a=!1,l=this._GetEventTypes(),h=["highlightedCategories","selection","dataCursorPosition","scrollPosition"];t.each(e,function(e){if(l.indexOf(e)<0&&h.indexOf(e)<0)return a=!0,!1}),a?this._Render():(void 0!==e.highlightedCategories&&this._component.highlight(e.highlightedCategories),void 0!==e.selection&&this._component.select(e.selection),void 0!==e.dataCursorPosition&&this._component.positionDataCursor&&this._component.positionDataCursor(e.dataCursorPosition),void 0!==e.scrollPosition&&this._component.scroll(e.scrollPosition))}},_CreateDvtComponent:function(e,t,n){return null},_HandleEvent:function(e){var n=e.type;"selection"===n?this._UserOptionChange("selection",e.selection):"categoryHide"===n||"categoryShow"===n?this._UserOptionChange("hiddenCategories",e.hiddenCategories):"categoryHighlight"===n?this._UserOptionChange("highlightedCategories",e.categories):"optionChange"===n?this._UserOptionChange(e.key,e.value,e.optionMetadata):"touchHoldRelease"===n&&this._GetContextMenu()?this._OpenContextMenu(t.Event(e.nativeEvent),"touch"):"ready"===n&&0===this._numDeferredObjs&&this._MakeReady()},_addResizeListener:function(){this._resizeListener||(this._resizeListener=this._handleResize.bind(this),e.DomUtils.addResizeListener(this.element[0],this._resizeListener,250))},_removeResizeListener:function(){this._resizeListener&&(e.DomUtils.removeResizeListener(this.element[0],this._resizeListener),this._resizeListener=null)},_handleResize:function(e,t){var n=this.element.width(),i=this.element.height();(null==this._width||null==this._height||Math.abs(n-this._width)+Math.abs(i-this._height)>=5)&&this._Render(!0)},_LoadResources:function(){},_Render:function(e){this._context.hideTooltips(),this._NotReady(),!this._context.isReadyToRender()||this._renderNeeded&&e?(this._renderNeeded=!0,this._MakeReady()):(this._width=this._IsFlowingLayoutSupported()?null:this.element.width(),this._height=this._IsFlowingLayoutSupported()?null:this.element.height(),this._context.setDefaultFontFamily(this._referenceDiv.css("font-family")),this.options._width=this._width,this.options._height=this._height,this.options._locale=i.getLocale(),this._IsDraggable()&&this.element.attr("draggable",!0),this._ProcessStyles(),e?0===this._numDeferredObjs&&(this._renderCount+=1,this._RenderComponent(this._optionsCopy,e)):(this._renderCount+=1,this._resolveDeferredDataItems()&&this._RenderComponent(this._optionsCopy)),this._renderNeeded=!1)},_IsDraggable:function(){return!!this.options.dnd},_NotifyShown:function(){this._super(),this._notifyShownAttached()},_NotifyAttached:function(){this._super(),this._notifyShownAttached()},_NotifyDetached:function(){this._super(),this._notifyHiddenDetached()},_NotifyHidden:function(){this._super(),this._notifyHiddenDetached()},_notifyShownAttached:function(){this._renderNeeded&&this._Render()},_notifyHiddenDetached:function(){this._context.hideTooltips(),this._MakeReady()},_UserOptionChange:function(e,t,n){this._bUserDrivenChange=!0,this.option(e,t,{_context:{writeback:!0,optionMetadata:n,internalSet:!0}}),this._bUserDrivenChange=!1},_NotifyContextMenuGesture:function(e,t,n){if("touch"!==n)if("keyboard"===n){var i=this.element[0].getBoundingClientRect(),r=this._component.getKeyboardFocus()?this._component.getKeyboardFocus().getBoundingClientRect():null,s=r?"left+"+(r.left+.5*r.width-i.left)+" top+"+(r.top+.5*r.height-i.top):"center";this._OpenContextMenu(t,n,{position:{at:s}})}else this._super(e,t,n)},_GetDvtComponent:function(e){var t=r.__GetWidgetConstructor(e)("instance");return t?t._component:null},_GetStringFromIndexPath:function(e){for(var t="",n=0;n<e.length;n++)t+="["+e[n]+"]";return t},_GetIndexPath:function(e){for(var t=[],n=0;e.indexOf("[",n)>0;){var i=e.indexOf("[",n)+1,r=e.indexOf("]",n);t.push(Number(e.substring(i,r))),n=r+1}return t},_GetFirstIndex:function(e){return Number(this._GetFirstBracketedString(e))},_GetFirstBracketedString:function(e){var t=e.indexOf("[")+1,n=e.indexOf("]");return e.substring(t,n)},_GetComponentDeferredDataPaths:function(){return{}},_GetComponentNoClonePaths:function(){if(!this._noClonePaths){this._noClonePaths={};var e=this,t=this._GetComponentDeferredDataPaths().root;t&&t.forEach(function(t){e._noClonePaths[t]=!0})}return this._noClonePaths},_resolveDeferredDataItems:function(){this._optionsCopy=h.JsonUtils.clone(this.options,null,this._GetComponentNoClonePaths()),this._FixCustomRenderers(this._optionsCopy),this._numDeferredObjs=0;for(var e=this,t=this._GetComponentDeferredDataPaths(),n=Object.keys(t),i=0;i<n.length;i++){var r=n[i];t[r].forEach(function(t){if("root"===r)e._resolveDeferredDataItem.bind(e)(e.options,e._optionsCopy,t);else{var n=e.options[r];if(n&&n instanceof Array)for(var i=0;i<n.length;i++)e._resolveDeferredDataItem.bind(e)(n[i],e._optionsCopy[r][i],t)}})}return 0===this._numDeferredObjs},_resolveDeferredDataItem:function(t,n,i){var r=new p(t,i),s=r.getValue(),o=this;if(s instanceof Function?s=Promise.resolve(s(this._GetDataContext(t))):this._IsCustomElement()&&Array.isArray(s)&&(s=Promise.resolve(s),r.setValue(s,!0)),s&&e.DataProviderFeatureChecker.isDataProvider(s)){var a=e.DataProviderFeatureChecker.isTreeDataProvider(s);s=new Promise(function(e){var t=o._getTemplateEngine(),n=o._dataProviderState[i]||{},r=n.data?Promise.resolve(n.data):o._fetchAllData(s,i);Promise.all([t,r]).then(function(t){var r=t[0],s=t[1];n.data=s,o._dataProviderState[i]=n;var l=n.pathsValuesMap?n.pathsValuesMap:o._ProcessTemplates(i,s,r,a);e(l)})})}if(s instanceof Promise){var l=this._renderCount;s.then(function(e){var t=[i],r=[e];e.paths&&(t=e.paths,r=e.values,o._dataProviderState[i].pathsValuesMap=e),o._renderDeferredData(l,n,t,r)},function(){o._renderDeferredData(l,n,[i],[[]])}),this._numDeferredObjs+=1}},_renderDeferredData:function(e,t,n,i){if(e===this._renderCount){this._numDeferredObjs-=1;for(var r=0;r<n.length;r++)new p(t,n[r]).setValue(i[r],!0);0===this._numDeferredObjs&&(this._RenderComponent(this._optionsCopy),this._optionsCopy=null)}},_FetchCollection:function(t,n,i){var r=this,s={data:[],keys:[]},o=t.fetchFirst({size:-1})[Symbol.asyncIterator](),a=e.DataProviderFeatureChecker.isTreeDataProvider(t),l=function(e){for(var t=[],h=0;h<e.value.data.length;h++){var d=n({data:e.value.data[h],key:e.value.metadata[h].key});t.push(d)}return Promise.all(t).then(function(e){for(var t=0;t<e.length;t++){var n=e[t].data,o=e[t].key;s.data.push(n),s.keys.push(o),r._treeKeyDataMap.set(a?o.value:o,{data:n,key:o,parentKey:i})}}).then(function(){return e.done?Promise.resolve(s):o.next().then(l)})};return o.next().then(l)},_fetchAllData:function(t,n){var i=this,r=i._GetSimpleDataProviderConfigs()[n].expandedKeySet,s=e.DataProviderFeatureChecker.isTreeDataProvider(t),o=function(e){var n={value:e.data},s={value:e.key};if(r&&r.has(s.value)){var a=t.getChildDataProvider(s.value);if(a)return i._FetchCollection(a,o,s.value).then(function(e){return n.children=e.data,s.children=e.keys,{data:n,key:s}})}return Promise.resolve({data:n,key:s})};return i._FetchCollection(t,s?o:function(e){return Promise.resolve(e)})},_getTemplateEngine:function(){return this._templateEnginePromise?this._templateEnginePromise:(this._templateEnginePromise=new Promise(function(e){i.__getTemplateEngine().then(function(t){e(t)},function(e){throw new Error("Error loading template engine: "+e)})}),this._templateEnginePromise)},getTemplates:function(){return e.BaseCustomElementBridge.getSlotMap(this.element[0])},getElementPropertyNames:function(t){var n=e.CustomElementBridge.getMetadata(t).properties,i=Object.keys(n).filter(function(e){return!n[e]._eventListener}),r=new Set;return i.forEach(function(e){r.add(e)}),r},_ProcessTemplates:function(e,t,n,i){var r,s,o=this._GetSimpleDataProviderConfigs()[e],a=this;if(o){r=[],s=[];var l="string"==typeof o.templateName?function(){return o.templateName}:o.templateName,h="string"==typeof o.templateElementName?function(){return o.templateElementName}:o.templateElementName,d=o.resultPath,u=this.options.as,c=this.getTemplates(),p=this.element[0],v=o.getAliasedPropertyNames,f=o.processChildrenData,m=o.processOptionData||function(e){return e};if(l&&h&&d){var y={},g=function(e,t,i,r,s){var o,l=y[s];l||(l=a.getElementPropertyNames(s),y[s]=l);var h=c[r];try{if(h){if(o=n.resolveProperties(p,h[0],s,l,i,u),v)for(var d=v(s),f=Object.keys(d),m=0;m<f.length;m++){var g=f[m];o[d[g]]=o[g],o[g]=void 0}}else o={};o.id=t,o._itemData=e}catch(e){_.error(e)}return o},C=function(e,t,n){for(var r=e.data,s=e.keys,o=[],a=0;a<r.length;a++){var u=i?r[a].value:r[a],_=i?s[a].value:s[a],c={data:u,key:_,index:a,componentElement:p};i&&(c.parentData=t,c.parentKey=n);var v=g(u,_,c,l(r[a]),h(r[a]));if(r[a].children){var m=t.slice(0);m.push(u);var y={data:r[a].children,keys:s[a].children},D=C(y,m,_);f?f(v,r[a],D):v[d]=D}o.push(v)}return o};r.push(d);var D=C(t,[],void 0);s.push(m(D))}}return{paths:r,values:s}},_GetSimpleDataProviderConfigs:function(){return{}},_RenderComponent:function(e,t){if(this._context.isReadyToRender()){this._CleanAllTemplates();var n=this._IsFlowingLayoutSupported()&&this._resizeListener;n&&this._removeResizeListener(),this._component.render(t?null:e,this._width,this._height),n&&this._addResizeListener(),this.element.attr("role")?this.element[0].hasAttribute("tabindex")||this.element.attr("tabindex",0):this.element.attr("tabindex",null)}else this._renderNeeded=!0,this._MakeReady()},_GetDataProviderEventHandler:function(t,n){var i=this,r=n[1],s=function(e,t,n){if(!t)return[];var i=new d(t),r=new Map,s=function(e){for(var t=0;t<e.length;t++){var o=n?e[t].value:e[t],a=i.get(o);a!==i.NOT_A_KEY&&r.set(a,t),n&&e[t].children&&s(e[t].children)}};s(e.keys);var o=[];return t.forEach(function(e){o.push(r.get(e))}),o},o=function(e){Promise.all([e,i._getTemplateEngine()]).then(function(e){i._dataProviderState[r].data=e[0],i._dataProviderState[r].pathsValuesMap=null,i._Render()})};return function(t){var r=this,a=e.DataProviderFeatureChecker.isTreeDataProvider(r);if("refresh"===t.type)o(i._fetchAllData(r,n[1]));else if("mutate"===t.type){var l,h=t.detail.add,d=t.detail.remove,u=t.detail.update,_=i._dataProviderState[n[1]].data,c=function(e,t,s,l){var h=0,d=[],u=1===s&&!l;t.keys.forEach(function(e){var s,o=l?null:t.data[h];if(a)if(u){var _=i._treeKeyDataMap.get(e);_&&(_.data.value=o,s=Promise.resolve({data:_.data,key:i._treeKeyDataMap.get(e).key}))}else{var c={value:o},p={value:e},v=r.getChildDataProvider(e);if(v&&!l)s=i._fetchAllData(v,n[1]).then(function(e){return c.children=e.data,p.children=e.keys,{data:c,key:p}});else s=Promise.resolve({data:c,key:p});if(!l){var f=t.parentKeys?t.parentKeys[h]:null;i._treeKeyDataMap.set(p.value,{data:c,key:p,parentKey:f})}}else s=Promise.resolve({data:o,key:e}),i._treeKeyDataMap.set(e,{data:o,key:e});d.push(s),h+=1}),Promise.all(d).then(function(t){for(var n=0;n<t.length;n++){var r,h,d=a?t[n].key.value:t[n].key,c=i._treeKeyDataMap.get(d).parentKey;if(c){var p=i._treeKeyDataMap.get(c);p.data.children||u||(p.data.children=[],p.key.children=[]),r=p.data.children,h=p.key.children}else r=_.data,h=_.keys;if(l)r.splice(e[n],s),h.splice(e[n],s);else{var v=u||0!==e.length?e[n]:r.length;r.splice(v,s,t[n].data),h.splice(v,s,t[n].key)}}o(Promise.resolve(_))})};h?(l=h.indexes||s(_,h.addBeforeKeys?h.addBeforeKeys:h.afterKeys,a),Array.isArray(h.data)?c(l,h,0):r.fetchByKeys({keys:h.keys}).then(function(e){if(e.results.size>0){var t=[];h.keys.forEach(function(n){t.push(e.results.get(n).data)}),h.data=t,c(l,h,0)}})):d?(l=d.indexes||s(_,d.keys,a),c(l,d,1,!0)):u&&(l=u.indexes||s(_,u.keys,a),Array.isArray(u.data)?c(l,u,1):r.fetchByKeys({keys:u.keys}).then(function(e){if(e.results.size>0){var t=[];u.keys.forEach(function(n){t.push(e.results.get(n).data)}),u.data=t,c(l,u,1)}}))}}},_addDataProviderEventListeners:function(){for(var t=this._GetComponentDeferredDataPaths(),n=Object.keys(t),i=0;i<n.length;i++)for(var r=n[i],s=t[r],o=0;o<s.length;o++){var a,l=s[o];if((a="root"===r?this.options[l]:this.options[r]?this.options[r][l]:null)&&e.DataProviderFeatureChecker.isDataProvider(a)){var h=this._GetDataProviderEventHandler(this,[r,l]);a.addEventListener("mutate",h),a.addEventListener("refresh",h),this._dataProviderEventListeners.push({dataProvider:a,listener:h})}}},_removeDataProviderEventListeners:function(){for(var e=0;e<this._dataProviderEventListeners.length;e++){var t=this._dataProviderEventListeners[e],n=t.dataProvider,i=t.listener;n.removeEventListener("mutate",i),n.removeEventListener("refresh",i)}this._dataProviderEventListeners=[]},_GetDataContext:function(e){return{}},_IsFlowingLayoutSupported:function(){return!1},whenReady:function(){if(this._ready)return Promise.resolve(!0);if(!this._promise){var e=this;this._promise=new Promise(function(t){e._promiseResolve=t})}return this._promise},_NotReady:function(){if(this._ready=!1,0===this._numDeferredObjs&&!this._readyResolveFunc){var e=n.getContext(this.element[0]).getBusyContext(),t={description:"The component identified by '"+this.element.attr("id")+"' is being loaded."};this._readyResolveFunc=e.addBusyState(t)}},_MakeReady:function(){this._promiseResolve&&(this._promiseResolve(!0),this._promiseResolve=null),this._ready=!0,this._promise=null,this._readyResolveFunc&&(this._readyResolveFunc(),this._readyResolveFunc=null)},_ProcessOptions:function(){var e=this.options.tooltip;e&&e._renderer&&(this.options.tooltip={renderer:this._GetTemplateRenderer(e._renderer,"tooltip")})},_WrapCustomElementRenderer:function(e){var t=this;return function(n){n._dvtcontext=t._context;var i=e(n);if(n._templateName&&n._templateCleanup&&t._AddTemplate(n._templateName,n._templateCleanup),i&&!0!==i.preventDefault&&i.insert){var r=i.insert;return r.classList&&r.classList.contains("oj-dvtbase")?t._GetDvtComponent(r):r}return null}},_FixCustomRenderers:function(e){if(this._IsCustomElement())for(var t=this._GetComponentRendererOptions(),n=0;n<t.length;n++){var i=t[n],r=new p(e,i),s=r.getValue();s&&r.setValue(this._WrapCustomElementRenderer(s),!0)}},_GetComponentRendererOptions:function(){return["tooltip/renderer"]},_GetTemplateRenderer:function(e,n){var i=this;return function(r){var s=document.createElement("div");s.style.display="none",e({parentElement:s,context:r});var o=s.children[0];return o?(i._AddTemplate(n,function(){t(s).remove()}),s.removeChild(o),t(s).remove(),o):null}},_GetTemplateDataRenderer:function(e,n){var i=this;return function(r){var s=document.createElement("div");s.style.display="none",s._dvtcontext=i._context,i.element.append(s),e({parentElement:s,data:r.data});var o=s.children[0];return o?(i._AddTemplate(n,function(){t(s).remove()}),"http://www.w3.org/2000/svg"===o.namespaceURI?(s.removeChild(o),t(s).remove(),o):i._GetDvtComponent(o)):null}},_CleanAllTemplates:function(){for(var e=Object.keys(this._templateMap),t=0;t<e.length;t++){var n=e[t];this._CleanTemplate(n)}this._templateMap={}},_CleanTemplate:function(e){if(this._templateMap[e]){for(var t=this._templateMap[e].length,n=0;n<t;n++)this._templateMap[e][n]();this._templateMap[e]=[]}},_AddTemplate:function(e,t){this._templateMap[e]||(this._templateMap[e]=[]),this._templateMap[e].push(t)},_CompareOptionValues:function(t,n,i){switch(t){case"hiddenCategories":case"highlightedCategories":case"selection":return e.Object.compareValues(n,i);default:return this._super(t,n,i)}}},!0),c});
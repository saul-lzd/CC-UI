/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojcolor","ojs/ojvalidation-base","ojs/ojlogger","ojs/ojcontext","ojs/ojarraytabledatasource","ojs/ojlistview","ojs/ojeditablevalue"],function(t,e,i,s,a,o,l){var n={properties:{describedBy:{type:"string"},disabled:{type:"boolean",value:!1},displayOptions:{type:"object",properties:{converterHint:{type:"Array<string>|string",value:["placeholder","notewindow"]},helpInstruction:{type:"Array<string>|string",value:["notewindow"]},messages:{type:"Array<string>|string",value:["inline"]},validatorHint:{type:"Array<string>|string",value:["notewindow"]}}},help:{type:"object",properties:{instruction:{type:"string"}}},helpHints:{type:"object",properties:{definition:{type:"string",value:""},source:{type:"string",value:""}}},labelDisplay:{type:"string",enumValues:["auto","off"],value:"off"},labelHint:{type:"string",value:""},labelledBy:{type:"string"},layout:{type:"string",enumValues:["grid","list"],value:"grid"},messagesCustom:{type:"Array<Object>",writeback:!0,value:[]},palette:{type:"Array<Object>"},swatchSize:{type:"string",enumValues:["lg","sm","xs"],value:"lg"},translations:{type:"object",value:{},properties:{labelNone:{type:"string"}}},valid:{type:"string",writeback:!0,enumValues:["invalidHidden","invalidShown","pending","valid"],readOnly:!0},value:{type:"oj.Color",writeback:!0}},methods:{setProperty:{},getProperty:{},setProperties:{},refresh:{},reset:{},showMessages:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojAnimateStart:{},ojAnimateEnd:{}},extension:{}};t.__registerWidget("oj.ojColorPalette",e.oj.editableValue,{widgetEventPrefix:"oj",defaultElement:"<input>",options:{labelledBy:null,palette:null,swatchSize:"lg",labelDisplay:"off",layout:"grid",value:null},getNodeBySubId:function(t){if(null==t)return this.element?this.element[0]:null;var e,i=t.subId,s=t.index,a=this._super(t);if(!a)switch(i){case"oj-palette-entry":(e=this._$LV.find(".oj-listview-item")).length&&s<e.length&&(a=e[s])}return a},getSubIdByNode:function(t){var i,s,a=e(t),o=null,l=-1,n=null;return a.is("li")&&a.hasClass("oj-listview-item-element")&&(o="oj-palette-entry",i=a.attr("id"),s=this._$LV.find(".oj-listview-item"),e.each(s,function(t,s){return e(s).attr("id")!==i||(l=t,!1)})),o&&(n={subId:o},l>=0&&(n.index=l)),null==n&&(n=this._super(t)),n},add:function(t){var e=null;t instanceof s?e={color:t}:"object"==typeof t&&t.color instanceof s&&(e=t),e&&(this._setPaletteBusyContext("The swatch add is being animated in the palette (id="+this.element.attr("id")+")."),e.id=this._getNewSwatchId(),this._opStack||(this._opStack=[]),this._opStack.push({op:"a",obj:e}),this._palDataSource.add(e),this._waitForLV())},remove:function(t){var e=null,i=typeof t;if("number"===i)t>=0&&t<this._palette.length?e=this._palette[t].id:o.error("JET Color Palette (id='"+this.element.attr("id")+"'): Invalid index for remove ("+t+")");else if("object"===i){var a=t instanceof s?t:t.color;e=this._findSwatchIdOfColorInPalette(a)}e&&(t={id:e},this._setPaletteBusyContext("The removed swatch is being animated in the palette (id="+this.element.attr("id")+")."),this._opStack||(this._opStack=[]),this._opStack.push({op:"r",obj:t}),this._palDataSource.remove(t),this._waitForLV())},whenReady:function(){var t=this;return new Promise(function(e){t._$LV.ojListView("whenReady").then(function(){e(!0)})})},_destroy:function(){this._resolvePaletteBusyContext(),this._$LV&&(this._opStack=[],this._$LV.ojListView("destroy")),this._palDataSource=null,this._$paletteContainer.remove(),this._$boundElem.removeClass("oj-colorpalette"),this._clear(),this._super()},_ComponentCreate:function(){this._super(),this._initPalette()},_AfterCreate:function(){var t;if(this._super(),this._updateLabelledBy(null,this.options.labelledBy,this._$LV),this._IsCustomElement()||(t=this._GetLabelElement()),t){var e=t.attr("id");e?this._$LV.attr("aria-labelledby",e):o.warn("JET Color Palette: The label for this component needs an id in order to be accessible")}else{var i=this.element.attr("aria-label");i&&this._$LV.attr("aria-label",i)}},_setOption:function(t,e,i){var s=this.options.labelledBy,a=!1;switch(t){case"value":a=this._setOptValue(e);break;case"palette":this._setOptPalette(e);break;case"swatchSize":this._setOptSwatchSize(e);break;case"layout":this._setOptLayout(e);break;case"labelDisplay":this._setOptLabelDisplay(e);break;case"disabled":this._setOptDisabled(e,!0);break;case"labelledBy":this._updateLabelledBy(s,e,this._$LV)}a||this._super(t,e,i)},_updateLabelledBy:t.EditableValueUtils._updateLabelledBy,_onLVOptionChange:function(t,e){"selection"===e.option&&this._selected(t,e)},_waitForLV:function(){if(!this._LVResolve){var t=this;this._LVResolve=l.getContext(this._$LV[0]).getBusyContext(),this._LVResolve.whenReady().then(function(){var e,i,s,a,o,l;if(t._LVResolve=null,t._resolvePaletteBusyContext(),t._opStack){for(s=!1,o=0;o<t._opStack.length;o++)i=(e=t._opStack[o]).obj,"a"!==e.op&&"r"!==e.op||(s=!0,a||(a=t._palette.slice(0)),"a"===e.op?a.push(i):"r"===e.op&&(l=t._findIndexOfSwatchById(a,i.id),a.splice(l,1),e.index=l));if(s)for(t._fireOptionChangeEvent("palette",a,null);t._opStack.length;)i=(e=t._opStack.shift()).obj,"a"===e.op?t._palette.push(i):"r"===e.op&&t._palette.splice(e.index,1)}},function(){o.error("JET Color Palette (id='"+t.element.attr("id")+"'): ListView timed out."),t._opStack=[]})}},_compareColorValues:function(t,e){var i=!1;return t instanceof s&&e instanceof s&&(i=t.isEqual(e)),i},_fireOptionChangeEvent:function(t,e,i){"palette"===t&&this.option(t,e,{_context:{originalEvent:i,internalSet:!0},changed:!0})},_findColorInPalette:function(t){var e,i,s=-1,a=this._palette,o=a.length;for(e=0;e<o;e++)if(i=a[e],t.isEqual(i.color)){s=e;break}return s},_findSwatchIdOfColorInPalette:function(t){var e,i,s=null,a=this._palette,o=a.length;for(e=0;e<o;e++)if(i=a[e],t.isEqual(i.color)){s=i.id;break}return s},_findIndexOfSwatchById:function(t,e){var i,s=-1,a=t.length;for(i=0;i<a;i++)if(t[i].id===e){s=i;break}return s},_setPaletteBusyContext:function(t){if(!this._resolve){var e=l.getContext(this.element[0]).getBusyContext();this._resolve=e.addBusyState({description:t})}},_resolvePaletteBusyContext:function(){this._resolve&&(this._resolve(),this._resolve=null)},_renderer:function(t){var e,i,a,l,n,r;(e=t.data.color)instanceof s||(e=s.BLACK,o.warn("JET Color Palette (id='"+this.element.attr("id")+"'): Substituting Color.BLACK for an object that is not an instance of Color")),i=a=t.data.label,l="auto"===this._labelDisplay&&"list"===this._layout&&"sm"===this._swatchSize||"auto"===this._labelDisplay&&"grid"===this._layout&&"lg"===this._swatchSize,null!=e&&(r=i||this._convHex.format(e),l?(i=r||this._convHex.format(e),i=a?i:i.toUpperCase()):i=null,n=!!(this._isTransparent(e)||i&&"none"===i.toLowerCase()));var h,c="";return this._initSelection===t.data.id&&(c="oj-selected",this._initSelection=-1,this._selectedParent=t.parentElement),h="list"===this._layout?"oj-colorpalette-swatchsize-"+this._swatchSize+(n?" oj-colorpalette-swatch-none":""):this._swatchClass+(n?" oj-colorpalette-swatch-none":""),n?this._renderNone(l,i,r,h,c):this._renderStandard(e,l,i,r,h,c)},_renderStandard:function(t,i,s,a,o,l){var n;return n="<div class='oj-colorpalette-swatch-entry "+o+(i?" oj-colorpalette-swatch-showlabel":"")+"'><div class='oj-colorpalette-swatch-container'><div class='oj-colorpalette-swatch "+l+"' style='background-color:"+t.toString()+"'"+(s?"":" title='"+a+"'")+"></div></div>",s&&(n+="<span class='oj-colorpalette-swatch-text'>"+s+"</span>"),e(n+="</div>")[0]},_renderNone:function(t,i,s,a,o){var l;return l="<div class='oj-colorpalette-swatch-entry "+a+(t?" oj-colorpalette-swatch-showlabel":"")+"'><div class='oj-colorpalette-swatch-container'><div class='oj-colorpalette-swatch "+o+"'"+(i?"":" title='"+s+"'")+"><div class='oj-colorpalette-swatch-none-icon'></div></div></div>",i&&(l+="<span class='oj-colorpalette-swatch-text'>"+i+"</span>"),e(l+="</div>")[0]},_selected:function(t,i){var s,a,o=null;if((s=e(i.items[0]).find(".oj-colorpalette-swatch")).addClass("oj-selected"),a=this._selectedSwatch,this._selectedSwatch=s,a||this._selectedParent&&(a=e(this._selectedParent).find(".oj-colorpalette-swatch"),this._selectedParent=null),a&&a.removeClass("oj-selected"),1===i.value.length){for(var l=0;l<this._palette.length;l++)if(this._palette[l].id===i.value[0]){o=this._palette[l].color;break}this._SetValueReturnBoolean(o,t),this._value=o}},_setOptDisabled:function(t,i){var s,a;(!i||i&&t!==this._disabled)&&(this._$LV&&this._$LV.ojListView("option","disabled",t),s=e(".oj-colorpalette-container .oj-colorpalette-swatch"),a=this,t?(this._disabledBG=[],e.each(s,function(t,e){a._disabledBG.push(e.style.backgroundColor),e.style.backgroundColor="#eee"})):(this._disabledBG&&this._disabledBG.length&&e.each(s,function(t,e){e.style.backgroundColor=a._disabledBG[t]}),this._disabledBG=null),this._disabled=t)},_setOptValue:function(t){var e=-1,i=[];if(this._palette.length>0&&t instanceof s&&!this._compareColorValues(this._value,t)){if((e=this._findColorInPalette(t))>=0&&null!=this._palette[e].id){var a=this._palette[e].id;i.push(a)}this._$LV.ojListView("option","selection",i),this._value=t}return i.length>0},_setOptPalette:function(t){e.isArray(t)&&(this._isPaletteEqual(t,this._palette)||(this._setPaletteBusyContext("The palette (id="+this.element.attr("id")+") option change in progress."),this._opStack=[],this._palette=t.slice(0),this._initSelection=this._findColorInPalette(this._value),this._setData(t,this._initSelection,!0),this._waitForLV()))},_setOptSwatchSize:function(t){if("string"==typeof t&&t!==this._swatchSize){this._swatchSize=t;var e="lg"===t||"sm"===t?t:"xs";this._swatchClass="oj-colorpalette-swatchsize-"+e,this._$LV.ojListView("refresh")}},_setOptLabelDisplay:function(t){"string"==typeof t&&t!==this._labelDisplay&&("auto"!==t&&"off"!==t||(this._labelDisplay=t,this._$LV.ojListView("refresh")))},_setOptLayout:function(t){"string"==typeof t&&t!==this._layout&&(this._layout=t,this._setDisplayFormat(),this._$LV.ojListView("refresh"))},_setDisplayFormat:function(){var t="grid"===this._layout,e=t?"oj-colorpalette-grid":"oj-colorpalette-list";this._$LV.removeClass("oj-colorpalette-grid oj-colorpalette-list oj-listview-card-layout"),this._$LV.addClass(e),t&&this._$LV.addClass("oj-listview-card-layout")},_setData:function(e,i,s){this._addIdsToPalette(e),this._palDataSource=new t.ArrayTableDataSource(e,{idAttribute:"id"}),i>=0&&(this._palette[i].id&&(i=this._palette[i].id),0===this._palInitSelected.length?this._palInitSelected.push(i):this._palInitSelected[0]=i),s&&this._$LV.ojListView("option","data",this._palDataSource)},_initPalette:function(){this._setPaletteBusyContext("Palette (id="+this.element.attr("id")+") is initializing."),this._initData(),this._setup()},_setup:function(){this._$boundElem.append(this._markup),this._$boundElem.addClass("oj-colorpalette"),this._$paletteContainer=this._$boundElem.find(".oj-colorpalette-container"),this._$LV=this._$paletteContainer.find(":first"),this._$LV.attr("data-oj-context",""),this._value&&this._value instanceof s&&(this._initSelection=this._findColorInPalette(this._value)),this._swatchId=0,this._setData(this._palette,this._initSelection,!1),this._$LV.ojListView({data:this._palDataSource,item:{renderer:this._renderer.bind(this)},optionChange:this._onLVOptionChange.bind(this),selectionMode:"single",selection:this._palInitSelected,rootAttributes:{style:"height:100%;width:100%"}}).attr("data-oj-internal","");var t=this;l.getContext(this._$LV[0]).getBusyContext().whenReady().then(function(){if(t._$LV.ojListView("option","translations.msgNoData",""),t._setOptDisabled(t._disabled),t._$LV[0].scrollWidth>t._$LV[0].clientWidth){var e=t._getScrollbarWidth(),i="rtl"===t._GetReadingDirection();t._$LV.css(i?"padding-left":"padding-right",e+1)}t._resolvePaletteBusyContext()})},_initData:function(){var e;this._applyOptions(),this._converterFactory=a.Validation.converterFactory(t.ConverterFactory.CONVERTER_TYPE_COLOR),this._convHex=this._converterFactory.createConverter({format:"hex"}),this._labelNone=this.getTranslatedString("labelNone"),e="grid"===this._layout?"oj-colorpalette-grid oj-listview-card-layout":"oj-colorpalette-list",this._markup=["<div class='oj-colorpalette-container'>","<ul class='"+e+"'/>","</div>"].join("")},_applyOptions:function(){var t,i=this.options;this._doc=this.element[0].ownerDocument,this._body=this._doc.body,this._$boundElem=e(this.element),this._disabled=!1,this._palInitSelected=[],this._palDataSource=null,"string"==typeof(t=i.swatchSize)&&"lg"!==(t=t.toLowerCase())&&"sm"!==t&&"xs"!==t&&(t="lg"),this._swatchSize=t,this._swatchClass="oj-colorpalette-swatchsize-"+t,"string"==typeof(t=i.labelDisplay)&&"auto"!==(t=t.toLowerCase())&&"off"!==t&&(t="auto"),this._labelDisplay=t,"string"==typeof(t=i.layout)&&("grid"!==(t=t.toLowerCase())&&"list"!==t&&(t="grid"),"grid"!==t&&"xs"===this._swatchSize&&(t="grid")),this._layout=t,(t=i.value)instanceof s||(t=null),this._value=t||s.BLACK,t=i.palette,e.isArray(t)||(t=[]),this._palette=t.slice(0),"boolean"==typeof(t=i.disabled)&&(this._disabled=t)},_isTransparent:function(t){var e=t.getRed(),i=t.getGreen(),s=t.getBlue(),a=t.getAlpha();return 0===e&&0===i&&0===s&&0===a},_isPaletteEqual:function(t,e){var i,s,a,o=t.length,l=!1;if(o===e.length){for(a=0;a<o&&(i=t[a],s=e[a],!this._compareColorValues(i.color,s.color)||i.label===s.label);a++);l=a>=o}return l},_addIdsToPalette:function(t){for(var e=t.length,i=0;i<e;i++)t[i].id=this._getNewSwatchId()},_getNewSwatchId:function(){var t=this._swatchId.toString();return this._swatchId+=1,t},_clear:function(){this._converterFactory=null,this._convHex=null,this._markup=null,this._$LV=null},_getScrollbarWidth:function(){var t=e("<div style='overflow: scroll; width: 100px; height: 100px; position: absolute; visibility: hidden;'><div style='width: 100%; height: 100%;'></div></div>");this.element.append(t);var i=t[0].offsetWidth,s=t.children()[0].offsetWidth;return t.remove(),i-s},_GetMessagingLauncherElement:function(){return this.element},_GetContentElement:function(){return this._$LV},_GetElementValue:function(){return this._value},_SetDisplayValue:function(t){t?this._value="string"==typeof t?new s(t):t:(this._value=s.BLACK,o.warn("JET Color Palette (id='"+this.element.attr("id")+"'): Substituting Color.BLACK since display value is not defined."))},_GetDisplayValue:function(){return this._value.toString()},_GetDefaultStyleClass:function(){return"oj-colorpalette"}}),n.extension._WIDGET_NAME="ojColorPalette",t.CustomElementBridge.register("oj-color-palette",{metadata:n})});
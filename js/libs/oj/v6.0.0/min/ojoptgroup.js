/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore"],function(e,t){var o={properties:{disabled:{type:"boolean",value:!1},label:{type:"string"}},methods:{setProperty:{},getProperty:{},refresh:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},extension:{}};function r(e){this.updateDOM=function(){var t=e.element.customOptgroupRenderer;t&&"function"==typeof t&&t(e.element)}}o.properties.customOptgroupRenderer={},o.extension._CONSTRUCTOR=r,e.CustomElementBridge.register("oj-optgroup",{metadata:o})});
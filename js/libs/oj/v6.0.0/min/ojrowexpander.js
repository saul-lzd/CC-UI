/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojdatasource-common"],function(e,t,n){var a={properties:{context:{type:"object"},expanded:{type:"boolean",writeback:!0},translations:{type:"object",value:{},properties:{accessibleLevelDescription:{type:"string"},accessibleRowCollapsed:{type:"string"},accessibleRowDescription:{type:"string"},accessibleRowExpanded:{type:"string"},accessibleStateCollapsed:{type:"string"},accessibleStateExpanded:{type:"string"}}}},methods:{refresh:{},setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojExpand:{},ojCollapse:{}},extension:{}};e.EmptyNodeSet=function(e,t){this.m_parent=e,this.m_start=t},e.EmptyNodeSet.prototype.getParent=function(){return this.m_parent},e.EmptyNodeSet.prototype.getStart=function(){return this.m_start},e.EmptyNodeSet.prototype.getCount=function(){return 0},e.EmptyNodeSet.prototype.getData=function(e){return null},e.EmptyNodeSet.prototype.getMetadata=function(e){return null},e.FlattenedNodeSet=function(e,t){this.m_nodeSet=e,this.m_start=t},e.FlattenedNodeSet.prototype.getParent=function(){return this.m_nodeSet.getParent()},e.FlattenedNodeSet.prototype.getStart=function(){return null!=this.m_start?this.m_start:this.m_nodeSet.getStart()},e.FlattenedNodeSet.prototype.getCount=function(){return void 0===this.m_count&&(this.m_count=this._getCount(this.m_nodeSet,0),null!=this.m_start&&(this.m_count=this.m_count-this.m_start)),this.m_count},e.FlattenedNodeSet.prototype._getCount=function(e,t){var n=t,a=e.getStart(),s=e.getCount();if(n+=s,e.getChildNodeSet)for(var o=0;o<s;o++){var i=e.getChildNodeSet(o+a);null!=i&&(n=this._getCount(i,n))}return n},e.FlattenedNodeSet.prototype.getData=function(e){return this._getDataOrMetadata(this.m_nodeSet,e,{index:this.m_nodeSet.getStart()},this._getData)},e.FlattenedNodeSet.prototype.getMetadata=function(e){return this._getDataOrMetadata(this.m_nodeSet,e,{index:this.m_nodeSet.getStart()},this._getMetadata)},e.FlattenedNodeSet.prototype._getMetadata=function(e,t){return e.getMetadata(t)},e.FlattenedNodeSet.prototype._getData=function(e,t){return e.getData(t)},e.FlattenedNodeSet.prototype._getDataOrMetadata=function(e,t,n,a){for(var s=e.getStart(),o=e.getCount(),i=0;i<o;i++){var r=n.index;if(r===t)return a.call(this,e,i+s);if(n.index=r+1,e.getChildNodeSet){var d=e.getChildNodeSet(i+s);if(null!=d){var l=this._getDataOrMetadata(d,t,n,a);if(null!=l)return l}}}return null},e.MergedNodeSet=function(e,t,n){this.m_nodeSet1=e,this.m_nodeSet2=t,this.m_mergeAt=this._findIndex(n)},e.MergedNodeSet.prototype._findIndex=function(e){for(var t=this.m_nodeSet1.getStart(),n=t+this.m_nodeSet1.getCount(),a=t;a<n;a++){if(e===this.m_nodeSet1.getMetadata(a).key)return a}return n-1},e.MergedNodeSet.prototype.getParent=function(){return this.m_nodeSet1.getParent()},e.MergedNodeSet.prototype.getStart=function(){return this.m_nodeSet1.getStart()},e.MergedNodeSet.prototype.getCount=function(){return this.m_nodeSet1.getCount()+this.m_nodeSet2.getCount()},e.MergedNodeSet.prototype.getData=function(e){var t=this._getRelativeIndex(e),n=t.set,a=t.index;return n.getData(a)},e.MergedNodeSet.prototype.getMetadata=function(e){var t=this._getRelativeIndex(e),n=t.set,a=t.index;return n.getMetadata(a)},e.MergedNodeSet.prototype._getRelativeIndex=function(e){if(e<=this.m_mergeAt)return{set:this.m_nodeSet1,index:e};var t=this.m_nodeSet2.getCount();return e>this.m_mergeAt+t?{set:this.m_nodeSet1,index:e-t}:{set:this.m_nodeSet2,index:e-this.m_mergeAt-1+this.m_nodeSet2.getStart()}},e.NodeSetWrapper=function(e,t,n,a){this.m_nodeSet=e,this.m_callback=t,this.m_range=n,this.m_collapsedKeys=a},e.NodeSetWrapper.prototype.getParent=function(){return this.m_nodeSet.getParent()},e.NodeSetWrapper.prototype.getStart=function(){return null!=this.m_range?this.m_range.start:this.m_nodeSet.getStart()},e.NodeSetWrapper.prototype.getCount=function(){var e=this.m_nodeSet.getStart(),t=this.m_nodeSet.getCount();return null!=this.m_range&&(t=Math.min(this.m_range.count,t),this.m_range.start<e&&(t=0)),t},e.NodeSetWrapper.prototype.getData=function(e){return this.m_nodeSet.getData(this._getRelativeIndex(e))},e.NodeSetWrapper.prototype.getMetadata=function(e){var t=this.m_nodeSet.getMetadata(this._getRelativeIndex(e));t.index=e,t.parentKey=this.getParent();var n=t.key;return this.m_callback.call(null,n,t),t},e.NodeSetWrapper.prototype.getChildNodeSet=function(t){if((null==this.m_collapsedKeys||-1===this.m_collapsedKeys.indexOf(this.m_nodeSet.getMetadata(t).key))&&this.m_nodeSet.getChildNodeSet){var n=this.m_nodeSet.getChildNodeSet(t);if(null!=n)return new e.NodeSetWrapper(n,this.m_callback,null,this.m_collapsedKeys)}return null},e.NodeSetWrapper.prototype._getRelativeIndex=function(e){return null==this.m_range?e:e-this.m_range.start+this.m_nodeSet.getStart()},e.FlattenedTreeDataSource=function(t,n){this.m_wrapped=t,this.m_options=n||{},e.FlattenedTreeDataSource.superclass.constructor.call(this)},e.Object.createSubclass(e.FlattenedTreeDataSource,e.DataSource,"oj.FlattenedTreeDataSource"),e.FlattenedTreeDataSource.prototype.Init=function(){e.FlattenedTreeDataSource.superclass.Init.call(this),this.m_wrapped.on("change",this._handleModelEvent.bind(this)),this.m_busy=!1,this.m_fetchSize=parseInt(this.m_options.fetchSize,10),isNaN(this.m_fetchSize)&&(this.m_fetchSize=25),this.m_maxCount=parseInt(this.m_options.maxCount,10),isNaN(this.m_maxCount)&&(this.m_maxCount=500);var t=this.m_options.expanded;Array.isArray(t)?this.m_expandedKeys=t:("all"===t&&(this.m_collapsedKeys=[]),this.m_expandedKeys=[]),this.m_cache=[]},e.FlattenedTreeDataSource.prototype.handleEvent=function(t,n){return e.FlattenedTreeDataSource.superclass.handleEvent.call(this,t,n)},e.FlattenedTreeDataSource.prototype.Destroy=function(){delete this.m_cache,delete this.m_expandedKeys,delete this.m_collapsedKeys,this.m_queue&&delete this.m_queue,this.m_wrapped.off("change"),this.m_wrapped.Destroy&&this.m_wrapped.Destroy()},e.FlattenedTreeDataSource.prototype.getFetchSize=function(){return this.m_fetchSize},e.FlattenedTreeDataSource.prototype.getMaxCount=function(){return this.m_maxCount},e.FlattenedTreeDataSource.prototype.getExpandedKeys=function(){return this.m_expandedKeys},e.FlattenedTreeDataSource.prototype.getOption=function(e){return null!=this.m_options?this.m_options[e]:null},e.FlattenedTreeDataSource.prototype.getWrappedDataSource=function(){return this.m_wrapped},e.FlattenedTreeDataSource.prototype._getFetchSizeToUse=function(e){var t=this.getFetchSize(),n=this.getMaxCount();return-1===t?-1===e?n:e:-1===e?Math.min(t,n):t},e.FlattenedTreeDataSource.prototype.fetchRows=function(e,t){this.m_busy=!0,this._isExpandAll()?this._fetchRowsFromDescendants(e,t):this._fetchRowsFromChildren(e,t)},e.FlattenedTreeDataSource.prototype._fetchRowsFromChildren=function(t,n){var a;if(t.start>this._getLastIndex()){var s=this._getMaxFetchSize();if(this._getLastIndex()<0)return(a={}).start=t.start,a.count=Math.min(s,t.count),void this.m_wrapped.fetchChildren(null,a,{success:function(e){this._handleFetchSuccess(e,null,0,t,a,0,n)}.bind(this),error:function(e){this._handleFetchError(e,n)}.bind(this)});if(s>0){var o=this._getLastEntry(),i=o.parent,r=this.m_wrapped.getChildCount(i),d=o.index,l=o.depth;if(-1===r||d<r-1){var h=this._getFetchSizeToUse(r);(a={}).start=d+1,a.count=-1===r?Math.min(h,t.count):Math.min(s,Math.min(Math.min(h,t.count),r-a.start)),this.m_wrapped.fetchChildren(i,a,{success:function(e){this._handleFetchSuccess(e,i,l,t,a,r,n)}.bind(this),error:function(e){this._handleFetchError(e,n)}.bind(this)})}else{var c=o.key,p=this.m_wrapped.getChildCount(c);if(!(this._isExpanded(c)&&(-1===p||p>0)?this._fetchFromAncestors(o,l+1,t,n,s):this._fetchFromAncestors(i,l,t,n,s))){var u=new e.EmptyNodeSet(null,t.start);null!=n&&null!=n.success&&n.success.call(null,u),this.m_busy=!1}}return}}this.handleMaxCountReached(t,n),this.m_busy=!1},e.FlattenedTreeDataSource.prototype.moveOK=function(e,t,n){return this.m_wrapped.moveOK(e,t,n)},e.FlattenedTreeDataSource.prototype.move=function(e,t,n,a){this.m_wrapped.move(e,t,n,a)},e.FlattenedTreeDataSource.prototype._getMaxFetchSize=function(){return this.getMaxCount()-(this._getLastIndex()+1)},e.FlattenedTreeDataSource.prototype._handleFetchError=function(e,t){null!=t&&null!=t.error&&t.error.call(null,e),this.m_busy=!1},e.FlattenedTreeDataSource.prototype._handleFetchSuccess=function(t,n,a,s,o,i,r,d){var l=[];this._processNodeSet(t,n,a,l);var h={start:s.start,count:t.getCount()};if(t=new e.NodeSetWrapper(t,this.insertMetadata.bind(this),h),0!==l.length){var c=[];c.push(l);var p={};p.callbacks={success:function(e){this._verifyFetchResults(e,n,a,s,o,i,r,d)}.bind(this),error:function(e){this._handleFetchError(e,r)}.bind(this)},p.nodeSet=t,p.keys=[],this._syncExpandRows(c,p)}else this._verifyFetchResults(t,n,a,s,o,i,r,d)},e.FlattenedTreeDataSource.prototype._verifyFetchResults=function(t,n,a,s,o,i,r,d){var l,h;if(null!=d){var c=d.prevNodeSet;if(null!=c){var p=c.getStart()+c.getCount()-1,u=c.getMetadata(p).key;l=new e.MergedNodeSet(c,t,u)}}if(t.getCount()<s.count&&null!=n&&a>0){var _={};_.start=s.start+t.getCount(),_.count=s.count-t.getCount();var y={};y.prevNodeSet=null==l?t:l,h=this._fetchFromAncestors(n,a,_,r,void 0,y)}else if(t.getCount()>s.count){var g=t.getCount()-s.count;null!=l?(l=new e.NodeSetWrapper(l,this.insertMetadata.bind(this),{start:l.getStart(),count:l.getCount()-g}),this._removeEntry(l.getStart()+l.getCount(),g)):(t=new e.NodeSetWrapper(t,this.insertMetadata.bind(this),{start:t.getStart(),count:t.getCount()-g}),this._removeEntry(t.getStart()+t.getCount(),g))}h||null!=r&&null!=r.success&&r.success.call(null,null==l?t:l),this.m_busy=!1},e.FlattenedTreeDataSource.prototype.getChildCount=function(e){return this.m_wrapped.getChildCount(e)},e.FlattenedTreeDataSource.prototype._fetchFromAncestors=function(e,t,n,a,s,o){var i,r=!1;void 0===s&&(s=this._getMaxFetchSize()),this._isBatchFetching()&&(i={queueOnly:!0});for(var d,l,h,c=this._getFetchSizeToUse(-1),p=this._getLastIndex();p>=0;p--){var u=this._getEntry(p);if((h=u.depth)<t){e=u.parent,d=this.m_wrapped.getChildCount(e);var _=u.index,y=-1===d;if(y||_<d-1){if((l={}).start=_+1,y?(l.count=Math.min(s,Math.max(0,c)),i=void 0):l.count=Math.min(s,Math.min(c,d-l.start)),0===l.count)break;this.m_wrapped.fetchChildren(e,l,{success:function(e,t,s,i,r){this._handleFetchSuccess(r,e,t,n,s,i,a,o)}.bind(this,e,h,l,d),error:function(e){this._handleFetchError(e,a)}.bind(this)},i),r=!0;break}t-=1}}return null!=i&&(this.m_wrapped.fetchChildren(e,{start:n.count,count:0},{success:function(t){this._handleFetchSuccess(t,e,h,n,l,d,a,o)}.bind(this),error:function(e){this._handleFetchError(e,a)}.bind(this)}),r=!0),r},e.FlattenedTreeDataSource.prototype._processNodeSet=function(e,t,n,a){for(var s=e.getStart(),o=e.getCount(),i=0;i<o;i++){var r=e.getMetadata(s+i).key;this._addEntry(r,n,s+i,t),this._isExpanded(r)&&a.push(r)}},e.FlattenedTreeDataSource.prototype.insertMetadata=function(e,t){this._isExpanded(e)&&!t.leaf?t.state="expanded":t.leaf?t.state="leaf":t.state="collapsed"},e.FlattenedTreeDataSource.prototype._fetchRowsFromDescendants=function(e,t){var n={maxCount:this.getMaxCount()};this._getLastIndex()>=0&&(n.start=this._getEntry(this._getLastIndex()).key),this.m_wrapped.fetchDescendants(null,{success:function(n){this._handleFetchDescendantsSuccess(n,e,t)}.bind(this),error:function(e){this._handleFetchError(e,t)}.bind(this)},n)},e.FlattenedTreeDataSource.prototype.getSortCriteria=function(){return this.m_wrapped.getSortCriteria()},e.FlattenedTreeDataSource.prototype._handleFetchDescendantsSuccess=function(t,n,a){var s,o,i=t;if(n.start>this._getLastIndex()){var r=this._getMaxFetchSize(),d=Math.min(r,n.count);if(i=new e.NodeSetWrapper(i,this.insertMetadata.bind(this),null,this.m_collapsedKeys),this._getLastIndex()>=0){var l=this._getLastEntry();s={index:0,found:!1,count:0},this._processDescendantsNodeSet(i,null,0,l,d,s),o=s.index+1}else s={count:0},this._processDescendantsNodeSet(i,null,0,null,d,s),o=0;null!=a&&null!=a.success&&(i=null!=s?0===s.count?new e.EmptyNodeSet(null,n.start):new e.FlattenedNodeSet(i,o):new e.FlattenedNodeSet(i),a.success.call(null,i))}else this.handleMaxCountReached(n,a);this.m_busy=!1,this._processQueue()},e.FlattenedTreeDataSource.prototype._processDescendantsNodeSet=function(e,t,n,a,s,o){for(var i=e.getStart(),r=e.getCount(),d=0;d<r;d++){if(o.count===s)return;var l=e.getMetadata(i+d),h=l.key;if(o.checkDepth&&a.depth===n&&(o.found=!0,o.checkDepth=!1),(null==a||o.found)&&(this._addEntry(h,n,i+d,t),o.count+=1,l.leaf?l.state="leaf":l.state="expanded"),null==a||o.found||(h===a.key?l.leaf||this._isExpanded(h)?o.found=!0:o.checkDepth=!0:o.index+=1),e.getChildNodeSet&&this._isExpanded(h)){var c=e.getChildNodeSet(d);null!=c&&this._processDescendantsNodeSet(c,h,n+1,a,s,o)}}},e.FlattenedTreeDataSource.prototype.expand=function(e){this._expand(e)},e.FlattenedTreeDataSource.prototype._expand=function(t,n){this.m_busy=!0;var a=this.m_wrapped.getChildCount(t),s=this._getFetchSizeToUse(a),o=this.getMaxCount();if(this._getLastIndex()+1===o&&this.getIndex(t)===o-1)return void this.handleExpandSuccess(t,new e.EmptyNodeSet(t,0),0,n);0!==s?this.m_wrapped.fetchChildren(t,{start:0,count:s},{success:function(e){this.handleExpandSuccess(t,e,a,n)}.bind(this),error:function(e){this.handleExpandError(t,e)}.bind(this)}):this.handleExpandSuccess(t,new e.EmptyNodeSet(t,0),0,n)},e.FlattenedTreeDataSource.prototype._processQueue=function(){if(this.m_queue&&this.m_queue.length>0){for(var e=this.m_queue.length-1;e>=0;e--){var t=this.m_queue[e];this.collapse(t.key)}this.m_queue.length=0}},e.FlattenedTreeDataSource.prototype._queueOp=function(e,t){null==this.m_queue&&(this.m_queue=[]),this.m_queue.push({op:e,key:t})},e.FlattenedTreeDataSource.prototype.collapse=function(e){if(this.m_busy)this._queueOp("collapse",e);else{var t=this.getIndex(e)+1,n=this._getEntry(t-1);if(null!=n){for(var a=0,s=n.depth,o=this._getLastIndex(),i=t;i<o+1;i++){var r=this._getEntry(i).depth;if(r>s)a+=1;else if(r===s)break}if(0!==a){this._isExpandAll()?this.m_collapsedKeys.push(e):this._removeExpanded(e);for(var d=[],l=0;l<a;l++)d.push({key:this._getEntry(t+l).key,index:t+l});this._removeEntry(t,a),this.removeRows(d),this.handleEvent("collapse",{rowKey:e})}else this.handleEvent("collapse",{rowKey:e})}}},e.FlattenedTreeDataSource.prototype._isExpanded=function(e){return this._isExpandAll()?!(this.m_collapsedKeys&&this.m_collapsedKeys.length>0)||-1===this._getCollapsedKeyIndex(e):!!(this.m_expandedKeys&&this.m_expandedKeys.length>0)&&this._getExpandedKeyIndex(e)>-1},e.FlattenedTreeDataSource.prototype._getCollapsedKeyIndex=function(e){return this._getKeyIndex(this.m_collapsedKeys,e)},e.FlattenedTreeDataSource.prototype._getExpandedKeyIndex=function(e){return this._getKeyIndex(this.m_expandedKeys,e)},e.FlattenedTreeDataSource.prototype._getKeyIndex=function(e,t){for(var n=-1,a=0;a<e.length;a++)e[a]===t&&(n=a);return n},e.FlattenedTreeDataSource.prototype._removeExpanded=function(e){var t=this._getExpandedKeyIndex(e);t>-1&&this.m_expandedKeys.splice(t,1)},e.FlattenedTreeDataSource.prototype._removeCollapsed=function(e){var t=this._getCollapsedKeyIndex(e);t>-1&&this.m_collapsedKeys.splice(t,1)},e.FlattenedTreeDataSource.prototype.handleExpandError=function(e,t){this.handleEvent("expand",{rowKey:e})},e.FlattenedTreeDataSource.prototype.handleExpandSuccess=function(t,n,a,s){var o,i;n=new e.NodeSetWrapper(n,this.insertMetadata.bind(this));for(var r=this.getIndex(t)+1,d=r,l=n.getStart(),h=n.getCount(),c=this._getEntry(r-1),p=c.depth+1,u=[],_=l;_<h;_++){var y=n.getMetadata(_),g=y.key;this._isExpanded(g)&&u.push(g),this._insertRow(r,y,c.key,_,p),r+=1}if(this._isExpandAll()?this._removeCollapsed(t):-1===this.m_expandedKeys.indexOf(t)&&this.m_expandedKeys.push(t),null!=s&&(o=s.queue,i=s.prevNodeSetInfo),null!=i&&(n=new e.MergedNodeSet(i.nodeSet,n,t)),0===u.length&&(void 0===o||0===o.length)){if(null!=i){var f=i.callbacks;if(null!=f)return f.success.call(null,n),void(this.m_busy=!1);this.insertRows(i.firstIndex,i.firstKey,n)}else this.insertRows(d,t,n);var m=this.getMaxCount();if(-1===a&&h===this.getFetchSize()||a>h||r===m?this._deleteAllRowsBelow(r):this._getLastIndex()>=m&&this._deleteAllRowsBelow(m),null!=i)for(var S=0;S<i.keys.length;S++)this.handleEvent("expand",{rowKey:i.keys[S]});this.m_busy=!1,this.handleEvent("expand",{rowKey:t})}else void 0===o&&(o=[]),u.length>0&&o.push(u),void 0===i&&((i={}).firstIndex=d,i.firstKey=t,i.keys=[]),i.nodeSet=n,i.keys.push(t),this._syncExpandRows(o,i);this.m_busy=!1,o&&0===o.length&&this._processQueue()},e.FlattenedTreeDataSource.prototype._syncExpandRows=function(e,t){var n=e[e.length-1],a=n.shift();0===n.length&&e.pop(),this._expand(a,{prevNodeSetInfo:t,queue:e})},e.FlattenedTreeDataSource.prototype._expandRows=function(e){var t;this._isBatchFetching()&&(t={queueOnly:!0});for(var n=0;n<e.length;n++)n===e.length-1?this._expand(e[n]):this._expand(e[n],t)},e.FlattenedTreeDataSource.prototype._insertRow=function(e,t,n,a,s){var o=t.key;e<=this._getLastIndex()?this._addEntry(o,s,a,n,e):this._addEntry(o,s,a,n)},e.FlattenedTreeDataSource.prototype._deleteAllRowsBelow=function(e,t){var n=t;null==t&&(n=this._getLastIndex()+1-e);for(var a=[],s=0;s<n;s++)a.push({key:this._getEntry(e+s).key,index:e+s});this._removeEntry(e,n),this.removeRows(a)},e.FlattenedTreeDataSource.prototype._handleModelEvent=function(e){var t,n=e.operation,a=e.parent;t=Array.isArray(a)?a[a.length-1]:a;var s=e.index;"insert"===n?this._handleInsertEvent(t,s,e.data):"delete"===n?this._handleDeleteEvent(t,s):"refresh"===n&&this._handleRefreshEvent(t)},e.FlattenedTreeDataSource.prototype._handleInsertEvent=function(e,t,n){var a=this.getIndex(e),s=this._getEntry(a).depth+1,o=a+t+1,i=n.getMetadata(n.getStart());this._insertRow(o,i,e,t,s)},e.FlattenedTreeDataSource.prototype._handleDeleteEvent=function(t,n){var a=this.getIndex(t),s=this._getEntry(a),o=a+n,i=this._getEntry(o);e.Assert.assert(i.parent===s&&i.depth===s.depth+1);for(var r=o+1,d=this._getLastIndex();r<=d;){if(this._getEntry(r).depth!==i.depth)break;r+=1}this._deleteAllRowsBelow(o,1)},e.FlattenedTreeDataSource.prototype._handleRefreshEvent=function(e){null==e&&this.refresh()},e.FlattenedTreeDataSource.prototype._isExpandAll=function(){var e=this.m_wrapped.getCapability("fetchDescendants");return null!=this.m_collapsedKeys&&null!=e&&"disable"!==e},e.FlattenedTreeDataSource.prototype._isBatchFetching=function(){return"enable"===this.m_wrapped.getCapability("batchFetch")},e.FlattenedTreeDataSource.prototype.refresh=function(){this._clearAll()},e.FlattenedTreeDataSource.prototype.getIndex=function(e){for(var t=this._getLastIndex(),n=0;n<=t;n++){if(this._getEntry(n).key===e)return n}return-1},e.FlattenedTreeDataSource.prototype.getKey=function(e){return e<0||e>this._getLastIndex()?null:this._getEntry(e).key},e.FlattenedTreeDataSource.prototype.getFetchedRange=function(){return{start:0,end:this._getLastIndex()+1}},e.FlattenedTreeDataSource.prototype.getAncestors=function(e){for(var t=[],n=this.getIndex(e),a=this._getParent(n);null!=a;)t.push(a),n=this.getIndex(a),a=this._getParent(n);return t.reverse()},e.FlattenedTreeDataSource.prototype.handleMaxCountReached=function(e,t){null!=t&&null!=t.error&&t.error.call(null)},e.FlattenedTreeDataSource.prototype.insertRows=function(t,n,a){e.Assert.failedInAbstractFunction()},e.FlattenedTreeDataSource.prototype.removeRows=function(t){e.Assert.failedInAbstractFunction()},e.FlattenedTreeDataSource.prototype._getLastIndex=function(){return this.m_cache.length-1},e.FlattenedTreeDataSource.prototype._getLastEntry=function(){return this.m_cache[this._getLastIndex()]},e.FlattenedTreeDataSource.prototype._getEntry=function(e){return this.m_cache[e]},e.FlattenedTreeDataSource.prototype._getParent=function(e){var t=this.m_cache[e];return null!=t?t.parent:null},e.FlattenedTreeDataSource.prototype._addEntry=function(e,t,n,a,s){var o={};o.key=e,o.depth=t,o.index=n,o.parent=a,void 0===s?this.m_cache.push(o):this.m_cache.splice(s,0,o)},e.FlattenedTreeDataSource.prototype._removeEntry=function(e,t){this.m_cache.splice(e,t)},e.FlattenedTreeDataSource.prototype._clearAll=function(){this.m_cache.length=0},e.FlattenedTreeDataSource.prototype.getCapability=function(e){return this.m_wrapped.getCapability(e)},e.__registerWidget("oj.ojRowExpander",t.oj.baseComponent,{version:"1.0.0",widgetEventPrefix:"oj",options:{context:null,expanded:null,expand:null,collapse:null},classNames:{root:"oj-rowexpander",icon:"oj-component-icon",clickable:"oj-clickable-icon-nocontext",expand:"oj-rowexpander-expand-icon",collapse:"oj-rowexpander-collapse-icon",leaf:"oj-rowexpander-leaf-icon",lazyload:"oj-rowexpander-lazyload-icon",toucharea:"oj-rowexpander-touch-area",indent:"oj-rowexpander-indent",iconspacer:"oj-rowexpander-icon-spacer",depth0:"oj-rowexpander-depth-0",depth1:"oj-rowexpander-depth-1",depth2:"oj-rowexpander-depth-2",depth3:"oj-rowexpander-depth-3",depth4:"oj-rowexpander-depth-4",depth5:"oj-rowexpander-depth-5",depth6:"oj-rowexpander-depth-6",depth7:"oj-rowexpander-depth-7"},constants:{MAX_STYLE_DEPTH:7,NUM5_KEY:53},_ComponentCreate:function(){this._super(),this.element.addClass(this.classNames.root),this._initContent()},_initContent:function(){var e=this,a=this.options.context;if(null!=a.component)this.component="function"==typeof a.component?a.component("instance"):a.component;else if(a.componentElement){var s=a.componentElement;s=t(s).hasClass("oj-component-initnode")?s:t(s).find(".oj-component-initnode")[0],this.component=n.__GetWidgetConstructor(s)("instance")}this.datasource=a.datasource,this.depth=a.depth,this.iconState=a.state,this.rowKey=a.key,this.index=a.index,this.parentKey=a.parentKey,this._addIndentation(),this._addIcon(),this._setIconStateClass(),"expanded"===this.iconState||"collapsed"===this.iconState?(t(this.toucharea).on("touchend",function(t){t.preventDefault(),e._fireExpandCollapse()}),t(this.toucharea).on("click",function(t){t.preventDefault(),e._fireExpandCollapse()}),t(this.element).on("keypress",function(n){var a=n.keyCode||n.which;a!==t.ui.keyCode.ENTER&&a!==t.ui.keyCode.SPACE||(e._fireExpandCollapse(),n.preventDefault(),n.target.focus())}),this.handleKeyDownCallback=this._handleKeyDownEvent.bind(this),this.component.element.get(0).addEventListener("keydown",this.handleKeyDownCallback,!0),this.handleExpandCallback=this._handleExpandEvent.bind(this),this.handleCollapseCallback=this._handleCollapseEvent.bind(this),this.datasource.on("expand",this.handleExpandCallback,this),this.datasource.on("collapse",this.handleCollapseCallback,this),this._initExpanded()):"leaf"===this.iconState&&(this.handleKeyDownCallback=this._handleKeyDownEvent.bind(this),this.component.element.get(0).addEventListener("keydown",this.handleKeyDownCallback,!0),t(this.icon).attr("tabindex",-1)),this.handleActiveKeyChangeCallback=this._handleActiveKeyChangeEvent.bind(this),this.component._IsCustomElement()?t(this.component.element).on("ojBeforeCurrentCell",this.handleActiveKeyChangeCallback):t(this.component.element).on("ojbeforecurrentcell",this.handleActiveKeyChangeCallback)},_initExpanded:function(){var e=this.options.expanded;null!=e?e&&"collapsed"===this.iconState?this._expand():e||"expanded"!==this.iconState||this._collapse():this.options.expanded="collapsed"!==this.iconState},refresh:function(){this.element.empty(),this._initContent()},_destroy:function(){this.component.element.get(0).removeEventListener("ojkeydown",this.handleKeyDownCallback,!0),t(this.component.element).off("ojbeforecurrentcell",this.handleActiveKeyChangeCallback),this.datasource.off("expand",this.handleExpandCallback,this),this.datasource.off("collapse",this.handleCollapseCallback,this),this.element.removeClass(this.classNames.root),this.element.empty()},_expand:function(){return"collapsed"===this.iconState&&(this._loading(),this.datasource.expand(this.rowKey),!0)},_collapse:function(){return"expanded"===this.iconState&&(this._loading(),this.datasource.collapse(this.rowKey),!0)},_setOption:function(e,t,n){"expanded"!==e||null!=n._context&&!0===n._context.internalSet?(this._super(e,t,n),"context"===e&&null!=n._context&&!0!==n._context.internalSet&&this.refresh()):t?this._expand():this._collapse()},_addIndentation:function(){var e=this.depth-1;if(e<this.constants.MAX_STYLE_DEPTH)this._appendSpacer(e);else{for(var t=1;t<=e/this.constants.MAX_STYLE_DEPTH;t++)this._appendSpacer(this.constants.MAX_STYLE_DEPTH);var n=e%this.constants.MAX_STYLE_DEPTH;n<this.constants.MAX_STYLE_DEPTH&&this._appendSpacer(n)}},_appendSpacer:function(e){var n=t(document.createElement("span")).addClass(this.classNames.indent).addClass(this.classNames["depth"+e]);this.element.append(n)},_addIcon:function(){var e=t(document.createElement("div")).addClass(this.classNames.iconspacer);this.toucharea=t(document.createElement("div")).addClass(this.classNames.toucharea),this.icon=t(document.createElement("a")).attr("href","#").attr("aria-labelledby",this._getLabelledBy()).addClass(this.classNames.icon).addClass(this.classNames.clickable).attr("aria-label",this.getTranslatedString("accessibleLevelDescription",{level:this.depth})),this.element.append(e.append(this.toucharea.append(this.icon)));this._focusable({element:this.icon,applyHighlight:!0})},_addIconClass:function(e){this.icon.addClass(this.classNames[e])},_removeIconClass:function(e){this.icon.removeClass(this.classNames[e])},_setIconStateClass:function(){switch(this.iconState){case"leaf":this._removeIconClass("icon"),this._removeIconClass("clickable"),this._addIconClass("leaf");break;case"collapsed":this._addIconClass("expand"),this._ariaExpanded(!1);break;case"expanded":this._addIconClass("collapse"),this._ariaExpanded(!0);break;case"loading":this._removeIconClass("clickable"),this._addIconClass("lazyload")}},_removeIconStateClass:function(){switch(this.iconState){case"leaf":this._removeIconClass("leaf"),this._addIconClass("icon"),this._addIconClass("clickable");break;case"collapsed":this._removeIconClass("expand");break;case"expanded":this._removeIconClass("collapse");break;case"loading":this._removeIconClass("lazyload"),this._addIconClass("clickable")}},_handleActiveKeyChangeEvent:function(e,t){var n;if(null==t&&(t=e.detail),null!=t.currentCell){var a="cell"===t.currentCell.type?t.currentCell.keys.row:t.currentCell.key;if(null!=t.previousValue&&(n="cell"===t.previousCurrentCell.type?t.previousCurrentCell.keys.row:t.previousCurrentCell.key),this.rowKey===a&&n!==a&&this.component._setAccessibleContext){var s,o=this.getTranslatedString("accessibleRowDescription",{level:this.depth,num:this.index+1,total:this.datasource.getWrappedDataSource().getChildCount(this.parentKey)});s="collapsed"===this.iconState?this.getTranslatedString("accessibleStateCollapsed"):"expanded"===this.iconState?this.getTranslatedString("accessibleStateExpanded"):"",this.component._setAccessibleContext({context:o,state:s})}}},_handleKeyDownEvent:function(a){var s=n.__GetWidgetConstructor(this.component.element.get(0))("getContextByNode",a.target);if(null!=s){var o=s.key;if(null==o&&(o=s.keys.row),this.rowKey===o){var i=a.keyCode||a.which;if(e.DomUtils.isMetaKeyPressed(a))if(i===t.ui.keyCode.RIGHT)this._expand()&&a.preventDefault();else if(i===t.ui.keyCode.LEFT)this._collapse()&&a.preventDefault();else if(a.altKey&&i===this.constants.NUM5_KEY&&this.component._setAccessibleContext){var r,d=this.datasource.getAncestors(this.rowKey);if(null!=d&&d.length>0){r=[];for(var l=0;l<d.length;l++)r.push({key:d[l],label:this.getTranslatedString("accessibleLevelDescription",{level:l+1})})}var h=this.getTranslatedString("accessibleRowDescription",{level:this.depth,num:this.index+1,total:this.datasource.getWrappedDataSource().getChildCount(this.parentKey)});this.component._setAccessibleContext({context:h,state:"",ancestors:r})}}}},_loading:function(){this._removeIconStateClass(),this.iconState="loading",this._setIconStateClass()},_handleExpandEvent:function(e){var t=e.rowKey;if(t===this.rowKey){this._removeIconStateClass(),this.iconState="expanded",this._setIconStateClass(),this._ariaExpanded(!0),this._updateContextState("expanded");var n=this.options.expanded;(null==n||null!=n&&!n)&&(this._trigger("expand",null,{rowKey:t}),this._updateExpandedState(!0))}},_handleCollapseEvent:function(e){var t=e.rowKey;if(t===this.rowKey){this._removeIconStateClass(),this.iconState="collapsed",this._setIconStateClass(),this._ariaExpanded(!1),this._updateContextState("collapsed");var n=this.options.expanded;(null==n||null!=n&&n)&&(this._trigger("collapse",null,{rowKey:t}),this._updateExpandedState(!1))}},_updateExpandedState:function(e){this.option("expanded",e,{changed:!0,_context:{internalSet:!0,writeback:!0}})},_updateContextState:function(e){var t=this.options.context;t.state=e,this.option("context",t,{changed:!0,_context:{internalSet:!0}})},_fireExpandCollapse:function(){var e=this.iconState;this._loading(),"collapsed"===e?this.datasource.expand(this.rowKey):"expanded"===e&&this.datasource.collapse(this.rowKey)},_ariaExpanded:function(e){this.icon.attr("aria-expanded",e)},getNodeBySubId:function(e){if(null==e)return this.element?this.element[0]:null;var t=e.subId;return"oj-rowexpander-disclosure"!==t&&"oj-rowexpander-icon"!==t||null==this.icon?null:this.icon.get(0)},getSubIdByNode:function(e){return e===this.icon.get(0)?{subId:"oj-rowexpander-disclosure"}:null},_NotifyAttached:function(){this._super(),this.icon.attr("aria-labelledby",this._getLabelledBy())},_getLabelledBy:function(){return this.element.parent().closest("[id]").attr("id")}}),a.extension._WIDGET_NAME="ojRowExpander",e.CustomElementBridge.register("oj-row-expander",{metadata:a})});
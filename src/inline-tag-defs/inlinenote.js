"use strict";
var INLINE_NOTE = /(primary|danger|warning|success)?(?:\s*?<([\S]+\ |[\S\s]+?)>\s+([\S\s]+))/;
var encoder = new require('node-html-encoder').Encoder();

/**
 * @dgService typeInlineTagDef
 * @description
 * Replace with markup that displays a nice type
 */
module.exports = function noteInlineTagDef(getTypeClass) {
  return {
    name: 'note',
    handler: function(doc, tagName, tagDescription) {
    	return tagDescription.replace(INLINE_NOTE,function(match,type,label,description){
    		var note = {
    			type:type?type:'primary',
    			text:description?description:(label?label:type),
    			label:description?label:(label?type:'NOTE')
    		};
    		return '<span><span class="uk-badge uk-badge-'+note.type+'"> '+note.label+'</span>'+note.text+'<span>';
    	})
    }
  };
};
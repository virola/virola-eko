( function () {
    /**
     * HTML5标签在IE6下的兼容
     */
    var list, els, i;
    if(!/*@cc_on!@*/0) { // 激活IE下条件编译语句
        return;
    }

    list = "abbr,article,aside,audio,canvas,command,datalist,details,embed,figcaption,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video";
    els = list.split( ',' );
    i = els.length;
    while ( i-- ) { 
        document.createElement(els[i]);
    }
} )();
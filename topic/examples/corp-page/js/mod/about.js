"use strict";honey.def("lib:jquery",function(t){t.aboutMG=function(){$("div[node-type=corporate]").rollbar({zIndex:100,pathPadding:0,pathPaddingL:0});var t={matchEvent:function(){var t=$("#sc_list"),i=t.find("li").length,e=t.find("li").outerWidth();t.css({width:i*e+"px"})},setwidth:function(){},bar:function(){},init:function(){var t=this,i=$("body").width(),e=($("div[node-type=drag_box]"),$("ul[node-type=drag_list]")),n=$("a[action-type=next]"),o=$("a[action-type=prev]"),d=$("span[node-type=page_next]"),r=$("span[node-type=page_prev]");t.matchEvent();var s=scrollBar({direction:"x",range:10,mod:"mod_top_sc",con:"sc_list",bar:"scroll_bar",btn:"scroll_btn"}),a=$("li",e).outerWidth(),c=e.children("li").length,h=(Math.floor(i/a),1),l=200,f=parseInt(e.css("left")),g=0;e.on("mouseenter","li",function(){var t=$(this).index()+1;g=$(this).position().left,r.html(t)}),r.html(h),d.html(c),o.on("click",function(t){t.preventDefault(),f=parseInt(e.css("left")),f>=0?l=0:(l-=200,h-=1),s.scrollTo(l)}),n.on("click",function(t){t.preventDefault();var i=c*a,n=i-$("body").width();f=parseInt(e.css("left")),-n>=f?l=n:(l+=200,h+=1),s.scrollTo(l)})}};t.init(),$(window).resize(function(){t.init()});var i=function(t){{var i,e=!1;t.main.width(),t.drag.width(),t.main.height(),t.drag.height(),t.drag}t.main.mousedown(function(t){return e=!0,i=t.clientX-this.offsetLeft,!1}),t.main.mousemove(function(t){if(e){$("#imgDarg").stop();var t=t||window.event,n=t.clientX-i,o=$("body").width();return 0>n?$("#imgDarg").animate({scrollLeft:o},1500):n>0&&$("#imgDarg").animate({scrollLeft:-o},1500),!1}}),$(document).mouseup(function(){e=!1})};i({drag:$("#imgDarg"),main:$("#section6")});var e=function(t){var i,e=!1,n=$("body").width(),o=(t.drag.width(),$("li",t.drag).width()),d=t.drag.children("li").length,r=o*d+100,s=n-r,a=(t.main.height(),t.drag.height(),t.drag),c=0,h=$("body").width(),l=h-r>=0?0:h-r;$("#timeList").css({width:$("body").width()-100}),t.drag.css("left",l),t.drag.css("width",o*d),t.drag.mousedown(function(t){return e=!0,i=t.clientX-this.offsetLeft,!1}),t.main.mousemove(function(t){if(e){var t=t||window.event;return c=t.clientX-i,a.css(c>0?{left:"0px"}:s>c?{left:s+"px"}:{left:c+"px"}),!1}}),$(document).mouseup(function(){e=!1})};e({drag:$("ul[node-type=timeline]"),main:$("#timeList")}),$(window).resize(function(){e({drag:$("ul[node-type=timeline]"),main:$("#timeList")})});var n=$("body").height();680>n?$("div[node-type=time-scr]").css("height",300):720>n?$("div[node-type=time-scr]").css("height",400):$("div[node-type=time-scr]").css("height",540),$("ul[node-type=drag_list] li").hover(function(){$(this).find("div[node-type=time-scr]").css("overflow-y","auto")},function(){$(this).find("div[node-type=time-scr]").css("overflow-y","hidden")});var o=.65*$("body").height()/2-60;$("#leaders div").css("height",o),$(window).resize(function(){var t=.65*$("body").height()/2-60;$("#leaders div").css("height",t);var i=$("body").height();680>i?$("div[node-type=time-scr]").css("height",300):720>i?$("div[node-type=time-scr]").css("height",400):$("div[node-type=time-scr]").css("height",540)})}});
$(function(){$("#open").on("click",function(){$(this).hide(),$("#close").show(),$("#nav").fadeIn()}),$("#close").on("click",function(){$(this).hide(),$("#open").show(),$("#nav").fadeOut()}),$("ul[node-type=qiye_list] li").click(function(){$("#close").trigger("click")}),$("#nav ul li a").wrapInner("span"),$("#nav ul li a").attr("data-navlink",function(){return $(this).children("span").html()}),$("#nav h2").each(function(){0!=$(this).next("ul").length&&$(this).addClass("parent")}),$(".timeline").on("mouseleave","li",function(){$(this).children(".time_scr,p").stop(),$(this).children(".time_scr,p").hide()}),$(".timeline").on("mouseenter","li",function(){$(this).children(".time_scr,p").stop(),$(this).siblings("li").children(".time_scr,p").hide(),$(this).children(".time_scr,p").fadeIn("slow")}),$("ul[node-type=timeline] li").first().addClass("first"),$(".leader-details h3,.leader-details .content").css("display","none"),$("#leaders").on("click","li a",function(e){e.preventDefault();var t=$(this).index("#leaders li a");$(".leader-details").show("slow"),$(".leader-details h3").eq(t).css("display","block"),$(".leader-details .content").eq(t).css("display","block")}),$("#back a").on("click",function(e){e.preventDefault(),$(".leader-details").hide("slow"),$(".leader-details h3,.leader-details .content").css("display","none")}),$(".imp-content ul:even li:odd").addClass("arr-left"),$(".imp-content ul:odd li:even").addClass("arr-right"),$("#goto_join").on("click",function(e){e.preventDefault();var t=$("body").height()+75;$("body,html").animate({scrollTop:t},500),$(this).hide(),$("#logo").hide()}),$("#goup").on("click",function(){$("#goto_join").show(),$("#logo").show()});var e=!1;$(".toggle").on("click",function(){0==e?($(".banner .item").show(),e=!0):($(".banner .item").hide(),e=!1)}),$("#table-list").on("click",".show-job",function(){var e=$(this).parent("td").hasClass("fold");e?($(this).parent("td").removeClass("fold").addClass("collapse"),$(this).parent("td").parent("tr").next("tr").show()):($(this).parent("td").removeClass("collapse").addClass("fold"),$(this).parent("td").parent("tr").next("tr").hide())}),$(".th-list li").on("click",function(){$(".th-list li").removeClass("current"),$(this).addClass("current");var e=$(this).index();$(".item-list").hide().eq(e).show()}),$(".unlist li").on("click",function(){var e=$(this).index();$(".union ul").hide().eq(e).show()}),$(".top li,.bot li").hover(function(){$(this).children(".content").fadeIn()},function(){$(this).children(".content").fadeOut()});parseInt($(".abt-block").height());$(".item-list li:odd").addClass("even");$("ul[node-type=at-list]").on("mouseleave","li",function(e){e.preventDefault(),$(this).removeClass("odd")}),$("ul[node-type=at-list]").on("mouseenter","li",function(e){e.preventDefault(),$(this).addClass("odd")})});
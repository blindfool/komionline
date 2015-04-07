(function(document, window, $, undefined){
'use strict';

// #jquery #polyfill
/* debounce dummy */
if ($.debounce === undefined) {
	$.debounce = function(delay, callback){
		callback.call(this);
	};
}
/* binding fastclick */
if (window.FastClick !== undefined) {
	$(window).on("load", function(e){
		FastClick.attach(document.body);
	});
}

// #jquery #helper
/* image loader helper */
$.fn._imageLoader = function(src, callbackFn) {
	var t = this,
		img = new Image();

	img.onload = function(){
		//console.log(this.width, this.height, this.naturalWidth, this.naturalHeight);
		callbackFn.call(t, {
			aRatio: this.width / this.height
		});
	};

	img.src = src;
};



// #sys #preparings
var $w = $(window),
	$d = $(document),
	$html = $("html"),
	$head = $("head"),
	$b = $("body"),
	$h = $(".header");

$html.removeClass("no-js").addClass("js");
var sniffBrowser = function(){
	var u = navigator.userAgent.toLowerCase(),
		is = function(t){return (u.indexOf(t)!=-1)};

	$html.addClass([
		(!(/opera|webtv/i.test(u))&&/msie (\d)/.test(u))?('ie ie'+RegExp.$1)
			:is('firefox/2')?'gecko ff2'
			:is('firefox/3')?'gecko ff3'
			:is('gecko/')?'gecko'
			:is('opera/9')?'opera opera9':/opera (\d)/.test(u)?'opera opera'+RegExp.$1
			:is('konqueror')?'konqueror'
			:is('chrome')?'chrome'
			:is('chromium')?'chrome'
			:is('applewebkit/')?'webkit safari'
			:is('mozilla/')?'gecko':'',
		(is('x11')||is('linux'))?' linux'
			:is('mac')?' mac'
			:is('win')?' win':''
	].join(''));
}();

//console.log($.debounce);
$(function(){
	// #chaining #events
	$w.on("resize orientationchange load scroll focus blur touchend", function(e) {
		//console.log(e.type);
		e.stopPropagation();
		// e.preventDefault();

		$d.triggerHandler(e.type);
	});
	$d.on({
		load: function(e){
			$d.triggerHandler("resize");
			$d.triggerHandler("scroll");
		},
		focus: function(e){
			$d.triggerHandler("resize");
		},
		blur: function(e){
			$d.triggerHandler("resize");
		},
		orientationchange: function(e) {
			// setTimeout(function(){
			// 	$d.trigger("resizeinstantly");
			// }, 100);
			$d.trigger("resize");
		},
		resize: $.debounce(30, function(){
			$d.triggerHandler("resizeinstantly");
		})//,
		//resizeinstantly: function(e){
		//	console.log(e.type);
		//},
		//scroll: function(e){
		//	console.log(e.type);
		//}
	});

	// #media #ie #stylesheet
	function isStylesheetExists(url) {
		var isExists = false;
		$.each(document.styleSheets, function(i, v){
			if (v.href !== null && v.href.indexOf(url) >= 0) {
				isExists = true;
			}
		});
		return isExists;
	}
	function addStylesheet(url, callback) {
		var link = document.createElement('link');
		link.onload = function(){
			var sheet;
			$.each(document.styleSheets, function(i, v){
				if (v.href !== null && v.href.indexOf(url)>=0) {
					sheet = v;
				}
			});
			callback.call(link, sheet);
		};
		link.rel   = "stylesheet";
		link.type  = 'text/css';
	    link.media = "all";
	    link.href  = url;

		$("head").append(link);
	}
	function appendStylesheet(v) {
		var url = 'css/main.gte' + v.width + '.css',
			sheet;
		if (!isStylesheetExists(url)) {
			addStylesheet(url, function(sheet){
				v.sheet = sheet;
				v.loaded = true;
			});
		}
	}
	$html.filter(".ie6,.ie7,.ie8").each(function(){
		var points = [{width:768}, {width:1000}],
			loadedSheets = 0;

		$.each(points, function(i, v){
			v.loaded = false;
			appendStylesheet(v, function(){
				loadedSheets++;
				if (loadedSheets == points.length) {
					$d.triggerHandler("resizeinstantly.media");
					// setTimeout(function(){
					// 	$d.triggerHandler("resizeinstantly.media");
					// }, 1000); //dirty
				}
			});
		});

		$d.on("resizeinstantly.media", function(e){
			var ww = $w.width();

			$.each(points, function(i, v){
				if (v.sheet !== undefined) {
					v.sheet.disabled = ww < v.width;
				}
			});
		});
	});

	// #header #styling
	$d.on("scroll", function(){
		var $t = $(this),
			sT = $t.scrollTop();
		$h[sT > 0 ? "addClass" : "removeClass"]("header--scrolled");
	});

	$d.on("resizeinstantly.checktowering", function(e){
		var dH = $w.height(),
			sH = $h[0].scrollHeight,
			isActive = $h.is(".active");

		$html.removeClass("header-towering");

		if (isActive && sH > dH) {
			$h.height(dH);
			$html.addClass("header-towering");
		} else {
			$h.css({height: ""});
		}
 	});

	// #component #activator
	$(".activator").each(function(){
		var $t = $(this),
			target = $t.data("activator-target"),
			$target = target ? $t.closest(target) : $t.parent(),
			cl = $t.data("activator-class") || "active";

		$t.on("click", function(e){
			e.preventDefault();
			e.stopPropagation();
			$target.toggleClass(cl);
			$d.trigger("resizeinstantly.checktowering");
		});
	});
	var $pFHI = $(".post--fullheightimage");
	$pFHI.each(function(){
		var $t = $(this),
			$c = $t.find(".post__image-container--inner"),
			$im = $t.find(".post__image-container img"),
			src = $im.attr("src"),
			url = "url('" + src + "')";

		$.fn._imageLoader(src, function(data){
			$c.css("background-image", url);
			//console.log($c.css("background-image"));
			$c.addClass("img-loaded");
			//$im.remove();

			/*$t.data({
				aRatio: data.aRatio,
				$im: $im
			});*/
		});
	});
	/*function recountFullHeight(e) {
		//console.log(e.type, $pFHI.size())
		$pFHI.each(function(){
			var $t = $(this),
				$p = $t.closest(".post--fullheightimage"),
				w,
				aRatio = $t.data("aRatio"),
				$im = $t.data("$im");

			if (aRatio === undefined) return;
		});
	}
	$d.one("load.bindWidth", recountFullHeight)
		.on("resizeinstantly.bindWidth", recountFullHeight);
	*/



	/*$("*").each(function(){
		var $t = $(this),
			w = $t.width(),
			sW = $t[0].scrollWidth;
		if (sW > w && w > 0 && $t.not("html").size()) {
			console.log($t, w, sW);
		}
	})*/
});
})(document, window, jQuery);

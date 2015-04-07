!function(document, window, $, undefined){
'use strict';
$(function(){
	var $d = $(document),
		$w = $(window);

	function MConsole() {
		var styles = [];
		styles.push(".testConsole {position:fixed; top:70px; right:17px; max-width:300px; min-width:200px; background:#ccc; z-index:1000; min-height:100px; font-size:.75em;}");
		styles = "<style id='testconsolestyles'>" + styles.join("") + "</style>";

		$(styles).prependTo($("body"));
		$('<div class="testConsole" id="testConsoleId"></div>').prependTo($("body"));

		this.$c = $(".testConsole");
	};
	MConsole.prototype = {
		len: 0,
		size: 15,
		log: function() {
			var t = this,
				args = Array.prototype.slice.call(arguments);

			t.$c.append("<div>" + args.map(function(i){if(i===undefined)return "[undefined]";return i.toString()}).join(", ") + "</div>");
			t.len++;

			if (t.len > t.size) {
				t.len = t.size;
				t.$c.children().eq(0).remove();
			}
		},
		$c: null
	}
	var c = new MConsole();

	//c.log(window.requestAnimFrame);

	// $w.on({
	// 	scroll: function(e){
	// 		c.log(e.type, "w", new Date());
	// 	}
	// });
	// $d.on({
	// 	scroll: function(e){
	// 		$w.trigger("scroll");
	// 		c.log(e.type, "d", new Date());
	// 	}
	// });
	$("html.touch").each(function(){
		var isScrolling = false; // after touchend & before scroll

		function looper() {
			if (isScrolling) {
				c.log("looper", new Date());
				window.requestAnimFrame(looper);
			}
		}
		$w.on({	
			touchmove: function(e){
			// 	// c.log(e.type, new Date());
			// 	// clearInterval(tI);
			// 	// c.log("clear");
				//$w.trigger("scroll");
			},
			touchend: function(e){
				e.preventDefault();
				e.stopPropagation();
				console.log(e);
				isScrolling = true;
				c.log(e.type, new Date(), isScrolling);
				//looper();
				//asdasdasdasda();
				//$w.trigger("recount");

				// //$d.trigger("scroll");
				// tI = setInterval(function(){
				// 	c.log("asdasd3345", new Date());
				// 	//$d.trigger("scroll");
				// }, 10);
				// c.log(tI);
				// c.log("asdasd123", new Date());
			},
			// "recount": function(){
			// 	looper();
			// },
			scroll: function(e){
				isScrolling = false;
				c.log(e.type, new Date(), isScrolling);
				// clearInterval(tI);
			}
		});
		// tI = setInterval(function(){
		// 	c.log("asdasd", new Date());
		// 	//$d.trigger("scroll");
		// }, 10);

		function update() {
			c.log("...");
		}
		setInterval(function(){
			update();
		}, 100);
	});
	window.console = window.console || {};
	window.console.log = c.log;
});
}(document, window, jQuery);

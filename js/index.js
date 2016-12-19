$(function() {

	(function initTab() {
		var tab = $("#tab"),
			tabLastLeft = 0;
		tab.on("touchstart", function(e) {
			var startX = e.touches[0].clientX,
				startY = e.touches[0].clientY,
				me = $(this);
			me.on("touchmove", function(e) {
				var cX = e.touches[0].clientX - startX;
				var cY = e.touches[0].clientY - startY;
				if (Math.abs(cX) > Math.abs(cY)) {
					// touchmove过程中设置滚动条位置
					me[0].scrollLeft = tabLastLeft - cX;
				}
				// 阻止产生整个页面的水平滚动导致页面乱
				e.preventDefault();
			});
			me.on("touchend", function(e) {
				tabLastLeft = me[0].scrollLeft;
			});
		});

		tab.on('tap', 'li', function() {
			tab.find('.subLine').removeClass('subLine');
			$(this).addClass('subLine');
			console.log('loading contents here');
		}, false);
	})();

});
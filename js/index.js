$(function() {

	(function initTab() {
		var tab = $("#tab"),
			lastTab = 0,
			tabLastPos = {
				X: 0,
				Y: 0
			},
			startPos = {},
			endPos = {},
			isScroll = function(X, Y) {
				return Math.abs(X) > 30 || Math.abs(Y) > 30;
			};

		tab.on("touchstart", function(e) {
			startPos.X = e.touches[0].clientX;
			startPos.Y = e.touches[0].clientY;
		});
		tab.on("touchmove", function(e) {
			endPos.X = e.touches[0].clientX;
			endPos.Y = e.touches[0].clientY;

			var X = endPos.X - startPos.X,
				Y = endPos.Y - startPos.Y;
			if (Math.abs(X) > Math.abs(Y)) { //判断横向滚动
				$(this)[0].scrollLeft = tabLastPos.X - X; // touchmove过程中设置滚动条位置
			}
			e.preventDefault(); // 阻止产生整个页面的水平滚动导致页面乱
		});
		tab.on("touchend", function(e) {
			tabLastPos.X = $(this)[0].scrollLeft;
		});

		// tab.off('doubleTap','li');
		tab.on('tap', 'li', function(e) {
			if (this.className.indexOf('subLine') > -1) return false;
			tab.find('.subLine').removeClass('subLine');
			$(this).addClass('subLine');
			console.log('loading contents here');
			e.cancelBubble = true;
			event.preventDefault();

			setCurTabIndexByFundType($(this).index());
		}, false);

		//通过js移动到当前tab
		function setCurTabIndexByFundType(type) {
			var curLi = tab.find('li:eq(' + type + ')');
			if (curLi.length > 0) {
				var historyLeft = tab[0].scrollLeft;
				var left = curLi.offset().left;
				var scrollLeft = left - $(window).width() / 2 + curLi.width() / 2;
				// zepto animate 不支持scrollLeft 
				var num = 0;
				var timer = null;
				timer = setInterval(function() {
					if ((scrollLeft > 0 && num > scrollLeft) || (scrollLeft < 0 && num < scrollLeft)) {
						clearInterval(timer);
						return false;
					}
					scrollLeft >= 0 ? num += 1 : num -= 1;
					tab[0].scrollLeft = historyLeft + num;
				}, 1);
			}
		}

	})();


});

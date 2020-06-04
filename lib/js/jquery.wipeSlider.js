/*//////////////////////////////////////////
参考 : Kackie(https://github.com/Kackie)
created: 2019/02/23
//////////////////////////////////////////*/
var slideIn = 'Global';
// toRightとtoLeftを代入する。この値で現在表示されているスライドの次の
// top-slide_img_item_styleにright−30%か30%を付与してアニメーション分岐させる
// activeクラスが切り替わる処理の方が早いため.active>〜で指定
var stop = 0;
// 0と1を代入する。stopが1の場合アニメーションが実行せずexitする
// スライドアニメーションが終了する位置で0が代入される
;
(function($) {
	$.fn.wipeSlider = function(options) {
		$.fn.wipeSlider.defaults = {
			transition: 500,
			auto: false,
			duration: 4000,
			pager: true,
			controls: true,
			direction: 'horizontal',
			easing: 'linear',
			slideLength: 0,
			slideNum: 0,
			backFlag: false
		};
		var opts = $.extend({}, $.fn.wipeSlider.defaults, options);

		this.each(function(index) {

			var slidesWrap = $(this),
				slides = (slidesWrap.children('.slides').length) ?
				slidesWrap.children('.slides') : slidesWrap,
				slide = slides.children('.slide'),
				slideW = slide.outerWidth(true);

			opts.slideLength = slide.length - 1,
				opts.slideNum = 0,
				opts.backFlag = false;

			slide.filter(':first-child').addClass('active');

			//スライド用のクラス切り替え
			var wiper = function() {
				if (stop === 1) {
					setTimeout(function() {}, 4000);
					exit;
				} else if (stop === 0) {
					slide.removeClass('active');
					slide.filter(':nth-child(' + (opts.slideNum + 1) + ')').addClass(
						'active').css({
						'backface-visibility': 'hidden',
						'will-change': 'clip',
						'z-index': '2'
					});
					if (opts.direction === 'horizontal') {
						if (opts.backFlag === true) {
							toRight();
						} else {
							toLeft();
						}
					}
					if (typeof options.slideBefore === 'function') {
						var slideNum = opts.slideNum,
							slideLength = opts.slideLength;
						options.slideBefore(slideNum, slideLength);
					}
					if (typeof options.slideAfter === 'function') {
						var slideNum = opts.slideNum,
							slideLength = opts.slideLength;
						setTimeout(
							function() {
								options.slideAfter(slideNum, slideLength);
							}, options.transition
						);
					}
				}
			};

			//自動再生
			//自動再生の場合はアニメーション分岐不要
			　 //stop = 1; 
			if (opts.auto === true) {
				var slideNumSet = function() {
					if (stop === 0) {
						opts.backFlag = false;
						if (opts.slideNum < opts.slideLength) {
							opts.slideNum++;
						} else {
							opts.slideNum = 0;
						}
						slideIn = 'toLeft';
						$(
							'.slide:not(.active)>.top-slide_img_item>.top-slide_img_item_style'
						).css('right', '-30%');
						wiper();
						stop = 1;
					}
				};
				var autoWiper = setInterval(slideNumSet, opts.duration);
			}

			//オートタイマーの再設定
			// ウィンドウを変えてしばらくするとたまに自動再生が無限ループする（再現できず）  
			var resetCount, retetTimer;
			var timerReset = function() {
				if (opts.auto === true) {
					clearInterval(autoWiper);
					resetCount = 0;
					clearInterval(retetTimer);
					retetTimer = setInterval(function() {
						if (resetCount < 5) {
							resetCount++;
						} else {
							clearInterval(retetTimer);
							autoWiper = setInterval(slideNumSet, opts.duration);
						}
					}, 3000);
				}
			};
			//スライドのアニメーション作成
			　　　　　 //slideWに読み込み時点のスライドのwidthを代入してその値をclipに代入していたためレスポンシブできず
			// 実行前にslideWに100を代入して100vwにすることでで解決（％指定だとアニメーションしなくなる）
			//clipはサポートが将来的に切れるらしいのでclip-pathに変える（やったができないので後で）
			slide.css({
				width: '100vw',
			});
			slide.filter(':first-child').css({
				'z-index': 2
			});
			slide.filter(':nth-child(2)').css({
				'z-index': 1
			});

			var toRight = function() {
				slideIn = 'toRight';
				$('.active>.top-slide_img_item>.top-slide_img_item_style').css('right',
					'30%')
				slideW = 100;
				slide.filter(':nth-child(' + (opts.slideNum + 1) + ')').css({
					clip: 'rect(0,0,auto,0)'
				}).animate({
					zIndex: slideW
				}, {
					duration: opts.transition,
					easing: opts.easing,
					complete: function() {
						animCallback();
					},
					step: function(now, fx) {
						$(this).css({
							clip: 'rect(0,' + now + 'vw,auto,0)'
						});
					}
				});

			};

			var toLeft = function() {
				slideIn = 'toLeft';
				$('.active>.top-slide_img_item>.top-slide_img_item_style').css('right',
					'-30%')
				slideW = 100;
				slide.filter(':nth-child(' + (opts.slideNum + 1) + ')').css({
					clip: 'rect(0, ' + slideW + 'vw, auto, ' + 0 + 'vw)'
				}).animate({
					zIndex: slideW
				}, {
					duration: opts.transition,
					easing: opts.easing,
					complete: function() {
						animCallback();
					},
					step: function(now, fx) {
						$(this).css({
							clip: 'rect(0, ' + slideW + 'vw, auto, ' + (slideW - now) +
								'vw)'
						});
					}
				});

			};

			var animCallback = function() {
				slide.filter('.active').css({
					'z-index': '1'
				});
				slide.filter(':not(.active)').css({
					'z-index': '',
					'backface-visibility': '',
					'will-change': 'unset'
				});
			};

			//右、左と交互に押してもアニメーションが正しく動作するように.active>〜以外のクラスにもアニメーション用のクラスを付与
			　 //  stop = 1; 
			slidesWrap.find('.prevBtn').click(function() {
				if (stop === 1) {
					setTimeout(function() {}, 4000);
					exit;
				}
				if (opts.slideNum === 0) {
					opts.slideNum = opts.slideLength;
				} else {
					opts.slideNum--;
				}
				opts.backFlag = true;
				timerReset();
				wiper();
				if (stop === 0) {
					slideIn = 'toRight';
					$(
						'.slide:not(.active)>.top-slide_img_item>.top-slide_img_item_style'
					).css('right', '30%');
				}
				stop = 1;
			});
			slidesWrap.find('.nextBtn').click(function() {
				if (stop === 1) {
					setTimeout(function() {}, 4000);
					exit;
				}
				if (opts.slideNum === opts.slideLength) {
					opts.slideNum = 0;
				} else {
					opts.slideNum++;
				}
				opts.backFlag = false;
				timerReset();
				wiper();
				if (stop === 0) {
					slideIn = 'toLeft';
					$(
						'.slide:not(.active)>.top-slide_img_item>.top-slide_img_item_style'
					).css('right', '-30%');
				}
				stop = 1;
			});


			//別タブが開かれたときにオート再生を止め、戻ったときに再開する
			$(window).bind("focus", function() {
				clearInterval(autoWiper);
				autoWiper = setInterval(slideNumSet, opts.duration);
			}).bind("blur", function() {
				clearInterval(autoWiper);
			});

		});

	};
}(jQuery));

$('.js_wiper').wipeSlider({
	transition: 1100,
	auto: true,
	duration: 4000,
	pager: false,
	easing: 'easeInQuad',
	//   slideBefore
	// スライドアニメーション実行開始時にitemアニメーション
	// stop = 1
	slideBefore: function() {
		if (stop === 1) {
			setTimeout(function() {}, 4000);
			exit;
		} else if (stop === 0) {
			if (slideIn === 'toLeft') {
				$('.top-slide_img_item_style').fadeOut(500).animate({
					right: '15%',
				}, {
					duration: 600,
					queue: false
				});
				$('.active>.top-slide_img_item>.top-slide_img_item_style').delay(800).fadeIn(
					800).animate({
					right: '0%',
				}, {
					duration: 1200,
					queue: false
				});
				$('.active>.top-slide_img_item>.top-slide_img_item_style').css('right',
					'-30%');
				stop = 1;
			} else if (slideIn === 'toRight') {
				$('.top-slide_img_item_style').fadeOut(500).animate({
					right: '-15%',
				}, {
					duration: 600,
					queue: false
				});
				$('.active>.top-slide_img_item>.top-slide_img_item_style').delay(800).fadeIn(
					800).animate({
					right: '0%',
				}, {
					duration: 1200,
					queue: false
				});
				$('.active>.top-slide_img_item>.top-slide_img_item_style').css('right',
					'30%');
				stop = 1;
			};
		}
	},
	//   slideAfter
	// スライドアニメーション完了後に実行
	slideAfter: function() {
		stop = 0;
	}
});
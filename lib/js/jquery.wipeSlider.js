/*//////////////////////////////////////////
Author : Kackie(https://github.com/Kackie)
created: 2019/02/23
//////////////////////////////////////////*/
var slideIn = 'Global';
;(function($){
	$.fn.wipeSlider = function(options){
		  $.fn.wipeSlider.defaults = {
			  transition : 500,
			  auto : false,
			  duration : 4000,
			  pager : true,
			  controls : true,
			  direction : 'horizontal',
			  easing : 'linear',
			  slideLength : 0,
			  slideNum : 0,
			  backFlag : false
		  };
		  var opts = $.extend({}, $.fn.wipeSlider.defaults, options);
		  
  
		  this.each(function(index){
  
			  var	slidesWrap = $(this),
				  slides = (slidesWrap.children('.slides').length) ? 
					  slidesWrap.children('.slides')
					  :slidesWrap,
				  slide = slides.children('.slide'),
				  slideW = slide.outerWidth(true),
				  slideH = slide.outerHeight(true);
  
			  opts.slideLength = slide.length - 1,
			  opts.slideNum = 0,	
			  opts.backFlag = false;
				  
			  slide.filter(':first-child').addClass('active');
  
			  //スライド用のクラス切り替え
			  var wiper = function(){
				  slide.removeClass('active');
				  slide.filter(':nth-child('+ (opts.slideNum+1) +')').addClass('active').css({
					  'backface-visibility': 'hidden',
					  'will-change': 'clip',
					  'z-index':'2'
				  });
				  if(opts.direction === 'horizontal'){
					  if(opts.backFlag === true){
						  toRight();
					  }else{
						  toLeft();
					  }
				  }
				  
				  //console.log(opts.backFlag);
				  slidesWrap.find('.pager li button').removeClass('current');
				  slidesWrap.find('.pager li').filter(':nth-child('+ (opts.slideNum+1) +')').find('button').addClass('current');
				  if (typeof options.slideBefore === 'function') {
					  var	slideNum = opts.slideNum,
							  slideLength = opts.slideLength;
					  options.slideBefore(slideNum,slideLength);
				  }
				  if (typeof options.slideAfter === 'function') {
					  var	slideNum = opts.slideNum,
							  slideLength = opts.slideLength;
					  setTimeout(
						  function(){
							  options.slideAfter(slideNum,slideLength);
						  }
						  ,options.transition
					  );
				  }
			  };
  
			  //自動再生
			  if(opts.auto === true){
				  var slideNumSet = function(){
					  opts.backFlag = false;
					  if(opts.slideNum < opts.slideLength){
						  opts.slideNum++;
					  } else {
						  opts.slideNum = 0;
					  }
					  wiper();
					 
				  };
				  var autoWiper = setInterval(slideNumSet, 3000);
			  }
  
			  //オートタイマーの再設定
			  var resetCount,retetTimer;
			  var timerReset = function(){
				  if(opts.auto === true){
					  clearInterval(autoWiper);
					  resetCount = 0;
					  clearInterval(retetTimer);
					  retetTimer = setInterval(function(){
						  if(resetCount < 10){
							  resetCount++;
							  
						  } else {
							  clearInterval(retetTimer);
							  autoWiper = setInterval(slideNumSet, 5000);
						  }
					  }, 1000);
				  }
			  };
			  //スライドのアニメーション作成

			  slide.css({
				  width:'100vw',
			  });
			  slide.filter(':first-child').css({
				  'z-index':2
			  });
			  slide.filter(':nth-child(2)').css({
				  'z-index':1
			  });
			  
			  var toRight = function(){
				  slideIn = 'toRight';
				  slideW = 100;
				  slide.filter(':nth-child('+ (opts.slideNum+1) +')').css({
					  clip:'rect(0,0,100vh,0)'
				  }).animate(
					  {zIndex: slideW},
					  {
						  duration:opts.transition,
						  easing:opts.easing,
						  complete: function(){
							  animCallback();
						  },
						  step: function(now, fx){
							  $(this).css({
								  clip:'rect(0,'+now+'vw,100vh,0)'
							  });
  
							  
						  }
					  }
				  );
  
			  };
		  
			  var toLeft = function(){
				  slideIn = 'toLeft';
				  slideW = 100;
				  slide.filter(':nth-child('+ (opts.slideNum+1) +')').css({
					  clip:'rect(0, '+slideW+'vw, 100vh, '+0+'vw)'
				  }).animate(
					  {zIndex: slideW},
					  {
						  duration:opts.transition,
						  easing:opts.easing,
						  complete: function(){
							  animCallback();
						  },
						  step: function(now, fx){
							  $(this).css({
								  clip:'rect(0, '+slideW+'vw, 100vh, '+(slideW-now)+'vw)'
							  });
						  }
					  }
				  );
  
			  };
		  
			  var animCallback = function(){
				  slide.filter('.active').css({
					  'z-index':'1'
				  });
				  slide.filter(':not(.active)').css({
					  'z-index':'',
					  'backface-visibility': '',
					  'will-change': 'unset'
				  });
			  };
  
			  //コントローラー作成
			  if(opts.controls === true){
				  var	controllL = '',
					  controllR = ''
				  var controllerHTML = '<div class="controlls">' + controllL + controllR + '<div>';
				  slidesWrap.append(controllerHTML);
  
				  $btn = $(this);
				  
				  slidesWrap.find('.prevBtn').click(function(){
					  if(opts.slideNum === 0){
						  opts.slideNum = opts.slideLength;
					  }else{
						  opts.slideNum--;
					  }
					  opts.backFlag = true;
					  timerReset();
					  wiper();
				  });
				  slidesWrap.find('.nextBtn').click(function(){
					  if(opts.slideNum === opts.slideLength){
						  opts.slideNum = 0;
					  }else{
						  opts.slideNum++;
					  }
					  opts.backFlag = false;
					  timerReset();
					  wiper();
				  });
			  }
			  
			  
			  //別タブが開かれたときにオート再生を止め、戻ったときに再開する
			  $(window).bind("focus",function(){
				  clearInterval(autoWiper);
				  autoWiper = setInterval(slideNumSet, opts.duration);
			  }).bind("blur",function(){
				  clearInterval(autoWiper);
			  });
  
		  });
  
	  };
  }(jQuery));
  
  $('.js_wiper').wipeSlider({
	  transition : 1100,
	  auto : true,
	  pager : false,
	  easing : 'easeInQuad',
	  slideBefore : 	function(){
		  if(slideIn === 'toLeft'){
			  console.log('right');
		  }else if(slideIn === 'toRight'){
			console.log('left');
		  };

		  $('.top-slide_img_item').fadeOut(500).animate(
			  {
				  right: '3%',
				  },{
				  duration: 600,
				  queue: false
			  }
		  );
		  $('.active>.aaa>.top-slide_img_item').delay(800).fadeIn(800).animate(
		  {
			right: '0%',
			  },{
			  duration: 1400,
			  queue: false
		  }
	  );

	// $('.aaa').fadeOut(500).animate(
	// 	{
	// 		right: '200px',
	// 		},{
	// 		duration: 600,
	// 		queue: false
	// 	}
	// );
	
	// $('.active>.aaa').delay(800).fadeIn(800).animate(
	// {
	//   right: '80px',
	// 	},{
	// 	duration: 1400,
	// 	queue: false
	// }
	// );
	  }
  });
/*//////////////////////////////////////////
Author : Kackie(https://github.com/Kackie)
created: 2019/02/23
//////////////////////////////////////////*/
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
				  var autoWiper = setInterval(slideNumSet, opts.duration);
			  }
  
			  //オートタイマーの再設定
			  var resetCount,retetTimer;
			  var timerReset = function(){
				  if(opts.auto === true){
					  clearInterval(autoWiper);
					  resetCount = 0;
					  clearInterval(retetTimer);
					  retetTimer = setInterval(function(){
						  if(resetCount < 4){
							  resetCount++;
						  } else {
							  clearInterval(retetTimer);
							  autoWiper = setInterval(slideNumSet, opts.duration);
						  }
					  }, 1000);
				  }
			  };
			  //スライドのアニメーション作成
			  slidesWrap.css({
				  
			  });
			  slides.css({
				  
			  });
			  slide.css({
				  width:'100vw',
				  height:'100vh',
				  opacity:1
			  });
			  slide.filter(':first-child').css({
				  'z-index':2
			  });
			  slide.filter(':nth-child(2)').css({
				  'z-index':1
			  });
			  
			  var toRight = function(){
				slideW = slide.outerWidth(true),
				slideH = slide.outerHeight(true),
				  slide.filter(':nth-child('+ (opts.slideNum+1) +')').css({
					
					  clip:'rect(0,0,'+slideH+'px,0)'
				  }).animate(
					  {zIndex: slideW},
					  {
						  duration:opts.transition,
						  easing:opts.easing,
						  complete: function(){
							  animCallback();
						  },
						  step: function(now, fx){
							slideW = slide.outerWidth(true),
							slideH = slide.outerHeight(true),
							  $(this).css({
								  clip:'rect(0,'+now+'px,'+slideH+'px,0)'
							  });				  
						  }
					  }
				  );
				  
  
			  };
			  
		  
			  var toLeft = function(){
				slideW = slide.outerWidth(true),
				slideH = slide.outerHeight(true),
				  slide.filter(':nth-child('+ (opts.slideNum+1) +')').css({
					  clip:'rect(0, '+100%+', '+100%+', '+100%+')'
				  }).animate(
					  {zIndex: slideW},
					  {
						  duration:opts.transition,
						  easing:opts.easing,
						  complete: function(){
							animCallback();
						  },
						  step: function(now, fx){
							slideW = slide.outerWidth(true),
							slideH = slide.outerHeight(true),
							  $(this).css({
								  clip:'rect(0, '+slideW+'px, '+slideH+'px, '+(slideW-now)+'px)'
							  });
						  }
					  }		  
				  );
			  };
		  
			  var animCallback = function(){
				slideW = slide.outerWidth(true),
				slideH = slide.outerHeight(true),
				  slide.filter('.active').css({
					  'z-index':'1',

				  });
				  slide.filter(':not(.active)').css({
					  'z-index':'',
					  'backface-visibility': '',
					  'will-change': 'unset',
				  });			 
			  };
  
			  //コントローラー作成
			  if(opts.controls === true){
				  var	controllL = '',
					  controllR = ''
				  var controllerHTML = '<div class="controlls">' + controllL + controllR + '<div>';
				  slidesWrap.append(controllerHTML);
  
				  $btn = $(this);
				  // pointer-events noneのクラス付与で対応したが
				  // hoverアニメーションの動きがおかしくなるためやり方変える
				  //（１）押せなくする
				  function BtnDisable(){
					  $btn.addClass("top-slide_btn_L_none");
					  clearInterval(statusDis);
				  }
				  //（２）押せるようにする
				  function BtnAble(){
					  $btn.removeClass("top-slide_btn_L_none");
					  clearInterval(statusAble);
				  }
				  //（１）押せなくする
				  function BtnDisable2(){
					  $btn.addClass("top-slide_btn_R_none");
					  clearInterval(statusDis);
				  }
				  //（２）押せるようにする
				  function BtnAble2(){
					  $btn.removeClass("top-slide_btn_R_none");
					  clearInterval(statusAble);
				  }
				  
				  slidesWrap.find('.prevBtn').click(function(){
					  statusDis  = setInterval(BtnDisable , 1); //ボタンを押した直後に（１）を呼び出し
					  if(opts.slideNum === 0){
						  opts.slideNum = opts.slideLength;
					  }else{
						  opts.slideNum--;
					  }
					  opts.backFlag = true;
					  timerReset();
					  wiper();
					  statusAble = setInterval(BtnAble , 1000); //ボタンを押してn秒後に（２）を呼び出し
				  });
				  slidesWrap.find('.nextBtn').click(function(){
					  statusDis  = setInterval(BtnDisable2 , 1); //ボタンを押した直後に（１）を呼び出し
					  if(opts.slideNum === opts.slideLength){
						  opts.slideNum = 0;
					  }else{
						  opts.slideNum++;
					  }
					  opts.backFlag = false;
					  timerReset();
					  wiper();
					  statusAble = setInterval(BtnAble2 , 1000); //ボタンを押してn秒後に（２）を呼び出し
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
	  transition : 1000,
	  auto : true,
	  pager : false,
	  easing : 'easeInQuad',
	  slideBefore : 	function(){
		  $('.top-slide_img_item').fadeOut(500).animate(
			  {
				  left: '32%',
				  },{
				  duration: 500,
				  queue: false
			  }
		  );
		  $('.active>.aaa>.top-slide_img_item').delay(700).fadeIn(700).animate(
		  {
			  left: '43%',
			  },{
			  duration: 1100,
			  queue: false
		  }
	  );
	  },
	  
  
  });
$(function () {
  $('.bxslider').bxSlider({
    mode: 'fade',
    speed: 800,
    pause: 3000,
    auto: true,
    pager: false,
    controls: false,
    touchEnabled: false
  });
});


$btn = $('.slider-btn');
$btn.click(function(){
  console.log('test');
});


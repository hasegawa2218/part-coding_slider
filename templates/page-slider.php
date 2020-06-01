<?php
/**
* Template Name: スライダーテスト
* @package WordPress
* @Template Post Type: post, page,
* @subpackage I'LL
* @since I'LL 1.0
*/

get_header(); ?>
<!--content-->
<section class="slideWrap js_wiper" style="position: relative;height:100vh;">
<div class="slides">
  <div class="top-slide_img_violet slide" style="width:100vw;height:100vh;position:absolute;z-index:0;">
    <div class="aaa" style="position:relative;display:flex;">
        <div style="position: absolute;" class="top-slide_img_item top-slide_img_item_1"></div>
    </div>
  </div>
  <div class="top-slide_img_brown slide" style="width:100vw;height:100vh;position:absolute;z-index:0;">
    <div class="aaa" style="position:relative;display:flex;">
        <div style="display:none;position: absolute;" class="top-slide_img_item top-slide_img_item_2"></div>
    </div>
  </div>
  <div class="top-slide_img_brown slide" style="width:100vw;height:100vh;position:absolute;z-index:0;">
    <div class="aaa" style="position:relative;display:flex;">
        <div style="display:none;position: absolute;" class="top-slide_img_item top-slide_img_item_3"></div>
    </div>
  </div>

  <div class="top-slider_btn">
    <div class="top-slider_btn_left slider-btn prevBtn"><i class="fas fa-chevron-left"></i></div>
    <div class="top-slider_btn_right slider-btn nextBtn"><i class="fas fa-chevron-right"></i></div>
  </div>
</div>
<div class="top-slider_text" style="position:relative;display:flex;z-index:100;flex-direction:column;">
    <h2>Made with<br>TEINEI</h2>
    <p>ていねいな人のために、<br>ていねいにつくりました。</p>
    <div>OUR MESSAGE</div>
</div>
</section>

<!--end content-->
<?php get_footer(); ?>

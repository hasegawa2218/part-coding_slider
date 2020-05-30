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
    <div class="aaa" style="position:relative;width:100%;height:100%;display:flex;">
        <div class="top-slide_img_item top-slide_img_item_1"></div>
    </div>
  </div>
  <div class="top-slide_img_brown slide" style="width:100vw;height:100vh;position:absolute;z-index:0;">
    <div class="aaa" style="position:relative;width:100%;height:100%;display:flex;">
        <div style="display:none;" class="top-slide_img_item top-slide_img_item_2"></div>
    </div>
  </div>
  <div class="top-slide_img_brown slide" style="width:100vw;height:100vh;position:absolute;z-index:0;">
    <div class="aaa" style="position:relative;width:100%;height:100%;display:flex;">
        <div style="display:none;" class="top-slide_img_item top-slide_img_item_3"></div>
    </div>
  </div>

  <div class="top-slider_btn">
    <div class="top-slider_btn_left slider-btn prevBtn"><i class="fas fa-chevron-left"></i></div>
    <div class="top-slider_btn_right slider-btn nextBtn"><i class="fas fa-chevron-right"></i></div>
  </div>
</div>
</section>

<!--end content-->
<?php get_footer(); ?>

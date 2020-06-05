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
<section class="slideWrap js_wiper" style="position: relative;">
<div class="slides">
  <div class="top-slide_img_violet slide" style="position: absolute;">
    <div class="top-slide_img_item">
        <div class="top-slide_img_item_style top-slide_img_item_style_1"></div>
    </div>
  </div>
  <div class="top-slide_img_brown slide" style="z-index:0;position: absolute;">
    <div class="top-slide_img_item">
        <div class="top-slide_img_item_style top-slide_img_item_style_2"></div>
    </div>
  </div>
  <div class="top-slide_img_brown slide" style="z-index:0;position: absolute;">
    <div class="top-slide_img_item">
        <div class="top-slide_img_item_style top-slide_img_item_style_3"></div>
    </div>
  </div>

  <div class="top-slide_btn">
    <div class="top-slide_btn_left slide-btn prevBtn"><i class="fas fa-chevron-left"></i></div>
    <div class="top-slide_btn_right slide-btn nextBtn"><i class="fas fa-chevron-right"></i></div>
  </div>
</div>
<div class="top-slide_text" style="">
    <h2>Made with<br>TEINEI</h2>
    <p>ていねいな人のために、<br>ていねいにつくりました。</p>
    <div>OUR MESSAGE</div>
</div>
</section>

<!--end content-->
<?php get_footer(); ?>

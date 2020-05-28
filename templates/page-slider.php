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
<section style="position: relative;height:100vh;">
  <div class="top-slide_img_test" style="height:100vh;position:absolute;z-index:0;">
  <div style="position:relative;width:100%;height:100%;display:flex;">
    <div class="test_img test_img1"></div>
  </div>
   
  </div>
  <div class="top-slide_img_test" style="height:100vh;position:absolute;z-index:0;">
    <div class="test_img test_img2"></div>
  </div>
  <div class="top-slide_img_test" style="height:100vh;position:absolute;z-index:0;">
    <div class="test_img test_img3"></div>
  </div>

  <div class="top-slider_btn">
    <div class="top-slider_btn_left slider-btn"><i class="fas fa-chevron-left"></i></div>
    <div class="top-slider_btn_right slider-btn"><i class="fas fa-chevron-right"></i></div>
  </div>
</section>
<!--end content-->
<?php get_footer(); ?>

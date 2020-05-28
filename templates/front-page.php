<?php
/**
* Template Name: トップページ
* @package WordPress
* @Template Post Type: post, page,
* @subpackage I'LL
* @since I'LL 1.0
*/

get_header(); ?>
<!--loading-->
<div style="height:500px;width:100%;">
<a href="/slider">slider</a>
<!-- ページ自体が止まってないか確認するために一時的に追加 --></div>
<section style="position: relative;height:100vh;">
  <div class="top-slide_img_test" style="height:100vh;position:absolute;z-index:0;">
    <div class="test_img"></div>
  </div>
  <div class="top-slide_img_test" style="height:100vh;position:absolute;z-index:0;">
    <div class="test_img"></div>
  </div>
  <div class="top-slide_img_test" style="height:100vh;position:absolute;z-index:0;">
    <div class="test_img"></div>
  </div>

  <div class="top-slider_btn">
    <div class="top-slider_btn_left slider-btn"><i class="fas fa-chevron-left"></i></div>
    <div class="top-slider_btn_right slider-btn"><i class="fas fa-chevron-right"></i></div>
  </div>
</section>

<div style="height:500px;width:100%;"><!-- ページ自体が止まってないか確認するために一時的に追加 --></div>



<div class="slider-ctr">
    <figure class="slide"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/img5.jpeg" alt="Sky" /></figure>
    <figure class="slide"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/img1.jpeg" alt="River" /></figure>
    <figure class="slide"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/img4.jpeg" alt="Rain" /></figure>
    <figure class="slide text-on"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/111167/img2.jpeg" alt="Ocean" /></figure>
    <div class="slider-control">
        <div class="control prev disabled">
            <div class="icon ion-chevron-left"></div>
        </div>
        <div class="control next">
            <div class="icon ion-chevron-right"></div>
        </div>
    </div>
</div>


<!-- content -->
  <!-- <div class="slidesWrap js_wiper">
    <div class="slides">

      <div class="top-slide_img_violet slide">
      <div class="aaa">
        <div class="top-slide_img_item top-slide_img_item_1" style="display:block;"></div>
        </div>
      </div>

      <div class="top-slide_img_brown slide">
        <div class="aaa">
          <div class="top-slide_img_item top-slide_img_item_2" style="display:none;"></div>
        </div>
      </div>

      <div class="top-slide_img_brown slide">
        <div class="aaa">
          <div class="top-slide_img_item top-slide_img_item_3" style="display:none;"></div>
        </div>
      </div>

    </div>

    <div class="scroll-btn">
      <div class="top-slide_btn top-slide_btn_L prevBtn">
        <i class="fas fa-chevron-left"></i>
      </div>
      <div class="top-slide_btn top-slide_btn_R nextBtn">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>

  </div>






<div style="height:500px;width:100%;"> ページ自体が止まってないか確認するために一時的に追加 --></div>



<!--end content-->
<?php get_footer(); ?>

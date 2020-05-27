<?php
/**
* Template header
* @package WordPress
* @subpackage I'LL
* @since I'LL 1.0
*/
?>
<!DOCTYPE html>
<?php ill_html_compress_start(); ?>
<html <?php language_attributes(); ?> dir="ltr">

<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <?php if ( is_ill_active_meta_tage_settings() ) : ?>
  <meta name="keywords" content="<?php ill_keywords(); ?>">
  <meta name="description" content="<?php ill_description(); ?>">
  <?php ill_robots(); ?>
  <?php endif; ?>
  <?php ill_facebook_opg(); ?>
  <?php ill_twitter_card(); ?>
  <?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  <?php endif; ?>
  <?php wp_head(); ?>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
</head>

<body id="top" <?php body_class(); ?>>


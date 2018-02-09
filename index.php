<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if ( ! class_exists( 'Timber' ) ) {
	echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
	return;
}

$context = Timber::get_context();

//$context['posts'] = Timber::get_posts();

$args = array(
	'post_type'    => 'concert',
	'orderby'     => 'meta_value',
	'order'        => 'ASC',

	'meta_key'     => 'gig_date',
	'meta_value'   => date( "Ymd" ), // change to how "event date" is stored
	'meta_compare' => '>=',
);
$context['concerts'] = Timber::get_posts($args);

$args = array(
	'post_type' => 'video',
	'orderby' => 'meta_value_num',
	'meta_key' => 'position',
);

$context['teaser_vids'] = Timber::get_posts($args);

$args = array(
	'post_type' => 'releases',
);

$context['teaser_release'] = Timber::get_post($args);

$past_gigs_id = 20;

$context['past_gigs'] = Timber::get_post($past_gigs_id);

$templates = array( 'index.twig' );
if ( is_home() ) {
	array_unshift( $templates, 'home.twig' );
}
Timber::render( $templates, $context );

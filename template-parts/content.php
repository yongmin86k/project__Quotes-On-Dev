<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">

		<div class="entry-content">
			<?php the_content(); ?>
		</div>
		<div class="entry-meta">
			<h2 class="author">— <?php the_title(); ?></h2> <span class="source"></span>
		</div>
		
	</div><!-- .entry-content -->
</article><!-- #post-## -->

<button type="button" class="btn-new-quote">Show Me Another!</button>

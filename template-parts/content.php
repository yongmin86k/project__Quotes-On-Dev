<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

$source = get_post_meta( get_the_ID(), '_qod_quote_source', true );
$source_url = get_post_meta( get_the_ID(), '_qod_quote_source_url', true );

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">	
		<?php the_content(); ?>
	</div><!-- .entry-content -->
		
	<div class="entry-meta">
		<h2 class="entry-title">
			— 
			<?php if ( $source && $source_url ): ?>
				<span class="author">
					<?php the_title(); ?>,
				</span>
				<span class="source"><a href="<?= $source_url; ?>"><?= $source; ?></a></span>
			<?php elseif( $source ): ?>
				<span class="author">
					<?php the_title(); ?>,
				</span>
				<span class="source">, <?= $source?></span>
			<?php else : ?>
				<span class="author">
					<?php the_title(); ?>
				</span>
				<span class="source"><?= $source?></span>
			<?php endif;?>
		</h2>
	</div><!-- .entry-meta -->
</article><!-- #post-## -->

<?php if ( is_home() || is_single() ) :?>
	<button type="button" id="new-quote-button">Show Me Another!</button>
<?php endif;?>

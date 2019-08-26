<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 * 
 * Template Name: Submit
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="quote-submission">
				<header class="entry-header">
					<h1 class="entry-title">
						<?php the_title(); ?>
					</h1>
				</header>

				<?php if( is_user_logged_in() && current_user_can( 'edit_posts' ) ): ?>
					<div class="quote-submission-wrapper">
						<form name="quoteForm" id="quote-submission-form">
							<div>
								<label for="quote-author">Author of Quote</label>
								<input type="text" name="quote_author" id="quote-author" required>
							</div>

							<div>
								<label for="quote-content">Quote</label>
								<textarea name="quote_name" id="quote-content" cols="20" rows="3" required></textarea>
							</div>

							<div>
								<label for="quote-source">Where did you find this quote? (e.g. book name)</label>
								<input type="text" name="quote_source" id="quote-source">
							</div>

							<div>
								<label for="quote-source-url">Provide the URL of the quote source, if available.</label>
								<input type="url" name="quote_source_url" id="quote-source-url">
							</div>

							<input type="submit" value="Submit Quote">
						</form>
					</div>
				<?php else: ?>
					<p>Sorry, you must be logged in to submit a quote :(</p>
					<p>
						<a href="<?php echo wp_login_url(); ?>">
						Click here to login
						</a>
					</p>
					<p>or
						<span class="create-new-account">
							Create a new account
						</span>
					</p>
				<?php endif; ?>
			</section>

			<form name="FormNewAccount" id="form-new-account">
				<h2>Create a new account</h2>
				<div>
					<label for="newAccName">User name</label>
					<input id="newAccName" type="text" required minLength="4" maxLength="10">
				</div>
				<div>
					<label for="newAccEmail">Email</label>
					<input id="newAccEmail" type="email" required>
				</div>
				<div>
					<label for="newAccPw">Password</label>
					<input id="newAccPw" type="password" required minLength="4" maxLength="10">
				</div>
				<div>
					<label for="confirmNewPw">Confirm password</label>
					<input id="confirmNewPw" type="password" required minLength="4" maxLength="10">
				</div>
				<input type="submit" value="Done">
			</form>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
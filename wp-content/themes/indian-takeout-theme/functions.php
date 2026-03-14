cat > wp-content/themes/indian-takeout-theme/functions.php << 'EOF'
<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style') );
    wp_enqueue_script('custom_javascript0', get_stylesheet_directory_uri() . '/customElements.js');
    wp_enqueue_script_module('custom_javascript1', 'https://PrabKaurNijjar.github.io/UX308_A2/fab.js');
    wp_enqueue_script_module('custom_javascript2', 'https://PrabKaurNijjar.github.io/UX308_A2/chat.js');
}
EOF
<?php
/**
 * @package stock_refresher
 * @version 1.0
 */
/*
Plugin Name: Interval Stock Price Refresher
Description: This is a plugin which displays the hourly value of a stock symbol every 15 minutes.
Author: Michael Richardson
Version: 1.0
License: GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

/*
Stock Ticker is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

Stock Ticker is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with {Plugin Name}. If not, see {URI to Plugin License}.
*/


/*
* Enqueue the styling and scripts needed for the shortcode. Fon awesome is neeed
* for the icons and the js file is used for the updating of the stock prices.
*/
function wpst_ticker_shortcode_wp_enqueue_scripts_20170426() {
    wp_register_style( 'wpst-get-font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', array(), '1.0.0', 'all' );
    wp_register_script( 'wpst-get-ticker-script', plugins_url( '/js/stock-ticker.js', __FILE__ ), array( 'jquery' ), '1.0.0', 'all' );

}

add_action( 'wp_enqueue_scripts', 'wpst_ticker_shortcode_wp_enqueue_scripts_20170426' );

/*
* Setup the shortcode function. This function gets the ticker provided to the shortcode,
* by default it is AAPL, and creates an HTML block which will be updated by the
* js file included.
*/
function wpst_stock_ticker_20170426($atts){

  $a = shortcode_atts( array(
		'ticker' => 'AAPL',
    'exchange' => 'NASDAQ'
  ), $atts );

  $ticker = strtoUpper($a['ticker']);
  $exchange = strtolower($a['exchange']);

  ?>

  <div id="spinner__<?php echo $exchange . '__' . $ticker; ?>">
    <img src="<?php echo plugins_url( '/assets/loader.gif', __FILE__ ); ?>" />
  </div>
  <div class="wpst-ticker" id="<?php echo $exchange . '__' . $ticker; ?>" style="display:none;padding-top:30px;padding-bottom:30px;">
    <h3 style="margin-bottom:5px"><span id="symbol-name"></span> (<i><?php echo strtoupper($a['ticker']); ?></i>)<span id="quote-arrow" style="padding-left:15px;margin-bottom:10px"></span></h3>
    <div class="quote-<?php echo $more; ?>">
       <div id="quotes">
       </div>
    </div>
  </div>

  <?php

  /* Load all the require styles and scripts. */
  wp_enqueue_style( 'wpst-get-font-awesome' );
  wp_enqueue_script( 'wpst-get-ticker-script' );

}

add_shortcode('stock-refresher', 'wpst_stock_ticker_20170426');

?>

=== Interval Stock Price Refresher ===
Contributors: mprichardson
Tags: stock market, stock prices, live data
Requires at least: 2.5.0
Tested up to: 3.4
Stable tag: 1.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This is a plugin which displays the hourly value of a stock symbol every 15 minutes.

== Description ==

This plugin will create a widget, which will get the price of a stock, an display the price along with the name of the stock.

The plugin provides users with a shortcode to use on any page and post. The user provides the ticker value (eg. AAPL) and exchange (eg. NASDAQ). This is used to gather the data.

A few notes about the sections above:

*   "Contributors" mprichardson
*   "Tags" stock market, stock prices, live data
*   "Requires at least" 2.5.0
*   "Tested up to" 3.4


== Installation ==

This section describes how to install the plugin and get it working.

1. Upload `interval-stock-price-refresher.php` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Place `[stock-refresher exchange=nasdaq ticker=AAPL]` in your page or post, with 'AAPL' being the ticker you want the price for and 'nasdaq' being the exchange it belongs to.

== Use of a 3rd Party or external service ==

This plugin gets the data from our servers at https://api.simplestocks.io. Our servers gather data from various sources, all the data is validated and store the data in our own
databases. Future updates will see the use of a more advanced and friendlier API.

== Frequently Asked Questions ==

= Which stock prices can I get? =

At the moment, most of the stocks on the NASDAQ and NYSE. No commodities are supported yet.

= How many of these can I have per page? =

As many as you want.

== Screenshots ==

1. This is a screen shot of the Facebook stock screenshot-fb.png. 
2. This is a screen shot of the Apple Inc. stock.
3. This is a screen shot of the Snap Inc. stock.
4. This is a screen shot of the three stock prices on a page.

== Changelog ==

= 1.0 =
* Initial release of the plugin.

= 1.1 =
* Updated the api call to our servers. Now using our own servers and not the IP address anymore.

== Upgrade Notice ==

= 1.0 = 
This is the initial release. The upgrade will be coming soon with more functionality.

= 1.1 = 
Previous versions won't work as the last server is no longer functioning. Need to update to version 1.1 in order for proper functionality.

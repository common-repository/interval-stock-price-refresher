jQuery(function ($) {

    /*
    * Booleans used to verify when loading is complete
    */
    var div_arrow = false;
    var div_data = false;
    var div_heading = false;

    /*
    * Get the value of the ticker from the HTML
    */
    var tickers = document.getElementsByClassName("wpst-ticker");
    var ticker_arr = [];

    div_arrow = false;
    div_data = false;
    div_heading = false;

    for (var ii = 0; ii < tickers.length; ii++) {
      var id = tickers[ii].id;
      var data = id.split("__");

      var symbol = $('#' + id + ' i').text();
      ticker_arr.push([id, data[0], data[1]]);
    }

    for (var ii = 0; ii < ticker_arr.length; ii++) {
      var div_id = ticker_arr[ii][0];
      var exchange = ticker_arr[ii][1];
      var ticker = ticker_arr[ii][2];

      wpst_fecth_company_name(exchange, ticker, div_id);
      wpst_fecth_stock_data(ticker, div_id);
    }

    /*
    * Method which gets called by the interval function to update the prices
    */
    function wpst_ajax_call() {
      for (var ii = 0; ii < ticker_arr.length; ii++) {
        var div_id = ticker_arr[ii][0];
        var ticker = ticker_arr[ii][1];

        wpst_fecth_stock_data(ticker, div_id);
      }
    };

    /*
    * Make an AJAX call to the server to get the company name from the
    * ticker
    */
    function wpst_fecth_company_name(exchange, symbol, id){
      $.ajax({
            url: "https://api.simplestocks.io/stock/name/" + exchange + "/" + symbol,
            type: "GET",
            success: function (data) {
                $('#' + id + ' #symbol-name').html(data['name']);
                div_heading = true;
                wpst_check_all_data(id);
            }
        });
    }

    /*
    * Make an AJAX call to the server to get the updated stock price
    */
    function wpst_fecth_stock_data(symbol, id){
      $.ajax({
            url: "https://api.simplestocks.io/stock/realtime/" + symbol,
            type: "GET",
            dataType: 'json',
            success: function (data) {
              if(data['success'] == true){
                data = data['data'];
                var html = wpst_get_data(data["current_price"], data["change"], data["time"])
                $('#' + id + ' #quotes').html(html);
                div_data = true;
                var arrow = wpst_determine_arrow(data["change"]);
                $('#' + id + ' #quote-arrow').html(arrow);
                div_arrow = true;
                wpst_check_all_data(id);
              }
            }
        });
    }

    /*
    * Determine which arrow to use and what color based on the change
    */
    function wpst_determine_arrow(change){
      if (change < 0){
        var icon = 'fa fa-arrow-down';
        var color = '#FF0000'
      }
      else if (change > 0){
        var icon = 'fa fa-arrow-up';
        var color = '#006400'
      }
      else{
        var icon = 'fa fa-minus';
        var color = '#696969'
      }

      return $('<i class="' + icon + '" aria-hidden="true" style="color:' + color + ';"></i>');

    }

    /*
    * Format the data in HTML that can be added to the div created in php
    */
    function wpst_get_data(price, change, last_trade){
      return $('<b>' + price + '</b> | ' + change + '<br/><span style="font-size:12px;"><i><b>Last trade: </b></i><i>' + last_trade + '</i></span>');
    }

    /*
    * Check that all the data has loaded and make the loader hidden and the
    * data visible
    */
    function wpst_check_all_data(id){
      console.log(div_arrow, div_data, div_heading, id);
      if(div_arrow && div_data && div_heading){
        $('#spinner__' + id).hide();
        $('#' + id).show();
      }
    }

    /*
    * Run the AJAX call every 15 minutes
    */
    const minutes = 15;
    var interval = 1000 * 60 * minutes;

    setInterval(wpst_ajax_call, interval);

});

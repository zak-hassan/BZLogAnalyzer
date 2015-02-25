/*jslint  browser: true, white: true, plusplus: true */
/*global $: true */
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}
function myAutoComplete() {
    try{
    // Load countries then initialize plugin:
    $.ajax({
        url: 'http://54.235.212.123:8080/countryJSONP.php',
        dataType: 'jsonp'
    }).done(function (source) {
        //console.log("Source: "+ JSON.stringify(source));
        var countriesArray = $.map(source, function (value, key) { return { value: value, data: key }; }),
            countries = $.map(source, function (value) { return value; });

        // Setup jQuery ajax mock:
        $.mockjax({
            url: '*',
            responseTime:  200,
            response: function (settings) {
                //I added this to prevent scripts from colliding...
                if(!settings){
                    return false;
                }
                var query = settings.data.query,
                    queryLowerCase = query.toLowerCase(),
                    suggestions = $.grep(countries, function(country) {
                    console.log("queryLowerCase: " + queryLowerCase);
                    console.log("country: " + country);
                         return country.toLowerCase().indexOf(queryLowerCase) === 0;
                    }),
                    response = {
                        query: query,
                        suggestions: suggestions
                    };

                this.responseText = JSON.stringify(response);
            }
        });

   /*
      // Initialize ajax autocomplete:
        $('#locaxxxtion').autocomplete({
            serviceUrl: '/autosuggest/service/url',
            onSelect: function(suggestion) {
                $('#country-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });
    */
	        // Initialize autocomplete with local lookup:
	        $('#location').autocomplete({
	            lookup: countriesArray,
	            onSelect: function (suggestion) {
	             //   $('#country-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
	            }
	        });

	    });
}   catch(err){
         //console.log("Error in autocomplete: "+err);
    }

	}



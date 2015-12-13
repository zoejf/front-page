$(function() {
    console.log( "ready!" );
    $( "#start-date" ).datepicker();
    $( "#end-date" ).datepicker();

	var $results = $('#results');
	var source = $('#articles-template').html();
	var template = Handlebars.compile(source);

	var yearURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name=frontpage&pub.year=2012&api-key=d72291a45afc693bb3591b097d65b3c3:9:56852953';
	
	$('#dates').on('submit', function(event) {
		event.preventDefault();
		
		var start = $('#start-date').val().replace(/[\/]/g, '');
		var year = start.slice(4,8);
		start = start.slice(0,4);
		start = year + start;
		var end = $('#end-date').val().replace(/[\/]/g, '');
		year = end.slice(4,8);
		end = end.slice(0,4);
		end = year + end;
		console.log('start:', start, ' end: ', end);

		// var datesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name=front+page&begin_date=' + start + '&end_date=' + end + '&page=4&api-key=d72291a45afc693bb3591b097d65b3c3:9:56852953';
		var datesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=type_of_material=front+page&section_name=front+page&facet_field=source&begin_date=' + start + '&end_date=' + end + '&api-key=d72291a45afc693bb3591b097d65b3c3:9:56852953';
	
		$.get(datesURL, function (data) {
			var articleResults = data.response.docs;
			var sources = data.facets.source.terms;
			
			var articleHtml = template({ articles: articleResults });

			$results.empty();
			$results.append(articleHtml);
		});
	}); 	 

});
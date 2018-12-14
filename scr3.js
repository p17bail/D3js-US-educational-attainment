//Regular pie chart example
nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true);

    d3.select("#chart svg")
        .datum(exampleData())
        .transition().duration(350)
        .call(chart);

  return chart;
});

//Donut chart example
nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true)     //Display pie labels
      .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
      .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
      .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
      .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
  .growOnHover(false)
      ;

    d3.select("#chart2 svg")
        .datum(exampleData())
        .transition().duration(350)
        .call(chart);

  return chart;
});

//Pie chart example data. Note how there is only a single array of key-value pairs.
function exampleData() {
  return  [
      { 
        "label": "Μηλιές",
        "value" : 12697
      } , 
      { 
        "label": "Αχλαδιές",
        "value" : 7973
      } , 
      { 
        "label": "Ροδακινιές",
        "value" : 20550
      } , 
      { 
        "label": "Βερικοκιές",
        "value" : 8362
      } , 
      { 
        "label": "Κερασιές",
        "value" : 15162
      } , 
      { 
        "label": "Πορτοκαλιές",
        "value" : 53982
      } , 
      { 
        "label": "Λεμονιές",
        "value" : 22724
      } , 
      { 
        "label": "Μικρόκαρπα εσπεριδοειδή",
        "value" : 17070
      },
	  { 
        "label": "Ελιές",
        "value" : 463889
      }
    ];
}

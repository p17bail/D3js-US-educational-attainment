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
        "label": "Ιταλία",
        "value" : 753.5
      } , 
      { 
        "label": "Γερμανία",
        "value" : 504.8
      } , 
      { 
        "label": "Κύπρος",
        "value" : 456.3
      } , 
      { 
        "label": "Τουρκία",
        "value" : 449.3
      } , 
      { 
        "label": "Λίβανος",
        "value" : 364.4
      } , 
      { 
        "label": "Βουλγαρία",
        "value" : 318.3
      } , 
      { 
        "label": "Ην.Βασίλειο",
        "value" : 259.1
      } , 
      { 
        "label": "Αίγυπτος",
        "value" : 255.3
      },
	  { 
        "label": "ΗΠΑ",
        "value" : 240.0
      }
    ];
}

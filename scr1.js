// Tutorial: http://frameworkish.com/html/2016/05/04/grouped-dynamic-bar-chart-d3.html
var data = [
  {
    gender: 'Αρρενες',
    stats: [269.4,250.1,292.7,1137.1,1435.7]
  },
  {
    gender: 'Θηλες',
    stats: [277.8,245.7,282.5,1110.7,1536.4]
  },

];

var ids = [ 'highchooler', 'youngAdult', 'adult', 'middleAge','seniorsAge'];
var ageNames = ['15 to 19 Years', '20 to 24 Years', '25 to 29 Years', '30 to 44 Years', '45 to 64 Years',];

// Let's populate the categoeries checkboxes
d3.select('.categories').selectAll('.checkbox')
  .data(ids)
  .enter()
  .append('div')
  .attr('class', 'checkbox')
  .append('label').html(function(id, index) {
    var checkbox = '<input id="' + id + '" type="checkbox" class="category">';
    return checkbox + ageNames[index];
  });

// some variables declarations
var margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// the scale for the gender age value
var x = d3.scale.linear().range([0, width]);

// the scale for each gender
var y0 = d3.scale.ordinal().rangeBands([0, height], .1);
// the scale for each gender age
var y1 = d3.scale.ordinal();

// just a simple scale of colors
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

//
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.format(".2s"));

var yAxis = d3.svg.axis()
    .scale(y0)
    .orient("left");

var svg = d3.select(".graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.select('.categories').selectAll('.category').on('change', function() {
  var x = d3.select('.categories').selectAll('.category:checked');
  var ids = x[0].map(function(category) {
    return category.id;
  });
  updateGraph(ids);
});
renderGraph();

function renderGraph() {
  x.domain([0, 0]);
  // y0 domain is all the gender names
  y0.domain(data.map(function(d) { return d.gender; }));
  // y1 domain is all the age names, we limit the range to from 0 to a y0 band
  y1.domain(ageNames).rangeRoundBands([0, y0.rangeBand()]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
}

function updateGraph(selectedIds) {

  var gendersData = data.map(function(genderData) {
    return {
      gender: genderData.gender,
      ages: selectedIds.map(function(selectedId) {
        var index = ids.findIndex(function(id) {
          return selectedId === id;
        });
        return {
          id: ids[index],
          name: ageNames[index],
          value: genderData.stats[index]
        };
      })
    }
  });


  // x domain is between 0 and the maximun value in any ages.value
  x.domain([0, d3.max(gendersData, function(d) { return d3.max(d.ages, function(d) { return d.value }); })]);
  // y0 domain is all the gender names
  y0.domain(gendersData.map(function(d) { return d.gender; }));
  // y1 domain is all the age names, we limit the range to from 0 to a y0 band
  y1.domain(ids).rangeRoundBands([0, y0.rangeBand()]);

  svg.selectAll('.axis.x').call(xAxis);
  svg.selectAll('.axis.y').call(yAxis);

  var gender = svg.selectAll(".gender")
    .data(gendersData);

  gender.enter().append("g")
    .attr("class", "gender")
    .attr("transform", function(d) { return "translate(0, " + y0(d.gender) + ")"; });

  var age = gender.selectAll("rect")
    .data(function(d) { return d.ages; });

  // we append a new rect every time we have an extra data vs dom element
  age.enter().append("rect")
    .attr('width', 0);

  // this updates will happend neither inserting new elements or updating them
  age
    .attr("x", 0)
    .attr("y", function(d, index) { return y1(ids[index]); })
    .attr("id", function(d) { return d.id; })
    .style("fill", function(d) { return color(d.name); })
    .text(function(d) { return d.name })
    .transition()
    .attr("width", function(d) { return x(d.value); })
    .attr("height", y1.rangeBand());

  age.exit().transition().attr("width", 0).remove();

  var legend = svg.selectAll(".legend")
      .data(gendersData[0].ages.map(function(age) { return age.name; }));

  legend.enter().append("g");
  legend
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + (200 + i * 20) + ")"; });

  
  var legendText = legend.selectAll('.legend-text').data(function(d) { return [d]; });;

  legendText.enter().append("text");
  legendText
    .attr('class', 'legend-text')
    .attr("x", width - 100)
    .attr("y", 9)
    .attr("dy", ".32em")
    .style("text-anchor", "all")
    .text(function(d) { return d; });

  legend.exit().remove();
}

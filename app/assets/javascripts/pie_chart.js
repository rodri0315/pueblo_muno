function pieChart(target, dataset, group) {
  var dataset = JSON.parse(dataset);
  var chart = '#chart-' + target;

  var width = width();
  var height = height();
  var radius = Math.min(width, height) / 2;
  var donutWidth = Math.min(width, height)/5;

  // functions for dynamic values
  function width() {
    return $(chart).prev().width();
  };
  function height() {
    return $(window).width() > 768 ? 300 : 200;
  };

  if (group == "name") {
    var colors = ['#D25F5B', '#777', '#4D90FE', '#0F9D58', '#8B69C8'];
  } else if (group == "reach") {
    var colors = ['#D25F5B', '#8B69C8', '#F4B400', '#0F9D58', '#4D90FE'];
  };

  // var color = d3.scale.category20();
  var color = d3.scale.ordinal()
    .range(colors);

  $(chart).replaceWith("<div id='chart-"+target+"'></div>");

  var svg = d3.select(chart)
    .append('svg')
    .attr('width', width)
    .attr('height', height+32)
    .append('g')
    .attr('transform', 'translate(' + (width/2) +  ',' + ((height+32)/2) + ')');

  var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - donutWidth);

  var pie = d3.layout.pie()
    .value(function(d) { return d.num; })
    .sort(null);

  var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      return color(d.data.str);
    });

  // This if for the hover effects
  path.on('mouseover', function(d) {
    var total = d3.sum(dataset.map(function(d) {
      return d.num;
    }));
    var percent = Math.round(1000 * d.data.num / total) / 10;
    tooltip.select('.label').html(d.data.str);
    // tooltip.select('.count').html(d.data.num);
    tooltip.select('.percent').html(percent + '%');
    tooltip.style('display', 'block');
  });

  path.on('mouseout', function(d) {
    tooltip.style('display', 'none');
  });


  // Hover effect stuff
  var tooltip = d3.select(chart)
    .append('div')
    .attr('class', 'tooltip');

  tooltip.append('div')
    .attr('class', 'label');

  // tooltip.append('div')
  //   .attr('class', 'count');

  tooltip.append('div')
    .attr('class', 'percent');
}

Template.home.rendered = function () {

    var svg = dimple.newSvg("#pieChartContainer", "100%", 400);
    var svg2 = dimple.newSvg("#lineChartContainer", "100%", 400);


    var data = initialData;
    var dataForCrossFilter = initialData;
    var payments = crossfilter(dataForCrossFilter);

    var paymentsByType = payments.dimension(function(d) { return d.type; }),
        paymentVolumeByType = paymentsByType.group().reduceSum(function(d) { return d.total; }),
        types = paymentVolumeByType.all();

    var paymentsByQuantity = payments.dimension(function(d) { return d.quantity; }),
        paymentVolumeByQuantity = paymentsByQuantity.group().reduceSum(function(d) { return d.total; }),
        quantities = paymentVolumeByQuantity.all();

    var dataForLineChart = dimple.filterData(data, "type", ["tab", "visa", "cash"]);

    var dataForChart = [types, quantities];

    var myChart = new dimple.chart(svg, dataForChart[0]);
    myChart.setBounds(20, 20, 460, 360)
    myChart.addMeasureAxis("p", "value");
    myChart.addSeries("key", dimple.plot.pie);
    myChart.addLegend(500, 20, 90, 300, "left");
    myChart.draw();

    var myChart2 = new dimple.chart(svg2, dataForLineChart);
    myChart2.setBounds(60, 30, 505, 305);
    var x = myChart2.addCategoryAxis("x", "date");
    x.addOrderRule("Date");
    myChart2.addMeasureAxis("y", "total");
    var s = myChart2.addSeries(null, dimple.plot.area);
    myChart2.draw();

    function updateChart(dataIndex){
        myChart.data = dataForChart[dataIndex];
        myChart.draw(100, false);

    }

    function triggerChange(ev){
        updateChart(this.getAttribute('value'));
    }

    d3.select("#ByType").on('click', triggerChange);
    d3.select("#ByQuantity").on('click', triggerChange);


}

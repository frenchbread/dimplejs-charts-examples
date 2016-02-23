if (Meteor.isClient) {

    Template.hello.rendered = function () {

        var svg = dimple.newSvg("#pieChartContainer", 590, 400);
        var svg2 = dimple.newSvg("#lineChartContainer", 590, 400);


        var initialData = [
            {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-15T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-16T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
            {date: "2011-11-17T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
            {date: "2011-11-18T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"},
            {date: "2011-11-19T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab"},
            {date: "2011-11-20T16:54:06Z", quantity: 1, total: 100, tip: 0, type: "cash"},
            {date: "2011-11-21T16:58:03Z", quantity: 2, total: 90, tip: 0, type: "tab"},
            {date: "2011-11-22T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab"},
            {date: "2011-11-23T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
            {date: "2011-11-23T17:25:45Z", quantity: 2, total: 200, tip: 0, type: "cash"},
            {date: "2011-11-25T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa"}
        ];


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

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

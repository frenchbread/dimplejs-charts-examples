Template.main.created = function () {

    var arr = [
        { Animal: "Cats", Value: (Math.random() * 1000000) },
        { Animal: "Dogs", Value: (Math.random() * 1000000) },
        { Animal: "Mice", Value: (Math.random() * 1000000) }
    ];

    this.dataSet = new ReactiveVar(arr);

};

Template.main.rendered = function () {
    
    var data = this.dataSet.get();

    var svg = dimple.newSvg("#barChartContainer", 590, 400);
    var svg2 = dimple.newSvg("#pieChartContainer", 590, 400);
    
    var barChart = new dimple.chart(svg, data);
    barChart.setBounds(60, 30, 510, 305);
    var x = barChart.addCategoryAxis("x", "Animal");
    x.addOrderRule(["Cats", "Dogs", "Mice"]);
    barChart.addMeasureAxis("y", "Value");
    barChart.addSeries(null, dimple.plot.bar);
    barChart.draw();

    var pieChart = new dimple.chart(svg2, data);
    pieChart.setBounds(20, 20, 460, 360)
    pieChart.addMeasureAxis("p", "Value");
    pieChart.addSeries("Animal", dimple.plot.pie);
    pieChart.addLegend(500, 20, 90, 300, "left");
    pieChart.draw();

    d3.select("#btn").on("click", function() {

        var newData = [
            {Animal: "Cats", Value: (Math.random() * 1000000)},
            {Animal: "Dogs", Value: (Math.random() * 1000000)},
            {Animal: "Mice", Value: (Math.random() * 1000000)}
        ];

        barChart.data = newData;
        barChart.draw(1000);

        pieChart.data = newData;
        pieChart.draw(1000);
    });

};

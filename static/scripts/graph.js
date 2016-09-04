$(function($){

    var graphs = $('.graph');
    for (var g = 0; g < graphs.length; g++) {
        var graphDom = graphs[g];

        let data = JSON.parse(graphDom.attributes.data.value);

        var graph = {
            labels: [],
            series: [[], []]
        };

        var totalHeight = Math.max.apply(null, data) + Math.min.apply(null, data);
        if (!totalHeight) totalHeight = 1;

        for (var i = 0; i < 50; i++) {
            graph.labels.push('');
            graph.series[0].push(totalHeight);
        }

        if (data.length < 50) {
            for (var i = 0; i < 50 - data.length; i++) graph.series[1].push('');
        }

        for (var i = 0; i < data.length; i++) graph.series[1].push(data[i]);

        var options = {
            seriesBarDistance: 0,
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };
        new Chartist.Bar(graphDom, graph, options);
    }
});

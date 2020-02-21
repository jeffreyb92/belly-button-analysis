var metadata=[];
var samples = [];

function init() {
    d3.json("../../data/samples.json").then((data) => {
        
        for (i=0; i< data.metadata.length; i++) {
            metadata.push(data.metadata[i]);
        // console.log(metadata.length);
        }
        for (i=0; i < data.samples.length; i++) {
            samples.push(data.samples[i]);
        }
    });
}

function second() {
    metadata.forEach((obj) => {
        var options = d3.select("#selID").append("option");
        options.text(`${obj.id}`).attr("value", `${obj.id}`);
    }) 
    d3.select("#demoid").text(`ID: ${metadata[0].id}`);
    d3.select("#demoethnic").text(`Ethnicity: ${metadata[0].ethnicity}`);
    d3.select("#demogender").text(`Gender: ${metadata[0].gender}`);
    d3.select("#demoage").text(`Age: ${metadata[0].age}`);
    d3.select("#demoloc").text(`Location: ${metadata[0].location}`);
    d3.select("#demobb").text(`BBtype: ${metadata[0].bbtype}`);
    d3.select("#demowfreq").text(`Wfreq: ${metadata[0].wfreq}`);

    //FIRST PLOT
    var trace1 = {
        x: samples[0].sample_values.slice(0,10),
        y: samples[0].otu_ids.slice(0,10).map(val => `OTU ${val}`),
        type: "bar",
        orientation: "h",
        name: "Belly Button Samples",
        text: samples[0].otu_labels.slice(0,10)
      };
    
      // Create the data array for the plot
      var data = [trace1];
    
      // Define the plot layout
      var layout = {
        xaxis: { title: "Values" },
        yaxis: { title: "Otu Names" }
      };
    
      // Plot the chart to a div tag with id "plot"
      Plotly.newPlot("firstplot", data, layout);

      //BUBBLE PLOT
      var trace3 = {
        x: samples[0].otu_ids,
        y: samples[0].sample_values,
        mode: "markers",
        marker: {
            size:samples[0].sample_values,
            color: samples[0].otu_ids
        },
        name: "Belly Button Samples",
        text: samples[0].otu_labels
      };
    
      // Create the data array for the plot
      var data = [trace3];
    
      // Define the plot layout
      var layout = {
        xaxis: { title: "OTU ID" },
      };
    
      // Plot the chart to a div tag with id "plot"
      Plotly.newPlot("bubbleplot", data, layout);

      //GAUGE PLOT
      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: metadata[0].wfreq,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color: "lightgray" },
              { range: [1, 2], color: "gray" },
              { range: [2, 3], color: "lightgray" },
              { range: [3, 4], color: "gray" },
              { range: [4, 5], color: "lightgray" },
              { range: [5, 6], color: "gray" },
              { range: [6, 7], color: "lightgray" },
              { range: [7, 8], color: "gray" },
              { range: [8, 9], color: "lightgray" },
            ],
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('accelplot', data, layout);

}
// console.log(metadata);
// console.log(samples);

init();
second();

d3.selectAll("#selID").on("change", updateInterface);

function updateInterface() {
    console.log("This is working");
    var dropdownValue = d3.select("#selID");
    var valueChange = dropdownValue.node().value;

    //DEMOGRAPHIC UPDATE
    metadata.forEach((obj) => {
        if (obj.id == valueChange) {
            d3.select("#demoid").text(`ID: ${obj.id}`);
            d3.select("#demoethnic").text(`Ethnicity: ${obj.ethnicity}`);
            d3.select("#demogender").text(`Gender: ${obj.gender}`);
            d3.select("#demoage").text(`Age: ${obj.age}`);
            d3.select("#demoloc").text(`Location: ${obj.location}`);
            d3.select("#demobb").text(`BBtype: ${obj.bbtype}`);
            d3.select("#demowfreq").text(`Wfreq: ${obj.wfreq}`);
        };
    });

    //FIRST PLOT UPDATE
    var x=[];
    var y=[];
    samples.forEach((obj) => {
        if (obj.id == valueChange) {
            x = obj.sample_values.slice(0,10);
            y = obj.otu_ids.slice(0,10).map(val => `OTU ${val}`);
            
        }
    })
    Plotly.restyle("firstplot","x", [x]);
    Plotly.restyle("firstplot","y", [y]);
};
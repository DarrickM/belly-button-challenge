
// variables for data
let metadataV = []
let samplesV = []
let namesV = []

let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
d3.json(url).then(function(data) {
    metadataV = data.metadata;
    samplesV = data.samples;
    namesV = data.names;

    // add dropdown menu ids
    dropDownMenu(data.samples);
});

function dropDownMenu(samples){
    // assign dropdown menu ids
    let dropMenu = d3.select("#selDataset");
    
    // loop through the samples
    for (let i=0; i<samples.length; i++){
        // add sample id to the dropdown menu
        dropMenu.append("option")
            .attr("value", samples[i].id)
            .text(samples[i].id);
    }
    // startup plots
    metadataF(namesV[0]);
    barChartF(namesV[0]);
    bubbleChartF(namesV[0]);
}

// bar chart function
function barChartF(sample) {

    //filter to sample id
    let value = samplesV.filter(result => result.id == sample);

    let vData = value[0];
    console.log(vData)

    let ids = vData.otu_ids;
    let otuLabels = vData.otu_labels;
    let sValues = vData.sample_values;

    // print to console
    console.log(ids,otuLabels,sValues);

    // set top ten and create bar chart
    let yticks = ids.slice(0,10).map(id => `OTU ${id}`).reverse();
    let xticks = sValues.slice(0,10).reverse();
    let labels = otuLabels.slice(0,10).reverse();
        
    
    let trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: "bar",
        orientation: "h"
    };

   
    let layout = {
        title: "Top 10 OTUs"
    };


    Plotly.newPlot("bar", [trace], layout)
}

// bubble chart function
function bubbleChartF(sample) {

    //filter to sample id
    let value = samplesV.filter(result => result.id == sample);

    let vData = value[0];

    let ids = vData.otu_ids;
    let otuLabels = vData.otu_labels;
    let sValues = vData.sample_values;

    // print to console
    console.log(ids,otuLabels,sValues);   

    // create the bubble chart
    let trace1 = {
        x: ids,
        y: sValues,
        text: otuLabels,
        mode: "markers",
        marker: {
        size: sValues,
            color: ids,
            colorscale: "twilight"
        }
    };

    let layout = {
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
    };

    Plotly.newPlot("bubble", [trace1], layout)
};

// metadata info function
function metadataF(sample) {

    // filter based on sample
    let value = metadataV.filter(result => result.id == sample);


    console.log(value)

   
    let vData = value[0];

    // Clear out metadata
    d3.select("#sample-metadata").html("");

    // add metadata to the panel
    Object.entries(vData).forEach(([key,value]) => {

        console.log(key,value);

        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
};

// dropdown update function
function optionChanged(value) { 

    
    console.log(value); 

    // update chart/metadata functions
    metadataF(value);
    barChartF(value);
    bubbleChartF(value);
};

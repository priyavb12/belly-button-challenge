// // Build the metadata panel
// function buildMetadata(sample) {
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

//     // get the metadata field
//       console.log(data.names);

//     // Filter the metadata for the object with the desired sample number


//     // Use d3 to select the panel with id of `#sample-metadata`


//     // Use `.html("") to clear any existing metadata


//     // Inside a loop, you will need to use d3 to append new
//     // tags for each key-value in the filtered metadata.

//   });
// }

// // function to build both charts
// function buildCharts(sample) {

// function init(){
  
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the samples field
   
    // Filter the samples for the object with the desired sample number
    
    // Get the otu_ids, otu_labels, and sample_values
  

    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart


// // Function to run on page load
// function init() {
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

//   });
// }

// // Function for event listener
// function optionChanged(newSample) {
//   // Build charts and metadata panel each time a new sample is selected

// }

// // Initialize the dashboard
// init();

function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let samples = data.samples;
    let resultArray = samples.filter((sampleDictionary) => sampleDictionary.id == sample);
    let result = resultArray[0];


    let otuIDs = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0},
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
      margin: {t: 30}
    };
    let bubbleData = [
      {
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIDs,
          colorscale: "Earth"
        }
      }
    ]

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    let yticks = otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barData = [
      {
        y: yticks,
        x: sampleValues.slice(0,10).reverse(),
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }
    ]

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150}
    }

    Plotly.newPlot("bar", barData, barLayout)
  });
}

function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let metadata = data.metadata;

    let resultArray = metadata.filter(sampleDictionary => sampleDictionary.id == sample);

    let result = resultArray[0];

    let PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    for(key in result) {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
    }

    //BONUS
    buildGauge(result.wfreq);

  })
}


function init(){
  let selector = d3.select("#selDataset");
  
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the samples field
    let sampleNames = data.names;

    // Filter the samples for the object with the desired sample number
    for(let i = 0; i<sampleNames.length; i++){
      selector.append("option").text(sampleNames[i]).property("value",sampleNames[i]);
    }

    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  })
}

function optionChanged(newSample){
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();
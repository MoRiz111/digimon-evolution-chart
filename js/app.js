import {
    renderInitialDigimons
} from "./graph.js";


const chart =
    document.getElementById("chart");


const resetButton =
    document.getElementById("resetButton");


const expandedDigimons =
    new Set();


function handleDigimonClick(digimonId) {

    if (expandedDigimons.has(digimonId)) {

        expandedDigimons.delete(digimonId);

    } else {

        expandedDigimons.add(digimonId);

    }


    renderChart();
}


function renderChart() {

    renderInitialDigimons(
        chart,
        handleDigimonClick,
        expandedDigimons
    );

}


resetButton.addEventListener(
    "click",
    () => {

        expandedDigimons.clear();

        renderChart();

    }
);


renderChart();
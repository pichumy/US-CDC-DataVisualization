# CDC Data Visualization

The goal of this project is to display information provided by the CDC (Center for Disease Control and Prevention) in the United States in an interesting way that may lead to insights about what is happening in the country. The data provided will give insight into mortality rates in different states, as well as a breakdown of the leading causes of death within the state. If time allows, the project will be expanded to do break-downs by county as well.

# Functionality & MVP

In CDC-Data-Visualization, users will be able to see a heat map of the united states colored based on the mortality rate in individual states. There will be a toggle feature for flat mortality as well as the mortality rate.

Clicking on an individual state will reveal a breakdown within that state on causes of mortality.

If time allows, additional functionality will be provided for seeing breakdowns by county, as well as an overall mortality rate for the entire country / major causes for the entire country.

# Architecture and Technologies

This project will be implemented with the following technologies:

* A node.js server to prevent cross domain errors while using D3.
* D3, a library for creating data visualization graphics in javascript
* topojson, a library that contains functionality to create maps of various geographic locations
* Webpack, to bundle up and serve various scripts (Maybe not needed!)

# Implementation Timeline

Day 1: Learn how to use D3 and topojson, attempt to create map of the United States and color it. Finish basic heat map of break-down by state.

Day 2: Acquire expanded data on mortality breakdown by cause, figure out how to map that in a way that will lead to a pie chart popping up when clicking on the state.

Day 3: Any unfinished things, styling, additional functionality if time allows.

Day 4: I probably won't have time for a day 4...

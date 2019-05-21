class WeatherHubWidget {
    constructor(weatherStationId, weatherHubServer, widgetContainer) {
        this.labelColor = "#000000";
        this.avgWindColor = "#27AAE1";
        this.gustColor = "#F03153";
        this.weatherStationId = weatherStationId;
        this.weatherHubServer = weatherHubServer;
        this.widgetContainer = widgetContainer;
        this.addSubWidgets();
        this.positionSubWidgets();
        this.initialiseSubWidgets();
    }
    addSubWidgets() {
        this.innerContainer = document.createElement('div');
        this.innerContainer.style.position = 'relative';
        this.windRoseContainer = document.createElement("div");
        this.windRoseContainer.style.position = 'absolute';
        this.innerContainer.appendChild(this.windRoseContainer);
        this.windStrengthContainer = document.createElement("div");
        this.windStrengthContainer.style.position = 'absolute';
        this.innerContainer.appendChild(this.windStrengthContainer);
        this.widgetContainer.appendChild(this.innerContainer);
    }
    positionSubWidgets() {
        this.windRoseContainer.style.width = "600px";
        this.windRoseContainer.style.height = "600px";
        this.windStrengthContainer.style.width = "900px";
        this.windStrengthContainer.style.height = "300px";
        this.windStrengthContainer.style.left = "610px";
    }
    initialiseSubWidgets() {
        this.windRose = new WindRose(this.windRoseContainer, this.labelColor, this.gustColor, this.labelColor);
        let windStrengthSeries = [
            {
                color: this.avgWindColor,
                label: '10 Min Avg Wind (mph)'
            },
            {
                color: this.gustColor,
                label: '10 Min Max Gust (mph)'
            },
        ];
        this.windStrengthChart = new TimeSeriesChart(this.windStrengthContainer, 24, windStrengthSeries, this.labelColor);
    }
}
//# sourceMappingURL=WeatherHubWidget.js.map
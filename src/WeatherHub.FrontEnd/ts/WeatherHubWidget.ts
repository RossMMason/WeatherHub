// import TimeSeriesChart, { SeriesInfo } from './TimeSeriesChart';
// import WindRose from './WindRose';

class WeatherHubWidget {
     
    private weatherStationId: string; 
    private weatherHubServer: string
    private widgetContainer: HTMLElement;    
    

    private innerContainer: HTMLDivElement;
    private windRoseContainer: HTMLDivElement;

    private labelColor = "#000000";

    private avgWindColor = "#27AAE1";

    private gustColor = "#F03153"

    private windRose: WindRose;

    private windStrengthChart: TimeSeriesChart;

    private windStrengthContainer: HTMLDivElement;

    constructor(
        weatherStationId: string,
        weatherHubServer: string,
        widgetContainer: HTMLElement) { 
        this.weatherStationId = weatherStationId;
        this.weatherHubServer = weatherHubServer;
        this.widgetContainer = widgetContainer;

        this.addSubWidgets();
        this.positionSubWidgets();
        this.initialiseSubWidgets(); 
    }

    private addSubWidgets() {
        this.innerContainer = document.createElement('div');
        this.innerContainer.style.position = 'relative';


        this.windRoseContainer = document.createElement("div") as HTMLDivElement;
        this.windRoseContainer.style.position = 'absolute';
        this.innerContainer.appendChild(this.windRoseContainer);

        this.windStrengthContainer = document.createElement("div") as HTMLDivElement;
        this.windStrengthContainer.style.position = 'absolute';
        this.innerContainer.appendChild(this.windStrengthContainer);
        

        this.widgetContainer.appendChild(this.innerContainer);
    }

    private positionSubWidgets() {
        this.windRoseContainer.style.width = "600px";
        this.windRoseContainer.style.height = "600px";

        this.windStrengthContainer.style.width = "900px"
        this.windStrengthContainer.style.height = "300px"
        this.windStrengthContainer.style.left = "610px";
    }

    private initialiseSubWidgets() {
        this.windRose = new WindRose(this.windRoseContainer, this.labelColor, this.gustColor, this.labelColor);

        let windStrengthSeries: SeriesInfo[] = [
            {
                color: this.avgWindColor,
                label: '10 Min Avg Wind (mph)'
            },
            {
                color: this.gustColor,
                label: '10 Min Max Gust (mph)'
            },
        ]

        this.windStrengthChart = new TimeSeriesChart(this.windStrengthContainer, 24, windStrengthSeries, this.labelColor);
    }
}


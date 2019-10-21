import * as signalR from "@aspnet/signalr";
import { StationReadingDto, StationStatisticsDto } from "./Types";


export default class StationUpdateHub {

    private connection: signalR.HubConnection;
    private newReadingCallbacks: ((stationReading: StationReadingDto) => void)[];
    private statisticsUpdatedCallbacks: ((statistics: StationStatisticsDto) => void)[];
    private stationId: string;

    constructor(stationId, weatherHubServer) {

        this.stationId = stationId;

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(weatherHubServer + "/hubs/station-update-hub")
            .build();

        this.statisticsUpdatedCallbacks = [];
        this.newReadingCallbacks = [];

        this.connection.on("newStationReading", this.newStationReading.bind(this));
        this.connection.on("updatedStationStatistics", this.statisticsUpdated.bind(this));

        this.connection
            .start()
            .then(() => {
                this.connection
                    .send("subscribeToStationReadingUpdates", stationId)
                    .catch(err => {
                        console.log(err);
                    });
                this.connection
                    .send("subscribeToStationStatisticUpdates", stationId)
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
            console.log(err);
            })
    }

    public onNewReading(callback: (stationReading: StationReadingDto) => void){
        this.newReadingCallbacks.push(callback);
    }

    public onStatisticsUpdated(callback: (statistics: StationStatisticsDto) => void) {
        this.statisticsUpdatedCallbacks.push(callback);
    }

    private newStationReading(stationId: string, stationReading: StationReadingDto) {
        for (let i = 0; i < this.newReadingCallbacks.length; i++) {
            this.newReadingCallbacks[i](stationReading);
        }
    }

    private statisticsUpdated(stationId: string, statistics: StationStatisticsDto) {
        for (let i = 0; i < this.statisticsUpdatedCallbacks.length; i++) {
            this.statisticsUpdatedCallbacks[i](statistics);
        }
    }
}

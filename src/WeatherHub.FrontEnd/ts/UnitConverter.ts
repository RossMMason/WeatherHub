import { WindUnits, TemperatureUnits } from "./Types";

export default class UnitConverter {

    private windUnits: WindUnits;
    private temperatureUnits: TemperatureUnits

    constructor(
        windUnits: WindUnits,
        temperatureUnits: TemperatureUnits) {
        this.windUnits = windUnits;
        this.temperatureUnits = temperatureUnits;
    }

    public getTemperatureUnitsLabel() {
        return '&deg;' + this.temperatureUnits;
    }

    public getWindUnitsLabel() {
        return this.windUnits;
    }

    public getConvertedWindSpeed(speedInMph: number) {
        switch (this.windUnits) {
            case 'mph':
                return speedInMph;
            case 'kph':
                return speedInMph * 1.609344;
            case 'kts':
                return speedInMph * 0.868976242;
            default: 
                throw 'Unsupported wind units.'
        }
    }

    public getConvertedTemperature(temperatureInC: number) {
        switch (this.temperatureUnits) {
            case 'c':
                return temperatureInC;
            case 'f':
                return temperatureInC * 1.8 + 32;
            default:
                throw 'Unsupported temperature units.';
        }
    }
}
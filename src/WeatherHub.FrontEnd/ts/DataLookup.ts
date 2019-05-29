import { TimeIndexed } from './Types';

export default class DataLookup<T extends TimeIndexed> {

    private store: { [id: string]: T };

    constructor() {
        this.store = {};
    }

    public hasDataForDate(date: Date) {

        let key = this.getKey(date);

        return (key in this.store);
    }

    public addData(stationReading: T) {

        if (!stationReading) {
            return;
        }

        let key = this.getKey(stationReading.when);
        this.store[key] = stationReading;
    }

    public getData(date: Date): T | null {
        let key = this.getKey(date);

        if (key in this.store) {
            return this.store[key];
        }

        return null;
    }

    private getKey(date: Date): string {
        let key = date.toUTCString();
        return key;
    }
}

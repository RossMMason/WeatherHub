import {
    addHours, format, parse
} from 'date-fns';

export type WindUnits = 'mph' | 'kph' | 'kts';
export type TemperatureUnits = 'C' | 'F';

export interface WidgetSettings {
    primaryColor: string,
    secondaryColor: string,
    labelColor: string,
    windUnits: WindUnits,
    temperatureUnits: TemperatureUnits
}

export interface StationReading extends TimeIndexed  {
    id: string, 
    when: Date, 
    dewpointC: number, 
    heatIndexC: number,
    pressureMb: number,
    relativeHumidity: number,
    tempC: number,
    windDegrees: number,
    windAvgMph: number,
    windAvgGustMph: number,
    windChillC: number,
    rainCmPerHour: number,
    estimatedCloudBaseFt: number,
}

export interface StationReadingDto {
    id: string,
    when: string,
    dewpointC: number,
    heatIndexC: number,
    pressureMb: number,
    relativeHumidity: number,
    tempC: number,
    windDegrees: number,
    windAvgMph: number,
    windAvgGustMph: number,
    windChillC: number,
    rainCmPerHour: number,
    estimatedCloudBaseFt: number, 
}

export interface TimeIndexed {
    when: Date
}

export interface StationDayStatistics {
    id: string,
    date: Date, 
    dewpointHighC: number, 
    dewpointHighTime: Date,
    dewpointLowC: number, 
    dewpointLowTime: Date, 
    heatIndexHighC: number, 
    heatIndexHighTime: Date,  
    pressureHighMbar: number, 
    pressureHighTime: Date, 
    pressureLowMbar: number,
    pressureLowTime: Date,
    rainRateHighCmPerHour: number,  
    relativeHumidityHigh: number, 
    relativeHumidyHighTime: Date, 
    relativeHumidityLow: number, 
    relativeHumidyLowTime: Date,  
    tempHighC: number, 
    tempHighTime: Date,  
    tempLowC: number,  
    tempLowTime: Date,  
    totalRainCm: number,
    windChillLowC: number,  
    windChillLowTime: Date,  
    windHighMph: number, 
    windHighTime: Date 
}

export interface StationStatistics {
    dayStatistics: StationDayStatistics
    lastRain: Date | null
}

export interface StationStatisticsDto {
    dayStatistics: StationDayStatistics
    lastRain: Date | null
}

export interface StationDayStatisticsDto {
    id: string,
    date: string,
    dewpointHighC: number,
    dewpointHighTime: string,
    dewpointLowC: number,
    dewpointLowTime: string,
    heatIndexHighC: number,
    heatIndexHighTime: string,
    pressureHighMbar: number,
    pressureHighTime: string,
    pressureLowMbar: number,
    pressureLowTime: string,
    rainRateHighCmPerHour: number,
    relativeHumidityHigh: number,
    relativeHumidyHighTime: string,
    relativeHumidityLow: number,
    relativeHumidyLowTime: string,
    tempHighC: number,
    tempHighTime: string,
    tempLowC: number,
    tempLowTime: string,
    totalRainCm: number,
    windChillLowC: number,
    windChillLowTime: string,
    windHighMph: number,
    windHighTime: string
}

export class DtoConverter {
    public toStationReading(stationReadingDto: StationReadingDto) : StationReading {
        let stationReading: StationReading = {
            id: stationReadingDto.id,
            when: new Date(stationReadingDto.when),
            dewpointC: stationReadingDto.dewpointC,
            heatIndexC: stationReadingDto.heatIndexC,
            pressureMb: stationReadingDto.pressureMb,
            relativeHumidity: stationReadingDto.relativeHumidity,
            tempC: stationReadingDto.tempC,
            windDegrees: stationReadingDto.windDegrees,
            windAvgMph: stationReadingDto.windAvgMph,
            windAvgGustMph: stationReadingDto.windAvgGustMph,
            windChillC: stationReadingDto.windChillC,
            rainCmPerHour: stationReadingDto.rainCmPerHour,
            estimatedCloudBaseFt: stationReadingDto.estimatedCloudBaseFt
        };

        return stationReading;
    }

    public toStationStatistics(stationStatisticsDto: StationStatisticsDto) : StationStatistics {
        let date = new Date(stationStatisticsDto.dayStatistics.date);
        let dateStr = format(date, 'YYYY-MM-DD');

        let stationDayStatistics: StationDayStatistics = {
            id: stationStatisticsDto.dayStatistics.id,
            date: date,
            dewpointHighC: stationStatisticsDto.dayStatistics.dewpointHighC,
            dewpointHighTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.dewpointHighTime),
            dewpointLowC: stationStatisticsDto.dayStatistics.dewpointLowC,
            dewpointLowTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.dewpointLowTime),
            heatIndexHighC: stationStatisticsDto.dayStatistics.heatIndexHighC,
            heatIndexHighTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.heatIndexHighTime),
            pressureHighMbar: stationStatisticsDto.dayStatistics.pressureHighMbar,
            pressureHighTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.pressureHighTime),
            pressureLowMbar: stationStatisticsDto.dayStatistics.pressureLowMbar,
            pressureLowTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.pressureLowTime),
            rainRateHighCmPerHour: stationStatisticsDto.dayStatistics.rainRateHighCmPerHour,
            relativeHumidityHigh: stationStatisticsDto.dayStatistics.relativeHumidityHigh,
            relativeHumidyHighTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.relativeHumidyHighTime),
            relativeHumidityLow: stationStatisticsDto.dayStatistics.relativeHumidityLow,
            relativeHumidyLowTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.relativeHumidyLowTime),
            tempHighC: stationStatisticsDto.dayStatistics.tempHighC,
            tempHighTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.tempHighTime),
            tempLowC: stationStatisticsDto.dayStatistics.tempLowC,
            tempLowTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.tempLowTime),
            totalRainCm: stationStatisticsDto.dayStatistics.totalRainCm,
            windChillLowC: stationStatisticsDto.dayStatistics.windChillLowC,
            windChillLowTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.windChillLowTime),
            windHighMph: stationStatisticsDto.dayStatistics.windHighMph,
            windHighTime: parse(dateStr + 'T' + stationStatisticsDto.dayStatistics.windHighTime),
        };

        let statistics: StationStatistics = {
            dayStatistics: stationDayStatistics,
            lastRain: stationStatisticsDto.lastRain
        }

        return statistics;
    }
}
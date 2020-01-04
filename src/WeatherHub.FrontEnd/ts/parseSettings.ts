import { WidgetSettings } from "./Types"

export const parseSettings = (settings: any) => {
    let parsedSettings: WidgetSettings = {
        primaryColor: '#27AAE1',
        secondaryColor: '#F03153',
        windUnits: 'mph',
        temperatureUnits: 'c'
    }

    let colorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/ig.compile();

    if (settings.primaryColor) {
        if (isString(settings.primaryColor)
            && colorRegex.test(settings.primaryColor)) {
            parsedSettings.primaryColor = settings.primaryColor
        } else {
            console.warn('Incorrect primary color provided. Using default value.')
        }
    }

    if (settings.secondaryColor) {
        if (isString(settings.secondaryColor)
            && colorRegex.test(settings.secondaryColor)) {
            parsedSettings.secondaryColor = settings.secondaryColor
        } else {
            console.warn('Incorrect secondary color provided. Using default value.')
        }
    }

    if (settings.windUnits) {
        switch (settings.windUnits) {
            case 'mph':
                parsedSettings.windUnits = 'mph';
                break;
            case 'kph':
                parsedSettings.windUnits = 'kph';
                break;
            case 'kts':
                parsedSettings.windUnits = 'kts';
                break;
            default:
                console.warn('Incorrect wind units provided. Using default value.')
        }
    }

    if (settings.temperatureUnits) {
        switch (settings.temperatureUnits) {
            case 'c':
                parsedSettings.temperatureUnits = 'c';
                break;
            case 'f':
                parsedSettings.temperatureUnits = 'f';
                break;
            default:
                console.warn('Incorrect temperature  units provided. Using default value.')
        }
    }

    return parsedSettings;
}

const isString = (value: any) => {
    return typeof value === 'string' || value instanceof String;
} 
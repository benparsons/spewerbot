import { ILogger, ConsoleLogger } from "matrix-bot-sdk";

export class LogWrapper implements ILogger {
    consoleLogger = new ConsoleLogger();
    public debug(module: string, ...messageOrObject: any[]) {
        this.consoleLogger.debug(module, ...messageOrObject);
    }

    public error(module: string, ...messageOrObject: any[]) {
        this.consoleLogger.error(module, ...messageOrObject);
    }

    public info(module: string, ...messageOrObject: any[]) {
        this.consoleLogger.info(module, ...messageOrObject);
    }

    public warn(module: string, ...messageOrObject: any[]) {
        this.consoleLogger.warn(module, ...messageOrObject);
    }

}
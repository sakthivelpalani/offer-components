/**
 * A logging utility helper to automatically print extra tags whenever something is logged like
 * Epoch Time, Context (Method Name), etc., It also automatically ensures that these messages
 * are not printed in production scenarios.
 */


class NoopLogger {
    debug(...msg) {
        this.doLog("DEBUG", ...msg);
    }

    warn(...msg) {
        this.doLog("WARN", ...msg);
    }

    info(...msg) {
        this.doLog("INFO", ...msg);
    }

    error(...msg) {
        this.doLog("ERROR", ...msg);
    }

    doLog(level, ...msg) {
        // Nothing to log
    }
}

let logger = new NoopLogger();

/*eslint-disable no-undef*/
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
    const StackTrace = require("stacktrace-js");

    /**
     * Appender to append all the logged messages to the browser's console.log. The main 
     * method *log* is threadsafe.
     */
    class ConsoleLogger extends NoopLogger {
        doLog(level, ...msg) {
            const {formatSpecifiers, args} = this.extrapolateMessage(level, msg);

            /*eslint-disable no-console*/
            switch (level) {
                case "ERROR": console.error(formatSpecifiers, ...args); break;
                case "WARN": console.warn(formatSpecifiers, ...args); break;
                case "INFO": console.info(formatSpecifiers, ...args); break;
                default: console.debug ? console.debug(formatSpecifiers, ...args) : console.log(formatSpecifiers, ...args); break;
            }
            /*eslint-enable no-console*/            
        }

        extrapolateMessage(level, msg) {
            const args = [];

            let formatSpecifiers = "";
            formatSpecifiers += this.appendLogLevel(level, args);
            formatSpecifiers += this.appendContext(args);
            formatSpecifiers += this.appendMessage(msg, args);

            return {formatSpecifiers, args};
        }

        appendLogLevel(level, args) {
            let bgColor = "#d1dade";
            switch (level) {
                case "INFO":  bgColor = "#1c84c6"; break;
                case "WARN":  bgColor = "#f8ac59"; break;
                case "ERROR":
                default:
                    bgColor = "#ed5565"; break;
            }

            args.push("background-color: " + bgColor + "; color: #5e5e5e; padding: 2px");
            args.push(level);
            args.push("background-color: #fff; color: #000");
            return "%c[%s]%c ";
        }

        appendContext(args) {
            const context = StackTrace.getSync()[3];
            let formatSpecifiers = "";
            if (!context || !context.functionName) {
                return formatSpecifiers;
            }

            // TODO: context has filename and line number also. We need to find a way in which the Console's Line 
            // Number printing logic can be changed to use this information
            // Check https://stackoverflow.com/a/41962518
            context.functionName.split(".").forEach((c) => {
                formatSpecifiers += "%c[%s]%c ";
                args.push("background-color: #1ab394; color: #fff; padding: 2px");
                args.push(c);
                args.push("background-color: #fff; color: #000");
            });

            return formatSpecifiers;
        }

        appendMessage(msgParts, args) {
            let formatSpecifiers = "";
            msgParts.forEach((m) => {
                if (typeof(m) == "object") {
                    formatSpecifiers += " %O ";
                } else if (m instanceof Element) {
                    formatSpecifiers += " %o ";
                } else if (m instanceof Number) {
                    formatSpecifiers += " %d ";
                } else {
                    formatSpecifiers += " %s ";
                }
                args.push(m);
            });

            return formatSpecifiers;
        }   
    }

    logger = new ConsoleLogger();
}
/*eslint-enable no-undef*/

export default logger;

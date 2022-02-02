const fs = require('fs');
const path = require('path');
const QrsInteract = require('qrs-interact');
const winston = require('winston');
const TimerQueue = require('timer-queue');

const args = require('yargs')
    .usage('Usage: $0 -i [path/to/icon/files] -c [content library name]')
    .example(
        'node $0 -i ./icons -c "My icons"',
        'Uploads icons in ./icons folder to content library named "My icons"'
    )
    .option('host', {
        demandOption: true,
        describe: 'Host name or IP of Qlik Sense server',
    })
    .option('cert', {
        demandOption: true,
        default: './cert/client.pem',
        describe: 'Path to certificate used when connecting to Qlik Sense',
    })
    .option('certkey', {
        demandOption: true,
        default: './cert/client_key.pem',
        describe: 'Path to certificate key used when connecting to Qlik Sense',
    })
    .option('iconfolder', {
        demandOption: true,
        describe: 'Path to directory where icon files are located',
    })
    .option('contentlibrary', {
        demandOption: true,
        describe: 'Name of Qlik Sense content library to which icons iwll be uploaded',
    })
    .option('loglevel', {
        demandOption: false,
        default: 'info',
        describe: 'Log level',
    })
    .option('upload-interval', {
        demandOption: false,
        default: 2000,
        describe: 'Time to wait between icon uploads (milliseconds)',
    })
    .option('upload-timeout', {
        demandOption: false,
        default: 5000,
        describe: 'Time to wait for upload to complete (milliseconds)',
    })
    .option('upload-retries', {
        demandOption: false,
        default: 5,
        describe: 'Number of retry attempts to make if an uploade fails',
    })
    .option('upload-retry-interval', {
        demandOption: false,
        default: 10000,
        describe: 'Time to wait between retry attempts (milliseconds)',
    })
    .epilogue(
        'for more information, please visit https://github.com/ptarmiganlabs/butler-icon-upload'
    )
    .wrap(140)
    .alias('h', 'help').argv;

// Retry counter. Used to keep track of how many upload attempts have been done for the file that's currently being processed
let attemptNumber = 1;

// Set up Sense repository service configuration
const configQRS = {
    hostname: args.host,
    certificates: {
        certFile: args.cert,
        keyFile: args.certkey,
    },
};

configQRS.headers = {
    'X-Qlik-User': 'UserDirectory=Internal; UserId=sa_repository',
    'Content-Type': 'png',
};

// Get app version from package.json file
const appVersion = require('./package.json').version;

const qrsInteractInstance = new QrsInteract(configQRS);
const iconFolderAbsolute = path.resolve(args.iconfolder);
const { contentlibrary } = args;

// Set up logger with timestamps and colors
// Set up logger with timestamps and colors, and optional logging to disk file
const logTransports = [];

logTransports.push(
    new winston.transports.Console({
        name: 'console',
        level: args.loglevel,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
    })
);

const logger = winston.createLogger({
    transports: logTransports,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
});

// Function to get current logging level
const getLoggingLevel = () => logTransports.find((transport) => transport.name === 'console').level;

// Upload queue
const tqueue = new TimerQueue({
    interval: args.uploadInterval,
    timeout: args.uploadTimeout,
    retry: args.uploadRetries,
    retryInterval: args.uploadRetryInterval,
    autostart: false,
});

tqueue.on('end', () => {
    logger.info('End of upload queue reached.');
});

tqueue.on('error', () => {
    logger.error('Failed uploading file even after retries.');
});

logger.info('--------------------------------------');
logger.info('Starting Qlik Sense icon uploader');
logger.info(`Log level: ${getLoggingLevel()}`);
logger.info(`App version: ${appVersion}`);
logger.info('--------------------------------------');

logger.debug(`QRS config: ${configQRS}`);
logger.info(`Using icons in folder: ${iconFolderAbsolute}`);
logger.info(`Uploading icons to Qlik Sense content library: ${contentlibrary}`);

logger.info(`Image upload interval: ${args.uploadInterval} (ms)`);
logger.info(`Image upload timeout: ${args.uploadTimeout} (ms)`);
logger.info(`Image upload retry count: ${args.uploadRetries}`);
logger.info(`Image upload retry interval: ${args.uploadRetryInterval} (ms)`);

function addFiles() {
    return new Promise((resolve, reject) => {
        // Loop through all the files in the source directory
        try {
            const files = fs.readdirSync(iconFolderAbsolute);
            // eslint-disable-next-line no-restricted-syntax
            for (const file of files) {
                // Get complete path for file
                const fileFullPath = path.join(iconFolderAbsolute, file);
                const fileStat = fs.statSync(fileFullPath);

                if (fileStat.isFile() && path.extname(file) === '.png') {
                    logger.verbose(`Add file to upload queue: ${file}`);

                    // eslint-disable-next-line no-loop-func
                    tqueue.push(() => {
                        const promise = new Promise((resolve2, reject2) => {
                            try {
                                logger.info(
                                    `Uploading file (attempt ${attemptNumber}): ${fileFullPath}`
                                );

                                const apiURL = `/contentlibrary/${encodeURIComponent(
                                    contentlibrary
                                )}/uploadfile?externalpath=${file}&overwrite=true`;

                                logger.debug(apiURL);
                                const fileData = fs.readFileSync(fileFullPath);
                                qrsInteractInstance
                                    .Post(apiURL, fileData, '	image/png')
                                    .then((result) => {
                                        logger.debug(`result=${JSON.stringify(result)}`);
                                        logger.verbose(`Done: ${file}`);
                                        attemptNumber = 1;
                                        resolve2();
                                    })
                                    .catch((err) => {
                                        // Return error msg
                                        logger.error(`${err}`);
                                        logger.error(
                                            `Will try ${args.uploadRetries} times with a ${args.uploadRetryInterval} ms pause in between retries.`
                                        );
                                        attemptNumber += 1;
                                        reject2(new Error('retry'));
                                    });
                            } catch (err2) {
                                // Return error msg
                                logger.error(
                                    `Error (2) uploading "${file}" to content library: ${err2}`
                                );
                                logger.error(err2);
                                reject2(new Error('retry'));
                            }
                        });
                        return promise;
                    });
                } else if (fileStat.isDirectory()) {
                    logger.verbose(`${fileFullPath} is a directory. Skipping.`);
                }
            }
            resolve();
        } catch (err) {
            logger.error('Could not list files in source directory: ', err);
            reject();
        }
    });
}

async function mainFunction() {
    await addFiles();
    logger.info(`${tqueue.queue.length} files added to upload queue`);
    tqueue.start();
}

mainFunction();

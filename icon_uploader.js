const fs = require('fs');
// var fs = require('fs-extra');
const path = require('path');
const QrsInteract = require('qrs-interact');
const config = require('config');
const winston = require('winston');
const TimerQueue = require('timer-queue');

// Set up Sense repository service configuration
const configQRS = {
    hostname: config.get('iconUploader.qrs.host'),
    certificates: {
        certFile: config.get('iconUploader.qrs.clientCertPath'),
        keyFile: config.get('iconUploader.qrs.clientCertKeyPath'),
    },
};

configQRS.headers = {
    'X-Qlik-User': 'UserDirectory=Internal; UserId=sa_repository',
    'Content-Type': 'png',
};

const args = require('yargs')
    .usage('Usage: $0 -i [path/to/icon/files] -c [content library name]')
    .example(
        'node $0 -i ./icons -c "My icons"',
        'Uploads icons in ./icons folder to content library named "My icons"'
    )
    .demandOption(['i', 'c'])
    .alias('i', 'iconfolder')
    .alias('c', 'contentlibrary')
    .alias('h', 'help').argv;

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
        level: config.get('iconUploader.logLevel'),
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

logger.debug(`QRS config: ${configQRS}`);
logger.info(`Using icons in folder: ${iconFolderAbsolute}`);
logger.info(`Uploading icons to Qlik Sense content library: ${contentlibrary}`);

// Upload queue
const tqueue = new TimerQueue({
    interval: 2000,
    timeout: 5000,
    retry: 5,
    retryInterval: 10000,
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

// Debug output of Node.js environment
logger.info(`NODE_CONFIG_DIR: ${config.util.getEnv('NODE_CONFIG_DIR')}`);
logger.info(`NODE_ENV: ${config.util.getEnv('NODE_ENV')}`);
logger.info(`NODE_CONFIG_ENV: ${config.util.getEnv('NODE_CONFIG_ENV')}`);

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
                                logger.info(`Uploading file: ${fileFullPath}`);

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
                                        resolve2();
                                    })
                                    .catch((err) => {
                                        // Return error msg
                                        logger.error(
                                            `Error (1) uploading "${file}" to content library: ${err}`
                                        );
                                        logger.error(`Will retry a few times..`);
                                        reject2(new Error('retry'));
                                    });
                            } catch (err) {
                                // Return error msg
                                logger.error(
                                    `Error (2) uploading "${file}" to content library: ${err}`
                                );
                                logger.error(`Will retry a few times..`);
                                reject2(new Error('retry'));
                            }
                        });
                        return promise;
                    });
                } else if (fileStat.isDirectory()) {
                    logger.verbose(`${fileFullPath} is a directory.`);
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
    logger.info('All files added to queue');
    tqueue.start();
}

mainFunction();

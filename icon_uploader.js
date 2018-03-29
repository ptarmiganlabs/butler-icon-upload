

const fs = require("fs");
const path = require("path");
var qrsInteract = require("qrs-interact");
var config = require("config");
var winston = require("winston");
const args = require("yargs")
  .usage("Usage: $0 -i [path/to/icon/files] -c [content library name]")
  .example('node $0 -i ./icons -c "My icons"', 'Uploads icons in ./icons folder to content library named "My icons"')
  .demandOption(['i','c'])
  .alias('i', 'iconfolder')
  .alias('c', 'contentlibrary')
  .alias('h', 'help')
  .argv;


// Set up logger with timestamps and colors
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true
    })
  ]
});


// Set specific log level (useful for debugging)
// Possible values are { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
// globals.logger.transports.console.level = 'info';
// logger.transports.console.level = 'verbose';
// logger.transports.console.level = 'debug';
// Default is to use log level defined in config file
logger.transports.console.level = config.get("iconUploader.logLevel");

logger.info("Starting Qlik Sense icon uploader");
logger.info("Log level is: " + logger.transports.console.level);


// Debug output of Node.js environment
logger.debug('NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR'));
logger.debug('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
logger.debug('NODE_CONFIG_ENV: ' + config.util.getEnv('NODE_CONFIG_ENV'));



// Set up Sense repository service configuration
var configQRS = {
  hostname: config.get("iconUploader.qrs.host"),
  certificates: {
    certFile: config.get("iconUploader.qrs.clientCertPath"),
    keyFile: config.get("iconUploader.qrs.clientCertKeyPath")
  }
};

configQRS.headers = { 
  'X-Qlik-User': 'UserDirectory=Internal; UserId=sa_repository',
  'Content-Type': 'jpeg' 
};

logger.debug(configQRS);

var qrsInteractInstance = new qrsInteract(configQRS);

var iconFolderAbsolute = path.resolve(args.iconfolder);
var contentlibrary = args.contentlibrary;

logger.info('Using icons in folder: ' + iconFolderAbsolute);
logger.info('Uploading icons to Qlik Sense content library: ' + contentlibrary);



function waitForSomeTime() {
  logger.debug('pausing...');
}

// Loop through all the files in the source directory
fs.readdir( iconFolderAbsolute, function( err, files ) {
  if( err ) {
    logger.error( "Could not list files in source directory.", err );
    process.exit( 1 );
  } 

  files.forEach( function( file, index ) {
    // Get complete path for file
    var fileToUpload = path.join( iconFolderAbsolute, file );

    fs.stat( fileToUpload, function( error, stat ) {
        if( error ) {
            console.error( "Error stating file " + iconFolderAbsolute, error );
            return;
        }

        if( stat.isFile() && path.extname(file)=='.png') {

          // Pause for a bit, to give the Qlik Sense repository time to process things
          setTimeout(waitForSomeTime, 1000);

          logger.info("Uploading file: " + fileToUpload);

          var apiURL = "/contentlibrary/" + contentlibrary + "/uploadfile?externalpath=" + file + "&overwrite=true";
          logger.debug(apiURL);

          var fileStream = fs.createReadStream(fileToUpload);

          qrsInteractInstance
          .Post(apiURL, fileStream, '	image/png')
          .then(result => {
            logger.debug("result=" + JSON.stringify(result));
            logger.verbose("Done: " + file);
          })
          .catch(err => {
            // Return error msg
            logger.log("error", "Error uploading icon to content library: " + err);
          });
        }

        else if( stat.isDirectory() )
          logger.verbose( fileToUpload + " is a directory." );


    } );
  } );  

} );

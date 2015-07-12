module.exports = function (shipit) {

  var npmInstall = function () {
      return shipit.remote(
        "cd " + shipit.releasePath +
        " && set -a && source /var/www/api/env.conf" +
        " && npm install" +
        " && ln -sf " + shipit.config.deployTo + "/current/www/ " +
        shipit.config.deployTo + "/www"
      );
  }

   // After deployment on the main prod server rsync folder on the second serveer
   shipit.on('cleaned', function() {
     if (shipit.environment == "prod") {
       return shipit.remote(
         "rsync --delete -a " +
         shipit.config.deployTo + "/ " +
         shipit.config.front2 + ":" + shipit.config.deployTo + "/"
       );
     }
   });

  shipit.blTask('install', function() {
      return npmInstall()
        .then(function () {
            shipit.log('Install Done!');
        });
  });
};

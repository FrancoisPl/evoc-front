module.exports = function (shipit) {

    shipit.blTask('installVendors', function() {
      return shipit.remote(
        "cd " + shipit.currentPath +
        " && ln -fs /var/www/bnp/front.env .env" +
        " && docker-compose run --rm vendors" +
        " && sudo chown -R ubuntu:ubuntu ."
      );
    });

    shipit.blTask('restartProxy', function() {
      return shipit.remote(
        "cd " + shipit.currentPath +
        " && docker rm -f bnptoolsadmin_proxy_1" +
        " && docker-compose -p bnptoolsadmin up -d proxy"
      );
    });

    shipit.blTask('install', function() {
      shipit.start(['installVendors', 'restartProxy'], function(err) {
        if(!err){
          shipit.log('Install done!');
        }
      })
    });
};

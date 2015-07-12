module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/bnp-tools-admin',
            repositoryUrl: 'git@github.com:theodo/bnp-tools-admin.git',
            ignores: ['.git', 'node_modules'],
            shallowClone: true,
            keepReleases: 5
        },
        validation: {
            servers: 'ubuntu@62.4.19.83',
            branch: 'master',
            deployTo: '/var/www/bnp/bnp-tools-admin'
        },
        demo: {
            servers: 'api@bnp-ip-onecms-integration.bearstech.com',
            branch: 'master',
            deployTo: '/var/www/api/app/bnp-tools-admin'
        },
        preprod: {
            servers: 'api@bnp-ip-onecms-api-preprod.bearstech.com',
            branch: 'master',
            deployTo: '/var/www/api/app/bnp-tools-admin'
        },
        prod: {
            servers: 'api@bnp-ip-onecms-api.bearstech.com',
            front2: 'bnp-ip-onecms-api-front2', // Custom option, use for rsync on second server
            branch: 'master',
            deployTo: '/var/www/api/app/bnp-tools-admin'
        }
    });

    shipit.on('published', function() {
        return shipit.start('install');
    });

    if(['prod','preprod'].indexOf(shipit.environment) > -1) {
      require('./devops/deploy/prod.js')(shipit);
    } else if (shipit.environment == 'validation') {
      require('./devops/deploy/validation.js')(shipit);
    } else {
      console.log("Unknwown environment: " + shipit.environment);
      exit(1);
    }
};

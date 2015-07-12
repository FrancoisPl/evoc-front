Installation
============

# With and without docker
-----------------
```
git clone --recursive git@github.com:theodo/bnp-tools-admin.git && cd bnp-tools-admin
```

## Create a symbolic link for environment variables using remote configuration
```
ln -s devops/doc/environment-example.env .env
```


# With docker
-----------------
```
docker-compose run --rm vendors
docker-compose up -d proxy
# Watcher in Dev environment
docker-compose run --rm vendors npm start
# Then you can access http://127.0.0.1:5014
```

To install docker, see https://github.com/theodo/bnp-commando/blob/master/devops/doc/installation.md


# With npm
--------
```
source .env
npm install
npm start
# Then you can access http://127.0.0.1:5014
```

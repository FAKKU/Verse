#!/bin/bash

echo "Provisioning Virtual Machine..."

echo "Upgrading OS & Packages..."
sudo apt-get -y update > /dev/null
sudo apt-get -y dist-upgrade > /dev/null
sudo apt-get -y upgrade > /dev/null

echo "Installing make and other build requirements..."
sudo apt-get -y install g++ make memcached libncurses5 redis-server git dos2unix > /dev/null

echo "Installing Nginx..."
sudo apt-get -y install nginx > /dev/null

echo "Installing Nodejs..."
sudo apt-get -y install nodejs npm > /dev/null
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install pm2 -g

echo "Setting up Configurations..."
sudo echo '{"host": "game.fakku.local", "port": 8000}' > /vagrant/client/config/config_build.json

sudo printf "
server {
	listen 80;
	server_name game.fakku.local;
	root /vagrant/client-build;
	index index.html index.htm;

	location / {
		rewrite ^/$ /index.html break;
	}
}" > /etc/nginx/sites-enabled/fakku-verse

echo "Compiling Client..."
sudo dos2unix /vagrant/bin/build.sh
sudo chmod +x /vagrant/bin/build.sh
sudo /vagrant/FAKKU-Verse/bin/build.sh

echo "Starting Server..."
cd /vagrant && sudo pm2 start server/js/main.js
sudo pm2 startup

# All Done
##########################

# Restart all services
sudo service nginx restart > /dev/null
echo "Remember to setup game.fakku.local in your hosts pointing to 127.0.0.1"
echo "Done!"
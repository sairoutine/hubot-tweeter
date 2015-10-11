# SETUP
```
# redis install
sudo rpm -Uvh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
sudo rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
sudo yum --enablerepo=remi,remi-test install -y redis
sudo chkconfig --add redis
sudo chkconfig --level 345 redis on
sudo service redis start

git clone https://github.com/sairoutine/marisa-bot.git
vim ./start_hubot.sh
chmod 0700 ./start_hubot.sh
sudo npm install -g forever
# run!
./start_hubot.sh
```
# start_hubot.sh
```
#!/bin/sh

# Twitter Auth Key
export HUBOT_TWITTER_KEY=""
export HUBOT_TWITTER_SECRET=""

#sairoutine twitter account connecting to hubot-for-sairoutine
export HUBOT_TWITTER_TOKEN=""
export HUBOT_TWITTER_TOKEN_SECRET=""

#saigyojiyu twitter account connecting to hubot-for-sairoutine
export HUBOT_TWITTER_TOKEN_3=""
export HUBOT_TWITTER_TOKEN_SECRET_3=""

export HUBOT_SLACK_TOKEN=""

export HUBOT_GITHUB_TOKEN=""
export HUBOT_GITHUB_ISSUE_REPO="sairoutine/TODO"

cd ./marisa-bot
./bin/hubot -a slack
```

# yukarin_save.js
If your database host is not localhost, change host written in yukarin_save.js


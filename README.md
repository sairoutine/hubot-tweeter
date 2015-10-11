# SETUP
```
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


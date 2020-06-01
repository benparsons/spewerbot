# Spewerbot

Sends the contents of a file file into a Matrix room, one line at a time.

## Setup

```
npm i
tsc *.ts
cp config/config_sample.json config/config.json
```

Then update config.json with your access_token etc, then finally a messge will be sent every 10 seconds, reading the file line by line.

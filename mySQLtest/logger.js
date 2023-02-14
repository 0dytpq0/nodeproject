var winston = require('winston');
const { format } = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
var moment = require('moment');
const fs = require('fs');
const logDir = '../logs';
//날짜 시분초 표시 함수
const timezoned = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

function log(...text) {
  //log 함수에 전달되 argument를 문자열로 치환
  try {
    let str = '';
    for (let i = 0; i < text.length; i++) {
      str += text[i] + ' ';
    }
    console.log(str);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    let loggerLocalFunc = new winston.createLogger({
      transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
          level: 'info',
          json: false,
          datePattern: 'YYYY-MM-DD',
          dirname: logDir,
          filename: `%DATE%.log`,
          maxFiles: 30, // 30일치 로그 파일 저장
          format: format.combine(
            format.timestamp({ format: timezoned }),
            format.json()
          ), // 한줄 JSON으로
          zippedArchive: true,
          timestamp: function () {
            //한국 시간 나타내는법
            return moment().format('YYYY-MM-DD HH:mm:ss');
          },
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
          level: 'error',
          json: false,
          datePattern: 'YYYY-MM-DD',
          dirname: logDir + '/error', // error.log 파일은 error 폴더를 만들어 저장
          filename: `%DATE%.error.log`,
          maxFiles: 30,
          zippedArchive: true,
          format: format.combine(
            format.timestamp({ format: timezoned }),
            format.prettyPrint()
          ),

          timestamp: function () {
            //한국 시간 나타내는법
            return moment().format('YYYY-MM-DD HH:mm:ss');
          },
        }),
      ],
    });
    try {
      loggerLocalFunc.info(str);
    } catch (exception) {
      loggerLocalFunc.error('ERROR=>' + exception);
    }
    loggerLocalFunc.close();
  } catch (error) {
    console.log(error);
  }
}
try {
  log.stream = {
    write(message) {
      log(message);
    },
  };
} catch (error) {
  console.log('error');
}

module.exports = log;

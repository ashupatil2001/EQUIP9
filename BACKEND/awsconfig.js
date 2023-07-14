const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: 'AKIA3KZVK3RM6V72UAHV',
  secretAccessKey: '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',
});

const s3 = new aws.S3();

module.exports = s3;

var express = require('express')
  , app = express()
  , exec = require('child_process').exec
  , os = require('os')
  , fs = require('fs');

app.use(express.bodyParser());

app.get('/', function (req, res) {
  var url = req.query.url
    , phantomjs_path = __dirname + '/phantomjs/' + os.platform() +
      '/phantomjs'
    , command = phantomjs_path + ' rasterize.js ' + url;

  if (!url) {
    res.send(400);
    return;
  }

  fs.chmod(phantomjs_path, 0755, function (err) {
    exec (command, {maxBuffer: 1024 * 1024}, function (error, stdout, stderr) {
      if (error) {
        console.log('exec error: ' + error);
        res.send(500);
        return;
      }

      if (stdout) {
        res.set('Content-Type', 'image/png');
        res.set('Cache-Control', 'no-cache');
        res.send(new Buffer(stdout, 'base64'));
      } else {
        console.log('phantom error: Unable to load ' + url);
        res.send(404);
      }
    });
  });
});

app.all('*', function (req, res) {
  res.send(400);
});

app.listen(process.env.VCAP_APP_PORT || 3000);

module.exports = app;

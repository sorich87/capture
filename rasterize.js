var page = require('webpage').create()
  , address;

address = phantom.args[0];
page.viewportSize = { width: 1024, height: 768 };
page.clipRect = { width: 1024, height: 768 };
page.settings = { javascriptEnabled: false, loadImages: true };
page.open(address, function (status) {
  if (status === 'success') {
    window.setTimeout(function () {
      console.log(page.renderBase64('png'));
      phantom.exit();
    }, 200);
  }
});


var url = require('url');

module.exports= function(req, pathname) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: pathname || req.originalUrl
  });
}


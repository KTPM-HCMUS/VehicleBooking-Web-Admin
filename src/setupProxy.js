

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/api/v1/location/admin/statistic/driver", { target: "http://localhost:8080" }));
};


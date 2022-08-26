

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/api/v1/location/admin/statistic/driver", { target: "http://localhost:8080" }));
    app.use(createProxyMiddleware("/login", {target: "http://34.121.234.226:8080"}));
};


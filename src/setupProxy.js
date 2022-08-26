

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/api/v1/location/all/driver", { target: "http://localhost:8080" }));
    app.use(createProxyMiddleware("/api/v1/location/all/client", { target: "http://localhost:8080" }));
    app.use(createProxyMiddleware("/api/v1/location/history/all", { target: "http://localhost:8080" }));
    app.use(createProxyMiddleware("/login", {target: "http://34.121.234.226:8080"}));
    app.use(createProxyMiddleware("/v1/statistic", { target: "http://34.172.47.16:8080" }));
    app.use(createProxyMiddleware("/api/v1/location/admin", {target: "http://localhost:8080"}));
};


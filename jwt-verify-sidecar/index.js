const { CognitoJwtVerifier } = require("aws-jwt-verify");
const http = require("http");
const httpProxy = require("http-proxy");
const { config } = require("dotenv");
const { readFileSync } = require("fs");

config();
const port = 4567;

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  tokenUse: "access",
  clientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
});

const jwks = JSON.parse(readFileSync("jwks.json", { encoding: "utf-8" }));
jwtVerifier.cacheJwks(jwks);

const proxy = httpProxy.createProxyServer({});
const server = http.createServer(async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, traceparent, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS");
  console.log(req.headers);

  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    const res = await jwtVerifier.verify(token);
    console.log(res);
  }
  // If the app does not support unauthenticated content and redirects to signing page if not authenticated
  //else (!token) {
  //   res.statusCode = 401;
  //   res.end(JSON.stringify({ error: "User is not authenticated." }));
  //   return;
  // }
  proxy.web(req, res, {
    target: "http://localhost:4568",
  });
});

server.on("error", (err) => {
  console.error(`Server error: ${err}`);
});

server.listen(port);

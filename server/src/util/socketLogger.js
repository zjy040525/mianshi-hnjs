const socketLogger = (ws, jwt, req) => {
  console.log(
    `[${new Date().toISOString()}]`,
    `"${jwt.nickname ?? jwt.username}"`,
    'connect to',
    req.url
  );
  ws.on('close', () => {
    console.log(
      `[${new Date().toISOString()}]`,
      `"${jwt.nickname ?? jwt.username}"`,
      'disconnect to',
      req.url
    );
  });
};

module.exports = socketLogger;

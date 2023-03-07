import Jwt from "jsonwebtoken";

export const requiresAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({
      error: 'not authorized'
    })
  }
    const jwt = authorization.split(" ")[1];
    Jwt.verify(jwt, process.env.SECRET, (err, { id }) => {
      if (err)
        return res.status(401).json({
          error: err.message,
        });
      req.userId = id;
      next();
    });
  
};

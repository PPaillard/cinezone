export const requireAdminQuery = (req, res, next) => {
  if (req.query.role === "admin") {
    console.log("Accès autorisé");
    next();
  } else {
    res.sendStatus(403);
  }
};

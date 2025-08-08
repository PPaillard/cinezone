import { validationResult } from "express-validator";

export function handleValidationErrors(req, res, next) {
  // On va récupérer les erreurs potentiellement présentes dans l'objet req
  const errors = validationResult(req);
  // S'il ya des erreurs (si le tableau d'erreur n'est pas vide)
  if (!errors.isEmpty()) {
    // On renvoi une réponse avec les erreurs.
    return res.status(400).json({ errors: errors.array() });
  }
  //Si tout se passe bien, on continue
  next();
}

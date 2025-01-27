import {Router} from 'express';
import { viewHome, viewProducts,viewProductById,viewCartById,viewRegister,viewLogin, viewProfile, reestablecerContrasenia, mandarEmail,notAvailable,createProduct, changeRole} from '../controllers/viewsControllers.js';
import { passportCallOptional, passportCallView } from '../middlewares/passportMiddleware.js';
import { authorizationViewCreateProduct } from '../middlewares/authMiddleware.js';

const viewsRouter = Router();

viewsRouter.get("/",passportCallOptional('jwt'),viewHome);
viewsRouter.get("/register",viewRegister);
viewsRouter.get("/login",viewLogin);
viewsRouter.get("/profile",passportCallView("jwt"),viewProfile);
viewsRouter.get("/products", passportCallOptional('jwt'),viewProducts);
viewsRouter.get("/products/:pid", passportCallOptional("jwt"),viewProductById);
viewsRouter.get("/carts/:cid", passportCallView('jwt'),viewCartById);
viewsRouter.get("/reestablecerContrasenia",reestablecerContrasenia);
viewsRouter.get("/mandarEmail",mandarEmail);
viewsRouter.get("/not-available",notAvailable);
viewsRouter.get("/createProduct",passportCallView('jwt'),authorizationViewCreateProduct('admin','premium'),createProduct);
viewsRouter.get("/changeRole",changeRole);

// Ruta para obtener el carrito
viewsRouter.get("/api/cart", passportCallOptional('jwt'), (req, res) => {
    if (!req.user) {
      res.json({ error: true });
    } else {
      res.json({ error: false, cartId: req.user.data.cartId });
    }
  });

export default viewsRouter;
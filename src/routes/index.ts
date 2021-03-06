import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);
router.get('/idademais/:id',HomeController.idadeMais);
router.get('/idademenos/:id',HomeController.idadeMenos);
router.get('/delete/:id',HomeController.deleted);


router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

router.post('/novousuario', UserController.novo);

export default router;
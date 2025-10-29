import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { chatRoutes } from '../modules/chat/chat.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/chats',
    route: chatRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
//TODO -  this is my main routes

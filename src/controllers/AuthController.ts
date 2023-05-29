import { Controller, GET } from 'fastify-decorators';

@Controller({ route: '/' })
export default class AuthController {
    @GET({ url: '/login' })
    async loginHandler() {
        return 'Hello World!';
    }
}
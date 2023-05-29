import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';
import Fastify, { FastifyInstance } from 'fastify';
import configureServer from './server';

class App {
    private readonly instance: FastifyInstance;

    constructor() {
        this.instance = Fastify();
    }

    public async start() {
        await this.registerControllers();
        configureServer(this.instance);

        await this.instance.listen(3000);
        console.log('Serveur démarré sur le port 3000');
    }

    private async registerControllers() {
        this.instance.register(bootstrap, {
            // Specify directory with our controllers
            directory: resolve(__dirname, `controllers`),
            mask: /Controller./
        });
    }
}

const app = new App();
app.start().catch((err) => {
    console.error('Erreur lors du démarrage du serveur :', err);
    process.exit(1);
});

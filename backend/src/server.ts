import { app } from './app';
import { environment } from './config/environment';

const server = app.listen(environment.PORT, () => {
  console.log(`Server listening on port ${environment.PORT}`);
});

const shutdown = (): void => {
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

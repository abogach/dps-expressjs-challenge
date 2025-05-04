import express, { Express } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import projectRoutes from './routes/project.routes';
import reportRoutes from './routes/report.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the DPS Backend API',
		endpoints: {
			docs: '/api-docs',
			projects: '/api/projects',
			reports: '/api/reports',
		},
		note: 'All endpoints are protected by a basic auth middleware. You may use the following credentials: password: Password123',
	});
});

app.use('/api/projects', projectRoutes);
app.use('/api/reports', reportRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

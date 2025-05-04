import { Request, Response } from 'express';
import db from '../services/db.service';

class ProjectController {
    async getAllProjects(req: Request, res: Response) {
        try {
            const projects = db.query('SELECT * FROM projects');
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: 'Error while fetching projects' });
        }
    }

    async getProjectById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const project = db.query('SELECT * FROM projects WHERE id = ?', [id]);
            
            if (!project || project.length === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }
            
            res.json(project[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error while fetching project' });
        }
    }

    async createProject(req: Request, res: Response) {
        try {
            const { name, description } = req.body;
            
            // Mevcut en büyük id'yi bulalım
            const projects = db.query('SELECT id FROM projects') as { id: string }[];
            let maxId = 0;
            
            projects.forEach((project: { id: string }) => {
                const currentId = parseInt(project.id, 10);
                if (!isNaN(currentId) && currentId > maxId) {
                    maxId = currentId;
                }
            });
            
            // Yeni id'yi oluşturalım
            const newId = (maxId + 1).toString();
            
            // Yeni projeyi ekleyelim
            const result = db.run(
                'INSERT INTO projects (id, name, description) VALUES (?, ?, ?)',
                [newId, name, description]
            );
            
            if (result.changes === 1) {
                res.status(201).json({ 
                    id: newId,
                    name,
                    description
                });
            } else {
                res.status(500).json({ error: 'Error while creating project' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error while creating project' });
        }
    }

    async updateProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const result = db.run(
                'UPDATE projects SET name = ?, description = ? WHERE id = ?',
                [name, description, id]
            );

            if (result.changes === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.json({ id, name, description });
        } catch (error) {
            res.status(500).json({ error: 'Error while updating project' });
        }
    }

    async deleteProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = db.run('DELETE FROM projects WHERE id = ?', [id]);

            if (result.changes === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.json({ message: 'Project deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error while deleting project' });
        }
    }
}

export default new ProjectController(); 
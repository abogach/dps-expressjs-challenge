import { Request, Response } from 'express';
import db from '../services/db.service';

class ReportController {
    async getAllReports(req: Request, res: Response) {
        try {
            const reports = db.query('SELECT * FROM reports');
            res.json(reports);
        } catch (error) {
            res.status(500).json({ error: 'Error while fetching reports' });
        }
    }

    async getReportById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const report = db.query('SELECT * FROM reports WHERE id = ?', [id]) as { id: string, project_id: string, content: string }[];
            
            if (!report || report.length === 0) {
                return res.status(404).json({ error: 'Report not found' });
            }
            
            res.json(report[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error while fetching report' });
        }
    }

    async createReport(req: Request, res: Response) {
        try {
            const { project_id, content } = req.body;
            
            // Mevcut en büyük id'yi bulalım
            const reports = db.query('SELECT id FROM reports') as { id: string }[];
            let maxId = 0;
            
            reports.forEach((report: { id: string }) => {
                const currentId = parseInt(report.id, 10);
                if (!isNaN(currentId) && currentId > maxId) {
                    maxId = currentId;
                }
            });
            
            // Yeni id'yi oluşturalım
            const newId = (maxId + 1).toString();

            // Yeni raporu ekleyelim
            const result = db.run(
                'INSERT INTO reports (id, projectid, text) VALUES (?, ?, ?)',
                [newId, project_id.toString(), content]
            );
            
            if (result.changes === 1) {
                res.status(201).json({ 
                    id: newId,
                    project_id,
                    content
                });
            } else {
                res.status(500).json({ error: 'Error while creating report2' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error while creating report1' });
        }
    }

    async updateReport(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { project_id, content } = req.body;
            const result = db.run(
                'UPDATE reports SET text = ?, projectid = ? WHERE id = ?',
                [content, project_id.toString(), id]
            );

            if (result.changes === 0) {
                return res.status(404).json({ error: 'Report not found' });
            }

            res.json({ id, project_id, content });
        } catch (error) {
            res.status(500).json({ error: 'Error while updating report' });
        }
    }

    async deleteReport(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = db.run('DELETE FROM reports WHERE id = ?', [id]);

            if (result.changes === 0) {
                return res.status(404).json({ error: 'Report not found' });
            }

            res.json({ message: 'Report deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error while deleting report' });
        }
    }

    async getReportsWithRepeatedWords(req: Request, res: Response) {
        try {
            const reports = db.query('SELECT id, projectid as project_id, text as content FROM reports') as { id: string, project_id: string, content: string }[];
            const filteredReports = reports.filter((report) => {
                const words = report.content.toLowerCase().split(/\s+/);
                const wordCount: { [key: string]: number } = {};
                
                words.forEach((word: string) => {
                    wordCount[word] = (wordCount[word] || 0) + 1;
                });
                
                return Object.values(wordCount).some(count => count >= 3);
            });
            
            res.json(filteredReports);
        } catch (error) {
            res.status(500).json({ error: 'Error while filtering reports' });
        }
    }
}

export default new ReportController(); 
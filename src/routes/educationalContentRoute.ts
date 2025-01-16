import { Request, Response, NextFunction, Router } from 'express';
import { educational_content as EducationalContent } from '../models/entities/educational_content'; // Assuming you have an EducationalContent model
import authenticateToken, { IsGovtOfficial } from '../helpers/authenticationHelper';
export const educationalContentRoute = Router();

// Create a new educational content
educationalContentRoute.post('/educational-content',authenticateToken,IsGovtOfficial, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await EducationalContent.create(req.body);
        res.status(201).json(content);
    } catch (error) {
        next(error);
    }
});

// Get all educational content
educationalContentRoute.get('/educational-content', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contents = await EducationalContent.findAll();
        res.status(200).json(contents);
    } catch (error) {
        next(error);
    }
});

// Get educational content by ID
educationalContentRoute.get('/educational-content/:id',async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await EducationalContent.findByPk(req.params.id);
        if (content) {
            res.status(200).json(content);
        } else {
            res.status(404).json({ message: 'Educational content not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Update educational content by ID
educationalContentRoute.put('/educational-content/:id',authenticateToken,IsGovtOfficial, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [updated] = await EducationalContent.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedContent = await EducationalContent.findByPk(req.params.id);
            res.status(200).json(updatedContent);
        } else {
            res.status(404).json({ message: 'Educational content not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Delete educational content by ID
educationalContentRoute.delete('/educational-content/:id',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await EducationalContent.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Educational content deleted' });
        } else {
            res.status(404).json({ message: 'Educational content not found' });
        }
    } catch (error) {
        next(error);
    }
});
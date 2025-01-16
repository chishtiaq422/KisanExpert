import { Request, Response, NextFunction, Router } from 'express';
import { user_notifications as UserNotifications } from '../models/entities/user_notifications'; // Assuming you have a UserNotifications model
import authenticateToken, { IsGovtOfficial } from '../helpers/authenticationHelper';
export const userNotificationRoute = Router();

// Create a new user notification
userNotificationRoute.post('/user-notifications',authenticateToken,IsGovtOfficial, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await UserNotifications.create(req.body);
        res.status(201).json(notification);
    } catch (error) {
        next(error);
    }
});

// Get all user notifications
userNotificationRoute.get('/user-notifications', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await UserNotifications.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
});

// Get a user notification by ID
userNotificationRoute.get('/user-notifications/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await UserNotifications.findByPk(req.params.id);
        if (notification) {
            res.status(200).json(notification);
        } else {
            res.status(404).json({ message: 'User notification not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Update a user notification by ID
userNotificationRoute.put('/user-notifications/:id',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [updated] = await UserNotifications.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedNotification = await UserNotifications.findByPk(req.params.id);
            res.status(200).json(updatedNotification);
        } else {
            res.status(404).json({ message: 'User notification not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Delete a user notification by ID
userNotificationRoute.delete('/user-notifications/:id',authenticateToken,IsGovtOfficial, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await UserNotifications.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'User notification deleted' });
        } else {
            res.status(404).json({ message: 'User notification not found' });
        }
    } catch (error) {
        next(error);
    }
});
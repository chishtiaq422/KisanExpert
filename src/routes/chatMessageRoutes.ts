import { Request, Response, NextFunction, Router } from 'express';
import { chat_messages as ChatMessage } from '../models/entities/chat_messages'; // Assuming you have a ChatMessage model
import { auctions as Auction } from '../models/entities/auctions'; // Assuming you have an Auction model
import authenticateToken from '../helpers/authenticationHelper';
export const chatMessageRoute = Router();

// Create a new chat message
chatMessageRoute.post('/chat-messages',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { auction_id, user_id, message } = req.body;

        // Check required fields
        if (!auction_id || !user_id || !message) {
            res.status(400).json({ message: 'Missing required fields' });
            return ;
        }

        // Check if the auction is active
        const auction = await Auction.findByPk(auction_id);
        if (!auction || auction.status !== 'active') {
            res.status(400).json({ message: 'Auction is not active or does not exist' });
            return ;
        }

        // Create the chat message
        const chatMessage = await ChatMessage.create(req.body);
        res.status(201).json(chatMessage);
    } catch (error) {
        next(error);
    }
});

// Get all chat messages for an auction
chatMessageRoute.get('/chat-messages/auction/:auction_id',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { auction_id } = req.params;

        // Check if the auction is active
        const auction = await Auction.findByPk(auction_id);
        if (!auction || auction.status !== 'active') {
             res.status(400).json({ message: 'Auction is not active or does not exist' });
             return;
            }

        const chatMessages = await ChatMessage.findAll({
            where: { auction_id },
            order: [['sent_at', 'ASC']]
        });
        res.status(200).json(chatMessages);
    } catch (error) {
        next(error);
    }
});

// Get a chat message by ID
// chatMessageRoute.get('/chat-messages/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const chatMessage = await ChatMessage.findByPk(req.params.id);
//         if (chatMessage) {
//             res.status(200).json(chatMessage);
//         } else {
//             res.status(404).json({ message: 'Chat message not found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// Update a chat message by ID
// chatMessageRoute.put('/chat-messages/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { auction_id, message } = req.body;

//         // Check if the auction is active
//         const auction = await Auction.findByPk(auction_id);
//         if (!auction || auction.status !== 'active') {
//             res.status(400).json({ message: 'Auction is not active or does not exist' });
//             return;
//         }

//         const [updated] = await ChatMessage.update(req.body, {
//             where: { id: req.params.id }
//         });
//         if (updated) {
//             const updatedChatMessage = await ChatMessage.findByPk(req.params.id);
//             res.status(200).json(updatedChatMessage);
//         } else {
//             res.status(404).json({ message: 'Chat message not found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// Delete a chat message by ID
// chatMessageRoute.delete('/chat-messages/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const chatMessage = await ChatMessage.findByPk(req.params.id);
//         if (!chatMessage) {
//              res.status(404).json({ message: 'Chat message not found' });
//              return;
//             }

//         await chatMessage.destroy();
//         res.status(204).json({ message: 'Chat message deleted' });
//     } catch (error) {
//         next(error);
//     }
// });
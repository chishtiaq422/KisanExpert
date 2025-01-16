import { Request, Response, NextFunction, Router } from 'express';
import { auctions as Auction } from '../models/entities/auctions'; // Assuming you have an Auction model
import { bids as Bid } from '../models/entities/bids'; // Assuming you have a Bid model
import authenticateToken, { IsFarmer } from '../helpers/authenticationHelper';
export const auctionRoute = Router();

// Create a new auction
auctionRoute.post('/auctions',authenticateToken,IsFarmer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product_id, start_time, end_time, starting_price } = req.body;

        // Check required fields
        if (!product_id || !start_time || !end_time || !starting_price) {
            res.status(400).json({ message: 'Missing required fields' });
            return ;
        }

        const auction = await Auction.create(req.body);
        res.status(201).json(auction);
    } catch (error) {
        next(error);
    }
});

// Get all auctions
auctionRoute.get('/auctions',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auctions = await Auction.findAll();
        res.status(200).json(auctions);
    } catch (error) {
        next(error);
    }
});

// Get an auction by ID
auctionRoute.get('/auctions/:id',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auction = await Auction.findByPk(req.params.id);
        if (auction) {
            res.status(200).json(auction);
        } else {
            res.status(404).json({ message: 'Auction not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Update an auction by ID
auctionRoute.put('/auctions/:id',authenticateToken,IsFarmer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [updated] = await Auction.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedAuction = await Auction.findByPk(req.params.id);
            res.status(200).json(updatedAuction);
        } else {
            res.status(404).json({ message: 'Auction not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Delete an auction by ID
// auctionRoute.delete('/auctions/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const deleted = await Auction.destroy({
//             where: { id: req.params.id }
//         });
//         if (deleted) {
//             res.status(204).json({ message: 'Auction deleted' });
//         } else {
//             res.status(404).json({ message: 'Auction not found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// Complete auction at end_time
auctionRoute.put('/auctions/complete/:id', authenticateToken,IsFarmer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auction = await Auction.findByPk(req.params.id);
        if (!auction) {
             res.status(404).json({ message: 'Auction not found' });
       
             return;
                 }

        // Check if the auction end_time has passed
        // if (new Date() < new Date(auction.end_time)) {
        //     res.status(400).json({ message: 'Auction has not ended yet' });
        //     return ;
        // }

        // Find the highest bid
        const highestBid = await Bid.findOne({
            where: { auction_id: auction.id },
            order: [['amount', 'DESC']]
        });

        if (highestBid) {
            auction.current_price = highestBid.amount;
        }
        auction.status = 'completed';
        await auction.save();

        res.status(200).json(auction);
    } catch (error) {
        next(error);
    }
});
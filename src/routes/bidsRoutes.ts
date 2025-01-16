import { Request, Response, NextFunction, Router } from 'express';
import { bids as Bid } from '../models/entities/bids'; // Assuming you have a Bid model
import { auctions as Auction } from '../models/entities/auctions'; // Assuming you have an Auction model
import authenticateToken, { IsVendor } from '../helpers/authenticationHelper';
export const bidsRoute = Router();

// Create a new bid
bidsRoute.post('/bids',authenticateToken,IsVendor, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { auction_id, user_id, amount } = req.body;

        // Check required fields
        if (!auction_id || !user_id || !amount) {
            res.status(400).json({ message: 'Missing required fields' });
            return ;
        }

        // Check if the auction is active
        const auction = await Auction.findByPk(auction_id);
        if (!auction || auction.status !== 'active') {
             res.status(400).json({ message: 'Auction is not active or does not exist' });
       
             return;
       }

        // Create the bid
        const bid = await Bid.create(req.body);

        // Update the auction's current price if the new bid is higher
        if (!auction.current_price || amount > auction.current_price) {
            auction.current_price = amount;
            await auction.save();
        }

        res.status(201).json(bid);
    } catch (error) {
        next(error);
    }
});

// Get all bids
bidsRoute.get('/bids',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bids = await Bid.findAll({
            order: [['amount', 'DESC']]
        });
        res.status(200).json(bids);
    } catch (error) {
        next(error);
    }
});

// Get bids by auction ID
bidsRoute.get('/bids/auction/:auction_id',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { auction_id } = req.params;
        const bids = await Bid.findAll({
            where: { auction_id },
            order: [['amount', 'DESC']]
        });
        res.status(200).json(bids);
    } catch (error) {
        next(error);
    }
});

// Get a bid by ID
bidsRoute.get('/bids/:id',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bid = await Bid.findByPk(req.params.id);
        if (bid) {
            res.status(200).json(bid);
        } else {
            res.status(404).json({ message: 'Bid not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Update a bid by ID
// bidsRoute.put('/bids/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { auction_id, amount } = req.body;

//         // Check if the auction is active
//         const auction = await Auction.findByPk(auction_id);
//         if (!auction || auction.status !== 'active') {
//              res.status(400).json({ message: 'Auction is not active or does not exist' });
//              return;  
//         }

//         const [updated] = await Bid.update(req.body, {
//             where: { id: req.params.id }
//         });
//         if (updated) {
//             const updatedBid = await Bid.findByPk(req.params.id);

//             // Update the auction's current price if the new bid is higher
//             if (updatedBid && (!auction.current_price || amount > auction.current_price)) {
//                 auction.current_price = amount;
//                 await auction.save();
//             }

//             res.status(200).json(updatedBid);
//         } else {
//             res.status(404).json({ message: 'Bid not found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// Delete a bid by ID
// bidsRoute.delete('/bids/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const bid = await Bid.findByPk(req.params.id);
//         if (!bid) {
//             res.status(404).json({ message: 'Bid not found' });
//             return ;
//         }

//         const auction = await Auction.findByPk(bid.auction_id);
//         await bid.destroy();

//         // Update the auction's current price if the highest bid is deleted
//         if (auction) {
//             const highestBid = await Bid.findOne({
//                 where: { auction_id: auction.id },
//                 order: [['amount', 'DESC']]
//             });
//             auction.current_price = highestBid ? highestBid.amount : auction.starting_price;
//             await auction.save();
//         }

//         res.status(204).json({ message: 'Bid deleted' });
//     } catch (error) {
//         next(error);
//     }
// });
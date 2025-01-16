import { Application, NextFunction, Request, Response } from "express";
import { authRoute } from "./routes/auth";
import { educationalContentRoute } from "./routes/educationalContentRoute";
import { productsRoute } from "./routes/productsRoute";
import { auctionRoute } from "./routes/auctionRoutes";
import { bidsRoute } from "./routes/bidsRoutes";
import { userNotificationRoute } from "./routes/userNotificationRoutes";
import { chatMessageRoute } from "./routes/chatMessageRoutes";

export const useRoutes = function (app: Application) {
    app.get("/", (req: Request, res: Response) => {
        res.redirect(302, '/404');
    });

    app.get("/404", (req: Request, res: Response) => {
        res.status(404).json({ IsSuccess: false, ErrorDetails: "Not Found" });
    });


    app.use(authRoute);
    app.use(educationalContentRoute);
    app.use(productsRoute);
    app.use(auctionRoute);
    app.use(bidsRoute);
    app.use(userNotificationRoute);
    app.use(chatMessageRoute);


    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(500).send(`Internal Server Error: ${error ?? ''}`);

        } catch (e: any) {
            res.status(500).send(`Internal Server Error: ${error ?? ''}`);
        } finally {
            next();
        }
    })


}

import express from "express";
import { cancelDelivery, completeDelivery, getDeliveryDetail, getMyDeliveries, getPartnerUser, loginPartner, logoutPartner, updateDeliveryStatus, updateLocation } from "../controllers/deliveryPartnerController.js";
import deliveryAuth from "../middleware/deliveryAuth.js";

const deliveryPartnerRouter = express.Router();

deliveryPartnerRouter.get("/partnerUser", deliveryAuth, getPartnerUser);
deliveryPartnerRouter.post('/login', loginPartner);
deliveryPartnerRouter.post('/logout', logoutPartner);
deliveryPartnerRouter.get('/my-deliveries', deliveryAuth, getMyDeliveries);
deliveryPartnerRouter.get('/my-deliveries/:id', deliveryAuth, getDeliveryDetail);
deliveryPartnerRouter.put('/my-deliveries/:id/complete', deliveryAuth, completeDelivery);
deliveryPartnerRouter.put('/my-deliveries/:id/cancel', deliveryAuth, cancelDelivery);
deliveryPartnerRouter.put('/my-deliveries/:id/status', deliveryAuth, updateDeliveryStatus);
deliveryPartnerRouter.put('/my-deliveries/:id/location', deliveryAuth, updateLocation);

export default deliveryPartnerRouter;
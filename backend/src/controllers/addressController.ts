import { Request, Response } from 'express';
import * as addressModel from '../models/addressModel';

export const getAddresses = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const addresses = await addressModel.getAddressesByUserId(userId);
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses' });
    }
};

export const addAddress = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const newAddressId = await addressModel.addAddress(userId, req.body);
        res.status(201).json({ message: 'Address added', id: newAddressId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding address' });
    }
};

export const updateAddress = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const addressId = Number(req.params.id);
        await addressModel.updateAddress(userId, addressId, req.body);
        res.json({ message: 'Address updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating address' });
    }
};

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const addressId = Number(req.params.id);
        await addressModel.deleteAddress(userId, addressId);
        res.json({ message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address' });
    }
};

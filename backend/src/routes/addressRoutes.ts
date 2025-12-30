import express from 'express';
import { getAddresses, addAddress, updateAddress, deleteAddress } from '../controllers/addressController';
import { authenticateToken as protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getAddresses);
router.post('/', protect, addAddress);
router.put('/:id', protect, updateAddress);
router.delete('/:id', protect, deleteAddress);

export default router;

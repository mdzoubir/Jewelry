import express from 'express';
import { getWishlist, toggleWishlist } from '../controllers/wishlistController';
import { authenticateToken as protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/toggle', protect, toggleWishlist);

export default router;

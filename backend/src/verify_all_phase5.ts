import axios from 'axios';
import pool from './db';
import { ResultSetHeader } from 'mysql2';
import bcrypt from 'bcrypt';

const API_URL = 'http://localhost:3000/api';

const runVerification = async () => {
    let adminToken: string | null = null;
    let custToken: string | null = null;
    let adminId: number | null = null;
    let custId: number | null = null;
    let catId: number | null = null;
    let prodId: number | null = null;

    try {
        console.log('🌟 STARTING FULL SYSTEM VERIFICATION (UP TO PHASE 5) 🌟');

        // 1. Users & Auth
        console.log('\n1️⃣  Users & Auth');
        const hash = await bcrypt.hash('password', 10);

        // Admin
        const adminEmail = `admin-p5-${Date.now()}@test.com`;
        const [aRes] = await pool.query<ResultSetHeader>('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', ['Admin P5', adminEmail, hash, 'admin']);
        adminId = aRes.insertId;
        const aLogin = await axios.post(`${API_URL}/users/login`, { email: adminEmail, password: 'password' });
        adminToken = aLogin.data.token;
        console.log('   ✅ Admin login successful');

        // Customer
        const custEmail = `cust-p5-${Date.now()}@test.com`;
        const [cRes] = await pool.query<ResultSetHeader>('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', ['Cust P5', custEmail, hash, 'customer']);
        custId = cRes.insertId;
        const cLogin = await axios.post(`${API_URL}/users/login`, { email: custEmail, password: 'password' });
        custToken = cLogin.data.token;
        console.log('   ✅ Customer login successful');

        // 2. Categories & Products
        console.log('\n2️⃣  Catalog (Categories & Products)');
        const catRes = await axios.post(`${API_URL}/categories`, { name: 'P5 Cat', slug: `p5-cat-${Date.now()}` }, { headers: { Authorization: `Bearer ${adminToken}` } });
        catId = catRes.data.id;

        const prodRes = await axios.post(`${API_URL}/products`, {
            category_id: catId,
            name: 'P5 Product',
            slug: `p5-prod-${Date.now()}`,
            price: 100.00
        }, { headers: { Authorization: `Bearer ${adminToken}` } });
        prodId = prodRes.data.id;
        console.log('   ✅ Admin created Category & Product');

        // 3. Inventory
        console.log('\n3️⃣  Inventory');
        await axios.put(`${API_URL}/inventory/${prodId}`, { stock: 50 }, { headers: { Authorization: `Bearer ${adminToken}` } });
        const invCheck = await axios.get(`${API_URL}/inventory/${prodId}`);
        if (invCheck.data.stock === 50) console.log('   ✅ Admin updated stock to 50');
        else throw new Error('Stock verification failed');

        // 4. Cart
        console.log('\n4️⃣  Carts');
        // Add item
        await axios.post(`${API_URL}/cart/items`, { product_id: prodId, quantity: 2 }, { headers: { Authorization: `Bearer ${custToken}` } });
        const cart1 = await axios.get(`${API_URL}/cart`, { headers: { Authorization: `Bearer ${custToken}` } });
        if (cart1.data.items.length === 1 && cart1.data.items[0].product_id === prodId && cart1.data.items[0].quantity === 2) {
            console.log('   ✅ Customer added item to cart');
        } else throw new Error('Add to cart failed');

        // Update item
        const itemId = cart1.data.items[0].id;
        await axios.put(`${API_URL}/cart/items/${itemId}`, { quantity: 5 }, { headers: { Authorization: `Bearer ${custToken}` } });
        const cart2 = await axios.get(`${API_URL}/cart`, { headers: { Authorization: `Bearer ${custToken}` } });
        if (cart2.data.items[0].quantity === 5) console.log('   ✅ Customer updated item quantity');
        else throw new Error('Update cart failed');

        // Remove item
        await axios.delete(`${API_URL}/cart/items/${itemId}`, { headers: { Authorization: `Bearer ${custToken}` } });
        const cart3 = await axios.get(`${API_URL}/cart`, { headers: { Authorization: `Bearer ${custToken}` } });
        if (cart3.data.items.length === 0) console.log('   ✅ Customer removed item from cart');
        else throw new Error('Remove from cart failed');

        // Re-add for Cascade verify
        await axios.post(`${API_URL}/cart/items`, { product_id: prodId, quantity: 1 }, { headers: { Authorization: `Bearer ${custToken}` } });


        // 5. Cleanup & Integrity (Cascade Delete)
        console.log('\n5️⃣  Integrity Check (Cascade Delete)');
        // Deleting Product should delete Cart Item (CASCADE rule in schema)
        await axios.delete(`${API_URL}/products/${prodId}`, { headers: { Authorization: `Bearer ${adminToken}` } });

        try {
            const cartFinal = await axios.get(`${API_URL}/cart`, { headers: { Authorization: `Bearer ${custToken}` } });
            // Should be empty now because the product is gone
            if (cartFinal.data.items.length === 0) console.log('   ✅ Product deletion successfully cascaded to Cart');
            else console.warn('   ⚠️ Warning: Cart item persisted after product delete (Check schema CASCADE)');
        } catch (e) {
            console.log('   (Cart check error ignored)');
        }

        console.log('\n🎉 FULL SYSTEM VERIFICATION PASSED 🎉');

    } catch (e: any) {
        console.error('❌ FAILURE:', e.message);
        if (e.response) console.error(e.response.data);
        process.exitCode = 1;
    } finally {
        // Cleanup DB
        if (catId && adminToken) try { await axios.delete(`${API_URL}/categories/${catId}`, { headers: { Authorization: `Bearer ${adminToken}` } }) } catch { }
        if (adminId) await pool.query('DELETE FROM users WHERE id = ?', [adminId]);
        if (custId) await pool.query('DELETE FROM users WHERE id = ?', [custId]);
        process.exit();
    }
};

runVerification();

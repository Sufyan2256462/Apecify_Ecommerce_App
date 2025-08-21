# 🛍️ Multi-Vendor eCommerce Platform - Beautiful Edition

A full-featured multi-vendor eCommerce platform built with modern web technologies, designed for scalability and user experience.

## 🚀 Features

### User Roles & Permissions
- **Admin** - Full platform management
- **Vendor** - Product management and order fulfillment
- **Customer** - Shopping, reviews, and order tracking

### Core Features
- ✅ Multi-vendor marketplace
- ✅ Product catalog with categories
- ✅ Shopping cart & wishlist
- ✅ Secure checkout process
- ✅ Order management & tracking
- ✅ Customer reviews & ratings
- ✅ Vendor dashboard
- ✅ Admin analytics dashboard
- ✅ Email notifications
- ✅ Responsive design

### Technical Features
- ✅ JWT authentication
- ✅ File upload (images)
- ✅ Search & filtering
- ✅ Pagination
- ✅ Real-time inventory updates
- ✅ Email integration

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload
- **Nodemailer** - Email service

### Frontend
- **Vanilla JavaScript** - No frameworks
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **Axios** - HTTP client

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mvecom-beautiful.git
cd mvecom-beautiful
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env
```
Edit `.env` file with your configuration:
- MongoDB connection string
- JWT secret
- Email credentials
- Cloudinary credentials (for image uploads)

4. **Database Setup**
```bash
npm run seed
```

5. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🔐 Default Accounts

After running the seed command, these accounts will be available:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@shop.com` | `Admin123!` |
| Vendor | `vendor@shop.com` | `Vendor123!` |
| Customer | `customer@shop.com` | `Customer123!` |

## 📁 Project Structure

```
mvecom-beautiful/
├── src/
│   ├── middleware/     # Authentication & validation
│   ├── models/        # Database models
│   ├── routes/        # API endpoints
│   └── services/      # Email & other services
├── frontend/
│   ├── js/           # Client-side JavaScript
│   ├── pages/        # HTML pages
│   └── index.html    # Landing page
├── uploads/          # Product images
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
├── server.js         # Entry point
├── package.json      # Dependencies
└── README.md         # Documentation
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (vendor/admin)
- `PUT /api/products/:id` - Update product (vendor/admin)
- `DELETE /api/products/:id` - Delete product (vendor/admin)

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status
- `GET /api/orders/:id` - Get order details

## 🚀 Deployment

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure proper email service
- Set up Cloudinary for image storage
- Configure domain URLs

### Deployment Options
- **Backend:** Heroku, Railway, DigitalOcean
- **Database:** MongoDB Atlas
- **Frontend:** Netlify, Vercel, or serve from backend
- **Images:** Cloudinary

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love for the eCommerce community
- Inspired by modern eCommerce platforms
- Special thanks to all contributors

## 📞 Support

For support, email sufianliaqat4422@gmail.com or join our Slack channel.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define role schema
const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
});

// Define user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
});

// Define models
const Role = mongoose.model('Role', roleSchema);
const User = mongoose.model('User', userSchema);

// Array of roles
const roles = [
  {
    name: 'Administrator',
    description: 'Administrators have full access to all features and functionalities of the software. They can manage user accounts, configure system settings, view reports, and perform administrative tasks such as adding or removing distributors and products.'
  },
  {
    name: 'Restaurant Owner/Manager',
    description: 'Restaurant owners or managers have access to features related to submitting invoices, viewing price comparisons, and generating reports for their own restaurant(s). They may have limited administrative privileges, such as managing users associated with their restaurant(s) and customizing settings specific to their needs.'
  },
  {
    name: 'Distributor Representative',
    description: 'Distributor representatives have access to features related to managing distributor accounts and interacting with restaurant owners. They can upload pricing information, respond to inquiries, and provide support to restaurant owners regarding product offerings and pricing.'
  },
  {
    name: 'Standard User',
    description: 'Standard users may include employees or staff members of a restaurant who need access to specific features for submitting invoices or viewing price comparisons. They have limited permissions compared to administrators or restaurant owners/managers and can only access functionalities relevant to their role.'
  },
  {
    name: 'Guest/Anonymous User',
    description: 'Guest users may have limited access to certain public-facing features of the software, such as browsing product catalogs or viewing sample price comparisons. They do not have access to sensitive data or features that require authentication.'
  },
  {
    name: 'Accounting Manager',
    description: 'Accounting managers oversee financial operations, including invoicing, budgeting, and financial reporting. They have access to advanced accounting features and can generate detailed financial reports.'
  },
  {
    name: 'Inventory Manager',
    description: 'Inventory managers are responsible for managing inventory levels, tracking stock movements, and optimizing inventory processes. They have access to features for inventory management and can generate inventory-related reports.'
  },
  // Add more roles as needed
];

module.exports = { Role, User, roles };
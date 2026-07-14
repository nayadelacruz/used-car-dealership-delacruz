
import { Router } from 'express';
import { validationResult } from 'express-validator';
import { requireRole } from '../../middleware/auth.js';
import { categoryValidation } from '../../middleware/validation/vehicleCategoriesValidation.js';
import validationErrorHandler from '../../middleware/validation/validationErrorHandler.js';
import { getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    countVehiclesByCategory
} from "../../models/vehicles/manageVehicleCategories.js";

const router = Router();

// ======== FEATURES JUST FOR ADMINS =============

const showManageCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();

        res.render('forms/vehicles/manageCategories', {
            title: 'Manage Vehicle Categories',
            categories
        });

    } catch (error) {
        console.error('Error loading categories:', error);
        req.flash('error', 'Unable to load categories.');
        res.redirect('/dashboard');
    }
};

const showAddCategoryForm = (req, res) => {
    res.render('forms/vehicles/addCategory', {
        title: 'Add Vehicle Category'
    });
};

const handleAddCategory = async (req, res) => {
    try {
        const { name } = req.body;

        await createCategory(name);

        req.flash('success', 'Category added successfully.');
        res.redirect('/categories/manage');

    } catch (error) {
        console.error('Error adding category:', error);
        req.flash('error', 'Unable to add category.');
        res.redirect('/categories/new');
    }
};

const showEditCategoryForm = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);

        if (!category) {
            req.flash('error', 'Category not found.');
            return res.redirect('/categories/manage');
        }

        res.render('forms/vehicles/editCategory', {
            title: 'Edit Vehicle Category',
            category
        });

    } catch (error) {
        console.error('Error loading category:', error);
        req.flash('error', 'Unable to load category.');
        res.redirect('/categories/manage');
    }
};

const handleEditCategory = async (req, res) => {
    const errors = validationResult(req);
    const categoryId = req.params.id;

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/categories/${categoryId}/edit`);
    }

    try {
        const { name } = req.body;

        await updateCategory(categoryId, name);

        req.flash('success', 'Category updated successfully.');
        res.redirect('/categories/manage');

    } catch (error) {
        console.error('Error updating category:', error);
        req.flash('error', 'Unable to update category.');
        res.redirect(`/categories/${categoryId}/edit`);
    }
};

const handleDeleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const vehicleCount = await countVehiclesByCategory(categoryId);

        if (vehicleCount > 0) {
            req.flash(
                'error',
                'Unable to delete category. Vehicles are still assigned to it. Reassign or remove those vehicles before deleting the category.'
            );
            return res.redirect('/categories/manage');
        }

        await deleteCategory(categoryId);

        req.flash('success', 'Category deleted successfully.');
        res.redirect('/categories/manage');

    } catch (error) {
        console.error('Error deleting category:', error);
        req.flash('error', 'Unable to delete category.');
        res.redirect('/categories/manage');
    }
};

router.get('/manage', requireRole('admin'), showManageCategories);

router.get('/new', requireRole('admin'), showAddCategoryForm);

router.post('/new', requireRole('admin'), categoryValidation, handleAddCategory);

router.get('/:id/edit', requireRole('admin'), showEditCategoryForm);

router.post('/:id/edit', requireRole('admin'), categoryValidation, handleEditCategory);

router.post('/:id/delete', requireRole('admin'), handleDeleteCategory);

export default router;

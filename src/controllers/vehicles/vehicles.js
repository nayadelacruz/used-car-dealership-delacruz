import { getListOfVehicles, 
        getByCategory, 
        getCategories, 
        getVehicleById, 
        getVehicleImages, 
        updateVehicleDetails,
        getAllCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
        countVehiclesByCategory
     } from "../../models/vehicles/list.js";

const router = Router();

const vehicleListPage = async (req, res, next) => {
    try {

        const categoryId = req.query.category;

        let vehicles;

        if (categoryId) {
            vehicles = await getByCategory(categoryId);
        } else {
            vehicles = await getListOfVehicles();
        }

        const categories = await getCategories();
        
        res.render('vehicles/vehicles', {
            title: 'Vehicle Inventory',
            vehicles,
            categories,
            currentCategory: categoryId || ''
        });

    } catch (error) {
        next(error);
    }
};

const displayVehicleDetails = async (req, res, next) => {

    const vehicleId = req.params.vehicleId;
    const vehicle = await getVehicleById(vehicleId);
    const images = await getVehicleImages(vehicleId)
    res.render('vehicles/vehicleDetails', {
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        vehicle,
        images
    });
};

// FEATURES FOR EMPLOYEES AND ADMINS 

const showEditVehicleForm = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const vehicle = await getVehicleById(vehicleId);

        if (!vehicle) {
            req.flash('error', 'Vehicle not found.');
            return res.redirect('/vehicles');
        }

        res.render('forms/vehicles/editVehicle', {
            title: 'Edit Vehicle',
            vehicle
        });

    } catch (error) {
        console.error('Error loading vehicle:', error);
        req.flash('error', 'Unable to load vehicle.');
        res.redirect('/vehicles');
    }
};

const handleEditVehicleSubmission = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const {
            price,
            description,
            availability
        } = req.body;

        await updateVehicleDetails(
            vehicleId,
            price,
            description,
            availability === 'true'
        );

        req.flash('success', 'Vehicle updated successfully.');
        res.redirect(`/vehicles/${vehicleId}`);

    } catch (error) {
        console.error('Error updating vehicle:', error);
        req.flash('error', 'Unable to update vehicle.');
        res.redirect(`/vehicles/${req.params.id}/edit`);
    }
};

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('/categories/new');
    }

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

const categoryValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Category name must be between 2 and 100 characters')
];

router.get('/manage', requireRole('admin'), showManageCategories);

router.get('/new', requireRole('admin'), showAddCategoryForm);

router.post('/new', requireRole('admin'), categoryValidation, handleAddCategory);

router.get('/:id/edit', requireRole('admin'), showEditCategoryForm);

router.post('/:id/edit', requireRole('admin'), categoryValidation, handleEditCategory);

router.post('/:id/delete', requireRole('admin'), handleDeleteCategory);

export default router;

export { vehicleListPage, 
        displayVehicleDetails, 
        showEditVehicleForm, 
        handleEditVehicleSubmission,
        showManageCategories
    };
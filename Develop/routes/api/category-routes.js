const router = require('express').Router();
const { Category, Product } = require('../../models');
//get all categories

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one catagory
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//new catagory
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//update catagory
router.put('/:id', (req, res) => {
  Category.update(req.body, {
		where: { id: req.params.id }
	})
		.then(categoryData => {
			if (!categoryData[0]) {
				res.status(404).json({ message: 'No Category found with this id!' });
				return;
			}
			console.log('Updated');
			res.json(categoryData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});
//delete catagory
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {id: req.params.id }
  })
  .then(categoryData => {
    if (!categoryData[0]) {
      res.status(404).json({ message: 'Category has been successfully deleted!' });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;

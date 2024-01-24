const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


//get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll( {
      include: [
        { model: Product, attributes: ['id', 'product_name', 'price', 'stock'], through: ProductTag }
      ]
    })
     res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});
//get one tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product, attributes: ['id', 'product_name', 'price', 'stock'], through: ProductTag }
      ]
    })
    res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a tag
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const existingTags = await Tag.findAll({
        where: {
          id: req.body.tagIds,
        },
      });

      await updatedTag.setTags(existingTags);
    }

    res.status(200).json({message: 'Your Tag has been updated'});
  } catch (err) {
    res.status(400).json('No Tag with this id');
  }
});
//delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }

    res.status(200).json({message: '!Your tag has been deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

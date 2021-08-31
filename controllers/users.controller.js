const User = require("../models/User.model");
const Book = require("../models/Book.model");

module.exports.userController = {
  createUser: async (req, res) => {
    const { name, imageURL, description, isBlocked, rentBook } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать имя user",
      });
    }
    try {
      await User.create({
        name,
        imageURL,
        description,
        isBlocked,
        rentBook
      });
      return res.json("Пользователь успешно добавлен");
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  rentBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId).populate("rented").lean();
      const user = await User.findByIdAndUpdate(req.params.userId).lean();

      if (book.rented) {
        res.json("Книга уже арендована");
      }

      else if (user.isBlocked) {
        res.json("Вы заблокированы");
      }
      else if (user.rentBook.length > 2) {
        res.json("Нельзя арендовать больше 3-х книг одновременно");
      } else {
        const arr = await User.findByIdAndUpdate(req.params.userId, {
          $push: {
            rentBook: req.params.bookId,
            title: req.params.title,
          },
        }).lean();
        await Book.findByIdAndUpdate(req.params.bookId, {
          rented: req.params.userId,
          name:req.params.name,
        });
        // res.json("Книга успешно арендована")
      }
      res.redirect(`/book/${req.params.bookId}`)
    } catch (e) {
      res.json(e.message);
    }
  },

  returnBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId);
      const user = await User.findByIdAndUpdate(req.params.userId);

      await Book.findByIdAndUpdate(req.params.bookId, {
        rented: null,
      });
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: {
          rentBook: req.params.bookId,
        },
      });
      res.redirect(`/user`)
    } catch (e) {
      res.json(e.message);
    }
  },

  removeUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await User.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить user. Укажите верный ID",
        });
      }
      return res.json({
        message: "User успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },


  getUserId: async (req, res) => {
    try {
      let user = [];

      if(req.params.id) {
        user = await User.find({ _id: req.params.id }).populate('rentBook').lean();
      } else {
        user = await User.find({}).populate('rentBook').lean();
      }
      res.render("user-book", {
        user,
      });
    } catch (e) {
      console.log(e.message);
    }
  },

  editUser: async (req, res) => {
    try {
      const patch = await User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      await patch.save();
      res.json("User успешно изменен");
    } catch (e) {
      console.log(e.message);
    }
  },
  getProfile: async (req, res) => {
    try {
      const profile = await User.findById(req.params.userId).populate('rentBook').lean()
      res.json(profile)
      res.render("profiles", {
        profile
      })

    } catch (e) {
      res.json(e.message)
    }
  },
  getUserByAdmin: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).lean()
      const users = await User.find({}).lean()
      res.json(user, users)
      res.render("admin", {
        user,
        users
      })
    } catch (e) {
      res.json(e.message)
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('rentBook').lean()
      res.json(user)
      res.render("admin-profile", {
        user,
      })
    } catch (e) {
      res.json(e.message)
    }
  },
};

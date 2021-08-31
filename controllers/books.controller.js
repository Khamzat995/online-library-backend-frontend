const Book = require("../models/Book.model");
const User = require("../models/User.model");
const Genres = require("../models/Genres.model");

module.exports.booksController = {
  allBooks: async (req, res) => {
    try {
      const limitValue = req.query.limit || 9;
      const skipValue = req.query.skip || 0;
      const get = await Book.find().lean().limit(limitValue).skip(skipValue);
      res.render("home", {
        book: get,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getBookCat: async (req, res) => {
    try {
    const bookCat = await Book.find({ genreId: req.params.id }).lean();
    const cat = await Genres.find().lean();
    res.render("genres-book", {
      book: bookCat,
      genres: cat,
    });
  } catch (e) {
    res.json(e.message);
  }
},

  getBooksGenreById: async (req, res) => {
    try {
      const bookByGenres = await Book.find({ genre: req.params.id }).lean();
      console.log(req.params.id)
      res.render("genres-book", {
        book: bookByGenres,
      });
    } catch (e) {
      console.log(e.message);
    }
  },

  getBookId: async (req, res) => {
    try {
      //const allReview = await Review.find({ book: req.params.id }).lean();
      const bookPost = await Book.findById(req.params.id).populate("rented").lean();
      console.log(bookPost);
      res.render("single-book", {
        post: bookPost,
        //reviews: allReview,
      });
    } catch (e) {
      console.log(e.message);
    }
  },

  createBook: async (req, res) => {
    try {
      const book = await new Book({
        title: req.body.title,
        genreId: req.body.genreId,
        imageURL: req.body.imageURL,
        rented: req.body.rented,
      });
      await book.save();
      res.json("Книга успешно добавлена");
    } catch (e) {
      console.log(e.message);
    }
  },

  editBook: async (req, res) => {
    try {
      const patch = await Book.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      await patch.save();
      res.json("Книга успешно изменена");
    } catch (e) {
      console.log(e.message);
    }
  },

  removeBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      book.delete();
      res.json("Книга успешно удалена");
    } catch (e) {
      console.log(e.message);
    }
  },

  takeBook: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { rentBook: req.params.bookId },
      });
      await Book.findByIdAndUpdate(req.params.bookId, {
        rented: null,
      });
      res.redirect(`/admin/user/${req.params.bookId}`)
    } catch (e) {
      res.json(e.message);
    }
  },

  blockProfile: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId,{
        isBlocked: true,
      })
       res.redirect(`/user`)

    } catch (e) {
      res.json(e.message)
    }
  },
  unblockProfile: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId,{
        isBlocked: false,
      })
      res.redirect(`/user`)
    } catch (e) {
      res.json(e.message)
    }
  }
};

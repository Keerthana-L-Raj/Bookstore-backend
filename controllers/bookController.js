const books = require("../models/bookModel");
const stripe = require('stripe')(process.env.stripeKey)


exports.addBook = async (req, res) => {
  console.log("Inside addBookController");
  const { title, author, noofpages, imageUrl, price, dprice, abstract, publisher, language, isbn, category } = req.body


  UploadedImages = []
  req.files.map((item) => UploadedImages.push(item.filename))

  console.log(req.files);//array
  console.log(req.body);

  const email = req.payload?.userMail

  try {
    const existingBook = await books.findOne({ title, userMail: email })
    if (existingBook) {
      res.status(401).json("Book already existing...")
    }
    else {
      const newBook = new books({
        title, author, noofpages, imageUrl, price, dprice, abstract, publisher, language, isbn, category, UploadedImages, userMail: email
      })
      await newBook.save()
      res.status(200).json(newBook)
    }
  }
  catch (err) {
    res.status(500).json("Err" + err)
  }

  res.status(200).json("AddBook request received...")

}

exports.getHomeBooks = async (req, res) => {
  try {
    const homeBooks = await books.find().sort({ _id: -1 }).limit(4);
    res.status(200).json(homeBooks);
  } catch (err) {
    res.status(500).json("Error fetching home books: " + err);
  }
}

exports.getAllBooks = async (req, res) => {
  console.log("Inside All books");

  console.log(req.query);
  const searchKey = req.query.search //?search=""
  const email = req.query.userMail
  console.log("Inside getAllBooks");


  try {
    const query = {
      title: {
        $regex: searchKey,
        $options: "i"
      },
      userMail: {
        $ne: email
      }
    }
    const AllBooks = await books.find(query)
    res.status(200).json(AllBooks);
  } catch (err) {
    res.status(500).json("Error fetching all books: " + err);
  }
}

exports.getABook = async (req, res) => {
  console.log("Inside getABook");
  const { id } = req.params
  console.log(id);

  try {
    const AllBooks = await books.findOne({ _id: id })
    res.status(200).json(AllBooks)
  }
  catch (err) {
    res.stats(500).json("Err" + err)
  }
}

exports.getAllBookAdminController = async (req, res) => {
  try {
    const allExistingBooks = await books.find()
    res.status(200).json(allExistingBooks);
  } catch (err) {
    res.status(500).json("Err" + err);
  }
}

exports.approveBooksAdminController = async (req, res) => {
  const { _id, title, author, noofpages, imageUrl, price, dprice, abstract, publisher, language, isbn, category, UploadedImages, status, userMail, brought } = req.body
  try {
    const existingBook = await books.findByIdAndUpdate({ _id }, { title, author, noofpages, imageUrl, price, dprice, abstract, publisher, language, isbn, category, UploadedImages, status: 'approved', userMail, brought }, { new: true })
    await existingBook.save()
    res.status(200).json(existingBook)
  }

  catch (err) {
    res.status(500).json("Err" + err)
  }
}

exports.makepayment=async(req,res)=>{
  console.log("inside make payment");
  const {bookDetails}=req.body
  console.log(bookDetails);

  const email=req.payload.userMail
  console.log(email);
  
  try{
const existingBook = await books.findByIdAndUpdate({_id:bookDetails._id},{
  title:bookDetails.title,
  author:bookDetails.author,
  noofpages:bookDetails.noofpages,
  imageUrl:bookDetails.imageUrl,
  price:bookDetails.price,
  dprice:bookDetails.dprice,
   abstract:bookDetails.abstract,
   publisher:bookDetails.publisher,
   language:bookDetails.language,
   isbn:bookDetails.isbn,
   category:bookDetails.category,
   UploadedImages:bookDetails.UploadedImages,
   status:'sold',
   brought:email,
userMail:bookDetails.userMail},
{new:true}) 
console.log(existingBook);

line_item =[{
  price_data:{
    currency:'usd',
    product_data:{
      name:bookDetails.title,
      description :`${bookDetails.author} | ${bookDetails.publisher}`,
      images:[bookDetails.imageUrl],
      metadata: {
  title: String(bookDetails.title),
  author: String(bookDetails.author),
  noofpages: String(bookDetails.noofpages),
  imageUrl: String(bookDetails.imageUrl),
  price: String(bookDetails.price),
  dprice: String(bookDetails.dprice),
  abstract: String(bookDetails.abstract),
  publisher: String(bookDetails.publisher),
  language: String(bookDetails.language),
  isbn: String(bookDetails.isbn),
  category: String(bookDetails.category),
  UploadedImages: JSON.stringify(bookDetails.UploadedImages), // ✅ stringify array/object
  status: 'sold',
  brought: String(email),
  userMail: String(bookDetails.userMail)
}

    },
   
    //doller conversion
    unit_amount:Math.round(bookDetails.dprice*100)
  },
   quantity:1
}]




//create stripe checkout session
const session = await stripe.checkout.sessions.create({
  //purchase using card
    "payment_method_types": ["card"],
    //details of book
    line_items: line_item,
    //make payment
  mode: 'payment',
  //if payment is successful then redirected to payment success

   success_url: 'http://localhost:5173/payment-success',
  
   //if payment is unsuccessful then redirected to payment error
 cancel_url :'http://localhost:5173/payment-error'

});
console.log(session);
res.status(200).json({sessionID:session.id,existingBook})
}
  
  catch(err){
res.status(500).json("Err"+err);
  }
}

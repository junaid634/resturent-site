const express = require("express");
let app = express();
const path = require("path");
const method = require("method-override");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localstratigy = require("passport-local");


// const User = require("./models/schema.js");///------    all are shifted in the routes folder to make it better
// const Review = require("./models/reviewschema.js");
// const { serverschema, reviewschema } = require("./models/joischema.js");//---------   joi validation error handling for server side data input
const myname = require("./myname.js");
const listingsroute = require("./routes/listings.js");
const reviewsroute = require("./routes/reviews.js");
const userroute = require("./routes/users.js");
const newerr = require("./error_class.js");
//---------   starter   -----------
app.listen(8080, () => {
    myname();//   ---------    ------     figlit 
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(method("_method"));
app.use(express.urlencoded({ extended: true }));
const ejsmate = require("ejs-mate");
const { error } = require("console");
app.engine("ejs", ejsmate);
//                -----------             data base connection settings
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/junaid");

}

main().then(() => {
    console.log("DB_connected");
}).catch((err) => {
    console.log(err);
});

//---------cookie sessions 

app.use(cookieparser());
app.use(session({
    secret: "saqibkhan",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,// for 7 days it take in mili seconds
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true

    },
}));
app.use(flash());


const User1 = require("./models/usermodel.js");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstratigy(User1.authenticate()));
passport.serializeUser(User1.serializeUser());
passport.deserializeUser(User1.deserializeUser());




app.get("/", (req, res) => {
    res.send("home page");
});

app.use((req, res, next) => { // error pop up msg or alerts

    res.locals.massage = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});



app.use("/listings", listingsroute);
app.use("/", userroute);
app.use("/listings/:id/reviews", reviewsroute);




app.get("/terms", (req, res) => {
    res.render("terms.ejs");
});



app.get("/location/:navigator", async (req, res) => {
    let { navigator } = req.params;
    console.log(navigator);
    res.send("you are good");

});


//              --------------                     error page rendering
app.all("*", (req, res, next) => {
    let err = new newerr(404, "page not found")
    res.status(err.status).render("error.ejs", { err });
    next(err);
});


//              -------------                       error handler
app.use((err, req, res, next) => {
    console.log("-------Error-------");
    let { status = 500, message = "some error occured" } = err;
    if (status || message) {
        req.flash("error", `${status} error ->> ${message}`);
        res.status(status).redirect("/listings");
    }
    next();
})
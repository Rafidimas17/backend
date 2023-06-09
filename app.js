const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require('mongoose')
const methodOverride=require('method-override')
const session=require('express-session')
const flash=require('connect-flash')
mongoose.connect("mongodb+srv://bendosiap45:d8dP8UKiBJn6NBLC@cluster0.yzlgzli.mongodb.net/?retryWrites=true&w=majoritya",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter=require('./routes/admin/adminRoutes')
const apiRouter=require('./routes/api/apiRoutes')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride("_method"));
app.use(session({
  secret:'Keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:60000}
}))
app.use(flash())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admin-2',express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter)
app.use('/api-v1',apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

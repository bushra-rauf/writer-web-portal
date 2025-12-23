
export type Lang = 'english' | 'urdu';

export type LocalizedString = {
  english: string;
  urdu: string;
};

export type NestedTranslations = {
  [key: string]: LocalizedString | NestedTranslations;
};

export const translations: NestedTranslations = {
  // Navigation
  nav: {
    home: { english: 'Home', urdu: 'ہوم' },
    books: { english: 'Books', urdu: 'کتابیں' },
    dashboard: { english: 'Dashboard', urdu: 'ڈیش بورڈ' },
    login: { english: 'Login', urdu: 'لاگ ان' },
    signup: { english: 'Sign Up', urdu: 'سائن اپ' },
    logout: { english: 'Logout', urdu: 'لاگ آؤٹ' },
  },

  // Common
  common: {
    view: { english: 'View', urdu: 'دیکھیں' },
    edit: { english: 'Edit', urdu: 'ترمیم' },
    delete: { english: 'Delete', urdu: 'حذف کریں' },
    deleting: { english: 'Deleting...', urdu: 'حذف ہو رہا ہے...' },
    cancel: { english: 'Cancel', urdu: 'منسوخ' },
    save: { english: 'Save', urdu: 'محفوظ کریں' },
    update: { english: 'Update', urdu: 'اپ ڈیٹ' },
    publish: { english: 'Publish', urdu: 'شائع کریں' },
    publishing: { english: 'Publishing...', urdu: 'شائع ہو رہا ہے...' },
    search: { english: 'Search', urdu: 'تلاش کریں' },
    loading: { english: 'Loading...', urdu: 'لوڈ ہو رہا ہے...' },
    optional: { english: 'Optional', urdu: 'اختیاری' },
    by: { english: 'by', urdu: 'بذریعہ' },
    price: { english: 'Price', urdu: 'قیمت' },
    category: { english: 'Category', urdu: 'زمرہ' },
    language: { english: 'Language', urdu: 'زبان' },
    noRatings: { english: 'No ratings', urdu: 'کوئی درجہ بندی نہیں' },
  },

  // Dashboard
  dashboard: {
    title: { english: 'Writer Dashboard', urdu: 'مصنف کا ڈیش بورڈ' },
    welcome: { english: 'Welcome', urdu: 'خوش آمدید' },
    addNewBook: { english: '+ Add New Book', urdu: '+ نئی کتاب شامل کریں' },
    publishNewBook: { english: 'Publish New Book', urdu: 'نئی کتاب شائع کریں' },
    editBook: { english: 'Edit Book', urdu: 'کتاب میں ترمیم' },
    myBooks: { english: 'My Books', urdu: 'میری کتابیں' },
    yourBooks: { english: 'Your Books', urdu: 'آپ کی کتابیں' },
    noBooks: { english: "You haven't published any books yet.", urdu: 'آپ نے ابھی تک کوئی کتاب شائع نہیں کی۔' },
    publishFirstBook: { english: 'Publish Your First Book', urdu: 'اپنی پہلی کتاب شائع کریں' },
    publishing: { english: 'Publishing...', urdu: 'شائع ہو رہی ہے...' },
    updating: { english: 'Updating...', urdu: 'اپ ڈیٹ ہو رہا ہے...' },
    bookPublished: { english: 'Book published successfully!', urdu: 'کتاب کامیابی سے شائع ہو گئی!' },
    bookUpdated: { english: 'Book updated successfully!', urdu: 'کتاب کامیابی سے اپ ڈیٹ ہو گئی!' },
    bookDeleted: { english: 'Book deleted successfully!', urdu: 'کتاب کامیابی سے حذف ہو گئی!' },
    confirmDelete: { english: 'Are you sure you want to delete this book?', urdu: 'کیا آپ واقعی اس کتاب کو حذف کرنا چاہتے ہیں؟' },
  },

  // Book Form
  bookForm: {
    coverImage: { english: 'Book Cover Image', urdu: 'کتاب کا سرورق' },
    preview: { english: 'Preview:', urdu: 'پیش نظارہ:' },
    newPreview: { english: 'New Preview:', urdu: 'نیا پیش نظارہ:' },
    currentCover: { english: 'Current Cover:', urdu: 'موجودہ سرورق:' },
    bookTitle: { english: 'Book Title *', urdu: 'کتاب کا عنوان *' },
    title: { english: 'Title', urdu: 'عنوان' },
    titlePlaceholder: { english: 'Enter book title', urdu: 'کتاب کا عنوان درج کریں' },
    description: { english: 'Description *', urdu: 'تفصیل *' },
    descriptionPlaceholder: { english: 'Describe your book...', urdu: 'اپنی کتاب کی تفصیل لکھیں...' },
    price: { english: 'Price (kr) *', urdu: 'قیمت (kr) *' },
    priceLabel: { english: 'Price ($) *', urdu: 'قیمت ($) *' },
    category: { english: 'Category', urdu: 'زمرہ' },
    language: { english: 'Language', urdu: 'زبان' },
    bookContent: { english: 'Book Content (Preview)', urdu: 'کتاب کا مواد (پیش نظارہ)' },
    content: { english: 'Content (Optional)', urdu: 'مواد (اختیاری)' },
    contentPlaceholder: { english: 'Enter your book content or sample chapters...', urdu: 'اپنی کتاب کا مواد یا نمونہ ابواب درج کریں...' },
    fillAllFields: { english: 'Please fill in all required fields', urdu: 'براہ کرم تمام ضروری فیلڈز پُر کریں' },
    publishBook: { english: 'Publish Book', urdu: 'کتاب شائع کریں' },
    imageHint: { english: 'Max 5MB, Image formats only', urdu: 'زیادہ سے زیادہ 5MB، صرف تصویری فارمیٹس' },
  },

  // Books Page
  books: {
    browseBooks: { english: 'Browse Books', urdu: 'کتابیں تلاش کریں' },
    searchPlaceholder: { english: 'Search by title, author, or keyword...', urdu: 'عنوان، مصنف، یا مطلوبہ الفاظ سے تلاش کریں...' },
    filters: { english: 'Filters', urdu: 'فلٹرز' },
    allCategories: { english: 'All', urdu: 'تمام' },
    allLanguages: { english: 'All Languages', urdu: 'تمام زبانیں' },
    sortBy: { english: 'Sort By', urdu: 'ترتیب' },
    newest: { english: 'Newest', urdu: 'نیا ترین' },
    oldest: { english: 'Oldest', urdu: 'پرانا ترین' },
    priceLowToHigh: { english: 'Price: Low to High', urdu: 'قیمت: کم سے زیادہ' },
    priceHighToLow: { english: 'Price: High to Low', urdu: 'قیمت: زیادہ سے کم' },
    topRated: { english: 'Top Rated', urdu: 'اعلیٰ درجہ بند' },
    showing: { english: 'Showing', urdu: 'دکھائی جا رہی ہے' },
    book: { english: 'book', urdu: 'کتاب' },
    books: { english: 'books', urdu: 'کتابیں' },
    noBooksFound: { english: 'No books found matching your criteria.', urdu: 'آپ کے معیار سے میل کھاتی کوئی کتاب نہیں ملی۔' },
  },

  // Categories
  categories: {
    fiction: { english: 'Fiction', urdu: 'افسانہ' },
    Fiction: { english: 'Fiction', urdu: 'افسانہ' },
    'Non-Fiction': { english: 'Non-Fiction', urdu: 'غیر افسانوی' },
    nonFiction: { english: 'Non-Fiction', urdu: 'غیر افسانوی' },
    Mystery: { english: 'Mystery', urdu: 'اسرار' },
    mystery: { english: 'Mystery', urdu: 'اسرار' },
    Romance: { english: 'Romance', urdu: 'رومانس' },
    romance: { english: 'Romance', urdu: 'رومانس' },
    'Science Fiction': { english: 'Science Fiction', urdu: 'سائنس فکشن' },
    scienceFiction: { english: 'Science Fiction', urdu: 'سائنس فکشن' },
    Biography: { english: 'Biography', urdu: 'سوانح عمری' },
    biography: { english: 'Biography', urdu: 'سوانح عمری' },
    'Self-Help': { english: 'Self-Help', urdu: 'خود مدد' },
    selfHelp: { english: 'Self-Help', urdu: 'خود مدد' },
    Poetry: { english: 'Poetry', urdu: 'شاعری' },
    poetry: { english: 'Poetry', urdu: 'شاعری' },
    History: { english: 'History', urdu: 'تاریخ' },
    history: { english: 'History', urdu: 'تاریخ' },
    Other: { english: 'Other', urdu: 'دیگر' },
    other: { english: 'Other', urdu: 'دیگر' },
  },

  // Languages
  languages: {
    english: { english: 'English', urdu: 'انگریزی' },
    urdu: { english: 'Urdu', urdu: 'اردو' },
  },

  // Book Detail
  bookDetail: {
    confirmDelete: { english: 'Are you sure you want to delete this book?', urdu: 'کیا آپ واقعی اس کتاب کو حذف کرنا چاہتے ہیں؟' },
  },

  // Auth
  auth: {
    // Login Page
    welcomeBack: { english: 'Welcome Back', urdu: 'خوش آمدید' },
    loginTitle: { english: 'Log in to your account', urdu: 'اپنے اکاؤنٹ میں لاگ ان کریں' },
    loginButton: { english: 'Log In', urdu: 'لاگ ان' },
    loggingIn: { english: 'Logging you in...', urdu: 'لاگ ان ہو رہا ہے...' },
    dontHaveAccount: { english: "Don't have an account?", urdu: 'اکاؤنٹ نہیں ہے؟' },

    // Signup Page
    createAccount: { english: 'Create Account', urdu: 'اکاؤنٹ بنائیں' },
    joinWriterHub: { english: 'Join WriterHub today', urdu: 'آج ہی رائٹر ہب میں شامل ہوں' },
    signupTitle: { english: 'Create your account', urdu: 'اپنا اکاؤنٹ بنائیں' },
    signupButton: { english: 'Sign Up', urdu: 'سائن اپ' },
    creatingAccount: { english: 'Creating Account...', urdu: 'اکاؤنٹ بنایا جا رہا ہے...' },
    alreadyHaveAccount: { english: 'Already have an account?', urdu: 'پہلے سے اکاؤنٹ ہے؟' },
    loginHere: { english: 'Login here', urdu: 'یہاں لاگ ان کریں' },
    logIn: { english: 'Log In', urdu: 'لاگ ان' },

    // Form Fields
    email: { english: 'Email', urdu: 'ای میل' },
    emailPlaceholder: { english: 'you@example.com', urdu: 'آپ@مثال.com' },
    password: { english: 'Password', urdu: 'پاس ورڈ' },
    passwordPlaceholder: { english: '••••••••', urdu: '••••••••' },
    fullName: { english: 'Full Name', urdu: 'پورا نام' },
    fullNamePlaceholder: { english: 'John Doe', urdu: 'آپ کا نام' },
    confirmPassword: { english: 'Confirm Password', urdu: 'پاس ورڈ کی تصدیق کریں' },
    iAmA: { english: 'I am a', urdu: 'میں ہوں' },
    reader: { english: 'Reader', urdu: 'قاری' },
    writer: { english: 'Writer', urdu: 'مصنف' },

    // Success/Error Messages
    loginSuccess: { english: 'Login successful!', urdu: 'لاگ ان کامیاب!' },
    loginError: { english: 'Invalid email or password', urdu: 'غلط ای میل یا پاس ورڈ' },
    accountCreated: { english: 'Account created successfully!', urdu: 'اکاؤنٹ کامیابی سے بن گیا!' },
    accountCreationFailed: { english: 'Failed to create account', urdu: 'اکاؤنٹ بنانے میں ناکامی' },

    // Validation Messages
    emailRequired: { english: 'Email is required', urdu: 'ای میل ضروری ہے' },
    emailInvalid: { english: 'Please enter a valid email', urdu: 'براہ کرم درست ای میل درج کریں' },
    passwordRequired: { english: 'Password is required', urdu: 'پاس ورڈ ضروری ہے' },
    passwordMinLength: { english: 'Password must be at least 6 characters', urdu: 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے' },
    passwordsNotMatch: { english: 'Passwords do not match', urdu: 'پاس ورڈز مماثل نہیں ہیں' },
    fullNameRequired: { english: 'Full name is required', urdu: 'پورا نام ضروری ہے' },
    userTypeRequired: { english: 'Please select user type', urdu: 'براہ کرم صارف کی قسم منتخب کریں' },
  },

  // Home Page
  home: {
    hero: {
      title: { english: 'Discover & Publish Amazing Books', urdu: 'حیرت انگیز کتابیں دریافت اور شائع کریں' },
      subtitle: { english: 'A platform for writers to share their stories and readers to explore new worlds', urdu: 'مصنفین کے لیے اپنی کہانیاں شیئر کرنے اور قارئین کے لیے نئی دنیائیں تلاش کرنے کا پلیٹ فارم' },
      browseBooks: { english: 'Browse Books', urdu: 'کتابیں تلاش کریں' },
      startPublishing: { english: 'Start Publishing', urdu: 'شائع کرنا شروع کریں' },
      startWriting: { english: 'Start Writing', urdu: 'لکھنا شروع کریں' },
      getStarted: { english: 'Get Started', urdu: 'شروع کریں' },
      learnMore: { english: 'Learn More', urdu: 'مزید جانیں' },
    },
    latestBooks: { english: 'Latest Books', urdu: 'تازہ ترین کتابیں' },
    viewAll: { english: 'View All Books', urdu: 'تمام کتابیں دیکھیں' },
    featuredBooks: { english: 'Featured Books', urdu: 'نمایاں کتابیں' },
    popularBooks: { english: 'Popular Books', urdu: 'مقبول کتابیں' },
    noBooks: { english: 'No books available yet', urdu: 'ابھی تک کوئی کتاب دستیاب نہیں' },
    loadingBooks: { english: 'Loading books...', urdu: 'کتابیں لوڈ ہو رہی ہیں...' },

    // Features Section
    features: {
      title: { english: 'Why WriterHub?', urdu: 'رائٹر ہب کیوں؟' },
      subtitle: { english: 'Everything you need to publish and discover books', urdu: 'کتابیں شائع اور دریافت کرنے کے لیے آپ کو جو کچھ چاہیے' },

      easyPublishing: {
        title: { english: 'Easy Publishing', urdu: 'آسان اشاعت' },
        description: { english: 'Publish your books in minutes with our simple and intuitive platform.', urdu: 'ہمارے سادہ اور بدیہی پلیٹ فارم کے ساتھ منٹوں میں اپنی کتابیں شائع کریں۔' },
      },

      globalReach: {
        title: { english: 'Global Reach', urdu: 'عالمی رسائی' },
        description: { english: 'Connect with readers from around the world and build your audience.', urdu: 'دنیا بھر کے قارئین سے جڑیں اور اپنی سامعین بنائیں۔' },
      },

      earnRoyalties: {
        title: { english: 'Earn Royalties', urdu: 'رائلٹی کمائیں' },
        description: { english: 'Keep control of your work and earn money from every sale.', urdu: 'اپنے کام پر کنٹرول رکھیں اور ہر فروخت سے پیسے کمائیں۔' },
      },

      communitySupport: {
        title: { english: 'Community Support', urdu: 'کمیونٹی سپورٹ' },
        description: { english: 'Join a community of writers and get feedback from readers.', urdu: 'مصنفین کی کمیونٹی میں شامل ہوں اور قارئین سے رائے حاصل کریں۔' },
      },

      analytics: {
        title: { english: 'Analytics', urdu: 'تجزیات' },
        description: { english: 'Track your sales, reader engagement, and book performance.', urdu: 'اپنی فروخت، قارئین کی مصروفیت، اور کتاب کی کارکردگی کو ٹریک کریں۔' },
      },

      securePlatform: {
        title: { english: 'Secure Platform', urdu: 'محفوظ پلیٹ فارم' },
        description: { english: 'Your books and data are safe with our secure infrastructure.', urdu: 'آپ کی کتابیں اور ڈیٹا ہمارے محفوظ انفراسٹرکچر کے ساتھ محفوظ ہیں۔' },
      },

      reachReaders: {
        title: { english: 'Reach Readers', urdu: 'قارئین تک رسائی' },
        description: { english: 'Connect with readers from around the world who love your genre', urdu: 'دنیا بھر کے قارئین سے جڑیں جو آپ کی صنف سے محبت کرتے ہیں' },
      },

      multiLanguage: {
        title: { english: 'Multi-Language Support', urdu: 'کثیر لسانی معاونت' },
        description: { english: 'Publish and read books in multiple languages including English and Urdu', urdu: 'انگریزی اور اردو سمیت متعدد زبانوں میں کتابیں شائع اور پڑھیں' },
      },

      securePayments: {
        title: { english: 'Secure Payments', urdu: 'محفوظ ادائیگیاں' },
        description: { english: 'Safe and secure payment processing for all transactions', urdu: 'تمام لین دین کے لیے محفوظ اور محفوظ ادائیگی کی کارروائی' },
      },
    },

    // CTA Section
    readyToShare: {
      title: { english: 'Ready to Share Your Story?', urdu: 'اپنی کہانی شیئر کرنے کے لیے تیار ہیں؟' },
      subtitle: { english: 'Join writers who are publishing and selling their books on WriterHub.', urdu: 'مصنفین میں شامل ہوں جو رائٹر ہب پر اپنی کتابیں شائع اور فروخت کر رہے ہیں۔' },
      button: { english: 'Get Started Today', urdu: 'آج ہی شروع کریں' },
    },

    // Statistics Section
    stats: {
      books: { english: 'Books Published', urdu: 'شائع شدہ کتابیں' },
      writers: { english: 'Active Writers', urdu: 'فعال مصنفین' },
      readers: { english: 'Happy Readers', urdu: 'خوش قارئین' },
      downloads: { english: 'Total Downloads', urdu: 'کل ڈاؤن لوڈز' },
    },

    // Call to Action Section
    cta: {
      writers: {
        title: { english: 'Are You a Writer?', urdu: 'کیا آپ مصنف ہیں؟' },
        description: { english: 'Share your stories with the world. Start publishing today!', urdu: 'اپنی کہانیاں دنیا کے ساتھ شیئر کریں۔ آج ہی شائع کرنا شروع کریں!' },
        button: { english: 'Start Publishing', urdu: 'شائع کرنا شروع کریں' },
      },

      readers: {
        title: { english: 'Love Reading?', urdu: 'پڑھنے کے شوقین ہیں؟' },
        description: { english: 'Discover amazing books from talented writers around the world', urdu: 'دنیا بھر کے باصلاحیت مصنفین کی حیرت انگیز کتابیں دریافت کریں' },
        button: { english: 'Explore Books', urdu: 'کتابیں تلاش کریں' },
      },
    },

    // Testimonials Section
    testimonials: {
      title: { english: 'What Our Users Say', urdu: 'ہمارے صارفین کیا کہتے ہیں' },
      subtitle: { english: 'Join thousands of satisfied writers and readers', urdu: 'ہزاروں مطمئن مصنفین اور قارئین میں شامل ہوں' },
    },

    // Categories Section
    exploreCategories: {
      title: { english: 'Explore by Category', urdu: 'زمرہ کے لحاظ سے تلاش کریں' },
      subtitle: { english: 'Find books in your favorite genre', urdu: 'اپنی پسندیدہ صنف میں کتابیں تلاش کریں' },
      viewMore: { english: 'View More', urdu: 'مزید دیکھیں' },
    },

    // Newsletter Section
    newsletter: {
      title: { english: 'Stay Updated', urdu: 'تازہ ترین رہیں' },
      subtitle: { english: 'Subscribe to our newsletter for the latest books and updates', urdu: 'تازہ ترین کتابوں اور اپ ڈیٹس کے لیے ہمارے نیوز لیٹر کو سبسکرائب کریں' },
      placeholder: { english: 'Enter your email address', urdu: 'اپنا ای میل ایڈریس درج کریں' },
      button: { english: 'Subscribe', urdu: 'سبسکرائب کریں' },
      success: { english: 'Successfully subscribed!', urdu: 'کامیابی سے سبسکرائب ہو گیا!' },
      error: { english: 'Please enter a valid email', urdu: 'براہ کرم ایک درست ای میل درج کریں' },
    },

    // Footer Section
    footer: {
      about: {
        title: { english: 'About WriterHub', urdu: 'رائٹر ہب کے بارے میں' },
        description: { english: 'A modern platform connecting writers and readers worldwide', urdu: 'دنیا بھر میں مصنفین اور قارئین کو جوڑنے والا ایک جدید پلیٹ فارم' },
      },

      quickLinks: {
        title: { english: 'Quick Links', urdu: 'فوری لنکس' },
        browseBooks: { english: 'Browse Books', urdu: 'کتابیں تلاش کریں' },
        dashboard: { english: 'Dashboard', urdu: 'ڈیش بورڈ' },
        home: { english: 'Home', urdu: 'ہوم' },
        about: { english: 'About Us', urdu: 'ہمارے بارے میں' },
        contact: { english: 'Contact', urdu: 'رابطہ کریں' },
        faq: { english: 'FAQ', urdu: 'عمومی سوالات' },
        terms: { english: 'Terms & Conditions', urdu: 'شرائط و ضوابط' },
        privacy: { english: 'Privacy Policy', urdu: 'رازداری کی پالیسی' },
      },

      forWriters: {
        title: { english: 'For Writers', urdu: 'مصنفین کے لیے' },
        howToPublish: { english: 'How to Publish', urdu: 'کیسے شائع کریں' },
        guidelines: { english: 'Publishing Guidelines', urdu: 'اشاعت کے رہنما خطوط' },
        pricing: { english: 'Pricing', urdu: 'قیمتوں کا تعین' },
        support: { english: 'Support', urdu: 'معاونت' },
      },

      forReaders: {
        title: { english: 'For Readers', urdu: 'قارئین کے لیے' },
        browseBooks: { english: 'Browse Books', urdu: 'کتابیں تلاش کریں' },
        newReleases: { english: 'New Releases', urdu: 'نئی ریلیزز' },
        bestSellers: { english: 'Best Sellers', urdu: 'بہترین فروخت' },
        recommendations: { english: 'Recommendations', urdu: 'سفارشات' },
      },

      social: {
        title: { english: 'Follow Us', urdu: 'ہمیں فالو کریں' },
        connect: { english: 'Connect', urdu: 'جڑیں' },
        facebook: { english: 'Facebook', urdu: 'فیس بک' },
        twitter: { english: 'Twitter', urdu: 'ٹویٹر' },
        instagram: { english: 'Instagram', urdu: 'انسٹاگرام' },
        linkedin: { english: 'LinkedIn', urdu: 'لنکڈ ان' },
      },

      copyright: { english: 'WriterHub. All rights reserved.', urdu: 'رائٹر ہب۔ تمام حقوق محفوظ ہیں۔' },
      builtWith: { english: 'Built with Next.js & Supabase', urdu: 'Next.js اور Supabase کے ساتھ بنایا گیا' },
    },
  },
};

/**
 * Get translated text by key path (dot-separated) and language.
 * Returns the key if no translation is found.
 */
export function t(key: string, language: Lang = 'english'): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  if (typeof value === 'object' && value !== null) {
    // Try to return the requested language, fallback to english, then fallback to key
    return (value as LocalizedString)[language] ?? (value as LocalizedString).english ?? key;
  }

  // If value is a primitive (unexpected), convert to string
  return String(value);
}
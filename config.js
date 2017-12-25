var config = {
  translations: {
    welcome: 'Welcome',
    be_glad: 'We will be glad if you fill out the following data',
    skip: 'Skip and continue with',
    facebook: 'Login with facebook',
    or_fill: 'fill out the following data',
    full_name: 'Full name',
    email: 'Email',
    adress: 'Adress',
    continue: 'Continue',
    selfies: 'Want to make selfies',
    or: 'or',
    want: 'Yes, I want, go foto',
    not_now: 'Not now',
    back: 'Back'
  },
  urls: {
    adress: 'https://maps.googleapis.com/maps/api/geocode/json?address={query}&language={language}',
    media: './dist/media/',
    photo: '/photo',
    home: '/'
  },
  data: {
    name: '',
    email: '',
    address: '',
    photo: '',
    gender: '',
    birthdate: '',
    source: '',
    note: '',
    permit_ads: false
  },
  isRtL: false,
  address_based: true,
  plugins: ['highres_photos'],
  timeout: 500
}

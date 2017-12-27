var config = {
  translations: {
    language: 'en',
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
    back: 'Back',
    man: 'Man',
    woman: 'Woman',
    last_data: 'Last data and finish',
    date_of_birth: 'Date of birth',
    source: 'Source',
    remarks_and_preferences: 'Remarks and preferences',
    confirm: 'Confirm',
    recommended_by: 'Recommended by:',
    source_list: [
      {value: 'ads', label: 'Ads'},
      {value: 'fb_page', label: 'fb_page'},
      {value: 'family', label: 'family'},
      {value: 'friends', label: 'friends'},
      {value: 'recommendation', label: 'recommendation'}
    ]
  },
  urls: {
    adress: 'https://maps.googleapis.com/maps/api/geocode/json?address={query}&language={language}',
    add_client_url: '/add-client/clients?q={query}',
    main: 'https://api.bewebmaster.co.il',
    other_data: '/other_data',
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
  timeout: 500,
  max_side: 1000
}

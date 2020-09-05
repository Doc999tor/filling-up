var config = {
  translations: {
    language: 'en',
    greeting_page: {
      greeting_title: 'Hello!',
      greeting_title_with_name: 'Hello, {name}!',
      greeting_subtitle: 'You can autofill all the data with your Facebook account just in one tap! Or fill in the questionnaire manually',
      fb_btn_label: 'Continue with Facebook',
      fill_in_btn_label: 'Fill In the Form'
    },
    last_page: {
      last_page_title: 'Nicely Done!',
      last_page_subtitle: 'Thank you so much for your efforts. Have a nice day and see you soon!',
      business_address_title: 'Pure beauty address:',
      footer: {
        about_us: 'About Lista CRM',
        terms_of_use: ' Terms of use'
      }
    },
    other_data: {
      gender_strip_title: 'Select gender',
      checkbox_label: 'I want to receive Advertising Newsletters and Special Offers from Lista',
      gender: {
        male: 'Male',
        female: 'Female',
        third: 'Third'
      }
    },
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
    customers_agree: 'Check here to indicate that you have read and agree to the terms of the Atzma.in Customer Agreement',
    thanks: 'Thanks!',
    glad_see: 'We are glad to see you',
    close: 'Close',
    datepicker: {
      placeholder: {
        year: 'Year',
        month: 'Month',
        day: 'Day'
      }
    },
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
    filling_up: '/filling-up',
    photo_r: '/filling-up/photo',
    notes: '/filling-up/notes',
    other_data: '/other_data',
    last_page: '/last_page',
    media: './assets/media/',
    photo: '/photo',
    baseUrl: '',
    params: '?b=123&c=sdfs2d1f'
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
  isRTL: false,
  address_based: true,
  greetings_text: 'We`re so glad to see you our friend, your next visit you`ll get 20% discount. Remember, every client is our family',
  business_name: 'Beauty Salon Maria',
  business_logo: './assets/media/ic_facebook.svg',
  business_adress: 'Tel Aviv, Allenby str. 45',
  business_desc: 'loresdfgs dgsdgsdf ffffffffffffff ffffffffs  sdgsd sd sg sgdfffffffffff sdfg sdf sd gsdf s sfgs dfgsf sd sg dsfm',
  business_links: [{icon: 'link_facebook.svg', url: '/facebook_url'}, {icon: 'link_instagram.svg', url: '/instagram'}],
  plugins: ['highres_photos'],
  timeout: 500,
  max_side: 1000,
  gender: {
    data: [
      { type: 'male', id: 1, icon: 'male.svg', active_icon: 'selected_male.svg' },
      { type: 'female', id: 2, icon: 'female.svg', active_icon: 'selected_female.svg' },
      { type: 'third', id: 3, icon: 'third.svg', active_icon: 'selected_third.svg' }
    ]
  },
  footer: {
    data: [
      { name: 'about_us', link: `/en/about_us`},
      { name: 'lista', link: `/en/home`, icon: 'logo.svg'},
      { name: 'terms_of_use', link: `/en/terms_of_use`}
    ]
  }
}

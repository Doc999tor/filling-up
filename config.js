var config = {
  locale: 'en',
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
      birthdate_strip_title: 'Select birthdate',
      checkbox_label: 'I want to receive Advertising Newsletters and Special Offers from Lista',
      gender: {
        male: 'Male',
        female: 'Female',
        third: 'Third'
      }
    },
    fill_in: {
      name_placeholder: 'Full name',
      email_placeholder: 'Email',
      adress_placeholder: 'Address'
    },
    continue_btn_label: 'Continue',
    datepicker: {
      placeholder: {
        year: 'Year',
        month: 'Month',
        day: 'Day'
      }
    },
    dates: {
      months: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      }
    }
  },
  urls: {
    add_address: `https://api.bewebmaster.co.il/settings/maps-api-key?token=${token}`,
    add_client_url: '/add-client/clients?q={query}',
    main: 'https://api.bewebmaster.co.il',
    filling_up: '/filling-up',
    fb_script: './scripts/fb_script.js',
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
    birthyear: '',
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
  business_links: [{icon: 'link_facebook.svg', url: '/facebook_url'}, {icon: 'link_instagram.svg', url: '/instagram'}, {icon: 'link_facebook.svg', url: '/facebook_url'}],
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

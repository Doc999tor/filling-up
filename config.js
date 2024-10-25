var config = {
  locale: 'en',
  isUserFilesUploadingPermitted: false,
  translations: {
    // language: 'en',
    greeting_page: {
      greeting_title: 'Hello!',
      greeting_title_with_name: 'Hello, {name}!',
      greeting_subtitle: 'You can autofill all the data with your Facebook account just in one tap! Or fill in the questionnaire manually',
      fb_btn_label: 'Continue with Facebook',
      fill_in_btn_label: 'Fill In the Form'
    },
    appointment_confirmation: {
      title: 'Hello, {client_name}',
      subtitle: 'Your appointment is {appointment_date} ({relative_date}) at {appointment_time} for {services} at {business_name} with {worker_name}',
      btn_label: 'Confirm the appointment',
    },
    ac_last_page: {
      title: 'Nicely Done!',
      subtitle: 'Thank you so much for\nyour efforts. Have a nice day and see you soon!',
    },
    last_page: {
      last_page_title: 'Nicely Done!',
      last_page_subtitle: 'Thank you so much for\nyour efforts. Have a nice day and see you soon!',
      business_address_title: '{business_name} address',
      footer: {
        about_us: 'About Lista CRM',
        terms_of_use: ' Terms of use'
      }
    },
    other_data: {
      gender_strip_title: 'Select gender',
      birthdate_strip_title: 'Select birthdate',
      uploading_files_title: 'Uploading files',
      uploading_files_label: 'Click here to upload a file',
      permission_strip_title: 'Permission for advertising',
      checkbox_label: 'I want to receive Advertising Newsletters and Special Offers from {business_name}',
      error_text_415: 'error_text error_text error_text error_text error_text 415',
      error_text_413: 'error_text error_text error_text error_text error_text 413',
      continue_btn_label: 'That\'s it',
      gender: {
        male: 'Male',
        female: 'Female',
        third: 'Third'
      }
    },
    fill_in: {
      fill_in_title: 'You can autofill\n all the data with your\n Facebook account just in one tap',
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
    add_address: `http://api.bewebmaster.co.il/settings/maps-api-key?token=${token}`,
    main: 'http://api.bewebmaster.co.il',
    filling_up: '/filling-up',
    fb_script: './scripts/fb_script.js',
    photo_r: '/filling-up/photo',
    api_upload_files: 'http://api.bewebmaster.co.il/filling-up/files',
    notes: '/filling-up/notes',
    other_data: '/other_data',
    client_data: './assets/clients/',
    last_page: '/last_page',
    appointment_confirmation: '/ac',
    api_appointment_confirmation: 'http://api.bewebmaster.co.il/appointments/{appointment_id}/confirmation',
    ac_last_page: '/ac_last_page',
    media: './assets/media/',
    photo: '/photo',
    baseUrl: '/filling-up',
    fu_params: '?b=123&c=sdfs2d1f',
    ac_params: '?b=123&c=sdfs2d1f&a=123',
  },
  data: {
    name: 'Ahuva Ben Shushan',
    email: 'ahuva.ben.shushan@gmail.com',
    address: 'בת ים, ויצמן, 18',
    gender: '',
    profile_image: '24.jpg',
    birthyear: '',
    birthdate: '',
    source: '',
    note: '',
    permit_ads: false,
    max_side: 1000
  },
  appointment_data: {
    id: 7,
    name: 'Ahuva Ben Shushan',
    start: '2024-03-24 09:00:00',
    services: [{ id: 1, name: 'Service1' }, { id: 2, name: 'Service2' }]
  },
  isRTL: false,
  address_based: true,
  greetings_text: 'We`re so glad\n to see you our friend, https://www.google.com/ your next visit you`ll get 20% discount. https://www.facebook.com/ Remember, every client is our family',
  business_name: 'Beauty Salon Maria',
  business_logo: './assets/media/ic_facebook.svg',
  business_address: 'Tel Aviv, Allenby str. 45',
  business_desc: 'loresdfgs dgsdgsdf ffffffffffffff ffffffffs  sdgsd sd sg sgdfffffffffff sdfg sdf sd gsdf s sfgs dfgsf sd sg dsfm',
  business_links: [
    { icon: 'link_facebook.svg', url: '/facebook_url', type: 'facebook' },
    { icon: 'link_instagram.svg', url: '/instagram', type: 'instagram' },
    {
      icon: 'link_website.svg',
      type: 'website',
      url: 'https://aquaplants.co.il/'
    }
  ],
  plugins: ['highres_photos'],
  gender: {
    data: [
      { type: 'female', id: 2, icon: 'female.svg', active_icon: 'selected_female.svg' },
      { type: 'male', id: 1, icon: 'male.svg', active_icon: 'selected_male.svg' },
      { type: 'third', id: 3, icon: 'third.svg', active_icon: 'selected_third.svg' },
    ]
  },
  footer: {
    data: [
      { name: 'about_us', link: `/en/about_us`},
      { name: 'terms_of_use', link: `/en/terms_of_use`},
      { name: 'lista', link: `/en/home`, icon: 'logo.svg'},
    ]
  }
}

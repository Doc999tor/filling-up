import { patchService as fillingPatchService } from 'project-services/filling-up.service.js'
import qs from 'qs'
import PropTypes from 'prop-types'
import './home.styl'
const { Redirect } = ReactRouterDOM
class Home extends React.Component {
  state = {
    address: config.data.address ? config.data.address : localStorage.getItem('address'),
    email: config.data.email ? config.data.email : localStorage.getItem('email'),
    name: config.data.name ? config.data.name : localStorage.getItem('name'),
    validEmail: true,
    adress: []
  }

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
  }

  componentDidMount = () => {
    if (config.isRTL) document.getElementsByTagName('body')[0].style.direction = 'rtl'
    const email = config.data.email ? config.data.email : localStorage.getItem('email')
    if (email !== null && email !== '') this.handleCheckEmail(email)
    const query = JSON.stringify(qs.parse(this.props.history.location.search.slice(1)))
    localStorage.setItem('query', query)
  }

  handleChangeInput = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    }, () => {
      config.data[name] = name
      localStorage.setItem(name, value)
    })
  }

  handleCheckEmail = () => {
    const email = this.state.email
    const pattern = /.+@.+\..+/i
    pattern.test(email) || email === '' ? this.setState({ validEmail: true }) : this.setState({ validEmail: false })
  }

  facebookLogin = () => {
    FB.login(res => {
      if (res.status === 'connected') {
        let fields = [
          'id',
          'about',
          'age_range',
          'birthday',
          'email',
          'first_name',
          'middle_name',
          'last_name',
          'gender',
          'name',
          'location',
          'timezone',
          'website',
          'picture.width(480).height(480)',
          'photos'
        ]
        FB.api('/me?fields=' + fields.join(','), r => {
          let query = JSON.parse(localStorage.getItem('query'))
          let body = `b=${query.b}&c=${query.c}&fb_data=${encodeURIComponent(JSON.stringify(r))}`
          fillingPatchService(body).then(r => {
            if (r.status === 204) this.props.history.push(config.urls.baseUrl + config.urls.last_page)
          })
        })
      }
    }, {
      scope: 'public_profile,email,user_photos,user_birthday,user_location,user_hometown'
    })
  }

  continue = () => {
    const query = JSON.parse(localStorage.getItem('query'))
    let body = `b=${query.b}&c=${query.c}&name=${this.state.name}&email=${this.state.email}`
    if (config.address_based) body = body + `&address=${this.state.address}`
    fillingPatchService(body).then(r => {
      if (r.status === 204) this.props.history.push(config.urls.baseUrl + config.urls.photo)
    })
  }

  render () {
    const { name, email, address, validEmail } = this.state
    return (
      <div id='home'>
        {!this.props.history.location.search && <Redirect to={{ pathname: config.urls.baseUrl + config.urls.home, search: config.urls.params }} />}
        <div className='bullets'>
          <div className='bullet active' />
          <div className='bullet' />
          <div className='bullet' />
          <div className='bullet' />
        </div>
        <p className='welcome'>{config.translations.welcome}</p>
        <p className='be_glad'>{config.translations.be_glad}</p>
        <p className='skip'>{config.translations.skip}</p>
        <div className='soc_net'>
          <button className='facebook-wrap' onClick={this.facebookLogin}>
            <img src={config.urls.media + 'facebook.png'} />
            <p>{config.translations.facebook}</p>
          </button>
        </div>
        <div className='sep'><span>{config.translations.or}</span></div>
        <p className='or_fill'>{config.translations.or_fill}</p>
        <div className='inputs'>
          <div className='input_wrap'>
            <input
              type='text'
              name='name'
              placeholder={config.translations.full_name}
              value={name}
              onChange={this.handleChangeInput}
            />
          </div>
          <div className={'input_wrap' + (validEmail ? ' validEmail' : ' notValidEmail')}>
            <input
              type='text'
              name='email'
              placeholder={config.translations.email}
              value={email}
              onBlur={this.handleCheckEmail}
              onChange={this.handleChangeInput}
            />
          </div>
          {config.address_based &&
            <div className='input_wrap'>
              <input
                type='text'
                name='address'
                placeholder={config.translations.adress}
                value={address}
                onChange={this.handleChangeInput}
              />
            </div>}
        </div>
        <div className='btn-wrap'>
          <button onClick={this.continue}>{config.translations.continue}</button>
        </div>
      </div>
    )
  }
}
export default Home

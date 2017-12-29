import {adressGetService, fillingPatchService} from 'project-services'
import PropTypes from 'prop-types'
import './home.styl'
let timeout
class Home extends React.Component {
  state = {
    addres: config.data.address ? config.data.address : localStorage.getItem('address'),
    email: config.data.email ? config.data.email : localStorage.getItem('email'),
    name: config.data.name ? config.data.name : localStorage.getItem('name'),
    isViewAdress: false,
    adress: []
  }
  static propTypes = {
    history: PropTypes.object
  }
  componentWillMount = () => {
    if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl'
    const email = config.data.email ? config.data.email : localStorage.getItem('email')
    if (email !== null && email !== '') this.changeEmail(email)
  }
  changeEmail = e => {
    let r = /.+@.+\..+/i
    this.setState({email: e, isValidation: ''})
    config.data.email = e
    localStorage.setItem('email', e)
    if (e !== '') if (r.test(e)) { this.setState({isValidation: 'validationTrue'}) } else { this.setState({isValidation: 'validationFalse'}) }
  }
  changeAdress = e => {
    clearTimeout(timeout)
    this.setState({addres: e})
    config.data.address = e
    localStorage.setItem('address', e)
    if (e.length > 0) {
      timeout = setTimeout(() => adressGetService(e).then(r => r.json().then(r =>
        this.setState({isViewAdress: true, adress: r.results}))), config.timeout)
    } else this.setState({isViewAdress: false})
  }
  facebookLogin = () => {
    FB.init({
      appId: '190021218217828',
      cookie: true,
      oauth: true,
      version: 'v2.8'
    })
    FB.login(res => {
      if (res.status === 'connected') {
        let fields = [
          'id',
          'about',
          'age_range',
          'birthday',
          'context',
          'email',
          'first_name',
          'middle_name',
          'last_name',
          'gender',
          'link',
          'name',
          'location',
          'timezone',
          'website',
          'work',
          'languages',
          'devices',
          'picture',
          'taggable_friends',
          'photos',
          'likes',
          'interested_in'
        ]
        FB.api('/me?fields=' + fields.join(','), r => {
          console.log(r)
        })
      }
    }, {
      scope: 'public_profile,email,user_friends,user_photos,user_website,user_birthday,user_about_me,user_location,user_hometown,user_likes'
    })
  }
  continue = () => {
    fillingPatchService().then(r => r)
    this.props.history.push(config.urls.photo)
  }
  render () {
    return (
      <div id='home'>
        <div className='bullets'>
          <div className='bullet active' />
          <div className='bullet' />
          <div className='bullet' />
          <div className='bullet' />
        </div>
        <h1 className='welcome'>{config.translations.welcome}</h1>
        <h1 className='be_glad'>{config.translations.be_glad}</h1>
        <h1 className='skip'>{config.translations.skip}</h1>
        <div className='soc_net'>
          <div className='facebook-wrap' onClick={this.facebookLogin}>
            <img src={config.urls.media + 'facebook.png'} />
            <h1>{config.translations.facebook}</h1>
          </div>
        </div>
        <div className='sep'><span>{config.translations.or}</span></div>
        <h1 className='or_fill'>{config.translations.or_fill}</h1>
        <div className='inputs'>
          <input type='text' placeholder={config.translations.full_name} value={this.state.name}
            onChange={e => {
              this.setState({name: e.target.value})
              config.data.name = e.target.value
              localStorage.setItem('name', e.target.value)
            }} />
          <span className={this.state.isValidation}>
            <input type='text' placeholder={config.translations.email} value={this.state.email} onChange={e => this.changeEmail(e.target.value)} />
          </span>
          {config.address_based &&
            <input type='text' placeholder={config.translations.adress} value={this.state.addres} onChange={e => this.changeAdress(e.target.value)} />}
          <div className={this.state.isViewAdress ? 'adress-list-wrap' : 'hidden'}>
            {this.state.adress.map(i => (
              <div onClick={() => this.setState({addres: i.formatted_address, isViewAdress: false}, () => { config.data.address = i.formatted_address })}>{i.formatted_address}</div>)
            )}
          </div>
        </div>
        <div className='btn-wrap'>
          <button onClick={this.continue}>{config.translations.continue}</button>
        </div>
      </div>
    )
  }
}
export default Home

import {adressGetService} from 'project-services'
import './home.styl'
const {Link} = ReactRouterDOM
let timeout

class Home extends React.Component {
  state = {
    isViewAdress: false,
    adress: [],
    email: '',
    adres: '',
    name: ''
  }
  componentWillMount = () => { if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl' }
  changeEmail = e => {
    let r = /.+@.+\..+/i
    this.setState({email: e, isValidation: ''})
    if (e !== '') if (r.test(e)) { this.setState({isValidation: 'validationTrue'}) } else { this.setState({isValidation: 'validationFalse'}) }
  }
  changeAdress = e => {
    clearTimeout(timeout)
    this.setState({adres: e})
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
          <input type='text' placeholder={config.translations.full_name} value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
          <span className={this.state.isValidation}>
            <input type='text' placeholder={config.translations.email} value={this.state.email} onChange={e => this.changeEmail(e.target.value)} />
          </span>
          {config.address_based &&
            <input type='text' placeholder={config.translations.adress} value={this.state.adres} onChange={e => this.changeAdress(e.target.value)} />}
          <div className={this.state.isViewAdress ? 'adress-list-wrap' : 'hidden'}>
            {this.state.adress.map(i => (
              <div onClick={() => this.setState({adres: i.formatted_address, isViewAdress: false})}>{i.formatted_address}</div>)
            )}
          </div>
        </div>
        <div className='btn-wrap'>
          <button><Link to={config.urls.photo}>{config.translations.continue}</Link></button>
        </div>
      </div>
    )
  }
}
export default Home

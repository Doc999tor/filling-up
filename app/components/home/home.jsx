import './home.styl'
const {Link} = ReactRouterDOM

class Home extends React.Component {
  state = {
    name: '',
    email: '',
    adress: ''
  }
  componentWillMount = () => { if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl' }
  render () {
    return (
      <div id='home'>
        <div className='bullets'>
          <div className='bullet active' />
          <div className='bullet' />
          <div className='bullet' />
        </div>
        <h1 className='welcome'>{config.translations.welcome}</h1>
        <h1 className='be_glad'>{config.translations.be_glad}</h1>
        <h1 className='skip'>{config.translations.skip}</h1>
        <div className='soc_net'>
          <div className='facebook-wrap'>
            <img src={config.urls.media + 'facebook.png'} />
            <h1>{config.translations.facebook}</h1>
          </div>
        </div>
        <div className='sep'><span>{config.translations.or}</span></div>
        <h1 className='or_fill'>{config.translations.or_fill}</h1>
        <div className='inputs'>
          <input type='text' placeholder={config.translations.full_name} value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
          <input type='text' placeholder={config.translations.email} value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
          {config.address_based &&
            <input type='text' placeholder={config.translations.adress} value={this.state.adress} onChange={e => this.setState({adress: e.target.value})} />}
        </div>
        <div className='btn-wrap'>
          <button><Link to={config.urls.photo}>{config.translations.continue}</Link></button>
        </div>
      </div>
    )
  }
}
export default Home

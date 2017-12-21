import './home.styl'

class Home extends React.Component {
  componentWillMount = () => { if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl' }
  render () {
    return (
      <div id='home'>
        Filling Up
        <div className='test' />
      </div>
    )
  }
}
export default Home

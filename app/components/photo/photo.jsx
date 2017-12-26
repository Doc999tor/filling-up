import {dataURLtoFile, getOrientation} from 'project-components'
import './photo.styl'
const {Link} = ReactRouterDOM

class Home extends React.Component {
  state = {
    img: config.urls.media + 'foto.svg'
  }
  addFoto = e => {
    let f = e.target.files[0]
    let img = new Image()
    if (config.plugins.some(i => i === 'highres_photos')) {
      let reader = new FileReader()
      reader.readAsDataURL(f)
      reader.onload = () => {
        this.setState({ img: reader.result })
        config.data.test = f // todo API
      }
    } else {
      getOrientation(f, or => {
        let reader = new FileReader()
        reader.readAsDataURL(f)
        reader.onload = () => {
          img.src = reader.result
        }
        img.onload = () => {
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          let w = img.width
          let h = img.height
          if (w > config.max_side || h > config.max_side) {
            if (w > h) {
              if (w > config.max_side) {
                h = (h * config.max_side) / w
                w = config.max_side
              }
            } else {
              if (h > config.max_side) {
                w = (w * config.max_side) / h
                h = config.max_side
              }
            }
          }
          if (or > 4 && or < 9) {
            canvas.width = h
            canvas.height = w
          } else {
            canvas.width = w
            canvas.height = h
          }
          switch (or) {
          case 2: ctx.transform(-1, 0, 0, 1, w, 0); break
          case 3: ctx.transform(-1, 0, 0, -1, w, h); break
          case 4: ctx.transform(1, 0, 0, -1, 0, h); break
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
          case 6: ctx.transform(0, 1, -1, 0, h, 0); break
          case 7: ctx.transform(0, -1, -1, 0, h, w); break
          case 8: ctx.transform(0, -1, 1, 0, 0, w); break
          default: break
          }
          ctx.drawImage(img, 0, 0, w, h)
          let dataURL = canvas.toDataURL()
          this.setState({ img: dataURL })
          config.data.test = dataURLtoFile(dataURL, f.name) // todo API
        }
      })
    }
    this.refs.file_wrap.reset()
  }
  componentWillMount = () => { if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl' }
  render () {
    return (
      <div id='home'>
        <div className='bullets'>
          <div className='bullet' />
          <div className='bullet active' />
          <div className='bullet' />
        </div>
        <h1 className='selfies'>{config.translations.selfies}</h1>
        <div className='picture'>
          <div className='add-wrap'>
            <div className='circle' style={this.state.img.indexOf('foto.svg') !== -1 ? {paddingTop: '30px'} : {}}>
              <div className={this.state.img.indexOf('foto.svg') !== -1 ? 'img' : 'img-sel'}><img src={this.state.img} /></div>
            </div>
          </div>
        </div>
        <div className='buttons'>
          <button className='yes'>{config.translations.want}</button>
          <form ref='file_wrap'><input type='file' accept='image/*' capture='camera' onChange={e => this.addFoto(e)} /></form>
          <h1>{config.translations.or}</h1>
          <button className='not_now'>{config.translations.not_now}</button>
        </div>
        <div className='btns-wrap'>
          <div className='btn'><button><Link to={config.urls.home}>{config.translations.back}</Link></button></div>
          <div className='btn'><button><Link to={'/photo'}>{config.translations.continue}</Link></button></div>
        </div>
      </div>
    )
  }
}
export default Home

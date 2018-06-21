import {clientGetService, fillingPatchService, fillingNotePostService} from 'project-services'
import {Select} from 'project-components'
import './other-data.styl'
let timeout

class Home extends React.Component {
  state = {
    selectedLabel: config.data.sourceLabel ? config.data.sourceLabel : localStorage.getItem('sourceLabel') ? localStorage.getItem('sourceLabel') : config.translations.source,
    selectedValue: config.data.source ? config.data.source : localStorage.getItem('source'),
    birthdate: config.data.birthdate ? config.data.birthdate : localStorage.getItem('birthdate'),
    gender: config.data.gender ? config.data.gender : localStorage.getItem('gender'),
    userId: config.data.userId ? config.data.userId : localStorage.getItem('userId'),
    note: config.data.note ? config.data.note : localStorage.getItem('note'),
    isRecomendation: false,
    checkChecker: false,
    isCheck: false,
    clients: [],
    param1: 123,
    param2: 'sdfs2d1f'
  }
  static propTypes = {
    history: PropTypes.object
  }
  changeSelect = e => {
    this.setState({selectedLabel: e.label, selectedValue: e.value, userId: null})
    config.data.sourceLabel = e.label
    config.data.source = e.value
    localStorage.setItem('sourceLabel', e.label)
    localStorage.setItem('source', e.value)
    e.value === 'recommendation' ? this.setState({isRecomendation: true}) : this.setState({isRecomendation: false})
  }
  changeInput = e => {
    clearTimeout(timeout)
    this.setState({inputValue: e})
    if (e.length > 0) {
      timeout = setTimeout(() => clientGetService(e).then(r => r.json().then(r =>
        this.setState({isViewClients: true, clients: r}))), config.data.timeout)
    } else this.setState({isViewClients: false})
  }
  componentWillMount = () => {
    if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl'
  }
  continue = () => {
    let body = `b=${this.state.param1}&c=${this.state.param2}&gender=${this.state.gender}&birthdate=${this.state.birthdate.split('-').slice(1).join('-')}&source=${this.state.selectedValue}&permit_ads=${config.data.permit_ads}`
    if (this.state.selectedValue === 'recommendation') body = body + `&recommended_by=${this.state.userId}`
    fillingPatchService(body).then(r => {
      if (r.status === 204) {
        let body = `b=${this.state.param1}&c=${this.state.param2}&text=${this.state.note}`
        fillingNotePostService(body).then(r => {
          if (r.status === 204) this.props.history.push(config.urls.baseUrl + config.urls.last_page)
        })
      }
    })
  }
  render () {
    return (
      <div id='other_data'>
        <div className='bullets'>
          <div className='bullet' />
          <div className='bullet' />
          <div className='bullet active' />
          <div className='bullet' />
        </div>
        <h1 className='last_data'>{config.translations.last_data}</h1>
        <div className='gender'>
          <div className='circle-wrap'>
            <div className='centered'>
              <h1>{config.translations.man}</h1>
              <div className='circle' onClick={() => this.setState({gender: 'male'}, () => {
                config.data.gender = 'male'
                localStorage.setItem('gender', 'male')
              })}>
                <div className={this.state.gender === 'male' ? 'bcg' : ''} />
              </div>
            </div>
          </div>
          <div className='circle-wrap'>
            <div className='centered'>
              <h1>{config.translations.woman}</h1>
              <div className='circle' onClick={() => this.setState({gender: 'female'}, () => {
                config.data.gender = 'female'
                localStorage.setItem('gender', 'female')
              })}>
                <div className={this.state.gender === 'female' ? 'bcg' : ''} />
              </div>
            </div>
          </div>
        </div>
        <div className='inputs'>
          <input className='field' ref='date' type='text' onBlur={() => { this.refs.date.type = 'text' }} onFocus={() => { this.refs.date.type = 'date' }}
            placeholder={config.translations.date_of_birth} value={this.state.birthdate} onChange={e => {
              this.setState({birthdate: e.target.value})
              config.data.birthdate = e.target.value
              localStorage.setItem('birthdate', e.target.value)
            }} />
          <div className='select-wrap' style={config.translations.source === this.state.selectedLabel ? {color: 'grey'} : {color: 'black'}}>
            <Select value={this.state.selectedLabel} onChange={e => this.changeSelect(e)} options={config.translations.source_list} placeholder='asdfa' />
          </div>
          <div className={this.state.isRecomendation ? 'input-wrap' : 'hidden'}>
            <div className='label'>{config.translations.recommended_by}</div>
            <input type='text' value={this.state.inputValue} onChange={e => this.changeInput(e.target.value)}
              placeholder={config.translations.customer_pl} />
            <div className={this.state.isViewClients ? 'clients-list-wrap ' + (config.isRTL ? 'clients-list-wrap-left'
              : 'clients-list-wrap-right') : 'hidden'}>
              {this.state.clients.map((i, k) =>
                <div key={k} onClick={() => this.setState({inputValue: i.name, userId: i.id, isViewClients: false}, () => {
                  config.data.userId = i.id
                  localStorage.setItem('userId', i.id)
                })}>{i.name}</div>)}
            </div>
          </div>
          <input className='field' type='text' placeholder={config.translations.remarks_and_preferences} value={this.state.note}
            onChange={e => {
              this.setState({note: e.target.value})
              config.data.note = e.target.value
              localStorage.setItem('note', e.target.value)
            }} />
          <div className='checkbox_container' style={this.state.checkChecker ? {border: '1px solid red'} : {border: '1px solid white'}}>
            <div className='checkbox_wrap'>
              <input className='checkbox' type='checkbox' checked={this.state.isCheck}
                onChange={() => this.setState({isCheck: !this.state.isCheck, checkChecker: false}, () => {
                  if (this.state.isCheck) config.data.permit_ads = true
                  else config.data.permit_ads = false
                })} />
            </div>
            <div className='label_wrap'>
              <h1 className='checkbox_label'>{config.translations.customers_agree}</h1>
            </div>
          </div>
        </div>
        <div className='btn-wrap' onClick={!this.state.isCheck ? () => this.setState({checkChecker: true}) : () => {}}>
          <button onClick={this.state.isCheck ? () => this.continue() : () => {}}>{config.translations.confirm}</button>
        </div>
      </div>
    )
  }
}
export default Home

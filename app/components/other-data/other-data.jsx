import {clientGetService} from 'project-services'
import {Select} from 'project-components'
import './other-data.styl'
const {Link} = ReactRouterDOM
let timeout

class Home extends React.Component {
  state = {
    selectedLabel: config.translations.source_list[0].label,
    birthdate: '',
    gender: '',
    clients: []
  }
  changeSelect = e => {
    this.setState({selectedLabel: e.label, selectedValue: e.value, userId: null})
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
  componentWillMount = () => { if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl' }
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
              <div className='circle' onClick={() => this.setState({gender: 'man'})}>
                <div className={this.state.gender === 'man' ? 'bcg' : ''} />
              </div>
            </div>
          </div>
          <div className='circle-wrap'>
            <div className='centered'>
              <h1>{config.translations.woman}</h1>
              <div className='circle' onClick={() => this.setState({gender: 'woman'})}>
                <div className={this.state.gender === 'woman' ? 'bcg' : ''} />
              </div>
            </div>
          </div>
        </div>
        <div className='inputs'>
          <input ref='date' type='text' onBlur={() => { this.refs.date.type = 'text' }} onFocus={() => { this.refs.date.type = 'date' }}
            placeholder={config.translations.date_of_birth} value={this.state.birthdate} onChange={e => this.setState({birthdate: e.target.value})} />
          <div className='select-wrap'>
            <Select value={this.state.selectedLabel} onChange={e => this.changeSelect(e)} options={config.translations.source_list} />
          </div>
          <div className={this.state.isRecomendation ? 'input-wrap' : 'hidden'}>
            <div className='label'>{config.translations.recommended_by}</div>
            <input type='text' value={this.state.inputValue} onChange={e => this.changeInput(e.target.value)}
              placeholder={config.translations.customer_pl} />
            <div className={this.state.isViewClients ? 'clients-list-wrap ' + (config.isRTL ? 'clients-list-wrap-left'
              : 'clients-list-wrap-right') : 'hidden'}>
              {this.state.clients.map((i, k) =>
                <div key={k} onClick={() => this.setState({inputValue: i.name, userId: i.id, isViewClients: false})}>{i.name}</div>)}
            </div>
          </div>
          <input type='text' placeholder={config.translations.remarks_and_preferences} value={this.state.adres} onChange={e => this.changeAdress(e.target.value)} />
        </div>
        <div className='btn-wrap'>
          <button><Link to='/'>{config.translations.confirm}</Link></button>
        </div>
      </div>
    )
  }
}
export default Home

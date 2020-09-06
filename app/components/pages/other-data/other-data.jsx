import React, { useState } from 'react'

import { GenderItem } from './components/single-gender/single-gender.jsx'
import { ContinueBtn } from '../../continue_btn/continue.jsx'
import { Checkbox } from 'project-components/checkbox/checkbox.jsx'
// import Datepicker from 'project-components/Datepicker/datepicker.jsx'

import { getService as clientGetService } from 'project-services/client.service.js'
import {
  patchService as fillingPatchService,
  postNoteService as fillingNotePostService
} from 'project-services/filling-up.service.js'

import './other-data.styl'

// let timeout

const OtherData = () => {
  const [checkBoxValue, setCheckBoxValue] = useState(false)
  const handleCangeCheckbox = ({ target }) => {
    const { checked } = target
    setCheckBoxValue(checked)
  }

  const [gender, setGender] = useState(null)
  const handleChangeGender = id => {
    setGender(gender => id === gender ? null : id)
  }
  // state = {
  //   selectedLabel: config.data.sourceLabel ? config.data.sourceLabel : localStorage.getItem('sourceLabel') ? localStorage.getItem('sourceLabel') : config.translations.source,
  //   selectedValue: config.data.source ? config.data.source : localStorage.getItem('source'),
  //   birthdate: config.data.birthdate ? config.data.birthdate : localStorage.getItem('birthdate'),
  //   birthyear: config.data.birthyear ? config.data.birthyear : localStorage.getItem('birthyear'),
  //   gender: config.data.gender ? config.data.gender : localStorage.getItem('gender'),
  //   userId: config.data.userId ? config.data.userId : localStorage.getItem('userId'),
  //   note: config.data.note ? config.data.note : localStorage.getItem('note'),
  //   isRecomendation: false,
  //   checkChecker: false,
  //   isCheck: false,
  //   clients: [],
  //   year: config.translations.datepicker.placeholder.year,
  //   day: config.translations.datepicker.placeholder.day,
  //   month: config.translations.datepicker.placeholder.month
  // }


  // changeSelect = e => {
  //   this.setState({selectedLabel: e.label, selectedValue: e.value, userId: null})
  //   config.data.sourceLabel = e.label
  //   config.data.source = e.value
  //   localStorage.setItem('sourceLabel', e.label)
  //   localStorage.setItem('source', e.value)
  //   e.value === 'recommendation' ? this.setState({isRecomendation: true}) : this.setState({isRecomendation: false})
  // }

  // changeInput = e => {
  //   clearTimeout(timeout)
  //   this.setState({inputValue: e})
  //   if (e.length > 0) {
  //     timeout = setTimeout(() => clientGetService(e).then(r => r.json().then(r =>
  //       this.setState({isViewClients: true, clients: r}))), config.data.timeout)
  //   } else this.setState({isViewClients: false})
  // }

  // componentDidMount = () => {
  //   if (config.isRTL) document.getElementsByTagName('body')[0].style.direction = 'rtl'
  // }

  const continueStep = () => {
    console.log('checkBoxValue', checkBoxValue)
    console.log('gender', gender)
    // let query = JSON.parse(sessionStorage.getItem('fill_query'))
    // let body = `b=${query.b}&c=${query.c}&gender=${this.state.gender}&permit_ads=${config.data.permit_ads}`
    // if (this.state.birthyear) body = body + `&birthyear=${this.state.birthyear}`
    // if (this.state.birthdate_month && this.state.birthdate_day) body = body + `&birthdate=${this.state.birthdate_month}-${this.state.birthdate_day}`
    // let bodysrt = `b=${query.b}&c=${query.c}&text=${this.state.note}&added=${moment().format('YYYY-MM-DD HH:mm:ss')}`
    // let promises = [
    //   fillingPatchService(body),
    //   this.state.note ? fillingNotePostService(bodysrt) : Promise.resolve('resolved')
    // ]
    // Promise.all(promises).then(() => {
    //   this.props.history.push(config.urls.baseUrl + config.urls.last_page)
    // })
  }

  // handleChangeYear = event => {
  //   this.setState({
  //     year: event.target.value,
  //     birthyear: event.target.value
  //   })
  // }

  // handleChangeMonth = event => {
  //   this.setState({
  //     month: event.target.value,
  //     birthdate_month: event.target.value
  //   })
  // }

  // handleChangeDay = event => {
  //   this.setState({
  //     day: event.target.value,
  //     birthdate_day: event.target.value
  //   })
  // }

  // const { year, month, day } = this.state
  return (
    <div id='other_data'>
      <div className='gender_strip'>
        <h3 className='gender_title'>{config.translations.other_data.gender_strip_title}</h3>
        <div className='gender_items_wrap'>
          {config.gender?.data?.map(({ id, ...props }) => <GenderItem onSelectGender={handleChangeGender} key={id} gender={gender} id={id} {...props} />)}
        </div>
      </div>
      <div className='inputs'>
        <div className='field'>
          {/* <Datepicker
            handleChangeYear={this.handleChangeYear}
            handleChangeMonth={this.handleChangeMonth}
            handleChangeDay={this.handleChangeDay}
            year={year}
            month={month}
            day={day}
          /> */}
        </div>
        <div className='checkbox_container'>
          <Checkbox
            text={config.translations.other_data.checkbox_label}
            onHandleChange={handleCangeCheckbox}
            value={checkBoxValue}
          />
          <img className='recommend_hand' src={config.urls.media + 'hand_recommend.png'} />
          {checkBoxValue && <img className='ok_hand' src={config.urls.media + 'ok_hand.png'} />}
        </div>
      </div>
      <ContinueBtn continueStep={continueStep} />
    </div>
  )
}
export default OtherData

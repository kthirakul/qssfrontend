import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Services } from '../../app.services'
const useCheckRequest = () => {
  const longdoRef = useRef<HTMLDivElement | null>(null)
  const services = Services()
  const navigate = useNavigate()

  const getLongdoData = () => {
    // @ts-ignore
    const longdoElement = longdoRef.current as HTMLElement
    const poi = longdoElement.querySelector('#poi') as HTMLInputElement
    const etc = longdoElement.querySelector('#etc') as HTMLTextAreaElement
    const subdistrict = longdoElement.querySelector('#subdistrict') as HTMLInputElement
    const district = longdoElement.querySelector('#district') as HTMLInputElement
    const province = longdoElement.querySelector('#province') as HTMLInputElement
    const postal_code = longdoElement.querySelector('#postal_code') as HTMLInputElement

    const data = {
      poi: poi.value,
      etc: etc.value,
      subdistrict: subdistrict.value,
      district: district.value,
      province: province.value,
      postal_code: postal_code.value,
    }
    services.docs.setOrgDoc(data)
    navigate('/check-request-detail', { replace: true })
  }

  useEffect(() => {
    // @ts-ignore
    new longdo.AddressForm('form_div', {
      // @ts-ignore
      layout: longdo.AddressForm.SIMPLE_SUGGEST, // ใช้ฟอร์มอีกรูปแบบหนึ่ง
      // language: 'en',                   // ปรับภาษา
      showLabels: false, // ซ่อนคำกำกับช่องใส่ข้อมูล
      required: { poi: true }, // กำหนดช่องบังคับกรอก
      debugDiv: 'debugoutput', // กำหนด div ที่ใช้แสดงข้อมูลจากฟอร์ม
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const countryElement = longdoRef.current?.querySelector(
        '#address2_expansion > table > tbody > tr:nth-child(3)'
      ) as HTMLElement
      countryElement.style.display = 'none'

      const longdoInputRef = longdoRef.current?.querySelectorAll(
        'input'
      ) as NodeListOf<HTMLInputElement>

      const textareaInputRef = longdoRef.current?.querySelector('textarea') as HTMLTextAreaElement

      textareaInputRef.style.fontFamily = 'Sarabun'
      textareaInputRef.style.fontSize = '18px'
      textareaInputRef.style.height = '43px'

      textareaInputRef.style.overflow = 'overlay'
      longdoInputRef.forEach((input) => {
        input.style.fontFamily = 'Sarabun'
        input.style.fontSize = '18px'
      })

      if (services.docs.orgDoc) {
        longdoInputRef.forEach((input) => {
          // @ts-ignore
          input.value = services.docs.orgDoc[input.id] || ''
        })

        // @ts-ignore
        textareaInputRef.value = services.docs.orgDoc[textareaInputRef.id] || ''
      }
    }, 200)
  }, [longdoRef, services.docs.orgDoc])

  return { longdoRef, getLongdoData }
}

export default useCheckRequest

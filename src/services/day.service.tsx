import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)
dayjs.locale('th')

const DayService = () => {
  const longName = (date: Date | string | number) => dayjs(date).format('D MMMM BBBB')
  const shortName = (date: Date | string | number) => dayjs(date).format('D MMM BB')
  const shortNameNumber = (date: Date | string | number) => dayjs(date).format('D/MM/BB')

  const shortNameWithTime = (date: Date | string | number) => dayjs(date).format('D MM BB HH:mm')

  const time = (date: Date | string | number) => dayjs(date).format('HH:mm')
  const longNameWithTime = (date: Date | string | number) => dayjs(date).format('D MMMM BBBB HH:mm')

  return { longName, longNameWithTime, shortName, time, shortNameWithTime, shortNameNumber }
}

export default DayService

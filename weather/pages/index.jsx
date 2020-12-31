import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import parseHourWeatherInfo from '../lib/index'
// import { resolveSoa } from 'dns'

export default function Home() {
  const [data, setData] = useState([])

  // value sort
  const hasValue = (value, ary) => ary.some(item => item === value)

  const dataFetch = async() => {
    const fetchedData = await axios.get('http://api.openweathermap.org/data/2.5/forecast?&q=Tokyo&units=metric&appid=05682b8828fa44da078ff05286ddc338&lang=ja')
    const dateGroup = fetchedData.data.list.map(i => i.dt_txt.slice(5,10))
    console.log(fetchedData)
    const dateCardArr = dateGroup.reduce((prev, current) => {
      if(!hasValue(current, prev)) {
        prev.push(current)
      }
      return prev
    },[])

    const formatData = dateCardArr.map(i => { 
      // 一致するデータを取得する4~7のオブジェクトが作られるはず
      const data = fetchedData.data.list.filter(weatherData => {
      const dt = weatherData.dt_txt.slice(5,10)
       return dt === i
      })

      return { [i]: data} 
    })
    setData(formatData)
  }

  useEffect(() => {
    dataFetch()
    console.log(data)
  }, [])

  const Lists = () => {
    return data.map(i => 
      {
        const title = Object.keys(i)
        const hourLists = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        const content = Object.values(i)[0].map(arr => {
          const temp = `${Math.floor(Number(arr.main.temp))}°`
          return { 
            [arr.dt_txt.slice(11,16)]: {
              description: arr.weather[0].description,
              temp
            }
          }
        })

        const createDomHourLists = hourLists.map((time,index) => {
          const findDetail = content.find(descTime => Object.keys(descTime)[0] === time)
          return parseHourWeatherInfo(time, findDetail, index)
        })

        return (
          <li className="" key={title[0].toString()}>
            <h2 className="mb-10 text-center">{title}</h2>
            {createDomHourLists}
          </li>
        )
      })
  }

  return (
    <div>
      <Head>
        <title>天気予報｜アプリケーション</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="pt-40 text-center">hello world</h1>
      <ul className="grid grid-cols-3 mx-20">
        <Lists />
      </ul>
    </div>
  )
}

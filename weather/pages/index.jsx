import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
// import { resolveSoa } from 'dns'

export default function Home() {
  const [data, setData] = useState([])
  const [date, setDate] = useState([])

  // value sort
  const hasValue = (value, ary) => ary.some(item => item === value)

  const dataFetch = async() => {
    const fetchedData = await axios.get('http://api.openweathermap.org/data/2.5/forecast?&q=Tokyo&units=metric&appid=05682b8828fa44da078ff05286ddc338&lang=ja')
    const dateGroup = fetchedData.data.list.map(i => i.dt_txt.slice(5,10))

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
      // 'aa'にi（日付）の一致するデータをつっこむ
      return { [i]: data} 
    })
    setDate(dateCardArr)
    setData(formatData)
  }
  console.log(data)
  console.log(date)
  useEffect(() => {
    dataFetch()
  }, [])


  return (
    <div>
      <Head>
        <title>天気予報｜アプリケーション</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="pt-40 text-center">hello world</h1>
      <ul className="flex pt-20 justify-center">
        {data.map(i => 
        {
          const title = Object.keys(i)
          const content = Object.values(i)[0].map(arr => arr.dt_txt.slice(11,16))
          console.log(content)
          const hours = content.map(i => <div>{i}</div>) 
          return (
          <li className="mr-20">
            <h2>{title}</h2>
            {hours}
          </li>
        )}
        )}
      </ul>
    </div>
  )
}

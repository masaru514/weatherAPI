import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

export default function Home() {
  const [state, setState] = useState('')

  useEffect(() => {
    async function fetchdata() {
      const val = await axios.get("https://community-open-weather-map.p.rapidapi.com/forecast?q=tokyo%252Cjpn", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": "fab6254a5bmshe27846fdd9e8ddfp17fa2fjsn44266bb7cf54"
        }
      })
        .then(response => console.log(response))
        .catch(err => {
          console.log(err);
        });
    }

    fetchdata()
  }, [])
  return (
    <div>
      <Head>
        <title>天気予報｜アプリケーション</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="pt-40">hello world</h1>
    </div>
  )
}
